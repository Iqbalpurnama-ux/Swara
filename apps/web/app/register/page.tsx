"use client"

import Link from "next/link"
import { useActionState } from "react"
import { ArrowRight, Loader2, UserPlus } from "lucide-react"
import { registerAction, googleLoginAction } from "../(auth)/actions"

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null)

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

            <form action={googleLoginAction} className="mb-5">
              <button
                type="submit"
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3.5 rounded-xl flex justify-center items-center gap-3 transition-all shadow-sm hover:shadow-md"
              >
                <GoogleIcon /> Daftar dengan Google
              </button>
            </form>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-sm font-medium text-slate-400">atau dengan email</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <form action={formAction} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  defaultValue={state?.name || ""}
                  placeholder=""
                  className={`w-full px-5 py-3.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400 ${state?.errors?.name ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                />
                {state?.errors?.name && (
                  <p className="mt-2 text-sm text-red-500 font-medium">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  defaultValue={state?.email || ""}
                  placeholder=""
                  className={`w-full px-5 py-3.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400 ${state?.errors?.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                />
                {state?.errors?.email && (
                  <p className="mt-2 text-sm text-red-500 font-medium">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Mendaftar Sekarang <ArrowRight className="w-4 h-4" /></>}
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
