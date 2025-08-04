// ==========================================
// MOBILE SIDEBAR COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/MobileSidebar.tsx
// Satır Sayısı: 86 satır

"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChefHat, X } from "lucide-react"
import { NavItem } from "./nav-item"
import { StatusItem } from "./status-item"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  modules: any[]
  activeModule: string
  onModuleChange: (module: string) => void
  theme: "dark" | "light"
  tableOccupancy: number
  kitchenEfficiency: number
  customerSatisfaction: number
}

export const MobileSidebar = ({
  isOpen,
  onClose,
  modules,
  activeModule,
  onModuleChange,
  theme,
  tableOccupancy,
  kitchenEfficiency,
  customerSatisfaction,
}: MobileSidebarProps) => {
  if (!isOpen) return null

  return (
    <div className="md:hidden fixed inset-0 z-[9999999] bg-black/50" onClick={onClose}>
      <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl z-[9999999]" onClick={e => e.stopPropagation()}>
        {/* Mobile Sidebar Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-gray-900">Menü</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Mobile Sidebar Content */}
        <div className="overflow-y-auto h-full pb-4">
          <nav className="space-y-2 p-4">
            {modules.map((module) => (
              <NavItem 
                key={module.id}
                icon={module.icon} 
                label={module.label} 
                active={activeModule === module.id} 
                theme={theme} 
                onClick={() => {
                  onModuleChange(module.id)
                  onClose()
                }} 
              />
            ))}
          </nav>

          <div className="px-4 pt-6 border-t border-gray-200 mx-4">
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
        </div>
      </div>
    </div>
  )
}

// Placeholder components for recovery
function LocalButton({ children, variant, size, onClick, className }: any) {
  return <button className={className} onClick={onClick}>{children}</button>
}

function LocalNavItem({ icon: Icon, label, active, theme, onClick }: any) {
  return (
    <button 
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
        active ? 'bg-orange-100 text-orange-700' : 'text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span className="font-medium">{label}</span>
    </button>
  )
}

function LocalStatusItem({ label, value, color, theme }: any) {
  const getColorClass = (color: string) => {
    switch (color) {
      case "orange": return "text-orange-500"
      case "green": return "text-green-500"
      case "blue": return "text-blue-500"
      default: return "text-gray-500"
    }
  }

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`font-semibold ${getColorClass(color)}`}>{value}%</span>
    </div>
  )
} 