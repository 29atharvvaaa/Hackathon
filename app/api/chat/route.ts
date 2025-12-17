import { NextResponse } from "next/server"

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
    const model = "gemini-1.5-flash"
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction,
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      }),
    })

    const geminiJson = (await geminiRes.json()) as any

    if (!geminiRes.ok) {
      const message = geminiJson?.error?.message || "Gemini API request failed"
      return NextResponse.json({ error: message }, { status: 500 })
    }

    const reply: string | undefined = geminiJson?.candidates?.[0]?.content?.parts
      ?.map((p: any) => p?.text)
      ?.filter(Boolean)
      ?.join("")

    return NextResponse.json({ reply: reply || "" })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}
