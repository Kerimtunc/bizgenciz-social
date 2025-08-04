// ==========================================
// TABLES RIGHT SIDEBAR COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/TablesRightSidebar.tsx
// Satır Sayısı: 297 satır

"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Coffee,
  Utensils,
  CreditCard,
  BarChart3,
  Timer,
  UserPlus,
  Settings
} from "lucide-react"

interface TablesRightSidebarProps {
  theme: "dark" | "light"
}

export function TablesRightSidebar({ theme }: TablesRightSidebarProps) {
  // TODO: API entegrasyonu - Gerçek veri kullanılacak
  const floorStats = {
    totalTables: 0, // TODO: Buraya toplam masa sayısı gelecek
    occupiedTables: 0, // TODO: Buraya dolu masa sayısı gelecek
    reservedTables: 0, // TODO: Buraya rezerve masa sayısı gelecek
    availableTables: 0, // TODO: Buraya boş masa sayısı gelecek
    averageOccupancy: 0 // TODO: Buraya ortalama doluluk oranı gelecek
  }

  const locationStats = [
    { name: "Buraya bölge adı gelecek", total: 0, occupied: 0, reserved: 0, available: 0 },
    { name: "Buraya bölge adı gelecek", total: 0, occupied: 0, reserved: 0, available: 0 },
    { name: "Buraya bölge adı gelecek", total: 0, occupied: 0, reserved: 0, available: 0 }
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Buraya aktivite metni gelecek",
      time: "Buraya zaman gelecek",
      type: "available",
      table: "Buraya masa adı gelecek"
    },
    {
      id: 2,
      action: "Buraya aktivite metni gelecek",
      time: "Buraya zaman gelecek", 
      type: "reserved",
      table: "Buraya masa adı gelecek"
    },
    {
      id: 3,
      action: "Buraya aktivite metni gelecek",
      time: "Buraya zaman gelecek",
      type: "bill",
      table: "Buraya masa adı gelecek"
    },
    {
      id: 4,
      action: "Buraya aktivite metni gelecek",
      time: "Buraya zaman gelecek",
      type: "service",
      table: "Buraya masa adı gelecek"
    }
  ]

  const urgentTables = [
    { id: "Buraya masa ID gelecek", reason: "Buraya sebep gelecek", type: "long-stay" },
    { id: "Buraya masa ID gelecek", reason: "Buraya sebep gelecek", type: "bill" },
    { id: "Buraya masa ID gelecek", reason: "Buraya sebep gelecek", type: "service" }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "available": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "reserved": return <Clock className="h-4 w-4 text-blue-500" />
      case "bill": return <CreditCard className="h-4 w-4 text-orange-500" />
      case "service": return <Coffee className="h-4 w-4 text-purple-500" />
      default: return <Users className="h-4 w-4 text-gray-500" />
    }
  }

  const getUrgentIcon = (type: string) => {
    switch (type) {
      case "long-stay": return <Timer className="h-4 w-4 text-yellow-500" />
      case "bill": return <CreditCard className="h-4 w-4 text-orange-500" />
      case "service": return <Coffee className="h-4 w-4 text-purple-500" />
      default: return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <div className="grid gap-6">
      {/* Floor Overview */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
            Genel Durum
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className={`${
              theme === "dark" ? "bg-slate-800/50" : "bg-red-50"
            } rounded-lg p-3 text-center`}>
              <div className="text-2xl font-bold text-red-500">{floorStats.occupiedTables}</div>
              <div className="text-xs text-slate-600">Dolu Masa</div>
            </div>
            <div className={`${
              theme === "dark" ? "bg-slate-800/50" : "bg-green-50"
            } rounded-lg p-3 text-center`}>
              <div className="text-2xl font-bold text-green-500">{floorStats.availableTables}</div>
              <div className="text-xs text-slate-600">Boş Masa</div>
            </div>
          </div>
          
          <div className={`${
            theme === "dark" ? "bg-slate-800/50" : "bg-blue-50"
          } rounded-lg p-3 text-center`}>
            <div className="text-2xl font-bold text-blue-500">{floorStats.reservedTables}</div>
            <div className="text-xs text-slate-600">Rezerveli Masa</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Doluluk Oranı</span>
              <span className="text-xs text-orange-500">%{floorStats.averageOccupancy}</span>
            </div>
            <Progress value={floorStats.averageOccupancy} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Location Breakdown */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-green-500" />
            Bölge Dağılımı
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {locationStats.map((location, index) => (
            <div key={index} className={`${
              theme === "dark" ? "bg-slate-800/50" : "bg-slate-50"
            } rounded-lg p-3`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">{location.name}</span>
                <span className="text-xs text-slate-500">
                  {location.occupied + location.reserved}/{location.total}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-red-500 font-bold">{location.occupied}</div>
                  <div className="text-slate-600">Dolu</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-500 font-bold">{location.reserved}</div>
                  <div className="text-slate-600">Rezerve</div>
                </div>
                <div className="text-center">
                  <div className="text-green-500 font-bold">{location.available}</div>
                  <div className="text-slate-600">Boş</div>
                </div>
              </div>
              <Progress 
                value={((location.occupied + location.reserved) / location.total) * 100} 
                className="h-1 mt-2" 
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Urgent Attention */}
      {urgentTables.length > 0 && (
        <Card className={`${
          theme === "dark" ? "bg-red-900/20 border-red-700/50" : "bg-red-50 border-red-200"
        } backdrop-blur-sm`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
              Dikkat Gereken Masalar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgentTables.map((table) => (
              <div key={table.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getUrgentIcon(table.type)}
                  <div>
                    <div className="font-medium text-sm">Masa {table.id}</div>
                    <div className="text-xs text-slate-600">{table.reason}</div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-6 text-xs">
                  İncele
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Clock className="h-4 w-4 mr-2 text-purple-500" />
            Son Aktiviteler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <div className="text-sm font-medium">{activity.action}</div>
                <div className="text-xs text-slate-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Utensils className="h-4 w-4 mr-2 text-orange-500" />
            Hızlı İşlemler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Masa Ata
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Rezervasyon Al
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Toplu Temizle
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Masa Düzeni
          </Button>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Timer className="h-4 w-4 mr-2 text-indigo-500" />
            Performans
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Ortalama Oturma</span>
            <span className="font-bold text-indigo-500">Buraya süre gelecek</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Devir Hızı</span>
            <span className="font-bold text-green-500">Buraya hız gelecek</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Günlük Kapasite</span>
            <span className="font-bold text-orange-500">Buraya kapasite gelecek</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Placeholder components for recovery
function Card({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function CardContent({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function CardHeader({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function CardTitle({ children, className }: any) {
  return <h3 className={className}>{children}</h3>
}

function Button({ children, variant, className, size }: any) {
  return <button className={className}>{children}</button>
}

function Badge({ children, variant, className }: any) {
  return <span className={className}>{children}</span>
}

function Progress({ value, className }: any) {
  return <div className={className}><div style={{width: `${value}%`}} className="h-full bg-blue-500 rounded"></div></div>
} 