export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export function saveNotification(title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') {
  if (typeof window === "undefined") return;

  const existingStr = localStorage.getItem("swara_notifications");
  const existing: AppNotification[] = existingStr ? JSON.parse(existingStr) : [];
  
  const newNotif: AppNotification = {
    id: Date.now().toString() + Math.random().toString(36).substring(7),
    title,
    message,
    type,
    timestamp: new Date().toISOString(),
    read: false
  };
  
  existing.unshift(newNotif);
  if (existing.length > 50) existing.length = 50;
  
  localStorage.setItem("swara_notifications", JSON.stringify(existing));
  window.dispatchEvent(new Event("swaraNotificationUpdate"));
}

export function getNotifications(): AppNotification[] {
  if (typeof window === "undefined") return [];
  const existingStr = localStorage.getItem("swara_notifications");
  return existingStr ? JSON.parse(existingStr) : [];
}

export function markAllNotificationsRead() {
  if (typeof window === "undefined") return;
  const existingStr = localStorage.getItem("swara_notifications");
  if (!existingStr) return;
  
  const existing: AppNotification[] = JSON.parse(existingStr);
  const updated = existing.map(n => ({ ...n, read: true }));
  
  localStorage.setItem("swara_notifications", JSON.stringify(updated));
  window.dispatchEvent(new Event("swaraNotificationUpdate"));
}
