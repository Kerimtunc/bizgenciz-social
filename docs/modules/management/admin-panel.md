// ==========================================
// ADMIN PANEL SAYFASI (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/admin/page.tsx
// Satır Sayısı: 265 satır

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  Building2,
  CreditCard,
  DollarSign,
  Globe,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

export default function AdminDashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [stats, setStats] = useState({
    totalTenants: 0,
    activeTenants: 0,
    monthlyRevenue: 0,
    totalOrders: 0,
    platformUptime: 99.9,
    supportTickets: 0,
  })

  useEffect(() => {
    // Mock data - gerçek API'den gelecek
    setStats({
      totalTenants: 156,
      activeTenants: 142,
      monthlyRevenue: 45600,
      totalOrders: 12450,
      platformUptime: 99.9,
      supportTickets: 23,
    })
  }, [])

  const metricCards = [
    {
      title: "Buraya toplam tenant başlığı gelecek",
      value: stats.totalTenants,
      icon: Building2,
      color: "blue",
      description: "Buraya kayıtlı restoranlar açıklaması gelecek",
      change: "Buraya değişim yüzdesi gelecek",
      changeType: "positive" as const,
    },
    {
      title: "Buraya aktif tenant başlığı gelecek",
      value: stats.activeTenants,
      icon: Users,
      color: "green",
      description: "Buraya aktif abonelikler açıklaması gelecek",
      change: "Buraya değişim yüzdesi gelecek",
      changeType: "positive" as const,
    },
    {
      title: "Buraya aylık gelir başlığı gelecek",
      value: `Buraya para birimi gelecek${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "yellow",
      description: "Buraya bu ay açıklaması gelecek",
      change: "Buraya değişim yüzdesi gelecek",
      changeType: "positive" as const,
    },
    {
      title: "Buraya toplam sipariş başlığı gelecek",
      value: stats.totalOrders.toLocaleString(),
      icon: BarChart3,
      color: "purple",
      description: "Buraya bu ay açıklaması gelecek",
      change: "Buraya değişim yüzdesi gelecek",
      changeType: "positive" as const,
    },
    {
      title: "Buraya platform uptime başlığı gelecek",
      value: `${stats.platformUptime}Buraya yüzde işareti gelecek`,
      icon: Zap,
      color: "green",
      description: "Buraya son 30 gün açıklaması gelecek",
      change: "Buraya değişim yüzdesi gelecek",
      changeType: "positive" as const,
    },
    {
      title: "Buraya destek talepleri başlığı gelecek",
      value: stats.supportTickets,
      icon: Globe,
      color: "orange",
      description: "Buraya açık talepler açıklaması gelecek",
      change: "Buraya değişim yüzdesi gelecek",
      changeType: "negative" as const,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Buraya platform dashboard başlığı gelecek
          </h1>
          <p className={`mt-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            Buraya QR Menu Elite platform geneli istatistikler ve performans metrikleri açıklaması gelecek
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            Buraya son güncelleme metni gelecek: {new Date().toLocaleString('tr-TR')}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          const colorClasses = {
            blue: theme === "dark" ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600",
            green: theme === "dark" ? "bg-green-500/20 text-green-400" : "bg-green-50 text-green-600",
            yellow: theme === "dark" ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-50 text-yellow-600",
            purple: theme === "dark" ? "bg-purple-500/20 text-purple-400" : "bg-purple-50 text-purple-600",
            orange: theme === "dark" ? "bg-orange-500/20 text-orange-400" : "bg-orange-50 text-orange-600",
          }

          return (
            <Card key={index} className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {metric.value}
                </div>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {metric.description}
                </p>
                <div className={`flex items-center mt-2 text-xs ${
                  metric.changeType === "positive" 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  <TrendingUp className={`w-3 h-3 mr-1 ${
                    metric.changeType === "negative" ? "rotate-180" : ""
                  }`} />
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
          <CardHeader>
            <CardTitle className={`${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Buraya hızlı işlemler başlığı gelecek
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                theme === "dark" 
                  ? "border-slate-600 hover:border-slate-500 hover:bg-slate-700" 
                  : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
              }`}>
                <Building2 className={`w-6 h-6 mx-auto mb-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                <div className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  Buraya yeni tenant ekle metni gelecek
                </div>
              </button>
              <button className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                theme === "dark" 
                  ? "border-slate-600 hover:border-slate-500 hover:bg-slate-700" 
                  : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
              }`}>
                <CreditCard className={`w-6 h-6 mx-auto mb-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                <div className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  Buraya fatura oluştur metni gelecek
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
          <CardHeader>
            <CardTitle className={`${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Buraya sistem durumu başlığı gelecek
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  Buraya API servisleri metni gelecek
                </span>
                <span className="text-green-600 text-sm font-medium">Buraya aktif etiketi gelecek</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  Buraya veritabanı metni gelecek
                </span>
                <span className="text-green-600 text-sm font-medium">Buraya aktif etiketi gelecek</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  Buraya WebSocket metni gelecek
                </span>
                <span className="text-green-600 text-sm font-medium">Buraya aktif etiketi gelecek</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  Buraya CDN metni gelecek
                </span>
                <span className="text-green-600 text-sm font-medium">Buraya aktif etiketi gelecek</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
        <CardHeader>
          <CardTitle className={`${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Buraya son aktiviteler başlığı gelecek
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Buraya yeni tenant eklendi metni gelecek", tenant: "Buraya tenant adı gelecek", time: "Buraya zaman metni gelecek" },
              { action: "Buraya abonelik yenilendi metni gelecek", tenant: "Buraya tenant adı gelecek", time: "Buraya zaman metni gelecek" },
              { action: "Buraya destek talebi açıldı metni gelecek", tenant: "Buraya tenant adı gelecek", time: "Buraya zaman metni gelecek" },
              { action: "Buraya sistem güncellemesi metni gelecek", tenant: "Buraya platform metni gelecek", time: "Buraya zaman metni gelecek" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <div className={`font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                    {activity.action}
                  </div>
                  <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {activity.tenant}
                  </div>
                </div>
                <div className={`text-sm ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ==========================================
// PLACEHOLDER UI COMPONENTS
// ==========================================

// Card component placeholder
function Card({ children, className }: any) {
  return <div className={className}>{children}</div>
}

// CardContent component placeholder
function CardContent({ children, className }: any) {
  return <div className={className}>{children}</div>
}

// CardHeader component placeholder
function CardHeader({ children, className }: any) {
  return <div className={className}>{children}</div>
}

// CardTitle component placeholder
function CardTitle({ children, className }: any) {
  return <div className={className}>{children}</div>
} 