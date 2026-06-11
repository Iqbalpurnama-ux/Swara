"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Square, Settings2, Sparkles, Volume2, History, Zap } from "lucide-react"
import { useUiStore } from "@/store/uiStore"

export default function TextToSpeechInterface() {
  const { triggerFlash } = useUiStore()
  
  const [text, setText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  
  // Settings
  const [rate, setRate] = useState(1) // 0.5 to 2.0
  const [pitch, setPitch] = useState(1) // 0 to 2
  
  const MAX_CHARS = 500

  const quickPhrases = [
    "Halo, apa kabar?",
    "Terima kasih banyak atas bantuannya.",
    "Bisa tolong diulangi bagian yang tadi?",
    "Saya setuju dengan pendapat Anda.",
  ]

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        // Filter out purely robotic or very bad ones if possible, but for now take standard ones
        setVoices(availableVoices)
        
        // Try to find a good default Indonesian voice
        const idVoice = availableVoices.find(v => v.lang.includes("id"))
        if (idVoice && !selectedVoice) setSelectedVoice(idVoice)
        else if (availableVoices.length > 0 && !selectedVoice) setSelectedVoice(availableVoices[0])
      }

      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const handlePlay = (textToPlay: string = text) => {
    if (!textToPlay.trim()) {
      triggerFlash("error", "Teks masih kosong")
      return
    }
    
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(textToPlay)
    
    // Always fetch fresh voices to prevent object reference detachment issues
    const freshVoices = window.speechSynthesis.getVoices()
    const voiceToUse = freshVoices.find(v => v.name === selectedVoice?.name)
    if (voiceToUse) utterance.voice = voiceToUse
    
    utterance.rate = rate
    utterance.pitch = pitch

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = (e) => {
      console.error("TTS Error detail:", e.error)
      setIsPlaying(false)
      if (e.error !== "canceled" && e.error !== "interrupted") {
        triggerFlash("error", `Gagal memutar suara: ${e.error}`)
      }
    }

    // Cancel any ongoing/stuck speech before starting a new one
    window.speechSynthesis.cancel()
    
    // Small delay to ensure cancel finishes before speaking (fixes some browser bugs)
    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, 50)
  }

  const handleQuickPhrase = (phrase: string) => {
    setText(phrase)
    handlePlay(phrase)
  }

  // Stop playing if component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return (
    <div className="flex flex-col lg:flex-row h-full w-full max-w-[1400px] mx-auto p-4 md:p-8 gap-6 z-10">
      
      {/* Left Column: Main Text Area */}
      <div className="flex-1 flex flex-col h-full gap-4">
        
        {/* Header/Title */}
        <div className="flex items-center gap-3 mb-2 px-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-200">
            <Volume2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Text to Speech</h1>
            <p className="text-sm text-slate-500 font-medium">Ketikkan sesuatu dan biarkan AI membacakannya</p>
          </div>
        </div>

        {/* Text Input Container (Glassmorphism) */}
        <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative transition-all duration-300 focus-within:shadow-[0_8px_40px_rgba(37,99,235,0.1)] focus-within:border-blue-200">
          
          <textarea
            value={text}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) setText(e.target.value)
            }}
            placeholder="Mulai mengetik di sini..."
            className="flex-1 w-full bg-transparent resize-none p-8 md:p-10 text-2xl md:text-3xl text-slate-800 placeholder:text-slate-300 font-medium tracking-tight outline-none leading-relaxed"
          />

          {/* Footer of Textarea */}
          <div className="flex flex-wrap items-center justify-between p-6 bg-slate-50/50 border-t border-slate-100/50">
            <div className="flex items-center gap-4">
              <span className={`text-sm font-bold ${text.length >= MAX_CHARS ? 'text-red-500' : 'text-slate-400'}`}>
                {text.length} <span className="font-medium text-slate-400">/ {MAX_CHARS}</span>
              </span>
              
              {/* Visualizer when playing */}
              {isPlaying && (
                <div className="flex items-center gap-1 h-6 ml-4">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-blue-500 rounded-full animate-pulse"
                      style={{ 
                        height: ['12px','20px','16px','24px','14px'][i],
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: '0.6s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handlePlay(text)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 ${
                isPlaying 
                  ? "bg-slate-800 text-white hover:bg-slate-900 shadow-slate-900/20" 
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30"
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-5 h-5 fill-current" /> Stop
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" /> Putar Suara
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Controls Sidebar */}
      <div className="w-full lg:w-[400px] flex flex-col gap-6 overflow-y-auto pb-24 lg:pb-0 scroll-smooth pr-2">
        
        {/* Voice Selection */}
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" /> Profil Suara
          </h2>
          
          <div className="space-y-3">
            {/* Standard Browser Voice (Selected) */}
            <div className="p-4 bg-white rounded-2xl border-2 border-blue-500 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -z-10"></div>
              <div className="font-bold text-slate-800">Suara Standar (Browser)</div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{selectedVoice?.name || "Memuat..."}</p>
              
              <select 
                className="mt-3 w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm font-medium text-slate-700 outline-none"
                value={selectedVoice?.name || ""}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value)
                  if (voice) setSelectedVoice(voice)
                }}
              >
                {voices.map(v => (
                  <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                ))}
              </select>
            </div>

            {/* Premium Voice Placeholder */}
            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200 opacity-60 flex items-center justify-between cursor-not-allowed">
              <div>
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  Suara Premium AI <div className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] uppercase rounded-full tracking-wider font-extrabold">Pro</div>
                </div>
                <p className="text-xs text-slate-500 mt-1">ElevenLabs (Segera Hadir)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Adjustments */}
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-blue-500" /> Penyesuaian
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-700">Kecepatan</label>
                <span className="text-sm font-medium text-slate-500">{rate.toFixed(1)}x</span>
              </div>
              <input 
                type="range" min="0.5" max="2" step="0.1" value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Lambat</span><span>Cepat</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-700">Nada (Pitch)</label>
                <span className="text-sm font-medium text-slate-500">{pitch.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="0" max="2" step="0.1" value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Rendah</span><span>Tinggi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Phrases */}
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-sm flex-1">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> Frasa Cepat
          </h2>
          
          <div className="flex flex-col gap-2">
            {quickPhrases.map((phrase, i) => (
              <button
                key={i}
                onClick={() => handleQuickPhrase(phrase)}
                className="text-left px-4 py-3 rounded-xl bg-white/80 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-700 transition-all text-sm font-medium text-slate-600 shadow-sm hover:shadow active:scale-[0.98]"
              >
                "{phrase}"
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
