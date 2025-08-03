// ==========================================
// ORDERS RIGHT SIDEBAR COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/OrdersRightSidebar.tsx
// Satır Sayısı: 287 satır

"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Clock, 
  ChefHat, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Timer,
  Utensils,
  Package,
  DollarSign,
  Users,
  BarChart3,
  Bell
} from "lucide-react"

interface OrdersRightSidebarProps {
  theme: "dark" | "light"
}

export function OrdersRightSidebar({ theme }: OrdersRightSidebarProps) {
  // TODO: API entegrasyonu - Gerçek veri kullanılacak
  const kitchenStatus = {
    activeOrders: 0, // TODO: Buraya aktif sipariş sayısı gelecek
    preparingOrders: 0, // TODO: Buraya hazırlanan sipariş sayısı gelecek
    readyOrders: 0, // TODO: Buraya hazır sipariş sayısı gelecek
    delayedOrders: 0, // TODO: Buraya geciken sipariş sayısı gelecek
    averageTime: 0 // TODO: Buraya ortalama süre gelecek
  }

  const todayStats = {
    totalOrders: 0, // TODO: Buraya toplam sipariş sayısı gelecek
    completedOrders: 0, // TODO: Buraya tamamlanan sipariş sayısı gelecek
    cancelledOrders: 0, // TODO: Buraya iptal edilen sipariş sayısı gelecek
    revenue: 0 // TODO: Buraya günlük ciro gelecek
  }

  const recentOrders = [
    {
      id: "Buraya sipariş ID gelecek",
      table: "Buraya masa adı gelecek",
      items: ["Buraya ürün adı gelecek", "Buraya ürün adı gelecek"],
      status: "preparing",
      time: "Buraya süre gelecek",
      priority: "normal"
    },
    {
      id: "Buraya sipariş ID gelecek", 
      table: "Buraya masa adı gelecek",
      items: ["Buraya ürün adı gelecek", "Buraya ürün adı gelecek"],
      status: "ready",
      time: "Buraya süre gelecek",
      priority: "high"
    },
    {
      id: "Buraya sipariş ID gelecek",
      table: "Buraya masa adı gelecek",
      items: ["Buraya ürün adı gelecek"],
      status: "delayed",
      time: "Buraya süre gelecek",
      priority: "urgent"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing": return "bg-blue-500"
      case "ready": return "bg-green-500"
      case "delayed": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing": return "Hazırlanıyor"
      case "ready": return "Hazır"
      case "delayed": return "Gecikmiş"
      default: return "Bilinmiyor"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-500"
      case "high": return "text-orange-500"
      case "normal": return "text-slate-600"
      default: return "text-slate-600"
    }
  }

  return (
    <div className="grid gap-6">
      {/* Kitchen Status */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <ChefHat className="h-4 w-4 mr-2 text-orange-500" />
            Mutfak Durumu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className={`${
              theme === "dark" ? "bg-slate-800/50" : "bg-blue-50"
            } rounded-lg p-3 text-center`}>
              <div className="text-2xl font-bold text-blue-500">{kitchenStatus.activeOrders}</div>
              <div className="text-xs text-slate-600">Aktif Sipariş</div>
            </div>
            <div className={`${
              theme === "dark" ? "bg-slate-800/50" : "bg-green-50"
            } rounded-lg p-3 text-center`}>
              <div className="text-2xl font-bold text-green-500">{kitchenStatus.readyOrders}</div>
              <div className="text-xs text-slate-600">Hazır Sipariş</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Hazırlanıyor</span>
              <span className="text-xs text-blue-500">{kitchenStatus.preparingOrders}</span>
            </div>
            <Progress value={(kitchenStatus.preparingOrders / kitchenStatus.activeOrders) * 100} className="h-2" />
          </div>

          <div className={`${
            theme === "dark" ? "bg-slate-800/50" : "bg-orange-50"
          } rounded-lg p-3 flex items-center justify-between`}>
            <div className="flex items-center">
              <Timer className="h-4 w-4 mr-2 text-orange-500" />
              <span className="text-sm text-slate-600">Ortalama Süre</span>
            </div>
            <span className="font-bold text-orange-500">{kitchenStatus.averageTime} dk</span>
          </div>

          {kitchenStatus.delayedOrders > 0 && (
            <div className={`${
              theme === "dark" ? "bg-red-900/20" : "bg-red-50"
            } rounded-lg p-3 flex items-center justify-between border border-red-200`}>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                <span className="text-sm text-red-600">Geciken Sipariş</span>
              </div>
              <span className="font-bold text-red-500">{kitchenStatus.delayedOrders}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Today's Stats */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
            Günlük İstatistikler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{todayStats.totalOrders}</div>
              <div className="text-xs text-slate-600">Toplam Sipariş</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{todayStats.completedOrders}</div>
              <div className="text-xs text-slate-600">Tamamlanan</div>
            </div>
          </div>
          
          <div className="text-center pt-2">
            <div className="text-2xl font-bold text-orange-500">{todayStats.revenue.toLocaleString()} ₺</div>
            <div className="text-xs text-slate-600">Günlük Ciro</div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-200">
            <span className="text-sm text-slate-600">Başarı Oranı</span>
            <span className="font-bold text-green-500">
              {Math.round((todayStats.completedOrders / todayStats.totalOrders) * 100)}%
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Clock className="h-4 w-4 mr-2 text-purple-500" />
            Son Siparişler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className={`${
              theme === "dark" ? "bg-slate-800/50" : "bg-slate-50"
            } rounded-lg p-3`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{order.id}</span>
                  <Badge variant="outline" className="text-xs">{order.table}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></div>
                  <span className="text-xs text-slate-600">{getStatusText(order.status)}</span>
                </div>
              </div>
              <div className="text-xs text-slate-600 mb-2">
                {order.items.join(", ")}
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs font-medium ${getPriorityColor(order.priority)}`}>
                  {order.time}
                </span>
                {order.status === "ready" && (
                  <Button size="sm" variant="outline" className="h-6 text-xs">
                    Teslim Et
                  </Button>
                )}
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
            <Utensils className="h-4 w-4 mr-2 text-green-500" />
            Hızlı İşlemler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Package className="h-4 w-4 mr-2" />
            Yeni Sipariş Al
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Mutfağa Bildir
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Toplu Teslim
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Sipariş Raporu
          </Button>
        </CardContent>
      </Card>

      {/* Priority Alert */}
      {kitchenStatus.delayedOrders > 0 && (
        <Card className={`${
          theme === "dark" ? "bg-red-900/20 border-red-700/50" : "bg-red-50 border-red-200"
        } backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <h4 className="font-semibold text-red-700">Dikkat!</h4>
                <p className="text-sm text-red-600">
                  {kitchenStatus.delayedOrders} sipariş gecikmiş durumda
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 