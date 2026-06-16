"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check, Volume2 } from "lucide-react"
import { VOICES, Voice } from "@/constants/voices"

interface VoiceSelectorProps {
  languageCode: string
  value: string // voice name
  onChange: (voiceName: string) => void
  align?: "left" | "right" | "center"
  direction?: "down" | "up"
}

export function VoiceSelector({ languageCode, value, onChange, align = "center", direction = "down" }: VoiceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const availableVoices = VOICES.filter(v => v.lang === languageCode)
  const selectedVoice = availableVoices.find(v => v.name === value) || availableVoices[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Auto-select first voice if current selected voice is not available in the language
  useEffect(() => {
    if (availableVoices.length > 0 && !availableVoices.find(v => v.name === value)) {
      onChange(availableVoices[0].name)
    }
  }, [languageCode, value, availableVoices, onChange])

  let dropdownClasses = `absolute ${direction === "up" ? "bottom-full mb-2" : "top-full mt-2"} w-56 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden z-[100] py-1 transition-all duration-200`
  if (align === "left") dropdownClasses += " left-0"
  else if (align === "right") dropdownClasses += " right-0"
  else dropdownClasses += " left-1/2 -translate-x-1/2"

  if (availableVoices.length === 0) return null

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 px-3 md:px-5 py-2 bg-indigo-50/80 dark:bg-indigo-900/30 hover:bg-indigo-100/80 dark:hover:bg-indigo-800/40 rounded-full transition-all border border-indigo-200 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-300 font-bold text-xs md:text-sm active:scale-95"
      >
        <Volume2 className="w-3.5 h-3.5" />
        {selectedVoice?.label || "Pilih Suara"}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={dropdownClasses}>
          <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
            {availableVoices.map((voice) => {
              const isSelected = voice.name === value
              return (
                <button
                  key={voice.name}
                  onClick={() => {
                    onChange(voice.name)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold flex items-center justify-between transition-colors ${
                    isSelected 
                      ? "bg-indigo-50 dark:bg-slate-700/50 text-indigo-700 dark:text-indigo-400" 
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {voice.label}
                  {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
