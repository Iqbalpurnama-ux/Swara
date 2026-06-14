"use client"

import { useState, useEffect } from "react"
import { Plus, X, GripVertical, MessageSquare } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const DEFAULT_PHRASES = ["Ya", "Tidak", "Terima kasih", "Bisa diulang?", "Tolong", "Maaf"]
const STORAGE_KEY = "swara_quick_phrases"
const MAX_PHRASES = 20

export function useQuickPhrases() {
  const [phrases, setPhrases] = useState<string[]>(DEFAULT_PHRASES)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhrases(parsed)
        }
      } catch (e) {
        // ignore parse errors
      }
    }
  }, [])

  const savePhrases = (newPhrases: string[]) => {
    setPhrases(newPhrases)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPhrases))
  }

  const addPhrase = (phrase: string) => {
    if (!phrase.trim() || phrases.length >= MAX_PHRASES) return false
    if (phrases.includes(phrase.trim())) return false
    savePhrases([...phrases, phrase.trim()])
    return true
  }

  const removePhrase = (index: number) => {
    const newPhrases = phrases.filter((_, i) => i !== index)
    savePhrases(newPhrases)
  }

  const reorderPhrases = (fromIndex: number, toIndex: number) => {
    const newPhrases = [...phrases]
    const [moved] = newPhrases.splice(fromIndex, 1)
    newPhrases.splice(toIndex, 0, moved)
    savePhrases(newPhrases)
  }

  const resetToDefault = () => {
    savePhrases(DEFAULT_PHRASES)
  }

  return { phrases, addPhrase, removePhrase, reorderPhrases, resetToDefault, maxPhrases: MAX_PHRASES }
}

interface QuickPhraseManagerProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuickPhraseManager({ isOpen, onClose }: QuickPhraseManagerProps) {
  const { t } = useTranslation()
  const { phrases, addPhrase, removePhrase, resetToDefault, maxPhrases } = useQuickPhrases()
  const [newPhrase, setNewPhrase] = useState("")
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  if (!isOpen) return null

  const handleAdd = () => {
    if (addPhrase(newPhrase)) {
      setNewPhrase("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-t-[2rem] md:rounded-[2rem] shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t("phrase.title")}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{phrases.length}/{maxPhrases}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add New Phrase */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex gap-2">
            <input
              value={newPhrase}
              onChange={(e) => setNewPhrase(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("conv.new_phrase")}
              maxLength={50}
              className="flex-1 h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm font-medium text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
            />
            <button
              onClick={handleAdd}
              disabled={!newPhrase.trim() || phrases.length >= maxPhrases}
              className="h-11 px-5 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-bold text-sm hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t("phrase.add")}
            </button>
          </div>
          {phrases.length >= maxPhrases && (
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-2">{t("phrase.max")} {maxPhrases} {t("phrase.reached")}</p>
          )}
        </div>

        {/* Phrases List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-2">
            {phrases.map((phrase, index) => (
              <div
                key={`${phrase}-${index}`}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragIndex !== null && dragIndex !== index) {
                    const newPhrases = [...phrases]
                    const [moved] = newPhrases.splice(dragIndex, 1)
                    newPhrases.splice(index, 0, moved)
                    // Save via localStorage directly since we can't call hook methods here
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPhrases))
                    window.location.reload() // simple refresh to reflect changes
                  }
                  setDragIndex(null)
                }}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing ${
                  dragIndex === index
                    ? "border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30 scale-[1.02] shadow-lg"
                    : "border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-sm"
                }`}
              >
                <GripVertical className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-500 shrink-0" />
                <span className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{phrase}</span>
                <button
                  onClick={() => removePhrase(index)}
                  className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={resetToDefault}
            className="w-full py-3 rounded-xl font-bold text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {t("phrase.reset")}
          </button>
        </div>
      </div>
    </div>
  )
}
