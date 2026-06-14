import { Metadata } from "next"
import TranslationInterface from "@/components/translation/TranslationInterface"

export const metadata: Metadata = {
  title: "Terjemah Real-time | Swara",
  description: "Terjemah ucapan ke berbagai bahasa secara langsung.",
}

export default function TranslationPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
      <TranslationInterface />
    </div>
  )
}
