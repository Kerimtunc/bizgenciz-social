// ==========================================
// PLACEHOLDER MODULE COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/PlaceholderModule.tsx
// Satır Sayısı: 46 satır

"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import ModuleHeader from "@/components/common/ModuleHeader"
import type { LucideIcon } from "lucide-react"

interface PlaceholderModuleProps {
  modules: any[]
  activeModule: string
  onModuleChange: (module: string) => void
  theme: "dark" | "light"
  icon: LucideIcon
  title: string
  description?: string
}

export const PlaceholderModule = ({
  modules,
  activeModule,
  onModuleChange,
  theme,
  icon: Icon,
  title,
  description = "Bu modül geliştirme aşamasındadır."
}: PlaceholderModuleProps) => {
  return (
    <div className="space-y-6">
      {/* ModuleHeader sadece mobilde göster */}
      <div className="lg:hidden">
        <ModuleHeader 
          title={title}
          subtitle={description}
          icon={<Icon />}
        />
      </div>
      <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
        <CardContent className="p-8 text-center">
          <Icon className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-slate-600">{description}</p>
        </CardContent>
      </Card>
    </div>
  )
} 