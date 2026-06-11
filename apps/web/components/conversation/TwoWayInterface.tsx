"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, Send, Volume2, StopCircle } from "lucide-react"

export default function TwoWayInterface() {
  // STT State (Top Panel)
  const [isListening, setIsListening] = useState(false)
  const [partnerText, setPartnerText] = useState("")
  const recognitionRef = useRef<any>(null)
  const partnerAreaRef = useRef<HTMLDivElement>(null)

  // TTS State (Bottom Panel)
  const [myText, setMyText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  // Initialize STT (Partner)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "id-ID"
        
        recognitionRef.current.onresult = (event: any) => {
          let final = ""
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) final += event.results[i][0].transcript + " "
          }
          if (final) setPartnerText(prev => prev + final)
        }
      }
    }
  }, [])

  // Auto-scroll Partner Text
  useEffect(() => {
    if (partnerAreaRef.current) {
      partnerAreaRef.current.scrollTop = partnerAreaRef.current.scrollHeight
    }
  }, [partnerText])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current?.start()
        setIsListening(true)
      } catch (e) {}
    }
  }

  const handleSendAndSpeak = () => {
    if (!myText.trim()) return
    
    // Stop listening temporarily to avoid recording our own TTS
    if (isListening) {
      recognitionRef.current?.stop()
    }

    const utterance = new SpeechSynthesisUtterance(myText)
    utterance.lang = "id-ID"
    
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => {
      setIsPlaying(false)
      setMyText("") // clear after speaking
      // Resume listening
      if (isListening) {
        try { recognitionRef.current?.start() } catch (e) {}
      }
    }

    window.speechSynthesis.cancel()
    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, 50)
  }

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto md:p-6 z-10">
      
      {/* Top Panel: Lawan Bicara (STT) */}
      <div className="flex-1 flex flex-col bg-blue-50/90 backdrop-blur-xl md:rounded-t-[3rem] border-b-4 border-blue-600 relative overflow-hidden transition-all duration-300">
        <div className="absolute top-4 left-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md z-20">
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-white animate-pulse' : 'bg-blue-300'}`}></div>
          Lawan Bicara
        </div>
        
        <div className="absolute top-4 right-6 z-20">
          <button 
            onClick={toggleListening}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${isListening ? 'bg-red-500 text-white' : 'bg-white text-blue-600'}`}
          >
            {isListening ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>

        <div ref={partnerAreaRef} className="flex-1 overflow-y-auto p-8 pt-20 pb-8 flex flex-col justify-end">
          {!partnerText && !isListening ? (
             <div className="text-center text-blue-300 font-medium my-auto">Tekan mikrofon untuk mulai mendengar lawan bicara...</div>
          ) : (
            <div className="text-3xl md:text-4xl text-slate-800 font-medium leading-relaxed tracking-tight">
              {partnerText}
              {isListening && <span className="inline-block w-2 h-6 bg-blue-500 animate-pulse ml-2"></span>}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Panel: Kamu (TTS) */}
      <div className="flex-1 flex flex-col bg-white md:rounded-b-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative overflow-hidden z-20 border border-slate-100">
        <div className="absolute top-4 left-6 flex items-center gap-2 bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md z-20">
          <div className={`w-2 h-2 rounded-full bg-white ${isPlaying ? 'animate-pulse' : ''}`}></div>
          Kamu (Ketik & Balas)
        </div>

        <div className="flex-1 flex flex-col p-6 pt-20">
          <textarea
            value={myText}
            onChange={(e) => setMyText(e.target.value)}
            placeholder="Ketik balasan Anda di sini..."
            className="flex-1 w-full bg-transparent resize-none text-2xl md:text-3xl text-slate-800 placeholder:text-slate-300 font-medium outline-none leading-relaxed"
          />
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {/* Mini Quick Phrases */}
              {["Ya", "Tidak", "Terima kasih", "Bisa diulang?"].map((p, i) => (
                <button key={i} onClick={() => setMyText(p)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-full transition-colors">
                  {p}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleSendAndSpeak}
              disabled={!myText.trim() || isPlaying}
              className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all ${
                isPlaying ? 'bg-slate-200 text-slate-500' : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/30 hover:scale-105 active:scale-95'
              }`}
            >
              {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
              {isPlaying ? 'Memutar...' : 'Kirim & Ucapkan'}
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
