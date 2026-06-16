"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Mic, Send, Volume2, StopCircle, Save, Trash2, Settings2, GripHorizontal, FastForward } from "lucide-react"
import { LanguageSelector } from "@/components/ui/LanguageSelector"
import { VoiceSelector } from "@/components/ui/VoiceSelector"
import { VOICES } from "@/constants/voices"
import { useQuickPhrases } from "@/components/conversation/QuickPhraseManager"
import QuickPhraseManager from "@/components/conversation/QuickPhraseManager"
import { useUiStore } from "@/store/uiStore"
import { saveNotification } from "@/lib/notifications"
import { useTranslation } from "@/lib/i18n"
import { saveHistory } from "@/app/actions/history"

export default function TwoWayInterface() {
  const { t } = useTranslation()
  const { triggerFlash, addNotification } = useUiStore()
  const { phrases } = useQuickPhrases()

  // STT State (Top Panel)
  const [isListening, setIsListening] = useState(false)
  const [partnerMessages, setPartnerMessages] = useState<Array<{ id: number; original: string; translated: string; isPlaying: boolean }>>([])
  const [interimText, setInterimText] = useState("")
  const [autoPlayTranslation, setAutoPlayTranslation] = useState(true)
  const recognitionRef = useRef<any>(null)
  const partnerAreaRef = useRef<HTMLDivElement>(null)
  const isPlayingTranslationRef = useRef(false)

  // TTS State (Bottom Panel)
  const [myText, setMyText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  // Language & Voice
  const [partnerLang, setPartnerLang] = useState("id-ID")
  const [myLang, setMyLang] = useState("en-US")
  const [baseLang, setBaseLang] = useState("id-ID")
  const [enableTranslation, setEnableTranslation] = useState(true)

  const [partnerTranslationVoice, setPartnerTranslationVoice] = useState("")
  const [myVoice, setMyVoice] = useState("")
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  // Refs to keep latest values accessible in callbacks (avoid stale closures)
  const enableTranslationRef = useRef(enableTranslation)
  const partnerLangRef = useRef(partnerLang)
  const myLangRef = useRef(myLang)
  const isListeningRef = useRef(isListening)
  const settingsRef = useRef({ autoPunctuation: true })

  // Load settings
  useEffect(() => {
    const saved = localStorage.getItem("swara_settings")
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.autoPunctuation !== undefined) {
        settingsRef.current.autoPunctuation = parsed.autoPunctuation
      }
      if (parsed.mainLanguage) {
        setBaseLang(parsed.mainLanguage)
        setMyLang(parsed.mainLanguage)
        if (parsed.mainLanguage === "id-ID") setPartnerLang("en-US")
        else setPartnerLang("id-ID")
      }
    }
  }, [])

  // Auto-select voices when languages change
  useEffect(() => {
    const defaultPartnerVoice = VOICES.find(v => v.lang === myLang)?.name || ""
    setPartnerTranslationVoice(defaultPartnerVoice)
  }, [myLang])

  useEffect(() => {
    const defaultMyVoice = VOICES.find(v => v.lang === partnerLang)?.name || ""
    setMyVoice(defaultMyVoice)
  }, [partnerLang])

  useEffect(() => { enableTranslationRef.current = enableTranslation }, [enableTranslation])
  useEffect(() => { partnerLangRef.current = partnerLang }, [partnerLang])
  useEffect(() => { myLangRef.current = myLang }, [myLang])
  useEffect(() => { isListeningRef.current = isListening }, [isListening])
  const autoPlayTranslationRef = useRef(autoPlayTranslation)
  useEffect(() => { autoPlayTranslationRef.current = autoPlayTranslation }, [autoPlayTranslation])

  // Draggable Divider
  const [topRatio, setTopRatio] = useState(50)
  const isDragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Quick Phrase Manager
  const [showPhraseManager, setShowPhraseManager] = useState(false)

  // Conversation History (for saving session)
  const [conversationLog, setConversationLog] = useState<Array<{speaker: string, text: string, time: string}>>([])

  // Translation helper
  const translateText = useCallback(async (text: string, from: string, to: string) => {
    if (!text.trim() || from === to) return ""
    try {
      const fromLang = from.split("-")[0]
      const toLang = to.split("-")[0]
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`)
      const data = await res.json()
      if (data?.responseData?.translatedText) {
        return data.responseData.translatedText
      }
    } catch (e) {
      console.error("Translation error", e)
    }
    return ""
  }, [])

  // Initialize STT (Partner)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = partnerLang
        
        recognitionRef.current.onresult = (event: any) => {
          let final = ""
          let interim = ""
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              let text = event.results[i][0].transcript.trim()
              if (settingsRef.current.autoPunctuation && text.length > 0) {
                text = text.charAt(0).toUpperCase() + text.slice(1)
                if (!/[.!?]$/.test(text)) text += "."
              }
              final += text + " "
            } else {
              interim += event.results[i][0].transcript
            }
          }
          
          setInterimText(interim)

          if (final) {
            const finalTrimmed = final.trim()
            const msgId = Date.now()
            
            // Add initial message (untranslated)
            setPartnerMessages(prev => [...prev, { id: msgId, original: finalTrimmed, translated: "Menerjemahkan...", isPlaying: false }])
            
            // Translate if enabled
            if (enableTranslationRef.current && partnerLangRef.current !== myLangRef.current) {
              translateText(finalTrimmed, partnerLangRef.current, myLangRef.current).then(translated => {
                if (translated) {
                  setPartnerMessages(prev => prev.map(msg => msg.id === msgId ? { ...msg, translated } : msg))
                  
                  // Add to history log
                  setConversationLog(prev => [...prev, {
                    speaker: "Lawan Bicara",
                    text: finalTrimmed,
                    translation: translated,
                    time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
                  }])
                  
                  // Auto-play translation
                  if (autoPlayTranslationRef.current) {
                    playTranslation(translated, msgId)
                  }
                }
              })
            } else {
               // No translation needed, just add to log
               setPartnerMessages(prev => prev.map(msg => msg.id === msgId ? { ...msg, translated: "" } : msg))
               setConversationLog(prev => [...prev, {
                  speaker: "Lawan Bicara",
                  text: finalTrimmed,
                  time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
               }])
            }
          }
        }

        recognitionRef.current.onend = () => {
          setInterimText("")
          // Auto-restart if still listening and not currently playing translation
          if (isListeningRef.current && !isPlayingTranslationRef.current) {
            try { recognitionRef.current?.start() } catch (e) {}
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          if (event.error !== "no-speech") {
            setIsListening(false)
            let errMsg = "Koneksi mikrofon terputus"
            if (event.error === "not-allowed") errMsg = "Izin mikrofon ditolak (Periksa pengaturan browser)"
            if (event.error === "network") errMsg = "Tidak ada koneksi internet"
            // Ignore error if it's aborted because we stopped it for TTS
            if (event.error !== "aborted") {
              addNotification("error", errMsg)
            }
          }
        }
      }
    }

    // Cleanup: Stop recognition when component unmounts
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [partnerLang, translateText, addNotification])

  // Update recognition language when changed
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = partnerLang
      if (isListening) {
        recognitionRef.current.stop()
        setTimeout(() => {
          try { recognitionRef.current?.start() } catch (e) {}
        }, 100)
      }
    }
  }, [partnerLang])

  // Auto-scroll Partner Text
  useEffect(() => {
    if (partnerAreaRef.current) {
      partnerAreaRef.current.scrollTop = partnerAreaRef.current.scrollHeight
    }
  }, [partnerMessages])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      setInterimText("")
    } else {
      try {
        recognitionRef.current?.start()
        setIsListening(true)
      } catch (e) {}
    }
  }

  const playTranslation = async (text: string, msgId: number) => {
    if (!text) return
    
    // Stop any current playback
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }

    isPlayingTranslationRef.current = true
    
    // Temporarily stop STT to prevent feedback loop
    if (isListeningRef.current) {
      recognitionRef.current?.stop()
    }

    setPartnerMessages(prev => prev.map(msg => msg.id === msgId ? { ...msg, isPlaying: true } : { ...msg, isPlaying: false }))

    try {
      const voice = VOICES.find(v => v.name === partnerTranslationVoice) || VOICES.find(v => v.lang === myLangRef.current)
      
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001";
      const response = await fetch(`${baseUrl}/tts/synthesize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          languageCode: voice?.lang || myLangRef.current,
          voiceName: voice?.name,
          gender: voice?.gender
        })
      })

      if (!response.ok) throw new Error("TTS failed")
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audio.playbackRate = playbackSpeed
      currentAudioRef.current = audio

      audio.onended = () => {
        isPlayingTranslationRef.current = false
        setPartnerMessages(prev => prev.map(msg => msg.id === msgId ? { ...msg, isPlaying: false } : msg))
        URL.revokeObjectURL(url)
        // Resume STT
        if (isListeningRef.current) {
          setTimeout(() => { try { recognitionRef.current?.start() } catch (e) {} }, 100)
        }
      }
      
      audio.onerror = () => {
        isPlayingTranslationRef.current = false
        setPartnerMessages(prev => prev.map(msg => msg.id === msgId ? { ...msg, isPlaying: false } : msg))
        if (isListeningRef.current) {
          setTimeout(() => { try { recognitionRef.current?.start() } catch (e) {} }, 100)
        }
      }

      await audio.play()
    } catch (e) {
      console.error(e)
      isPlayingTranslationRef.current = false
      setPartnerMessages(prev => prev.map(msg => msg.id === msgId ? { ...msg, isPlaying: false } : msg))
      if (isListeningRef.current) {
        setTimeout(() => { try { recognitionRef.current?.start() } catch (e) {} }, 100)
      }
    }
  }

  const stopTranslationPlayback = (msgId: number) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }
    isPlayingTranslationRef.current = false
    setPartnerMessages(prev => prev.map(msg => msg.id === msgId ? { ...msg, isPlaying: false } : msg))
    if (isListeningRef.current) {
      setTimeout(() => { try { recognitionRef.current?.start() } catch (e) {} }, 100)
    }
  }

  const handleSendAndSpeak = async () => {
    if (!myText.trim() || isPlaying) return
    
    setIsPlaying(true)

    // Stop listening temporarily to avoid recording our own TTS
    if (isListeningRef.current) {
      recognitionRef.current?.stop()
    }

    let textToSpeak = myText.trim()
    if (settingsRef.current.autoPunctuation && textToSpeak.length > 0) {
      textToSpeak = textToSpeak.charAt(0).toUpperCase() + textToSpeak.slice(1)
      if (!/[.!?]$/.test(textToSpeak)) textToSpeak += "."
    }
    
    let translatedText = ""

    if (enableTranslationRef.current && myLang !== partnerLang) {
      try {
        const translated = await translateText(textToSpeak, myLang, partnerLang)
        if (translated) {
          translatedText = translated
          textToSpeak = translated
        }
      } catch (e) {
        console.error("Gagal menerjemahkan teks Kamu", e)
      }
    }

    // Add to conversation log
    setConversationLog(prev => [...prev, {
      speaker: "Kamu",
      text: myText.trim(),
      translation: translatedText || undefined,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    }])

    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }

    try {
      const voice = VOICES.find(v => v.name === myVoice) || VOICES.find(v => v.lang === partnerLang)
      
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001";
      const response = await fetch(`${baseUrl}/tts/synthesize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToSpeak,
          languageCode: voice?.lang || partnerLang,
          voiceName: voice?.name,
          gender: voice?.gender
        })
      })

      if (!response.ok) throw new Error("TTS failed")
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audio.playbackRate = playbackSpeed
      currentAudioRef.current = audio

      audio.onended = () => {
        setIsPlaying(false)
        setMyText("")
        URL.revokeObjectURL(url)
        // Resume listening
        if (isListeningRef.current) {
          setTimeout(() => { try { recognitionRef.current?.start() } catch (e) {} }, 100)
        }
      }

      audio.onerror = () => {
        setIsPlaying(false)
        if (isListeningRef.current) {
          setTimeout(() => { try { recognitionRef.current?.start() } catch (e) {} }, 100)
        }
      }

      await audio.play()
    } catch (e) {
      console.error(e)
      setIsPlaying(false)
      if (isListeningRef.current) {
        setTimeout(() => { try { recognitionRef.current?.start() } catch (e) {} }, 100)
      }
    }
  }

  const handleClearAll = () => {
    setPartnerMessages([])
    addNotification("success", "Teks dihapus")
  }

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow Ctrl+Enter even if typing in textarea
      if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        handleSendAndSpeak()
        return
      }
      
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return

      if (e.code === "Space") {
        e.preventDefault()
        toggleListening()
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isListening, myText, isPlaying]) // dependencies for correct state inside handlers

  const handleSaveSession = async () => {
    if (conversationLog.length === 0) {
      addNotification("warning", "Belum ada percakapan")
      return
    }
    const textPreview = conversationLog.map((l: any) => `${l.speaker}: ${l.text}`).join(' | ')
    
    try {
      await saveHistory({
        type: "stt", // Treat conversation as stt in History for now
        originalText: textPreview,
        label: "2 Arah",
        sourceLanguageCode: partnerLang,
        targetLanguageCode: myLang,
      })
      addNotification("success", "Sesi percakapan tersimpan!")
      saveNotification("Percakapan Tersimpan", "Riwayat percakapan 2 arah berhasil disimpan.", "success")
    } catch (e) {
      addNotification("error", "Gagal menyimpan, pastikan Anda sudah login.")
    }
  }

  // Draggable divider handlers
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    isDragging.current = true
  }, [])

  const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const newRatio = ((clientY - rect.top) / rect.height) * 100
    setTopRatio(Math.min(Math.max(newRatio, 25), 75))
  }, [])

  const handleDragEnd = useCallback(() => {
    isDragging.current = false
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", handleDrag)
    document.addEventListener("mouseup", handleDragEnd)
    document.addEventListener("touchmove", handleDrag)
    document.addEventListener("touchend", handleDragEnd)
    return () => {
      document.removeEventListener("mousemove", handleDrag)
      document.removeEventListener("mouseup", handleDragEnd)
      document.removeEventListener("touchmove", handleDrag)
      document.removeEventListener("touchend", handleDragEnd)
    }
  }, [handleDrag, handleDragEnd])

  return (
    <div ref={containerRef} className="flex flex-col h-full w-full max-w-5xl mx-auto md:p-6 z-10">
      
      {/* Top Panel: Lawan Bicara (STT) */}
      <div 
        className="flex flex-col bg-blue-50/90 dark:bg-slate-900/90 backdrop-blur-xl md:rounded-t-[3rem] border-b-4 border-blue-600 dark:border-blue-500 relative z-30 transition-all duration-300"
        style={{ flex: `${topRatio} 0 0` }}
      >
        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md`}>
              <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-white animate-pulse' : 'bg-blue-300'}`}></div>
              {t("conv.partner")}
            </div>
            <LanguageSelector value={partnerLang} onChange={setPartnerLang} align="left" />
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>
            <VoiceSelector languageCode={myLang} value={partnerTranslationVoice} onChange={setPartnerTranslationVoice} align="left" />
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPlaybackSpeed(s => s === 1 ? 1.25 : s === 1.25 ? 1.5 : s === 1.5 ? 2 : s === 2 ? 0.75 : 1)}
              className="h-8 px-3 rounded-full text-xs font-bold transition-all bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 shadow-sm flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Atur kecepatan putar suara"
            >
              <FastForward className="w-3.5 h-3.5" /> {playbackSpeed}x
            </button>
            <button 
              onClick={() => setAutoPlayTranslation(!autoPlayTranslation)}
              className={`h-8 px-3 rounded-full text-xs font-bold transition-all ${
                autoPlayTranslation 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400'
              }`}
              aria-label={autoPlayTranslation ? "Matikan putar suara otomatis" : "Aktifkan putar suara otomatis"}
            >
              {autoPlayTranslation ? '🔊 Auto-Play ON' : '🔇 Auto-Play OFF'}
            </button>
            <button 
              onClick={() => setEnableTranslation(!enableTranslation)}
              className={`h-8 px-3 rounded-full text-xs font-bold transition-all ${
                enableTranslation 
                  ? 'bg-indigo-500 text-white shadow-md' 
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400'
              }`}
              aria-label={enableTranslation ? "Matikan terjemah otomatis" : "Aktifkan terjemah otomatis"}
            >
              {enableTranslation ? `🌐 ${t("sidebar.terjemah")} ON` : `🌐 ${t("sidebar.terjemah")}`}
            </button>
            <button onClick={handleClearAll} aria-label="Hapus semua teks" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors shadow-sm" title={t("stt.delete")}>
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              onClick={toggleListening}
              aria-label={isListening ? "Berhenti mendengarkan lawan bicara" : "Mulai mendengarkan lawan bicara"}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${isListening ? 'bg-red-500 text-white' : 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400'}`}
            >
              {isListening ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div ref={partnerAreaRef} className="flex-1 overflow-y-auto p-8 pt-20 pb-8 flex flex-col justify-end custom-scrollbar md:rounded-t-[3rem]" aria-live="polite" role="region" aria-label="Teks Lawan Bicara">
          {partnerMessages.length === 0 && !isListening && !interimText ? (
             <div className="text-center text-blue-300 dark:text-slate-500 font-medium my-auto">{t("conv.press_mic")}</div>
          ) : (
            <div>
              <div className="text-3xl md:text-4xl text-slate-800 dark:text-white font-medium leading-relaxed tracking-tight">
                {partnerMessages.map(msg => msg.original).join(" ")}
                {interimText && (
                  <span className="text-slate-400 dark:text-slate-500 ml-2 animate-pulse">{interimText}</span>
                )}
                {isListening && !interimText && <span className="inline-block w-2 h-6 bg-blue-500 animate-pulse ml-2 align-middle"></span>}
              </div>
              
              {enableTranslation && partnerMessages.some(m => m.translated) && (
                <div className="relative group text-lg md:text-xl text-indigo-500/70 dark:text-indigo-400/60 font-medium leading-relaxed mt-4 border-t border-blue-200/50 dark:border-slate-700/50 pt-4 flex gap-4 items-start justify-between">
                  <div className="flex-1">
                    {partnerMessages.map(msg => msg.translated).join(" ")}
                  </div>
                  
                  <div className="shrink-0 flex items-center gap-2">
                    {partnerMessages.some(m => m.isPlaying) ? (
                      <button
                        onClick={() => stopTranslationPlayback(partnerMessages.find(m => m.isPlaying)?.id || 0)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 transition-colors"
                        aria-label="Hentikan audio terjemah"
                      >
                        <StopCircle className="w-5 h-5 animate-pulse" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const lastMsg = partnerMessages[partnerMessages.length - 1];
                          if (lastMsg) playTranslation(lastMsg.translated, lastMsg.id);
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 hover:bg-indigo-200 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Putar ulang terjemah terakhir"
                        title="Putar terjemah terakhir"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Draggable Divider */}
      <div
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        className="h-3 flex items-center justify-center cursor-ns-resize bg-slate-200 dark:bg-slate-700 hover:bg-blue-200 dark:hover:bg-blue-800 active:bg-blue-300 dark:active:bg-blue-700 transition-colors z-30 select-none touch-none"
      >
        <GripHorizontal className="w-5 h-3 text-slate-400 dark:text-slate-500" />
      </div>

      {/* Bottom Panel: Kamu (TTS) */}
      <div 
        className="flex flex-col bg-white dark:bg-slate-800 md:rounded-b-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative z-20 border border-slate-100 dark:border-slate-700/50"
        style={{ flex: `${100 - topRatio} 0 0` }}
      >
        {/* Bottom Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 bg-green-500 dark:bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md`}>
              <div className={`w-2 h-2 rounded-full bg-white ${isPlaying ? 'animate-pulse' : ''}`}></div>
              {t("conv.you")}
            </div>
            <LanguageSelector value={myLang} onChange={setMyLang} align="left" />
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <VoiceSelector languageCode={partnerLang} value={myVoice} onChange={setMyVoice} align="left" />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleSaveSession} aria-label="Simpan riwayat percakapan" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-700/80 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm" title="Simpan Sesi">
              <Save className="w-4 h-4" />
            </button>
            <button onClick={() => setShowPhraseManager(true)} aria-label="Edit frasa cepat" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-700/80 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm" title="Edit Frasa">
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-6 pt-16 md:rounded-b-[3rem]">
          <textarea
            value={myText}
            onChange={(e) => setMyText(e.target.value)}
            placeholder={t("conv.placeholder")}
            className="flex-1 w-full bg-transparent resize-none text-2xl md:text-3xl text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 font-medium outline-none leading-relaxed"
          />
          
          <div className="flex items-center justify-between mt-4 gap-3">
            {/* Quick Phrases */}
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1 flex-1">
              {phrases.slice(0, 6).map((p, i) => (
                <button key={i} onClick={() => setMyText(p)} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-full transition-colors whitespace-nowrap shrink-0">
                  {p}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleSendAndSpeak}
              disabled={!myText.trim() || isPlaying}
              aria-label="Kirim dan bacakan balasan"
              className={`flex items-center gap-2 px-6 md:px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all shrink-0 ${
                isPlaying ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400' : 'bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/30 hover:scale-105 active:scale-95'
              }`}
            >
              {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
              {isPlaying ? '...' : t("conv.send")}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Phrase Manager Modal */}
      <QuickPhraseManager isOpen={showPhraseManager} onClose={() => setShowPhraseManager(false)} />
    </div>
  )
}
