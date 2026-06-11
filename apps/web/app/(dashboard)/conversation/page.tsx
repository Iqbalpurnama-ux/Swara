import { Metadata } from "next"
import TwoWayInterface from "@/components/conversation/TwoWayInterface"

export const metadata: Metadata = {
  title: "Percakapan 2 Arah | Swara",
  description: "Mode komunikasi dua arah langsung dengan STT dan TTS dalam satu layar.",
}

export default function ConversationPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
      <TwoWayInterface />
    </div>
  )
}
