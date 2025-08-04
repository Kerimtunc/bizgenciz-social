// ==========================================
// DESKTOP SIDEBAR COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/DesktopSidebar.tsx
// Satır Sayısı: 77 satır

"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { NavItem } from "./nav-item"
import { StatusItem } from "./status-item"

interface DesktopSidebarProps {
  modules: any[]
  activeModule: string
  onModuleChange: (module: string) => void
  theme: "dark" | "light"
  tableOccupancy: number
  kitchenEfficiency: number
  customerSatisfaction: number
}

export const DesktopSidebar = ({
  modules,
  activeModule,
  onModuleChange,
  theme,
  tableOccupancy,
  kitchenEfficiency,
  customerSatisfaction,
}: DesktopSidebarProps) => {
  // DEBUG LOG: Only log once per session to avoid flooding the console
  if (typeof window !== 'undefined' && !(window as any).__desktopSidebarLogged) {
    console.log('🔍 DesktopSidebar Debug:', {
      modulesLength: modules?.length || 0,
      activeModule,
      theme,
      tableOccupancy,
      kitchenEfficiency,
      customerSatisfaction
    });
    (window as any).__desktopSidebarLogged = true;
  }
  
  return (
    <div className="col-span-12 lg:col-span-4 xl:col-span-3">
      <Card
        className={`${
          theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
        } backdrop-blur-sm min-h-[calc(100vh-2rem)] sticky top-4 shadow-lg`}
      >
        <CardContent className="p-4">
          <nav className="space-y-2">
            {modules.map((module) => (
              <NavItem 
                key={module.id}
                icon={module.icon} 
                label={module.label} 
                active={activeModule === module.id} 
                theme={theme} 
                onClick={() => onModuleChange(module.id)} 
              />
            ))}
          </nav>

          <div className={`mt-8 pt-6 border-t ${theme === "dark" ? "border-slate-700/50" : "border-orange-200"}`}>
            <div className="text-xs text-slate-500 mb-2 font-semibold">GÜNLÜK DURUM</div>
            <div className="space-y-3">
              <StatusItem label="Masa Doluluk" value={tableOccupancy} color="orange" theme={theme} />
              <StatusItem label="Mutfak Verimlilik" value={kitchenEfficiency} color="green" theme={theme} />
              <StatusItem
                label="Müşteri Memnuniyet"
                value={Math.round(customerSatisfaction * 20)}
                color="blue"
                theme={theme}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Placeholder components for recovery
function LocalCard({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function LocalCardContent({ children, className }: any) {
  return <div className={className}>{children}</div>
} 