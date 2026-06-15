"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Mic, Globe2, ArrowRightLeft, StopCircle, Copy, Trash2, Save, Star, StarOff, Send } from "lucide-react"
import { useUiStore } from "@/store/uiStore"
import { saveNotification } from "@/lib/notifications"
import { LanguageSelector } from "@/components/ui/LanguageSelector"
import { useTranslation } from "@/lib/i18n"
import { translateTextAction } from "@/app/actions/translate"
import { saveHistory } from "@/app/actions/history"

const FAV_STORAGE_KEY = "swara_fav_lang_pairs"

interface FavPair {
  source: string
  target: string
}

function useFavoritePairs() {
  const [favorites, setFavorites] = useState<FavPair[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(FAV_STORAGE_KEY)
    if (saved) {
      try { setFavorites(JSON.parse(saved)) } catch (e) {}
    }
  }, [])

  const saveFavorites = (newFavs: FavPair[]) => {
    setFavorites(newFavs)
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(newFavs))
  }

  const toggleFavorite = (source: string, target: string) => {
    const exists = favorites.findIndex(f => f.source === source && f.target === target)
    if (exists >= 0) {
      saveFavorites(favorites.filter((_, i) => i !== exists))
    } else if (favorites.length < 3) {
      saveFavorites([...favorites, { source, target }])
    }
  }

  const isFavorite = (source: string, target: string) => {
    return favorites.some(f => f.source === source && f.target === target)
  }

  return { favorites, toggleFavorite, isFavorite }
}

const LANG_LABELS: Record<string, string> = {
  "id-ID": "🇮🇩 ID",
  "en-US": "🇺🇸 EN",
  "ar-SA": "🇸🇦 AR",
  "zh-CN": "🇨🇳 ZH",
  "ja-JP": "🇯🇵 JA",
  "ko-KR": "🇰🇷 KO",
  "fr-FR": "🇫🇷 FR",
  "de-DE": "🇩🇪 DE",
  "es-ES": "🇪🇸 ES",
  "ms-MY": "🇲🇾 MS",
}

