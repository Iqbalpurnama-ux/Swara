"use client"

import { useEffect, useState } from "react"
import { useUiStore } from "@/store/uiStore"
import { Check, AlertCircle, AlertTriangle, Info, X } from "lucide-react"

export function VisualFlash() {
  const { flashType, flashMessage, notifications, removeNotification, reducedMotion, notificationDuration } = useUiStore()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (flashType) {
      setIsVisible(true)
    } else {
      // Small delay before hiding to allow exit animation
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [flashType])

  const getFlashConfig = (type: typeof flashType) => {
    switch (type) {
      case "success":
        return { Icon: Check, bg: "bg-emerald-500", lightBg: "bg-emerald-50 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", glow: "from-emerald-500/15", border: "border-emerald-200 dark:border-emerald-800" }
      case "error":
        return { Icon: AlertCircle, bg: "bg-red-500", lightBg: "bg-red-50 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400", glow: "from-red-500/15", border: "border-red-200 dark:border-red-800" }
      case "warning":
        return { Icon: AlertTriangle, bg: "bg-amber-500", lightBg: "bg-amber-50 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", glow: "from-amber-500/15", border: "border-amber-200 dark:border-amber-800" }
      case "info":
        return { Icon: Info, bg: "bg-blue-500", lightBg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", glow: "from-blue-500/15", border: "border-blue-200 dark:border-blue-800" }
      default:
        return { Icon: Check, bg: "bg-slate-500", lightBg: "bg-slate-50 dark:bg-slate-800", text: "text-slate-600 dark:text-slate-400", glow: "from-slate-500/15", border: "border-slate-200 dark:border-slate-700" }
    }
  }

  return (
    <>
      {/* Full-Screen Flash Overlay (for major events) */}
      {isVisible && flashType && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
          {/* Screen Glow */}
          <div 
            className={`absolute inset-0 bg-gradient-to-b ${getFlashConfig(flashType).glow} to-transparent`}
            style={{ 
              animation: reducedMotion ? 'none' : `fadeInOut ${notificationDuration}ms ease-in-out forwards`
            }}
          />

          {/* Center Popup */}
          <div className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl border ${getFlashConfig(flashType).border} shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[2rem] px-10 py-8 flex flex-col items-center min-w-[240px] relative overflow-hidden ${
            reducedMotion ? '' : 'animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]'
          }`}>
            {/* Internal Glow */}
            <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-20 ${getFlashConfig(flashType).bg}`}></div>

            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 relative z-10 ${getFlashConfig(flashType).lightBg}`}>
              {(() => {
                const { Icon } = getFlashConfig(flashType)
                return <Icon className={`w-10 h-10 ${getFlashConfig(flashType).text}`} strokeWidth={2.5} />
              })()}
            </div>
            
            {flashMessage && (
              <p className="text-center font-extrabold text-2xl tracking-tight text-slate-800 dark:text-white relative z-10">
                {flashMessage}
              </p>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-700 overflow-hidden rounded-b-[2rem]">
              <div className={`h-full ${getFlashConfig(flashType).bg}`}
              style={{ 
                width: reducedMotion ? '0' : '100%',
                animation: reducedMotion ? 'none' : `shrink ${notificationDuration}ms linear forwards`
              }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Stack (top-right corner) */}
      <div className="fixed top-6 right-6 z-[99] flex flex-col gap-3 pointer-events-none">
        {notifications.map((notif) => {
          const config = getFlashConfig(notif.type)
          const { Icon } = config
          return (
            <div
              key={notif.id}
              className={`pointer-events-auto flex items-center gap-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border ${config.border} shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] rounded-2xl px-5 py-4 min-w-[280px] max-w-[400px] relative overflow-hidden ${
                reducedMotion ? '' : 'animate-[slideInRight_0.3s_ease-out]'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${config.lightBg}`}>
                <Icon className={`w-5 h-5 ${config.text}`} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-sm text-slate-800 dark:text-white flex-1">{notif.message}</span>
              <button
                onClick={() => removeNotification(notif.id)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Toast progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-700">
                <div className={`h-full ${config.bg}`}
                style={{ 
                  width: reducedMotion ? '0' : '100%',
                  animation: reducedMotion ? 'none' : `shrink ${notificationDuration}ms linear forwards`
                }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
