"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Mic, Maximize, Minimize, Plus, Minus, Eye, X } from "lucide-react"
import { useUiStore } from "@/store/uiStore"
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition"

export default function LiveCaptionMode() {
  const { addNotification } = useUiStore()
  const [isActive, setIsActive] = useState(false)
  const [fontSize, setFontSize] = useState(36)
  const [highContrast, setHighContrast] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  
  const {
    isRecording,
    setIsRecording,
    finalTranscript: transcript,
    interimTranscript: interimText,
    setFinalTranscript: setTranscript,
    language,
    setLanguage,
    startRecording,
    stopRecording,
    clearTranscript,
    recognitionRef
  } = useSpeechRecognition()

  const containerRef = useRef<HTMLDivElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isRecordingRef = useRef(false)

  useEffect(() => { isRecordingRef.current = isRecording }, [isRecording])

  const resetControlsTimer = useCallback(() => {
    setShowControls(true)
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    controlsTimerRef.current = setTimeout(() => {
      if (isRecordingRef.current) setShowControls(false)
    }, 3000)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [transcript, interimText])

  // Fullscreen API
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }, [])

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  const startCaption = () => {
    setIsActive(true)
    // The hook handles starting if isRecording is set, or we can explicitly start
    setTimeout(() => {
      startRecording()
    }, 200)
    resetControlsTimer()
  }

  const stopCaption = () => {
    stopRecording()
    setShowControls(true)
  }

  const exitCaptionMode = () => {
    stopRecording()
    setIsActive(false)
    clearTranscript()
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
  }

  const changeFontSize = (delta: number) => {
    setFontSize(prev => Math.min(Math.max(prev + delta, 24), 64))
    resetControlsTimer()
  }

  // Keyboard Shortcuts
  useEffect(() => {
    if (!isActive) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return

      if (e.code === "Space") {
        e.preventDefault()
        if (isRecording) stopCaption()
        else { setIsRecording(true); setTimeout(() => { try { recognitionRef.current?.start() } catch(e){} }, 100) }
      } else if (e.code === "KeyF") {
        e.preventDefault()
        toggleFullscreen()
      } else if (e.code === "Escape") {
        e.preventDefault()
        exitCaptionMode()
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isActive, isRecording, toggleFullscreen])

  if (!isActive) {
    return (
      <button
        onClick={startCaption}
        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-95 transition-all shadow-lg"
      >
        <Maximize className="w-4 h-4" />
        Live Caption
      </button>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 flex flex-col select-none transition-colors duration-300 ${
        highContrast 
          ? "bg-black" 
          : "bg-slate-50 dark:bg-[#0F172A]"
      }`}
      style={{ zIndex: 9999 }}
      onMouseMove={resetControlsTimer}
      onTouchStart={resetControlsTimer}
    >
      {/* Caption Text Area */}
      <div 
        ref={transcriptRef}
        className="flex-1 overflow-y-auto flex flex-col justify-end px-8 md:px-16 py-12"
        aria-live="polite"
        role="region"
        aria-label="Teks Live Caption"
      >
        {!transcript ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-2 rounded-full bg-blue-500 animate-pulse"
                    style={{ 
                      height: `${20 + i * 10}px`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '1s'
                    }}
                  ></div>
                ))}
              </div>
              <p className={`text-2xl font-medium ${highContrast ? "text-white/40" : "text-slate-400 dark:text-white/40"}`}>
                {isRecording ? 'Mendengarkan...' : 'Dijeda'}
              </p>
              <p className={`text-base mt-2 ${highContrast ? "text-white/20" : "text-slate-300 dark:text-white/20"}`}>
                {isRecording ? 'Suara akan muncul sebagai teks di sini' : 'Tekan tombol di bawah untuk melanjutkan'}
              </p>
            </div>
          </div>
        ) : (
          <p 
            className={`font-medium leading-[1.5] tracking-tight max-w-full ${highContrast ? "text-white" : "text-slate-900 dark:text-white"}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {transcript}
            {isRecording && <span className="inline-block w-1 bg-blue-500 animate-pulse ml-1 align-baseline" style={{ height: `${fontSize * 0.8}px` }}></span>}
          </p>
        )}
      </div>

      {/* Controls Overlay */}
      <div 
        className="absolute inset-x-0"
        style={{ 
          opacity: showControls ? 1 : 0, 
          transform: showControls ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.5s',
          pointerEvents: showControls ? 'auto' : 'none'
        }}
      >
        {/* Top Controls */}
        <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{ 
                backgroundColor: isRecording ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.1)',
                color: isRecording ? '#F87171' : 'rgba(255,255,255,0.6)'
              }}
            >
              <div 
                className={`w-2 h-2 rounded-full ${isRecording ? 'animate-pulse' : ''}`}
                style={{ backgroundColor: isRecording ? '#EF4444' : 'rgba(255,255,255,0.4)' }}
              ></div>
              {isRecording ? 'LIVE' : 'PAUSED'}
            </div>
            
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`text-sm font-bold rounded-full px-4 py-2 outline-none cursor-pointer transition-colors ${
                highContrast 
                  ? "bg-white/10 text-white/80 border border-white/10" 
                  : "bg-slate-200/50 dark:bg-white/10 text-slate-700 dark:text-white/80 border border-slate-300/50 dark:border-white/10"
              }`}
            >
              <option value="id-ID" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">🇮🇩 Indonesia</option>
              <option value="en-US" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">🇺🇸 English</option>
              <option value="ar-SA" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">🇸🇦 Arabic</option>
              <option value="zh-CN" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">🇨🇳 Chinese</option>
              <option value="ja-JP" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">🇯🇵 Japanese</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full px-1 py-1" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <button onClick={() => changeFontSize(-4)} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }} aria-label="Perkecil teks">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold min-w-[36px] text-center" style={{ color: 'rgba(255,255,255,0.6)' }} aria-label={`Ukuran teks ${fontSize} piksel`}>{fontSize}px</span>
              <button onClick={() => changeFontSize(4)} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }} aria-label="Perbesar teks">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={() => setHighContrast(!highContrast)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ 
                backgroundColor: highContrast ? 'white' : 'rgba(255,255,255,0.1)',
                color: highContrast ? 'black' : 'rgba(255,255,255,0.7)'
              }}
              title="High Contrast"
              aria-label="Mode Kontras Tinggi"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button onClick={toggleFullscreen} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }} aria-label={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}>
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            <button onClick={exitCaptionMode} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }} aria-label="Tutup Live Caption">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Stop Button */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center">
          <button
            onClick={isRecording ? stopCaption : () => { setIsRecording(true); setTimeout(() => { try { recognitionRef.current?.start() } catch(e){} }, 100) }}
            className="flex items-center gap-3 px-8 py-5 rounded-full font-bold text-lg transition-all active:scale-95"
            aria-label={isRecording ? "Jeda Live Caption" : "Mulai Live Caption"}
            style={{
              backgroundColor: isRecording ? '#EF4444' : '#2563EB',
              color: 'white',
              boxShadow: isRecording ? '0 0 40px rgba(239,68,68,0.3)' : '0 0 40px rgba(37,99,235,0.3)'
            }}
          >
            {isRecording ? (
              <>
                <div className="w-5 h-5 rounded-md bg-white"></div>
                Berhenti
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                Mulai Lagi
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