export default function TranslationInterface() {
  const { t } = useTranslation()
  const { triggerFlash, addNotification } = useUiStore()
  const { favorites, toggleFavorite, isFavorite } = useFavoritePairs()
  
  const [isRecording, setIsRecording] = useState(false)
  const [finalOriginal, setFinalOriginal] = useState("")
  const [interimOriginal, setInterimOriginal] = useState("")
  
  const [finalTranslated, setFinalTranslated] = useState("")
  const [interimTranslated, setInterimTranslated] = useState("")
  
  const [inputText, setInputText] = useState("")

  const handleManualTranslate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputText.trim()) return
    
    if (isRecording) {
      toggleRecording()
    }

    const textToTranslate = inputText.trim()
    let originalWithPunctuation = textToTranslate
    
    const saved = localStorage.getItem("swara_settings")
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.autoPunctuation && textToTranslate.length > 0) {
        originalWithPunctuation = originalWithPunctuation.charAt(0).toUpperCase() + originalWithPunctuation.slice(1)
        if (!/[.!?]$/.test(originalWithPunctuation)) originalWithPunctuation += "."
      }
    }
    
    originalWithPunctuation += " "

    setInputText("")
    setFinalOriginal(prev => prev + originalWithPunctuation)
    
    try {
      const translated = await translateText(originalWithPunctuation, sourceLang, targetLang)
      if (translated) {
        setFinalTranslated(prev => prev + translated + " ")
      }
    } catch (err) {
      console.error(err)
    }
  }
  
  const [sourceLang, setSourceLang] = useState("id-ID")
  const [targetLang, setTargetLang] = useState("en-US")
  
  useEffect(() => {
    const saved = localStorage.getItem("swara_settings")
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.mainLanguage) {
        setSourceLang(parsed.mainLanguage)
        // If main language is English, default target to Indonesian
        if (parsed.mainLanguage === "en-US") {
          setTargetLang("id-ID")
        }
      }
    }
  }, [])

  const recognitionRef = useRef<any>(null)
  const transcriptAreaRef = useRef<HTMLDivElement>(null)

  const translateText = useCallback(async (text: string, from: string, to: string) => {
    if (!text.trim()) return ""
    try {
      const translated = await translateTextAction(text, from, to)
      if (translated) return translated
    } catch (e) {
      console.error("Translation error", e)
    }
    return text + ` (${to.split("-")[0].toUpperCase()})`
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        
        recognitionRef.current.onresult = (event: any) => {
          let interim = ""
          let final = ""
          
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript + " "
            } else {
              interim += event.results[i][0].transcript
            }
          }
          
          if (final) {
            setFinalOriginal(prev => prev + final)
            translateText(final, sourceLang, targetLang).then(translated => {
              setFinalTranslated(prev => prev + translated + " ")
            })
          }
          
          setInterimOriginal(interim)
          setInterimTranslated(interim ? interim + "..." : "")
        }
        
        recognitionRef.current.onerror = (event: any) => {
          if (event.error !== "no-speech") {
            setIsRecording(false)
            let errMsg = "Koneksi mikrofon terputus"
            if (event.error === "not-allowed") errMsg = "Izin mikrofon ditolak (Periksa pengaturan browser)"
            if (event.error === "network") errMsg = "Tidak ada koneksi internet"
            addNotification("error", errMsg)
          }
        }

        recognitionRef.current.onend = () => {
          if (isRecording) {
            try { recognitionRef.current.start() } catch(e) {}
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
  }, [targetLang, isRecording, triggerFlash, sourceLang, translateText, addNotification])

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = sourceLang
      if (isRecording) {
        recognitionRef.current.stop()
        setTimeout(() => {
          try { recognitionRef.current.start() } catch(e) {}
        }, 100)
      }
    }
  }, [sourceLang, isRecording])

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      addNotification("error", "Browser tidak didukung")
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      try {
        setInterimOriginal("")
        setInterimTranslated("")
        recognitionRef.current.start()
        setIsRecording(true)
      } catch (e) {}
    }
  }

  const swapLanguages = () => {
    const temp = sourceLang
    setSourceLang(targetLang)
    setTargetLang(temp)
  }

  useEffect(() => {
    if (transcriptAreaRef.current) {
      transcriptAreaRef.current.scrollTop = transcriptAreaRef.current.scrollHeight
    }
  }, [finalOriginal, interimOriginal])

  const handleCopy = () => {
    const textToCopy = `Asli: ${(finalOriginal + interimOriginal).trim()}\nTerjemah: ${(finalTranslated + interimTranslated).trim()}`
    if (!textToCopy.trim() || textToCopy === "Asli: \nTerjemah:") return
    navigator.clipboard.writeText(textToCopy).then(() => {
      addNotification("success", "Disalin!")
    })
  }

  const handleClear = () => {
    setFinalOriginal("")
    setFinalTranslated("")
    setInterimOriginal("")
    setInterimTranslated("")
    addNotification("success", "Dihapus")
  }

  const handleSave = async () => {
    const original = (finalOriginal + interimOriginal).trim()
    const translated = (finalTranslated + interimTranslated).trim()
    if (!original) return
    
    try {
      await saveHistory({
        type: "translation",
        originalText: original,
        translatedText: translated,
        sourceLanguageCode: sourceLang,
        targetLanguageCode: targetLang,
        label: `${sourceLang} → ${targetLang}`
      })
      addNotification("success", "Terjemah tersimpan!")
      saveNotification("Terjemahan Tersimpan", "Hasil terjemahan berhasil disimpan ke riwayat.", "success")
    } catch (e) {
      addNotification("error", "Gagal menyimpan, pastikan Anda sudah login.")
    }
  }

  const applyFavPair = (pair: FavPair) => {
    setSourceLang(pair.source)
    setTargetLang(pair.target)
  }

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return

      if (e.code === "Space") {
        e.preventDefault()
        toggleRecording()
      } else if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        handleSave()
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isRecording, finalOriginal, interimOriginal, finalTranslated, interimTranslated])

  return (
    <div className="flex flex-col h-full relative overflow-hidden font-sans">
      
      {/* Active Recording Orbs Overlay */}
      <div className={`absolute inset-0 pointer-events-none overflow-hidden mix-blend-multiply transition-opacity duration-1000 ${isRecording ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full blur-[120px] bg-blue-400/40 scale-110"></div>
        <div className="absolute top-[40%] -right-[20%] w-[600px] h-[600px] rounded-full blur-[100px] bg-cyan-400/30 scale-125"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[700px] h-[700px] rounded-full blur-[100px] bg-indigo-400/20 scale-110"></div>
      </div>

      {/* Floating Toolbar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95%] md:max-w-2xl">
        <div className="flex items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-3 py-2">
          
          <div className="flex items-center gap-1 md:gap-2">
            <LanguageSelector 
              value={sourceLang} 
              onChange={setSourceLang} 
              align="left"
            />

            <LanguageSelector 
              value={targetLang} 
              onChange={setTargetLang} 
              align="right"
            />
          </div>

          <div className="flex items-center gap-1">
            {/* Favorite toggle */}
            <button 
              onClick={() => toggleFavorite(sourceLang, targetLang)} 
              className={`w-11 h-11 flex items-center justify-center rounded-full transition-all ${
                isFavorite(sourceLang, targetLang) 
                  ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30'
              }`}
              title={isFavorite(sourceLang, targetLang) ? "Hapus dari favorit" : "Simpan ke favorit"}
              aria-label={isFavorite(sourceLang, targetLang) ? "Hapus dari favorit" : "Simpan ke favorit"}
            >
              {isFavorite(sourceLang, targetLang) ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
            </button>
            <button onClick={handleCopy} aria-label="Salin teks terjemah" className="w-11 h-11 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-all" title={t("stt.copy")}>
              <Copy className="w-4 h-4" />
            </button>
            <button onClick={handleClear} aria-label="Hapus semua teks" className="w-11 h-11 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-all" title={t("stt.delete")}>
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={handleSave} aria-label="Simpan teks terjemah" className="h-11 px-5 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full font-bold text-sm hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] dark:shadow-[0_4px_14px_0_rgba(59,130,246,0.2)] ml-2">
              {t("stt.save")}
            </button>
          </div>
        </div>

        {/* Favorite Pairs Quick Access */}
        {favorites.length > 0 && (
          <div className="flex gap-2 mt-2 justify-center">
            {favorites.map((pair, i) => (
              <button
                key={i}
                onClick={() => applyFavPair(pair)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  sourceLang === pair.source && targetLang === pair.target
                    ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-md'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                {LANG_LABELS[pair.source] || pair.source} → {LANG_LABELS[pair.target] || pair.target}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Dual-Line Transcription Area */}
      <div 
        ref={transcriptAreaRef} 
        className="flex-1 overflow-y-auto px-6 md:px-16 pt-32 pb-48 relative z-10 scroll-smooth w-full max-w-5xl mx-auto flex flex-col"
      >
        {finalOriginal === "" && interimOriginal === "" ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Visualizer */}
            <div className="relative w-full max-w-sm h-32 flex items-center justify-center mb-8">
              <div className={`absolute inset-0 bg-blue-500/5 rounded-full blur-2xl transition-all duration-1000 ${isRecording ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`}></div>
              
              <div className="flex items-center justify-center gap-1.5 h-16">
                {[...Array(9)].map((_, i) => {
                  const heights = [24, 48, 32, 64, 20, 56, 36, 44, 28]
                  const durations = [0.8, 1.2, 0.9, 1.4, 0.7, 1.1, 0.85, 1.3, 0.95]
                  
                  return (
                    <div 
                      key={i} 
                      className={`w-1.5 rounded-full bg-blue-600 transition-all duration-300 ${isRecording ? 'animate-pulse' : 'h-1.5 opacity-20'}`}
                      style={{ 
                        height: isRecording ? `${heights[i]}px` : '6px',
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${durations[i]}s`
                      }}
                    ></div>
                  )
                })}
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-4">
              {isRecording ? t("trans.translating") : t("trans.title")}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-md">
              {isRecording 
                ? "..."
                : t("trans.desc")}
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-end min-h-full">
            <div 
              className="max-w-4xl bg-white/40 dark:bg-slate-800/40 p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-sm border border-white/60 dark:border-slate-700/50"
              aria-live="polite"
              role="region"
              aria-label="Teks Terjemah"
            >
              
              {/* Original Line (Subtle) */}
              <div className="text-xl md:text-2xl text-slate-400 dark:text-slate-500 font-medium leading-relaxed mb-4">
                <span className="transition-colors duration-500">{finalOriginal}</span>
                <span className="text-slate-300 dark:text-slate-600 transition-colors duration-200">{interimOriginal}</span>
              </div>
              
              {/* Translated Line (Bold, Primary) */}
              <div className="text-[32px] md:text-[44px] font-bold leading-[1.4] tracking-[-0.03em]">
                <span className="text-slate-900 dark:text-white transition-colors duration-500">{finalTranslated}</span>
                <span className="text-indigo-600/70 dark:text-indigo-400/70 transition-colors duration-200">{interimTranslated}</span>
                {isRecording && interimOriginal === "" && (
                  <span className="inline-block w-3 h-8 bg-blue-500 animate-pulse ml-2 align-middle rounded-sm" aria-hidden="true"></span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions: Mic & Text Input */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95%] md:max-w-2xl flex flex-col items-center gap-6">
        
        {/* Floating Microphone Action */}
        <div className="relative group">
          <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
            isRecording 
              ? "bg-blue-500 blur-[30px] opacity-60 scale-[2.5] animate-pulse" 
              : "bg-blue-600 blur-xl opacity-30 scale-125 group-hover:scale-150 group-hover:opacity-40"
          }`}></div>
          
          <button
            onClick={toggleRecording}
            aria-label={isRecording ? "Berhenti menerjemahkan" : "Mulai menerjemahkan"}
            className={`relative flex items-center justify-center transition-all duration-500 ease-out transform group-hover:scale-[1.05] active:scale-95 ${
              isRecording 
                ? "w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-slate-800 shadow-[0_10px_40px_rgba(37,99,235,0.3)] rounded-[2.5rem] border border-blue-100 dark:border-blue-500/30" 
                : "w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-600 to-blue-700 shadow-[0_10px_30px_rgba(37,99,235,0.4)] rounded-full border border-blue-400/30"
            }`}
          >
            {isRecording ? (
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-500/20 rounded-xl animate-ping opacity-50 scale-150"></div>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-xl bg-blue-600 dark:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
              </div>
            ) : (
              <Mic className="w-6 h-6 md:w-8 md:h-8 text-white stroke-[2.5px]" />
            )}
          </button>
        </div>

        {/* Text Input */}
        <form 
          onSubmit={handleManualTranslate}
          className="w-full flex items-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-full p-1.5 transition-all focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={"Ketik teks untuk diterjemahkan..."}
            className="flex-1 bg-transparent px-4 md:px-6 py-2 md:py-3 outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium text-sm md:text-base"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-11 h-11 md:w-12 md:h-12 shrink-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 text-white rounded-full transition-colors shadow-sm"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
          </button>
        </form>
      </div>

    </div>
  )
}
