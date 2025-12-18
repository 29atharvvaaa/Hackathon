"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

type ApiMessage = {
  role: "user" | "assistant"
  content: string
}

const quickReplies = ["Popular destinations", "Best time to travel", "Package prices", "Book a trip"]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Wanderly! I'm your travel assistant. How can I help you plan your dream vacation today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const toApiMessages = (history: Message[]): ApiMessage[] => {
    // Keep history small-ish to avoid huge payloads.
    const trimmed = history.slice(-20)
    return trimmed.map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }))
  }

  const handleSend = async (text?: string) => {
    const messageText = (text ?? input).trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    }

    // Build the history we are about to send (includes the new user message).
    const nextHistory = [...messages, userMessage]

    setMessages(nextHistory)
    setInput("")
    setIsTyping(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: toApiMessages(nextHistory) }),
      })

      const data = (await res.json()) as { reply?: string; error?: string }

      if (!res.ok) {
        throw new Error(data.error || "Request failed")
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.reply || "(No reply)",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err: any) {
      const detail =
        process.env.NODE_ENV === "development" ? `\n\n(${err?.message || "Unknown error"})` : ""

      const botMessage: Message = {
        id: Date.now() + 1,
        text: `Sorry — I ran into an error talking to the AI. Please try again.${detail}`,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      console.error(err)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300",
          "bg-primary text-primary-foreground hover:scale-110",
          isOpen && "rotate-90",
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Wanderly Assistant</h3>
                <p className="text-xs text-primary-foreground/70">Usually replies instantly</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-2", message.sender === "user" ? "justify-end" : "justify-start")}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] px-4 py-2 rounded-2xl text-sm",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card text-card-foreground rounded-bl-sm shadow-sm",
                  )}
                >
                  {message.text}
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-card px-4 py-2 rounded-2xl rounded-bl-sm shadow-sm">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-border flex gap-2 overflow-x-auto">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
                className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-full whitespace-nowrap transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-4 border-t border-border flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
