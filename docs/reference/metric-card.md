// ==========================================
// METRIC CARD COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/MetricCard.tsx
// Satır Sayısı: 78 satır

import React from "react"
import type { LucideIcon } from "lucide-react"
import { TrendingUp, BarChart3 } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  theme: string
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  theme,
}: MetricCardProps) {
  const getColor = () => {
    switch (color) {
      case "green":
        return theme === "dark"
          ? "from-green-500 to-emerald-500 border-green-500/30"
          : "from-green-400 to-emerald-400 border-green-300"
      case "orange":
        return theme === "dark"
          ? "from-orange-500 to-red-500 border-orange-500/30"
          : "from-orange-400 to-red-400 border-orange-300"
      case "blue":
        return theme === "dark"
          ? "from-blue-500 to-indigo-500 border-blue-500/30"
          : "from-blue-400 to-indigo-400 border-blue-300"
      default:
        return theme === "dark"
          ? "from-orange-500 to-red-500 border-orange-500/30"
          : "from-orange-400 to-red-400 border-orange-300"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 rotate-180 text-red-500" />
      case "stable":
        return <BarChart3 className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div
      className={`${
        theme === "dark" ? "bg-slate-800/50" : "bg-white/50"
      } rounded-lg border ${getColor()} p-4 relative overflow-hidden`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 ${
          color === "green" ? "text-green-500" :
          color === "orange" ? "text-orange-500" :
          color === "blue" ? "text-blue-500" :
          "text-orange-500"
        }`} />
      </div>
      <div className={`text-2xl font-bold mb-1 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{value}</div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-orange-500 to-red-500"></div>
    </div>
  )
} 