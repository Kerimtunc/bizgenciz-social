// ==========================================
// STATUS ITEM COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/StatusItem.tsx
// Satır Sayısı: 33 satır

import React from "react"

interface StatusItemProps {
  label: string
  value: number
  color: string
  theme: string
}

export function StatusItem({ label, value, color, theme }: StatusItemProps) {
  const getColor = () => {
    switch (color) {
      case "orange":
        return "from-orange-500 to-red-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      default:
        return "from-orange-500 to-red-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className={`h-1.5 ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"} rounded-full overflow-hidden`}>
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
} 