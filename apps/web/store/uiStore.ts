import { create } from 'zustand'

export type FlashType = 'success' | 'error' | 'warning' | 'info' | null

interface Notification {
  id: string
  type: FlashType
  message: string
}

interface UiState {
  flashType: FlashType
  flashMessage: string | null
  notifications: Notification[]
  isMobileNavOpen: boolean
  notificationDuration: number
  reducedMotion: boolean
  triggerFlash: (type: FlashType, message?: string) => void
  addNotification: (type: FlashType, message: string) => void
  removeNotification: (id: string) => void
  setMobileNavOpen: (isOpen: boolean) => void
  setNotificationDuration: (ms: number) => void
  setReducedMotion: (enabled: boolean) => void
}

let notifCounter = 0
let flashTimeoutId: NodeJS.Timeout | null = null

export const useUiStore = create<UiState>((set, get) => ({
  flashType: null,
  flashMessage: null,
  notifications: [],
  isMobileNavOpen: false,
  notificationDuration: 2500,
  reducedMotion: false,
  triggerFlash: (type, message) => {
    set({ flashType: type, flashMessage: message ?? null })
    
    if (flashTimeoutId) {
      clearTimeout(flashTimeoutId)
      flashTimeoutId = null
    }

    if (type) {
      const duration = get().notificationDuration
      flashTimeoutId = setTimeout(() => {
        set({ flashType: null, flashMessage: null })
      }, duration)
    }
  },
  addNotification: (type, message) => {
    const id = `notif-${++notifCounter}-${Date.now()}`
    set((state) => ({
      notifications: [...state.notifications, { id, type, message }]
    }))
    const duration = get().notificationDuration
    setTimeout(() => {
      get().removeNotification(id)
    }, duration)
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
  },
  setMobileNavOpen: (isOpen) => set({ isMobileNavOpen: isOpen }),
  setNotificationDuration: (ms) => set({ notificationDuration: ms }),
  setReducedMotion: (enabled) => set({ reducedMotion: enabled }),
}))
