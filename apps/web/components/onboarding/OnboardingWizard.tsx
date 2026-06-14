"use client"

import { useState } from "react"
import { Mic, MoveLeft, MoveRight, MousePointerClick, Globe2, CheckCircle2 } from "lucide-react"
import Image from "next/image"

import { completeOnboardingAction } from "@/app/onboarding/actions"
import { useSession } from "next-auth/react"

export function OnboardingWizard() {
  const { update } = useSession()
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const [language, setLanguage] = useState("id-ID")
  const [isPending, setIsPending] = useState(false)

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps))
  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleFinish = async () => {
    setIsPending(true)
    try {
      const res = await completeOnboardingAction(language)
      if (res.success) {
        await update({ onboardingCompleted: true })
        window.location.href = "/dashboard"
      } else {
        alert("Server Error: " + res.error)
        setIsPending(false)
      }
    } catch (e) {
      console.error(e)
      alert("Unexpected Error: " + String(e))
      setIsPending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-[500px] overflow-hidden flex flex-col relative z-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-slate-800">
        
        {/* Step Indicator */}
        <div className="flex justify-center gap-2 p-8 bg-white dark:bg-slate-900 border-b border-gray-50 dark:border-slate-800">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i + 1 === step ? "w-10 bg-blue-600" : i + 1 < step ? "w-6 bg-blue-200" : "w-6 bg-gray-100"}`}
            />
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-10 min-h-[350px]">
          {step === 1 && (
            <div className="animate-in fade-in zoom-in duration-500 text-center flex flex-col items-center justify-center h-full">
              <div className="mb-8 drop-shadow-md">
                <Image src="/logo.png" alt="Swara Logo" width={64} height={64} className="rounded-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Selamat Datang di Swara</h1>
              <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
                Platform aksesibilitas untuk komunikasi tanpa batas melalui fitur <span className="font-semibold text-blue-600 dark:text-blue-400">Speech-to-Text</span> dan <span className="font-semibold text-sky-600 dark:text-sky-400">Text-to-Speech</span>.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-center">
              <div className="w-20 h-20 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mic className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Akses Mikrofon</h2>
              <p className="text-gray-500 dark:text-slate-400 font-medium mb-8">
                Kami membutuhkan akses mikrofon Anda untuk:
              </p>
              <ul className="text-left space-y-4 bg-gray-50/50 dark:bg-slate-800/50 p-6 rounded-2xl text-gray-700 dark:text-slate-300 border border-gray-100 dark:border-slate-700 font-medium">
                <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Mengubah suara menjadi teks</li>
                <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Proses transkripsi real-time</li>
                <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Mendukung fitur aksesibilitas penuh</li>
              </ul>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-8 text-center">Gesture Assistant</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-5 p-5 border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm transition-all hover:border-blue-200 dark:hover:border-blue-800">
                  <div className="bg-blue-50 dark:bg-slate-800 p-3 rounded-xl"><MoveLeft className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-[15px]">Swipe Kiri</h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">Hapus Transkrip</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm transition-all hover:border-blue-200 dark:hover:border-blue-800">
                  <div className="bg-blue-50 dark:bg-slate-800 p-3 rounded-xl"><MoveRight className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-[15px]">Swipe Kanan</h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">Simpan Transkrip</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm transition-all hover:border-blue-200 dark:hover:border-blue-800">
                  <div className="bg-blue-50 dark:bg-slate-800 p-3 rounded-xl"><MousePointerClick className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-[15px]">Double Tap</h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">Mulai Rekam</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-center">
              <div className="w-20 h-20 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Bahasa Utama</h2>
              <p className="text-gray-500 dark:text-slate-400 font-medium mb-8">Pilih bahasa yang paling sering Anda gunakan.</p>
              
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Pilih bahasa default Anda"
                className="w-full h-14 px-5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 text-[15px] text-gray-900 dark:text-white font-semibold outline-none appearance-none transition-all cursor-pointer shadow-sm"
              >
                <option value="id-ID">🇮🇩 Bahasa Indonesia</option>
                <option value="en-US">🇬🇧 English (US)</option>
                <option value="ms-MY">🇲🇾 Malay</option>
                <option value="ja-JP">🇯🇵 Japanese</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-8 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="h-12 px-6 rounded-xl font-semibold text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-800 disabled:opacity-0 transition-all text-[15px]"
          >
            Kembali
          </button>
          
          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="h-12 px-8 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 text-[15px]"
            >
              Selanjutnya
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={isPending}
              className="h-12 px-8 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 disabled:opacity-50 text-[15px]"
            >
              {isPending ? "Menyimpan..." : "Selesai"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
