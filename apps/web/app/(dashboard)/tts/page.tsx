import { Metadata } from "next"
import TextToSpeechInterface from "@/components/tts/TextToSpeechInterface"

export const metadata: Metadata = {
  title: "Text to Speech | Swara",
  description: "Ubah teks menjadi suara sintesis AI dengan berbagai pilihan profil suara.",
}

export default function TTSPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
      <TextToSpeechInterface />
    </div>
  )
}
