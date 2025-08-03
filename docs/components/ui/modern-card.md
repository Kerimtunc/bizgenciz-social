// ==========================================
// MODERN CARD COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/ModernCard.tsx
// Satır Sayısı: 131 satır

"use client"

import React, { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface ModernCardProps {
  children?: ReactNode
  title?: string
  subtitle?: string
  icon?: LucideIcon
  theme: "dark" | "light"
  className?: string
  variant?: "default" | "glass" | "elevated" | "gradient"
  size?: "sm" | "md" | "lg"
  interactive?: boolean
}

export function ModernCard({ 
  children, 
  title, 
  subtitle,
  icon: Icon,
  theme, 
  className = "",
  variant = "glass",
  size = "md",
  interactive = false
}: ModernCardProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case "glass":
        return theme === "dark" 
          ? "bg-slate-900/40 border-slate-700/30 backdrop-blur-xl shadow-2xl shadow-slate-900/20" 
          : "bg-white/60 border-orange-200/40 backdrop-blur-xl shadow-2xl shadow-orange-900/10"
      
      case "elevated":
        return theme === "dark"
          ? "bg-slate-800/90 border-slate-600/50 shadow-2xl shadow-slate-900/40 backdrop-blur-sm"
          : "bg-white/90 border-orange-100/60 shadow-2xl shadow-orange-900/20 backdrop-blur-sm"
      
      case "gradient":
        return theme === "dark"
          ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-600/40 backdrop-blur-lg shadow-xl"
          : "bg-gradient-to-br from-white/80 to-orange-50/80 border-orange-200/50 backdrop-blur-lg shadow-xl"
      
      default:
        return theme === "dark" 
          ? "bg-slate-900/50 border-slate-700/50 backdrop-blur-sm" 
          : "bg-white/70 border-orange-200"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "p-3"
      case "lg": 
        return "p-8"
      default:
        return "p-6"
    }
  }

  const getInteractiveStyles = () => {
    if (!interactive) return ""
    
    return `
      cursor-pointer transition-all duration-300 ease-out
      hover:scale-[1.02] hover:shadow-3xl
      hover:${theme === "dark" ? "bg-slate-800/60" : "bg-white/80"}
      hover:border-${theme === "dark" ? "slate-600/60" : "orange-300/60"}
      active:scale-[0.98]
    `
  }

  return (
    <Card className={`
      ${getVariantStyles()}
      ${getInteractiveStyles()}
      border rounded-2xl
      transition-all duration-300 ease-out
      ${className}
    `}>
      {(title || subtitle || Icon) && (
        <CardHeader className={`${size === "sm" ? "pb-2" : "pb-4"}`}>
          <CardTitle className={`
            flex items-center space-x-3
            ${size === "sm" ? "text-base" : size === "lg" ? "text-xl" : "text-lg"}
            ${theme === "dark" ? "text-slate-100" : "text-slate-800"}
            font-semibold
          `}>
            {Icon && (
              <div className={`
                p-2 rounded-xl
                ${theme === "dark" 
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30" 
                  : "bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30"
                }
                backdrop-blur-sm
              `}>
                <Icon className={`
                  ${size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"}
                  ${theme === "dark" ? "text-blue-400" : "text-orange-500"}
                `} />
              </div>
            )}
            <div>
              {title && <div>{title}</div>}
              {subtitle && (
                <div className={`
                  text-sm font-normal mt-1
                  ${theme === "dark" ? "text-slate-400" : "text-slate-600"}
                `}>
                  {subtitle}
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
      )}
      
      {children && (
        <CardContent className={getSizeStyles()}>
          {children}
        </CardContent>
      )}
    </Card>
  )
}

// Placeholder components for recovery
function LocalCard({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function LocalCardHeader({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function LocalCardTitle({ children, className }: any) {
  return <h3 className={className}>{children}</h3>
}

function LocalCardContent({ children, className }: any) {
  return <div className={className}>{children}</div>
} 