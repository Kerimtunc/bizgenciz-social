// ==========================================
// ADMIN FLOATING MENU COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/AdminFloatingMenu.tsx
// Satır Sayısı: 287 satır

"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  X, 
  Plus, 
  UserPlus, 
  Bell, 
  ClipboardList, 
  AlertTriangle, 
  Zap,
  Settings
} from "lucide-react"

interface AdminFloatingMenuProps {
  theme: string
  activeOrders: number
  onQuickOrder: () => void
  onNewCustomer: () => void
  onStaffCall: () => void
  onTodayReports: () => void
  onEmergencyAlert: () => void
}

interface AdminMenuOptionProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  onClick?: () => void
  isPriority?: boolean
  isDanger?: boolean
  theme: string
}

function AdminMenuOption({
  icon,
  title,
  subtitle,
  onClick,
  isPriority = false,
  isDanger = false,
  theme,
}: AdminMenuOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl transition-all duration-200 group border ${
        isDanger
          ? theme === "dark"
            ? "border-red-500/30 bg-red-900/20 hover:bg-red-900/40 hover:border-red-400/50"
            : "border-red-200 bg-red-50/50 hover:bg-red-100 hover:border-red-300"
          : isPriority
            ? theme === "dark"
              ? "border-orange-500/30 bg-orange-900/20 hover:bg-orange-900/40 hover:border-orange-400/50"
              : "border-orange-200 bg-orange-50/50 hover:bg-orange-100 hover:border-orange-300"
            : theme === "dark"
              ? "border-slate-600/30 bg-slate-800/20 hover:bg-slate-800/40 hover:border-slate-500/50"
              : "border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0 ${
          isDanger ? "text-red-500" : isPriority ? "text-orange-500" : "text-slate-500"
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm ${
            theme === "dark" ? "text-slate-200" : "text-slate-800"
          }`}>
            {title}
          </div>
          <div className={`text-xs ${
            theme === "dark" ? "text-slate-400" : "text-slate-600"
          }`}>
            {subtitle}
          </div>
        </div>
      </div>
    </button>
  )
}

export function AdminFloatingMenu({
  theme,
  activeOrders,
  onQuickOrder,
  onNewCustomer,
  onStaffCall,
  onTodayReports,
  onEmergencyAlert,
}: AdminFloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Scroll hide/show functionality
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const handleScroll = () => {
      setIsVisible(false)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsVisible(true), 150)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Admin Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'
      }`}>
        
        {/* Admin Popup Menu */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-80 animate-in slide-in-from-bottom-2 duration-300">
            <div className={`rounded-3xl overflow-hidden backdrop-blur-2xl shadow-2xl border relative ${
              theme === "dark" 
                ? "bg-slate-900/95 border-slate-700/30" 
                : "bg-white/95 border-orange-200/30"
            }`}>
              
              {/* Glassmorphism background effects */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-orange-400/20 to-amber-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-yellow-500/20 to-red-500/20 rounded-full blur-2xl" />
              </div>

              <div className="relative z-10 p-6 space-y-5">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />
                    <span className={`text-sm font-medium ${
                      theme === "dark" ? "text-orange-300" : "text-orange-600"
                    }`}>Admin Hızlı Menü</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className={`rounded-full h-8 w-8 ${
                      theme === "dark" 
                        ? "hover:bg-slate-700 hover:bg-slate-600 border-slate-600/50" 
                        : "hover:bg-orange-100/50 text-slate-600 hover:text-orange-600"
                    }`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Main Content */}
                <div className="text-center space-y-2">
                  <h3 className={`text-xl font-bold ${
                    theme === "dark" ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Hızlı İşlemler
                  </h3>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}>
                    Restoran yönetimi için hızlı erişim
                  </p>
                </div>

                {/* Admin Menu Options */}
                <div className="space-y-2">
                  <AdminMenuOption 
                    icon={<Plus className="h-5 w-5" />} 
                    title="🔥 Hızlı Sipariş" 
                    subtitle="⚡ Yeni sipariş ekle"
                    onClick={onQuickOrder}
                    isPriority
                    theme={theme}
                  />
                  
                  <AdminMenuOption 
                    icon={<UserPlus className="h-5 w-5" />} 
                    title="Yeni Müşteri"
                    subtitle="Müşteri kaydı oluştur"
                    onClick={onNewCustomer}
                    theme={theme}
                  />
                  
                  <AdminMenuOption
                    icon={<Bell className="h-5 w-5" />}
                    title="Personel Çağır"
                    subtitle="Anında personel bildirimi"
                    onClick={onStaffCall}
                    theme={theme}
                  />
                  
                  <AdminMenuOption
                    icon={<ClipboardList className="h-5 w-5" />}
                    title="Günlük Raporlar"
                    subtitle="Bugünün raporlarına git"
                    onClick={onTodayReports}
                    theme={theme}
                  />
                  
                  <AdminMenuOption
                    icon={<AlertTriangle className="h-5 w-5" />}
                    title="Acil Durum"
                    subtitle="Acil durum bildirimi"
                    onClick={onEmergencyAlert}
                    isDanger
                    theme={theme}
                  />
                </div>

                {/* Footer */}
                <div className={`pt-3 border-t text-center ${
                  theme === "dark" ? "border-slate-700/30" : "border-orange-200/30"
                }`}>
                  <span className={`text-xs font-medium ${
                    theme === "dark" ? "text-orange-400" : "text-orange-600"
                  }`}>
                    QR Menu Elite - Admin Panel
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Button - Admin Design */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative h-16 w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 ${
            isOpen 
              ? theme === "dark"
                ? 'bg-slate-700 hover:bg-slate-600 border-slate-600/50' 
                : 'bg-orange-600 hover:bg-orange-700 border-orange-400/50'
              : theme === "dark"
                ? 'bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-slate-600/50'
                : 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-orange-400/50'
          }`}
        >
          {/* Admin Icon Design */}
          <div className="relative flex items-center justify-center">
            
            {/* Base Icon - Admin Lightning */}
            <Zap className={`h-6 w-6 text-white transition-all duration-300 ${
              isOpen ? 'rotate-180 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`} />
            
            {/* Close state - X icon */}
            <X className={`absolute h-6 w-6 text-white transition-all duration-300 ${
              isOpen ? 'rotate-0 scale-100 opacity-100' : 'rotate-45 scale-0 opacity-0'
            }`} />
          </div>

          {/* Admin Indicators */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Active Orders Indicator (top-right) */}
            {activeOrders > 0 && !isOpen && (
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs text-white font-bold">{activeOrders}</span>
              </div>
            )}
            
            {/* Quick Access Indicator (bottom-left) */}
            {!isOpen && (
              <div className="absolute -bottom-1 -left-1 h-4 w-4 bg-green-500 rounded-full border border-white flex items-center justify-center">
                <Settings className="h-2.5 w-2.5 text-white" />
              </div>
            )}
          </div>
        </Button>
      </div>
    </>
  )
}

// Placeholder components for recovery
function LocalButton({ children, variant, size, onClick, className }: any) {
  return <button onClick={onClick} className={className}>{children}</button>
} 