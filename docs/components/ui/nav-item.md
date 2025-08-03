// ==========================================
// NAV ITEM COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/NavItem.tsx
// Satır Sayısı: 37 satır

import React from "react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItemProps {
  icon: LucideIcon
  label: string
  active?: boolean
  theme: string
  onClick: () => void
}

export function NavItem({
  icon: Icon,
  label,
  active,
  theme,
  onClick,
}: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        active
          ? theme === "dark"
            ? "bg-slate-800/70 text-orange-400"
            : "bg-orange-100 text-orange-600"
          : theme === "dark"
            ? "text-slate-400 hover:text-slate-100"
            : "text-slate-600 hover:text-slate-800"
      }`}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Placeholder components for recovery
function LocalButton({ children, variant, className, onClick }: any) {
  return <button onClick={onClick} className={className}>{children}</button>
} 