import { Metadata } from "next"
import SpeechToTextInterface from "@/components/stt/SpeechToTextInterface"

export const metadata: Metadata = {
  title: "Speech to Text | Swara",
  description: "Transkripsi suara ke teks secara real-time",
}

export default function STTPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <SpeechToTextInterface />
    </div>
  )
}
