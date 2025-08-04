// ==========================================
// LOYALTY RIGHT SIDEBAR COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/LoyaltyRightSidebar.tsx
// Satır Sayısı: 267 satır

"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Crown, 
  TrendingUp, 
  Gift, 
  Users, 
  Star,
  Plus,
  UserPlus,
  Trophy,
  Clock,
  Target,
  Zap
} from "lucide-react"

interface LoyaltyRightSidebarProps {
  theme: "dark" | "light"
}

export function LoyaltyRightSidebar({ theme }: LoyaltyRightSidebarProps) {
  // TODO: API entegrasyonu - Gerçek veri kullanılacak
  const topCustomers = [
    {
      id: 1,
      name: "Buraya müşteri adı gelecek",
      avatar: "Buraya avatar resmi gelecek",
      tier: "Buraya seviye gelecek",
      points: 0, // TODO: Buraya puan gelecek
      tierColor: "bg-purple-600"
    },
    {
      id: 2,
      name: "Buraya müşteri adı gelecek", 
      avatar: "Buraya avatar resmi gelecek",
      tier: "Buraya seviye gelecek",
      points: 0, // TODO: Buraya puan gelecek
      tierColor: "bg-yellow-500"
    },
    {
      id: 3,
      name: "Buraya müşteri adı gelecek",
      avatar: "Buraya avatar resmi gelecek",
      tier: "Buraya seviye gelecek",
      points: 0, // TODO: Buraya puan gelecek
      tierColor: "bg-gray-400"
    }
  ]

  const todayStats = {
    newMembers: 0, // TODO: Buraya yeni üye sayısı gelecek
    pointsRedeemed: 0, // TODO: Buraya kullanılan puan gelecek
    rewardsGiven: 0, // TODO: Buraya verilen ödül sayısı gelecek
    upgradesCount: 0 // TODO: Buraya seviye yükseltme sayısı gelecek
  }

  const weeklyGoals = {
    newMembersTarget: 0, // TODO: Buraya hedef gelecek
    newMembersCurrent: 0, // TODO: Buraya mevcut sayı gelecek
    pointsTarget: 0, // TODO: Buraya hedef gelecek
    pointsCurrent: 0, // TODO: Buraya mevcut sayı gelecek
    rewardsTarget: 0, // TODO: Buraya hedef gelecek
    rewardsCurrent: 0 // TODO: Buraya mevcut sayı gelecek
  }

  return (
    <div className="grid gap-6">
      {/* Today's Loyalty Stats */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Star className="h-4 w-4 mr-2 text-yellow-500" />
            Bugünkü Sadakat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className={`${
              theme === "dark" ? "bg-slate-800/50" : "bg-blue-50"
            } rounded-lg p-3 text-center`}>
              <div className="text-2xl font-bold text-blue-500">{todayStats.newMembers}</div>
              <div className="text-xs text-slate-600">Yeni Üye</div>
            </div>
            <div className={`${
              theme === "dark" ? "bg-slate-800/50" : "bg-green-50"
            } rounded-lg p-3 text-center`}>
              <div className="text-2xl font-bold text-green-500">{todayStats.pointsRedeemed}</div>
              <div className="text-xs text-slate-600">Kullanılan Puan</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className={`${
              theme === "dark" ? "bg-slate-800/50" : "bg-purple-50"
            } rounded-lg p-3 text-center`}>
              <div className="text-2xl font-bold text-purple-500">{todayStats.rewardsGiven}</div>
              <div className="text-xs text-slate-600">Verilen Ödül</div>
            </div>
            <div className={`${
              theme === "dark" ? "bg-slate-800/50" : "bg-orange-50"
            } rounded-lg p-3 text-center`}>
              <div className="text-2xl font-bold text-orange-500">{todayStats.upgradesCount}</div>
              <div className="text-xs text-slate-600">Seviye Yükseltme</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Customers */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Crown className="h-4 w-4 mr-2 text-yellow-500" />
            En Sadık Müşteriler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topCustomers.map((customer, index) => (
            <div key={customer.id} className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                }`}>
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{customer.name}</p>
                  <Badge className={`${customer.tierColor} text-white text-xs`}>
                    {customer.tier}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">{customer.points.toLocaleString()} puan</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Target className="h-4 w-4 mr-2 text-green-500" />
            Haftalık Hedefler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-600">Yeni Üyeler</span>
              <span className="text-xs text-slate-500">
                {weeklyGoals.newMembersCurrent}/{weeklyGoals.newMembersTarget}
              </span>
            </div>
            <Progress 
              value={(weeklyGoals.newMembersCurrent / weeklyGoals.newMembersTarget) * 100} 
              className="h-2"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-600">Puan Dağıtımı</span>
              <span className="text-xs text-slate-500">
                {weeklyGoals.pointsCurrent.toLocaleString()}/{weeklyGoals.pointsTarget.toLocaleString()}
              </span>
            </div>
            <Progress 
              value={(weeklyGoals.pointsCurrent / weeklyGoals.pointsTarget) * 100} 
              className="h-2"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-600">Verilen Ödüller</span>
              <span className="text-xs text-slate-500">
                {weeklyGoals.rewardsCurrent}/{weeklyGoals.rewardsTarget}
              </span>
            </div>
            <Progress 
              value={(weeklyGoals.rewardsCurrent / weeklyGoals.rewardsTarget) * 100} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className={`${
        theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"
      } backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Zap className="h-4 w-4 mr-2 text-blue-500" />
            Hızlı İşlemler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Yeni Üye Ekle
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Gift className="h-4 w-4 mr-2" />
            Kampanya Oluştur
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Trophy className="h-4 w-4 mr-2" />
            Seviye Yükselt
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Puan Raporu
          </Button>
        </CardContent>
      </Card>

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
          <div className="text-sm space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-slate-600">Buraya aktivite metni gelecek</span>
              <span className="text-xs text-slate-400 ml-auto">Buraya zaman gelecek</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-slate-600">Buraya aktivite metni gelecek</span>
              <span className="text-xs text-slate-400 ml-auto">Buraya zaman gelecek</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-slate-600">Buraya aktivite metni gelecek</span>
              <span className="text-xs text-slate-400 ml-auto">Buraya zaman gelecek</span>
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

function LocalCardHeader({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function LocalCardTitle({ children, className }: any) {
  return <h3 className={className}>{children}</h3>
}

function LocalButton({ children, variant, className, size }: any) {
  return <button className={className}>{children}</button>
}

function LocalBadge({ children, variant, className }: any) {
  return <span className={className}>{children}</span>
}

function LocalProgress({ value, className }: any) {
  return <div className={className}><div style={{width: `${value}%`}} className="h-full bg-blue-500 rounded"></div></div>
}

function LocalAvatar({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function LocalAvatarImage({ src, alt, className }: any) {
  return <img src={src} alt={alt} className={className} />
}

function LocalAvatarFallback({ children, className }: any) {
  return <div className={className}>{children}</div>
} 