import { Bell, Globe2, UserCircle } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  userName?: string
  language?: string
}

export function Header({ userName, language = "id-ID" }: HeaderProps) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30 border-b border-gray-100 md:ml-[260px] transition-all">
      <div className="flex items-center md:hidden">
        <Image src="/logo.png" alt="Swara Logo" width={32} height={32} className="rounded-lg shadow-sm mr-3" />
        <span className="font-bold text-lg text-gray-900 tracking-tight">Swara</span>
      </div>
      
      <div className="hidden md:block">
        <h2 className="text-sm font-semibold text-gray-400 tracking-wide uppercase">Dashboard</h2>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-500">
          <Globe2 className="w-3.5 h-3.5 text-gray-400" />
          <span>{language}</span>
        </div>
        
        <button className="relative p-2 rounded-full hover:bg-gray-50 transition-all">
          <Bell className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-gray-100 pl-5">
          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <UserCircle className="w-5 h-5" />
          </div>
          <span className="hidden sm:block text-sm font-semibold text-gray-700">{userName || "Pengguna"}</span>
        </div>
      </div>
    </header>
  )
}
