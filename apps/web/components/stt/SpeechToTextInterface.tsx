"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, Square, Copy, Save, Trash2, Globe2 } from "lucide-react"
import { useUiStore } from "@/store/uiStore"
import { LanguageSelector } from "@/components/ui/LanguageSelector"

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function SpeechToTextInterface() {
  const { triggerFlash } = useUiStore()
  
  const [isRecording, setIsRecording] = useState(false)
  const [finalTranscript, setFinalTranscript] = useState("")
  const [interimTranscript, setInterimTranscript] = useState("")
  const [language, setLanguage] = useState("id-ID")
  
  const recognitionRef = useRef<any>(null)
  const transcriptAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
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
            setFinalTranscript(prev => prev + final)
          }
          setInterimTranscript(interim)
        }
        
        recognitionRef.current.onerror = (event: any) => {
          if (event.error !== "no-speech") {
            triggerFlash("error", "Koneksi mikrofon terputus")
            setIsRecording(false)
          }
        }
        
        recognitionRef.current.onend = () => {
          if (isRecording) {
            try {
              recognitionRef.current.start()
            } catch(e) {}
          }
        }
      }
    }
  }, [triggerFlash])

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language
      if (isRecording) {
        recognitionRef.current.stop()
        setTimeout(() => {
          try { recognitionRef.current.start() } catch(e) {}
        }, 100)
      }
    }
  }, [language, isRecording])

  useEffect(() => {
    if (transcriptAreaRef.current) {
      transcriptAreaRef.current.scrollTop = transcriptAreaRef.current.scrollHeight
    }
  }, [finalTranscript, interimTranscript])

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      triggerFlash("error", "Browser tidak didukung")
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      try {
        setInterimTranscript("")
        recognitionRef.current.start()
        setIsRecording(true)
      } catch (e) {}
    }
  }

  const handleCopy = () => {
    const textToCopy = (finalTranscript + interimTranscript).trim()
    if (!textToCopy) return
    navigator.clipboard.writeText(textToCopy).then(() => {
      triggerFlash("success", "Disalin!")
    })
  }

  const handleClear = () => {
    setFinalTranscript("")
    setInterimTranscript("")
    triggerFlash("success", "Dihapus")
  }

  const handleSave = () => {
    if (!finalTranscript.trim()) return
    triggerFlash("success", "Tersimpan")
  }

  return (
    <div className="flex flex-col h-full relative overflow-hidden font-sans">
      
      {/* STT Active Recording Orbs Overlay */}
      <div className={`absolute inset-0 pointer-events-none overflow-hidden mix-blend-multiply transition-opacity duration-1000 ${isRecording ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full blur-[120px] bg-blue-400/40 scale-110"></div>
        <div className="absolute top-[40%] -right-[20%] w-[600px] h-[600px] rounded-full blur-[100px] bg-cyan-400/30 scale-125"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[700px] h-[700px] rounded-full blur-[100px] bg-indigo-400/20 scale-110"></div>
      </div>

      {/* Floating Toolbar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-md">
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-3 py-2">
          
          <div className="flex items-center group">
            <Globe2 className="w-4 h-4 text-blue-600 mr-2" />
            <LanguageSelector 
              value={language} 
              onChange={setLanguage} 
              align="left"
            />
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={handleCopy}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
              title="Salin"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button 
              onClick={handleClear}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Hapus"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSave}
              className="h-10 px-5 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] ml-2"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        ref={transcriptAreaRef}
        className="flex-1 overflow-y-auto px-6 md:px-16 pt-32 pb-48 relative z-10 scroll-smooth w-full max-w-5xl mx-auto flex flex-col"
      >
        {finalTranscript === "" && interimTranscript === "" ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Visualizer Mockup */}
            <div className="relative w-full max-w-sm h-32 flex items-center justify-center mb-8">
              <div className={`absolute inset-0 bg-blue-500/5 rounded-full blur-2xl transition-all duration-1000 ${isRecording ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`}></div>
              
              <div className="flex items-center justify-center gap-1.5 h-16">
                {[...Array(9)].map((_, i) => {
                  // Deterministic values to prevent React hydration mismatch
                  const heights = [24, 48, 32, 64, 20, 56, 36, 44, 28]
                  const durations = [0.8, 1.2, 0.9, 1.4, 0.7, 1.1, 0.85, 1.3, 0.95]
                  
                  return (
                    <div 
                      key={i} 
                      className={`w-1.5 rounded-full bg-blue-600 transition-all duration-300 ${
                        isRecording 
                          ? 'animate-pulse' 
                          : 'h-1.5 opacity-20'
                      }`}
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

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 mb-4">
              {isRecording ? "Mendengarkan..." : "Siap Mendengar."}
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-md">
              {isRecording 
                ? "Silakan berbicara. Suara Anda sedang diterjemahkan ke teks." 
                : "Tekan tombol mikrofon di bawah untuk memulai percakapan."}
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-end min-h-full">
            <div className="text-[32px] md:text-[44px] font-medium leading-[1.4] tracking-[-0.03em] max-w-4xl bg-white/40 p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-sm border border-white/60">
              <span className="text-slate-900 transition-colors duration-500 ease-out">{finalTranscript}</span>
              <span className="text-slate-400 transition-colors duration-200">{interimTranscript}</span>
              {isRecording && interimTranscript === "" && (
                <span className="inline-block w-3 h-8 bg-blue-500 animate-pulse ml-2 align-middle rounded-sm"></span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Microphone Action */}
      <div className="absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        
        <div className="relative group">
          {/* Majestic Glow */}
          <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
            isRecording 
              ? "bg-blue-500 blur-[30px] opacity-60 scale-[2.5] animate-pulse" 
              : "bg-blue-600 blur-xl opacity-30 scale-125 group-hover:scale-150 group-hover:opacity-40"
          }`}></div>
          
          <button
            onClick={toggleRecording}
            className={`relative flex items-center justify-center transition-all duration-500 ease-out transform group-hover:scale-[1.05] active:scale-95 ${
              isRecording 
                ? "w-24 h-24 bg-white shadow-[0_10px_40px_rgba(37,99,235,0.3)] rounded-[2.5rem] border border-blue-100" 
                : "w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 shadow-[0_10px_30px_rgba(37,99,235,0.4)] rounded-full border border-blue-400/30"
            }`}
          >
            {isRecording ? (
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-100 rounded-xl animate-ping opacity-50 scale-150"></div>
                <div className="w-8 h-8 rounded-xl bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
              </div>
            ) : (
              <Mic className="w-8 h-8 text-white stroke-[2.5px]" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
