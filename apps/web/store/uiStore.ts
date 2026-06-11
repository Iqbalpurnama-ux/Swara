import { create } from 'zustand'

export type FlashType = 'success' | 'error' | 'warning' | 'info' | null

interface UiState {
  flashType: FlashType
  flashMessage: string | null
  isMobileNavOpen: boolean
  triggerFlash: (type: FlashType, message?: string) => void
  setMobileNavOpen: (isOpen: boolean) => void
}

export const useUiStore = create<UiState>((set) => ({
  flashType: null,
  flashMessage: null,
  isMobileNavOpen: false,
  triggerFlash: (type, message = null) => {
    set({ flashType: type, flashMessage: message })
    // Auto clear flash after 400ms to match the CSS animation duration
    if (type) {
      setTimeout(() => {
        set({ flashType: null, flashMessage: null })
      }, 400) // 400ms duration per PRD
    }
  },
  setMobileNavOpen: (isOpen) => set({ isMobileNavOpen: isOpen })
}))
