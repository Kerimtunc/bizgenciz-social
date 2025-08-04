// ==========================================
// RIGHT SIDEBAR COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/RightSidebar.tsx
// Satır Sayısı: 212 satır

"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ActionButton } from "./action-button"
import { ShoppingCart, Users, Package, CreditCard, Wifi, Coffee, Clock, PieChart } from "lucide-react"

interface RightSidebarProps {
  theme: "dark" | "light"
  currentTime: Date | null
  tableOccupancy: number
}

export function RightSidebar({ theme, currentTime, tableOccupancy }: RightSidebarProps) {
  const formatTime = (date: Date | null) => {
    if (!date) return "--:--"
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "-- --- ----"
    return date.toLocaleDateString("tr-TR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <div className="grid gap-6">
      {/* Current time */}
      <Card
        className={`${
          theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
        } backdrop-blur-sm overflow-hidden`}
      >
        <CardContent className="p-0">
          <div
            className={`${
              theme === "dark"
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50"
                : "bg-gradient-to-br from-orange-100 to-amber-100 border-orange-200"
            } p-6 border-b`}
          >
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1 font-semibold">GÜNCEL SAAT</div>
              <div className="text-3xl font-bold text-orange-500 mb-1">{formatTime(currentTime)}</div>
              <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`${
                  theme === "dark" ? "bg-slate-800/50 border-slate-700/50" : "bg-orange-50/50 border-orange-200"
                } rounded-md p-3 border`}
              >
                <div className="text-xs text-slate-500 mb-1">Açılış Saati</div>
                <div className="text-sm font-semibold text-slate-600">Buraya açılış saati gelecek</div>
              </div>
              <div
                className={`${
                  theme === "dark" ? "bg-slate-800/50 border-slate-700/50" : "bg-orange-50/50 border-orange-200"
                } rounded-md p-3 border`}
              >
                <div className="text-xs text-slate-500 mb-1">Kapanış Saati</div>
                <div className="text-sm font-semibold text-slate-600">Buraya kapanış saati gelecek</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <Card
        className={`${
          theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
        } backdrop-blur-sm`}
      >
        <CardHeader className="pb-2">
          <CardTitle className={`${theme === "dark" ? "text-slate-100" : "text-slate-800"} text-base`}>
            Hızlı İşlemler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <ActionButton icon={ShoppingCart} label="Yeni Sipariş" theme={theme} />
            <ActionButton icon={Users} label="Masa Durumu" theme={theme} />
            <ActionButton icon={Package} label="Stok Kontrol" theme={theme} />
            <ActionButton icon={CreditCard} label="Kasa Raporu" theme={theme} />
          </div>
        </CardContent>
      </Card>

      {/* Table status */}
      <Card
        className={`${
          theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
        } backdrop-blur-sm`}
      >
        <CardHeader className="pb-2">
          <CardTitle className={`${theme === "dark" ? "text-slate-100" : "text-slate-800"} text-base`}>
            Masa Durumu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-slate-400">Dolu Masalar</div>
                <div className="text-xs text-red-500">Buraya dolu masa sayısı gelecek</div>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-slate-400">Rezerveli Masalar</div>
                <div className="text-xs text-blue-500">Buraya rezerve masa sayısı gelecek</div>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  style={{ width: "13%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-slate-400">Boş Masalar</div>
                <div className="text-xs text-green-500">Buraya boş masa sayısı gelecek</div>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  style={{ width: "7%" }}
                ></div>
              </div>
            </div>

            <div className={`pt-2 border-t ${theme === "dark" ? "border-slate-700/50" : "border-orange-200"}`}>
              <div className="flex items-center justify-between text-sm">
                <div className="text-slate-400">Ortalama Oturma Süresi</div>
                <div className="text-orange-500 font-semibold">Buraya süre gelecek</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Restaurant settings */}
      <Card
        className={`${
          theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
        } backdrop-blur-sm`}
      >
        <CardHeader className="pb-2">
          <CardTitle className={`${theme === "dark" ? "text-slate-100" : "text-slate-800"} text-base`}>
            Restoran Ayarları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wifi className="text-orange-500 mr-2 h-4 w-4" />
                <Label className="text-sm text-slate-400">WiFi Müşteri Erişimi</Label>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Coffee className="text-orange-500 mr-2 h-4 w-4" />
                <Label className="text-sm text-slate-400">Kahve Makinesi</Label>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="text-orange-500 mr-2 h-4 w-4" />
                <Label className="text-sm text-slate-400">Otomatik Sipariş Bildirimi</Label>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <PieChart className="text-orange-500 mr-2 h-4 w-4" />
                <Label className="text-sm text-slate-400">Günlük Rapor</Label>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 