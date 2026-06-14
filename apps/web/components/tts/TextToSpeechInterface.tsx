"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Square, Settings2, Sparkles, Volume2, History, Zap, Check } from "lucide-react"
import { useUiStore } from "@/store/uiStore"
import { LanguageSelector } from "@/components/ui/LanguageSelector"
import { VoiceSelector } from "@/components/ui/VoiceSelector"
import { VOICES, Voice } from "@/constants/voices"
import { useTranslation } from "@/lib/i18n"

export default function TextToSpeechInterface() {
  const { t } = useTranslation()
  const { triggerFlash } = useUiStore()
  
  const [text, setText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [language, setLanguage] = useState("id-ID")
  const [voiceName, setVoiceName] = useState("id-ID-Wavenet-A")
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Settings
  const [rate, setRate] = useState(1) // 0.5 to 2.0
  const [pitch, setPitch] = useState(1) // 0 to 2
  
  const MAX_CHARS = 500

  const quickPhrases = [
    t("tts.phrase_1"),
    t("tts.phrase_2"),
    t("tts.phrase_3"),
    t("tts.phrase_4"),
  ]

  useEffect(() => {
    // Load default language setting
    const saved = localStorage.getItem("swara_settings")
    let defaultLang = "id-ID"
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.mainLanguage) defaultLang = parsed.mainLanguage
    }
    setLanguage(defaultLang)
    
    // Select first voice that matches default language
    const defaultVoice = VOICES.find(v => v.lang === defaultLang) || VOICES[0]
    setVoiceName(defaultVoice.name)
  }, [])

  const handlePlay = async (textToPlay: string = text) => {
    if (!textToPlay.trim()) {
      triggerFlash("error", "Teks masih kosong")
      return
    }
    
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      setIsPlaying(false)
      return
    }

    try {
      setIsPlaying(true)
      
      const currentVoice = VOICES.find(v => v.name === voiceName) || VOICES[0]

      const response = await fetch("http://localhost:3001/tts/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToPlay,
          languageCode: currentVoice.lang,
          voiceName: currentVoice.name,
          gender: currentVoice.gender
        })
      })

      if (!response.ok) {
        throw new Error("Gagal mengambil suara dari server")
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      const audio = new Audio(url)
      // Apply pitch/rate using audio context or natively if possible, 
      // HTMLAudioElement natively supports playbackRate
      audio.playbackRate = rate
      // Note: HTMLAudioElement doesn't support pitch shifting natively without WebAudio API, 
      // so pitch slider will be ignored for now unless we implement AudioContext

      audioRef.current = audio
      
      audio.onended = () => {
        setIsPlaying(false)
        URL.revokeObjectURL(url)
      }
      
      audio.onerror = () => {
        triggerFlash("error", "Terjadi kesalahan saat memutar suara")
        setIsPlaying(false)
      }

      await audio.play()
    } catch (error: any) {
      triggerFlash("error", error.message || "Koneksi ke server gagal")
      setIsPlaying(false)
    }
  }

  const handleQuickPhrase = (phrase: string) => {
    setText(phrase)
    handlePlay(phrase)
  }

  // Stop playing if component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow Ctrl+Enter even if typing in textarea
      if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        handlePlay(text)
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [text, isPlaying])



  return (
    <div className="flex flex-col lg:flex-row h-full w-full max-w-[1400px] mx-auto p-4 md:p-8 gap-6 z-10">
      
      {/* Left Column: Main Text Area */}
      <div className="flex-1 flex flex-col h-full gap-4">
        
        {/* Header/Title */}
        <div className="flex items-center gap-3 mb-2 px-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800">
            <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">{t("tts.title")}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t("tts.desc")}</p>
          </div>
        </div>

        {/* Text Input Container (Glassmorphism) */}
        <div className="flex-1 flex flex-col bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/80 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative transition-all duration-300 focus-within:shadow-[0_8px_40px_rgba(37,99,235,0.1)] dark:focus-within:shadow-[0_8px_40px_rgba(37,99,235,0.05)] focus-within:border-blue-200 dark:focus-within:border-blue-500/50">
          
          <textarea
            value={text}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) setText(e.target.value)
            }}
            placeholder={t("tts.placeholder")}
            className="flex-1 w-full bg-transparent resize-none p-8 md:p-10 text-2xl md:text-3xl text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 font-medium tracking-tight outline-none leading-relaxed"
          />

          {/* Footer of Textarea */}
          <div className="flex flex-wrap items-center justify-between p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100/50 dark:border-slate-800/50">
            <div className="flex items-center gap-4">
              <span className={`text-sm font-bold ${text.length >= MAX_CHARS ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'}`}>
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
              aria-label={isPlaying ? "Hentikan pemutaran" : "Putar teks"}
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
                  <Play className="w-5 h-5 fill-current" /> {t("tts.play")}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Controls Sidebar */}
      <div className="w-full lg:w-[400px] flex flex-col gap-6 overflow-y-auto pb-24 lg:pb-0 scroll-smooth pr-2">
        
        {/* Voice Selection */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/60 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" /> {t("tts.voice_profile")}
          </h2>
          
          <div className="space-y-3">
            {/* Standard Browser Voice (Selected) */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-500 dark:border-blue-600 shadow-sm relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -z-10"></div>
              <div className="font-bold text-slate-800 dark:text-white mb-2">{t("tts.choose_voice")}</div>
              
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t("tts.language")}</span>
                  <LanguageSelector value={language} onChange={setLanguage} align="left" />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t("tts.voice")}</span>
                  <VoiceSelector languageCode={language} value={voiceName} onChange={setVoiceName} align="left" />
                </div>
              </div>
            </div>

            {/* Premium Voice Placeholder */}
            <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 opacity-60 flex items-center justify-between cursor-not-allowed">
              <div>
                <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  {t("tts.premium_voice")} <div className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] uppercase rounded-full tracking-wider font-extrabold">Pro</div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("tts.coming_soon")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Adjustments */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/60 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-blue-500" /> {t("tts.adjustments")}
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t("tts.speed")}</label>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{rate.toFixed(1)}x</span>
              </div>
              <input 
                type="range" min="0.5" max="2" step="0.1" value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                aria-label="Atur kecepatan suara"
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span>{t("tts.slow")}</span><span>{t("tts.fast")}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t("tts.pitch")}</label>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{pitch.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="0" max="2" step="0.1" value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                aria-label="Atur nada suara"
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between mt-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span>{t("tts.low")}</span><span>{t("tts.high")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Phrases */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/60 shadow-sm flex-1">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> {t("tts.quick_phrases")}
          </h2>
          
          <div className="flex flex-col gap-2">
            {quickPhrases.map((phrase, i) => (
              <button
                key={i}
                onClick={() => handleQuickPhrase(phrase)}
                className="text-left px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-400 transition-all text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm hover:shadow active:scale-[0.98]"
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
