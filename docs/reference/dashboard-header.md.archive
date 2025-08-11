// ==========================================
// DASHBOARD HEADER COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/DashboardHeader.tsx
// Satır Sayısı: 126 satır

"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChefHat, Menu, Search, Bell, Sun, Moon, Shield } from "lucide-react"

interface DashboardHeaderProps {
  theme: "dark" | "light"
  activeModule: string
  currentModule: { label: string }
  onToggleTheme: () => void
  onToggleMobileSidebar: () => void
}

export function DashboardHeader({
  theme,
  activeModule,
  currentModule,
  onToggleTheme,
  onToggleMobileSidebar
}: DashboardHeaderProps) {
  return (
    <header
      className={`flex items-center justify-between py-4 border-b ${
        theme === "dark" ? "border-slate-700/50" : "border-orange-200"
      } mb-6`}
    >
      <div className="flex items-center space-x-2">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2 relative z-[99999]"
          onClick={onToggleMobileSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <ChefHat className="h-8 w-8 text-orange-500" />
        <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Buraya işletme adı gelecek
        </span>
        {activeModule !== "dashboard" && (
          <>
            <span className="text-slate-400 mx-2 hidden sm:inline">/</span>
            <Badge variant="outline" className="bg-orange-100 text-orange-600 border-orange-300 hidden sm:inline-flex">
              {currentModule?.label || activeModule}
            </Badge>
          </>
        )}
        
        {/* Süperadmin Link */}
        <div className="hidden lg:flex items-center space-x-2 ml-4">
          <span className="text-slate-400 text-sm">|</span>
          <a
            href="/admin"
            className="flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <Shield className="w-3 h-3" />
            <span>Süperadmin</span>
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div
          className={`hidden md:flex items-center space-x-1 ${
            theme === "dark" ? "bg-slate-800/50 border-slate-700/50" : "bg-white/70 border-orange-200"
          } rounded-full px-3 py-1.5 border backdrop-blur-sm`}
        >
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buraya arama metni gelecek"
            className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-600">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bildirimler</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleTheme}
                  className="text-slate-400 hover:text-slate-600"
                >
                  {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tema değiştir</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Avatar>
            <AvatarImage src="Buraya avatar resmi gelecek" alt="Manager" />
            <AvatarFallback
              className={`${theme === "dark" ? "bg-slate-700 text-orange-500" : "bg-orange-100 text-orange-600"}`}
            >
              MG
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

// Placeholder components for recovery
function LocalButton({ children, variant, size, className, onClick }: any) {
  return <button className={className} onClick={onClick}>{children}</button>
}

function LocalBadge({ children, variant, className }: any) {
  return <span className={className}>{children}</span>
}

function LocalAvatar({ children }: any) {
  return <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">{children}</div>
}

function LocalAvatarImage({ src, alt }: any) {
  return <img src={src} alt={alt} className="w-8 h-8 rounded-full" />
}

function LocalAvatarFallback({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function LocalTooltipProvider({ children }: any) {
  return <div>{children}</div>
}

function LocalTooltip({ children }: any) {
  return <div>{children}</div>
}

function LocalTooltipTrigger({ children, asChild }: any) {
  return <div>{children}</div>
}

function LocalTooltipContent({ children }: any) {
  return <div className="bg-black text-white px-2 py-1 rounded text-sm">{children}</div>
} 