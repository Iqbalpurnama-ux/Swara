"use client"

import SpeechToTextInterface from "@/components/stt/SpeechToTextInterface"
import LiveCaptionMode from "@/components/stt/LiveCaptionMode"

export default function STTPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] relative">
      <SpeechToTextInterface />
      
      {/* Live Caption Button (top-right corner, below toolbar) */}
      <div className="absolute top-20 right-6 z-40">
        <LiveCaptionMode />
      </div>
    </div>
  )
}
