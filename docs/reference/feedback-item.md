// ==========================================
// FEEDBACK ITEM COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/FeedbackItem.tsx
// Satır Sayısı: 63 satır

import React from "react"
import { Star } from "lucide-react"

/**
 * FeedbackItem Component
 * 
 * @description Müşteri yorumlarını görüntülemek için kullanılan component
 * @location Orijinal konum: panel/page.tsx (satır ~153-185)
 * @usage Dashboard'da müşteri geri bildirimlerini listeler
 * 
 * @features
 * - 5 yıldızlı rating sistemi
 * - Müşteri adı ve zaman damgası
 * - Yorum metni görüntüleme
 * - Dark/Light theme desteği
 * 
 * @props
 * - customer: string - Müşteri adı
 * - time: string - Yorum zamanı
 * - rating: number - 1-5 arası puan
 * - comment: string - Yorum metni
 * - theme: string - Dark/light tema
 */

interface FeedbackItemProps {
  customer: string
  time: string
  rating: number
  comment: string
  theme: string
}

export function FeedbackItem({
  customer,
  time,
  rating,
  comment,
  theme,
}: FeedbackItemProps) {
  return (
    <div className={`${theme === "dark" ? "bg-slate-800/30" : "bg-orange-50/30"} rounded-md p-3`}>
      {/* Header: Müşteri adı ve rating */}
      <div className="flex items-center justify-between mb-1">
        <div className={`text-sm font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>
          {customer}
        </div>
        <div className="flex items-center">
          {/* 5 Yıldızlı Rating Sistemi */}
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-3 w-3 ${
                i < rating ? "text-yellow-500 fill-current" : "text-slate-300"
              }`} 
            />
          ))}
          <span className="text-xs text-slate-500 ml-2">{time}</span>
        </div>
      </div>
      {/* Yorum Metni */}
      <div className="text-xs text-slate-400">{comment}</div>
    </div>
  )
} 