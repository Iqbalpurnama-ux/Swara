"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Mic, CheckCircle2, ArrowRight, Settings2, Sparkles, Loader2, X } from "lucide-react"

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1) // 1: Welcome/Prefs, 2: Mic Perm
  const { setTheme } = useTheme()
  const [themePref, setThemePref] = useState("sistem")
  const [langPref, setLangPref] = useState("id-ID")
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    // Check if onboarding was already completed
    const completed = localStorage.getItem("swara_onboarding_completed")
    if (!completed) {
      setIsOpen(true)
    }
  }, [])

  const handleComplete = () => {
    localStorage.setItem("swara_onboarding_completed", "true")
    setIsOpen(false)
  }

  const handleNextStep = () => {
    // Save preferences
    const existingSettings = JSON.parse(localStorage.getItem("swara_settings") || "{}")
    localStorage.setItem("swara_settings", JSON.stringify({
      ...existingSettings,
      theme: themePref,
      mainLanguage: langPref
    }))
    
    // Apply theme
    if (themePref === "terang") setTheme("light")
    else if (themePref === "gelap") setTheme("dark")
    else setTheme("system")

    setStep(2)
  }

  const requestMicPermission = async () => {
    setIsRequesting(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      // Permission granted, stop tracks immediately since we just wanted permission
      stream.getTracks().forEach(track => track.stop())
      handleComplete()
    } catch (err) {
      console.error("Mic permission denied", err)
      // Even if denied, we complete onboarding, but they won't be able to use STT
      handleComplete()
    }
    setIsRequesting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-lg shadow-2xl shadow-blue-900/20 overflow-hidden relative animate-in zoom-in-95 duration-500">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-800 flex">
          <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }}></div>
        </div>

        {/* Skip button if they just want to skip */}
        <button 
          onClick={handleComplete}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          
          {step === 1 && (
            <div className="flex flex-col animate-in slide-in-from-right-4 duration-500">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
                <Settings2 className="w-8 h-8" />
              </div>
              
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Selamat Datang!</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">Mari atur preferensi dasar Anda sebelum mulai menggunakan Swara.</p>

              <div className="space-y-6">
                {/* Language Select */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Bahasa Utama Anda</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setLangPref("id-ID")}
                      className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2 ${langPref === "id-ID" ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-sm' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'}`}
                    >
                      {langPref === "id-ID" ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4" />}
                      🇮🇩 Indonesia
                    </button>
                    <button 
                      onClick={() => setLangPref("en-US")}
                      className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2 ${langPref === "en-US" ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-sm' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'}`}
                    >
                      {langPref === "en-US" ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4" />}
                      🇺🇸 English
                    </button>
                  </div>
                </div>

                {/* Theme Select */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Tema Tampilan</label>
                  <div className="grid grid-cols-3 gap-3 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl">
                    <button 
                      onClick={() => setThemePref("terang")}
                      className={`rounded-xl py-2.5 font-bold text-sm transition-all ${themePref === "terang" ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                    >Terang</button>
                    <button 
                      onClick={() => setThemePref("gelap")}
                      className={`rounded-xl py-2.5 font-bold text-sm transition-all ${themePref === "gelap" ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                    >Gelap</button>
                    <button 
                      onClick={() => setThemePref("sistem")}
                      className={`rounded-xl py-2.5 font-bold text-sm transition-all ${themePref === "sistem" ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                    >Sistem</button>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleNextStep}
                className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Lanjutkan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col animate-in slide-in-from-right-4 duration-500">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 shadow-sm relative">
                <Mic className="w-8 h-8 relative z-10" />
                <div className="absolute inset-0 bg-orange-200 dark:bg-orange-800 rounded-2xl animate-ping opacity-20"></div>
              </div>
              
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Izin Mikrofon</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed">
                Swara membutuhkan akses ke mikrofon Anda untuk dapat mengubah suara menjadi teks secara langsung.
              </p>

              <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-4 mb-8">
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    Kami <span className="font-bold">tidak pernah</span> merekam atau menyimpan data audio Anda di server mana pun. Semua diproses langsung di perangkat Anda.
                  </p>
                </div>
              </div>

              <button 
                onClick={requestMicPermission}
                disabled={isRequesting}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-70"
              >
                {isRequesting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Meminta Izin...</>
                ) : (
                  <>Izinkan Akses Mikrofon <CheckCircle2 className="w-4 h-4" /></>
                )}
              </button>
              
              <button 
                onClick={handleComplete}
                className="w-full mt-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold py-3 rounded-xl transition-colors text-sm"
              >
                Nanti Saja
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
