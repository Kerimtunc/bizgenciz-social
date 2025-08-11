// ==========================================
// ACTION BUTTON COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/ActionButton.tsx
// Satır Sayısı: 57 satır

import React from "react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * ActionButton Component
 * 
 * @description Hızlı eylem butonları için kullanılan component
 * @location Orijinal konum: panel/page.tsx (satır ~237-254)
 * @usage Dashboard'da quick action grid'inde kullanılır
 * 
 * @features
 * - Icon + label kombinasyonu
 * - Vertical layout (icon üstte, label altta)
 * - Dark/Light theme desteği
 * - Hover effects
 * - Responsive design
 * 
 * @props
 * - icon: LucideIcon - Gösterilecek ikon
 * - label: string - Buton etiketi
 * - theme: string - Dark/light tema
 * 
 * @usage_example
 * <ActionButton 
 *   icon={Plus} 
 *   label="Yeni Sipariş" 
 *   theme={theme} 
 * />
 */

interface ActionButtonProps {
  icon: LucideIcon
  label: string
  theme: string
}

export function ActionButton({ 
  icon: Icon, 
  label, 
  theme 
}: ActionButtonProps) {
  return (
    <Button
      variant="outline"
      className={`h-auto py-3 px-3 ${
        theme === "dark"
          ? "border-slate-700 bg-slate-800/50 hover:bg-slate-700/50"
          : "border-orange-200 bg-white/50 hover:bg-orange-50/50"
      } flex flex-col items-center justify-center space-y-1 w-full`}
    >
      {/* Icon Section */}
      <Icon className="h-5 w-5 text-orange-500" />
      {/* Label Section */}
      <span className="text-xs">{label}</span>
    </Button>
  )
} 