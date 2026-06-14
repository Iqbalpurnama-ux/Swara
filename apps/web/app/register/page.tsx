"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowRight, Loader2, Sparkles, UserPlus } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Simulate that this is a fresh registration so onboarding happens
      localStorage.removeItem("swara_onboarding_completed")
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex font-sans bg-[#FAFCFF] selection:bg-blue-500/20 selection:text-blue-900 overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/30 via-transparent to-transparent blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200/40 via-transparent to-transparent blur-[120px]"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 z-10 relative py-12">
        <Link href="/" className="absolute top-8 left-6 md:left-12 flex items-center gap-3 group cursor-pointer">
          <img src="/logo.png" alt="Swara Logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
          <span className="text-[20px] font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Swara.</span>
        </Link>

        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/70 backdrop-blur-3xl border border-white rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/10">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-sm">
              <UserPlus className="w-8 h-8" />
            </div>
            
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Buat Akun Baru</h1>
            <p className="text-slate-500 font-medium mb-8">Bergabunglah bersama kami secara gratis dan akses seluruh fitur esensial komunikasi.</p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  placeholder="Mis. Rizky Aditya"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="nama@email.com"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Kata Sandi</label>
                <input 
                  type="password" 
                  required
                  placeholder="Minimal 8 karakter"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Mendaftar Sekarang <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm font-medium text-slate-500">
                Sudah punya akun? <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700">Masuk di sini</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
