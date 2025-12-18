import { NextResponse } from "next/server"

// Ensure we run in the Node.js runtime (not Edge), for maximum compatibility.
export const runtime = "nodejs"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

type ChatRequestBody = {
  messages: ChatMessage[]
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 })
    }

    const body = (await req.json()) as ChatRequestBody

    if (!body?.messages?.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 })
    }

    // Convert from UI roles to Gemini roles.
    const contents = body.messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }))

    const systemInstruction = {
      parts: [
        {
          text:
            "You are Wanderly Assistant, a helpful travel assistant for a travel agency website. Be concise, friendly, and ask clarifying questions when needed.",
        },
      ],
    }

    // Using the Gemini REST API directly keeps the server dependency-free.
    // Prefer an API-key header (vs `?key=`) to avoid leaking the key via URL logs.
    const model = process.env.GEMINI_MODEL || "gemini-1.5-flash"
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        // For the Generative Language REST API, this field is camelCase.
        systemInstruction,
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      }),
    })

    const raw = await geminiRes.text()
    let geminiJson: any = undefined
    try {
      geminiJson = raw ? JSON.parse(raw) : undefined
    } catch {
      // non-JSON response
    }

    if (!geminiRes.ok) {
      const message = geminiJson?.error?.message || raw || "Gemini API request failed"
      console.error("Gemini API error", {
        status: geminiRes.status,
        model,
        message,
      })
      return NextResponse.json(
        { error: message, status: geminiRes.status },
        { status: 500 },
      )
    }

    const reply: string | undefined = geminiJson?.candidates?.[0]?.content?.parts
      ?.map((p: any) => p?.text)
      ?.filter(Boolean)
      ?.join("")

    return NextResponse.json({ reply: reply || "" })
  } catch (err: any) {
    console.error("/api/chat unexpected error", err)
    return NextResponse.json(
      { error: err?.message || "Unexpected server error" },
      { status: 500 },
    )
  }
}
