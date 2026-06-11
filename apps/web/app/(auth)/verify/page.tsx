import { Mail } from "lucide-react"

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-[420px] p-8 text-center">
        <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-[#2563EB]" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-4">Cek Email Kamu</h1>
        <p className="text-[#334155] leading-relaxed mb-8">
          Kami telah mengirimkan tautan masuk ke email yang kamu gunakan. Silakan buka email tersebut untuk melanjutkan.
        </p>
        <a
          href="/login"
          className="inline-block text-[#2563EB] font-semibold hover:underline"
        >
          Kembali ke halaman login
        </a>
      </div>
    </div>
  )
}
