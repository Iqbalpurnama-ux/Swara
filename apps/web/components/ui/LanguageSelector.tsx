"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

export const LANGUAGES = [
  { value: "id-ID", label: "Indonesia" },
  { value: "en-US", label: "English" },
  { value: "ar-SA", label: "Arabic" },
  { value: "zh-CN", label: "Chinese" },
  { value: "ja-JP", label: "Japanese" },
  { value: "ko-KR", label: "Korean" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "es-ES", label: "Spanish" },
  { value: "ms-MY", label: "Malay" }
]

interface LanguageSelectorProps {
  value: string
  onChange: (value: string) => void
  align?: "left" | "right" | "center"
}

export function LanguageSelector({ value, onChange, align = "center" }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedLanguage = LANGUAGES.find(lang => lang.value === value) || LANGUAGES[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  let dropdownClasses = "absolute top-full mt-2 w-48 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden z-[100] py-1 transition-all duration-200"
  if (align === "left") dropdownClasses += " left-0"
  else if (align === "right") dropdownClasses += " right-0"
  else dropdownClasses += " left-1/2 -translate-x-1/2"

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 px-3 md:px-5 py-2 bg-slate-50/80 hover:bg-blue-50/80 rounded-full transition-all border border-slate-200 text-slate-700 font-bold text-xs md:text-sm hover:border-blue-200 hover:text-blue-700 active:scale-95"
      >
        {selectedLanguage.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={dropdownClasses}>
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.value === value
              return (
                <button
                  key={lang.value}
                  onClick={() => {
                    onChange(lang.value)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold flex items-center justify-between transition-colors ${
                    isSelected 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {lang.label}
                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
