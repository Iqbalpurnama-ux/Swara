"use client"

import { useUiStore } from "@/store/uiStore"
import { Check, AlertCircle } from "lucide-react"

export function VisualFlash() {
  const { flashType, flashMessage } = useUiStore()

  if (!flashType) return null

  let Icon = null
  let themeColor = ""

  if (flashType === "success") {
    themeColor = "green"
    Icon = Check
  } else if (flashType === "error") {
    themeColor = "red"
    Icon = AlertCircle
  } else if (flashType === "warning") {
    themeColor = "yellow"
    Icon = AlertCircle
  }

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {/* Subtle Screen Glow Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 animate-in fade-in opacity-0 fill-mode-forwards ${
          flashType === "success" 
            ? "bg-gradient-to-b from-green-500/10 to-transparent" 
            : "bg-gradient-to-b from-red-500/10 to-transparent"
        }`} 
      />

      {/* Floating Glass Popup */}
      {Icon && (
        <div className="bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] px-10 py-8 flex flex-col items-center min-w-[240px] animate-in zoom-in-75 fade-in slide-in-from-bottom-8 duration-300 fill-mode-forwards relative overflow-hidden">
          
          {/* Internal Glow */}
          <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-30 ${
            flashType === "success" ? "bg-green-400" : "bg-red-400"
          }`}></div>

          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 relative z-10 ${
            flashType === "success" ? "bg-green-100" : "bg-red-100"
          }`}>
            <Icon className={`w-10 h-10 ${
              flashType === "success" ? "text-green-500" : "text-red-500"
            }`} strokeWidth={3} />
          </div>
          
          {flashMessage && (
            <p className="text-center font-extrabold text-2xl tracking-tight text-slate-800 relative z-10">
              {flashMessage}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
