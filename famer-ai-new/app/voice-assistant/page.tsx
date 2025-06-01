"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I'm your FarmAdvisor AI assistant. How can I help you with your farming needs today?",
    },
  ])

  // Simulate speech recognition
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        setTranscript("When should I plant my corn crop?")
        setIsListening(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isListening])

  const toggleListening = () => {
    if (!isListening) {
      setTranscript("")
    }
    setIsListening(!isListening)
  }

  const handleSend = () => {
    if (transcript.trim()) {
      // Add user message
      setMessages((prev) => [...prev, { role: "user", content: transcript }])

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Based on your location and the current weather patterns, the optimal time to plant corn would be in the next 2-3 weeks. The soil temperature is approaching the ideal range of 50-55°F (10-13°C) for corn germination. Would you like me to provide a detailed planting schedule based on your specific field conditions?",
          },
        ])
      }, 1500)

      setTranscript("")
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Voice Assistant</h1>
      <p className="text-gray-500 mb-8 max-w-3xl">
        Interact with your farming assistant using voice commands or text. Ask questions about crop management, weather,
        disease identification, and more.
      </p>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>FarmAdvisor AI Assistant</CardTitle>
            <CardDescription>Ask questions or give commands related to your farming operations</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleListening}
                className={isListening ? "bg-red-100 text-red-500" : ""}
              >
                {isListening ? <MicOff /> : <Mic />}
              </Button>
              <Textarea
                placeholder="Type your question or command..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="flex-1"
                rows={1}
              />
              <Button size="icon" onClick={handleSend} disabled={!transcript.trim()}>
                <Send />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Commands</CardTitle>
            <CardDescription>Example commands you can use</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="border-b pb-2">
                <p className="font-medium">"What crops are recommended for my soil type?"</p>
                <p className="text-sm text-gray-500">Get personalized crop recommendations</p>
              </li>
              <li className="border-b pb-2">
                <p className="font-medium">"When should I irrigate my corn field?"</p>
                <p className="text-sm text-gray-500">Get irrigation scheduling advice</p>
              </li>
              <li className="border-b pb-2">
                <p className="font-medium">"What's the weather forecast for the next 5 days?"</p>
                <p className="text-sm text-gray-500">Get detailed weather information</p>
              </li>
              <li className="border-b pb-2">
                <p className="font-medium">"Identify this plant disease"</p>
                <p className="text-sm text-gray-500">Use with image upload for disease detection</p>
              </li>
              <li>
                <p className="font-medium">"Schedule fertilizer application for next week"</p>
                <p className="text-sm text-gray-500">Add tasks to your farm calendar</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
