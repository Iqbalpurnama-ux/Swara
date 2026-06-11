"use client"

import { useActionState } from "react"
import { loginAction, googleLoginAction } from "../actions"

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-[420px] p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Masuk ke Swara</h1>
          <p className="text-[#334155]">Lanjutkan aksesibilitas tanpa batas</p>
        </div>

        <form action={googleLoginAction} className="mb-6">
          <button
            type="submit"
            className="w-full h-12 flex items-center justify-center gap-3 border border-[#E2E8F0] bg-white text-[#334155] rounded-xl font-semibold hover:bg-[#F8FAFC] focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 transition-colors"
          >
            <GoogleIcon />
            Lanjutkan dengan Google
          </button>
        </form>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[#E2E8F0]"></div>
          <span className="text-sm text-[#94A3B8]">atau dengan email</span>
          <div className="flex-1 h-px bg-[#E2E8F0]"></div>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              defaultValue={state?.email || ""}
              placeholder="Masukkan email Anda"
              aria-label="Masukkan alamat email"
              className={`w-full h-12 px-4 rounded-xl border focus:ring-2 focus:ring-[#DBEAFE] text-[16px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-all ${
                state?.errors?.email 
                  ? "border-[#EF4444] focus:border-[#EF4444]" 
                  : "border-[#E2E8F0] focus:border-[#2563EB]"
              }`}
            />
            {state?.errors?.email && (
              <p className="mt-2 text-sm text-[#EF4444] font-medium animate-in fade-in slide-in-from-top-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full h-12 bg-[#2563EB] text-white rounded-xl font-semibold text-base hover:bg-[#1D4ED8] focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Kirim Magic Link"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#94A3B8]">
          Belum punya akun?{" "}
          <a href="/register" className="text-[#2563EB] font-semibold hover:underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  )
}
