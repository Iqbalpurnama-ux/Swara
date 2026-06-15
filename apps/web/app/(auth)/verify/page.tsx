"use client"

import { Mail, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function VerifyPage() {
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session")
        const session = await res.json()
        
        if (session && Object.keys(session).length > 0 && session.user) {
          setIsSuccess(true)
          clearInterval(interval)
          
          // Show success state briefly before redirecting
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        }
      } catch (error) {
        console.error("Failed to check session", error)
      }
    }

    // Poll every 2 seconds
    interval = setInterval(checkSession, 2000)
    
    // Check immediately on mount too
    checkSession()

    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg w-full max-w-[420px] p-8 text-center relative overflow-hidden transition-all duration-300">
        
        {isSuccess ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-4">Berhasil Masuk!</h1>
            <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-8">
              Autentikasi berhasil. Mengarahkan Anda ke Dashboard...
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-[#EFF6FF] dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <Mail className="w-8 h-8 text-[#2563EB] dark:text-blue-400 z-10" />
              <div className="absolute inset-0 bg-blue-400/20 dark:bg-blue-400/10 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-4">Cek Email Kamu</h1>
            <p className="text-[#334155] dark:text-slate-300 leading-relaxed mb-6">
              Kami telah mengirimkan tautan masuk ke email yang kamu gunakan. Silakan buka email tersebut untuk melanjutkan.
            </p>
            <div className="bg-blue-50 dark:bg-slate-700/50 rounded-lg p-4 mb-8">
              <p className="text-sm text-[#334155] dark:text-slate-300 font-medium flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                Menunggu konfirmasi...
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Halaman ini akan otomatis berpindah jika Anda sudah mengklik tautan di perangkat ini.
              </p>
            </div>
            <a
              href="/login"
              className="inline-block text-[#2563EB] dark:text-blue-400 font-semibold hover:underline"
            >
              Kembali ke halaman login
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
