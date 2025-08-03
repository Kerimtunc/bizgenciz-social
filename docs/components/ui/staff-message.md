// ==========================================
// STAFF MESSAGE COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/StaffMessage.tsx
// Satır Sayısı: 85 satır

import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

/**
 * StaffMessage Component
 * 
 * @description Personel mesajlarını görüntülemek için kullanılan component
 * @location Orijinal konum: panel/page.tsx (satır ~185-237)
 * @usage Dashboard'da personel iletişimini yönetir
 * 
 * @features
 * - Avatar görüntüleme (resim + fallback)
 * - Okunmamış mesaj indicator'ı
 * - Zaman damgası
 * - Dark/Light theme desteği
 * - Unread message highlighting
 * 
 * @props
 * - sender: string - Mesaj gönderen personel adı
 * - time: string - Mesaj zamanı
 * - message: string - Mesaj içeriği
 * - avatar: string - Avatar URL'i
 * - unread?: boolean - Okunmamış mesaj flag'i
 * - theme: string - Dark/light tema
 */

interface StaffMessageProps {
  sender: string
  time: string
  message: string
  avatar: string
  unread?: boolean
  theme: string
}

export function StaffMessage({
  sender,
  time,
  message,
  avatar,
  unread,
  theme,
}: StaffMessageProps) {
  return (
    <div
      className={`flex space-x-3 p-2 rounded-md ${
        unread
          ? theme === "dark"
            ? "bg-slate-800/50 border border-slate-700/50"
            : "bg-orange-50/50 border border-orange-200"
          : ""
      }`}
    >
      {/* Avatar Section */}
      <Avatar className="h-8 w-8">
        <AvatarImage 
          src={avatar || "Buraya avatar resmi gelecek"} 
          alt={sender} 
        />
        <AvatarFallback
          className={`${theme === "dark" ? "bg-slate-700 text-orange-500" : "bg-orange-100 text-orange-600"}`}
        >
          {sender.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      {/* Message Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className={`text-sm font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>
            {sender}
          </div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1">{message}</div>
      </div>
      
      {/* Unread Indicator */}
      {unread && (
        <div className="flex-shrink-0 self-center">
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
        </div>
      )}
    </div>
  )
} 