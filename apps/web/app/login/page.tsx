"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowRight, Loader2, Sparkles, LogIn } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex font-sans bg-[#FAFCFF] selection:bg-blue-500/20 selection:text-blue-900 overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/30 via-transparent to-transparent blur-[100px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200/40 via-transparent to-transparent blur-[120px]"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 z-10 relative">
        <Link href="/" className="absolute top-8 left-6 md:left-12 flex items-center gap-3 group cursor-pointer">
          <img src="/logo.png" alt="Swara Logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
          <span className="text-[20px] font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Swara.</span>
        </Link>

        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/70 backdrop-blur-3xl border border-white rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/10">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-sm">
              <LogIn className="w-8 h-8" />
            </div>
            
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Selamat Datang</h1>
            <p className="text-slate-500 font-medium mb-8">Masuk ke akun Swara Anda untuk melanjutkan komunikasi tanpa batas.</p>

            <form onSubmit={handleLogin} className="space-y-5">
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
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">Kata Sandi</label>
                  <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700">Lupa sandi?</a>
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Masuk <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm font-medium text-slate-500">
                Belum punya akun? <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700">Daftar sekarang</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
