// ==========================================
// MODERN LAYOUT COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/ModernLayout.tsx
// Satır Sayısı: 56 satır

"use client"

import React, { ReactNode } from "react"

interface ModernLayoutProps {
  children: ReactNode
  theme: "dark" | "light"
  className?: string
}

export function ModernLayout({ children, theme, className = "" }: ModernLayoutProps) {
  return (
    <div className={`
      ${theme === "dark" 
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" 
        : "bg-gradient-to-br from-orange-50 via-white to-amber-50"
      }
      min-h-screen relative overflow-hidden
      ${className}
    `}>
      {/* Modern gradient overlay */}
      <div className={`
        absolute inset-0 
        ${theme === "dark" 
          ? "bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20" 
          : "bg-gradient-to-br from-orange-100/30 via-transparent to-amber-100/30"
        }
        pointer-events-none
      `} />
      
      {/* Glassmorphism blur effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`
          absolute top-20 left-20 w-96 h-96 rounded-full 
          ${theme === "dark" ? "bg-blue-600/10" : "bg-orange-400/10"}
          blur-3xl animate-pulse
        `} />
        <div className={`
          absolute bottom-20 right-20 w-80 h-80 rounded-full 
          ${theme === "dark" ? "bg-purple-600/10" : "bg-amber-400/10"}
          blur-3xl animate-pulse delay-1000
        `} />
        <div className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full 
          ${theme === "dark" ? "bg-indigo-600/5" : "bg-orange-300/5"}
          blur-2xl animate-pulse delay-500
        `} />
      </div>

      {/* Content with improved backdrop blur */}
      <div className="relative z-10 backdrop-blur-[1px]">
        {children}
      </div>
    </div>
  )
} 