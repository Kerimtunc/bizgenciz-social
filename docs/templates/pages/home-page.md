// ==========================================
// ANA SAYFA (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/page.tsx
// Satır Sayısı: 274 satır

"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  QrCode, 
  Smartphone, 
  Settings, 
  BarChart3, 
  Users, 
  ShoppingCart,
  ChefHat,
  ArrowRight,
  Star,
  CheckCircle,
  Crown
} from "lucide-react"
import { AccessibilityTester } from "@/components/accessibility/AccessibilityTester"

export default function HomePage() {
  const router = useRouter()
  
  const handlePanelClick = () => {
    console.log("Router push to /panel")
    router.push("/panel")
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log("Link clicked, manual navigation")
    window.location.href = "/panel"
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Buraya işletme adı gelecek</h1>
                <p className="text-xs text-slate-500">Buraya işletme açıklaması gelecek</p>
              </div>
            </div>
            
            <Link href="/panel" onClick={handleLinkClick}>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Settings className="h-4 w-4 mr-2" />
                Yönetim Paneli
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-600 border-orange-300">
            <Crown className="h-3 w-3 mr-1" />
            Buraya badge metni gelecek
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Buraya ana başlık gelecek
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Buraya alt başlık gelecek
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Buraya hero açıklaması gelecek
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/panel">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                <Settings className="h-5 w-5 mr-2" />
                Buraya CTA buton metni gelecek
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/menu">
              <Button size="lg" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50 text-lg">
                <ChefHat className="h-5 w-5 mr-2" />
                Buraya menü buton metni gelecek
              </Button>
            </Link>
            <Link href="/menu2">
              <Button size="lg" variant="outline" className="border-purple-400 text-purple-600 hover:bg-purple-50 text-lg bg-gradient-to-r from-purple-50 to-indigo-50">
                <Star className="h-5 w-5 mr-2" />
                Buraya ikinci menü buton metni gelecek
              </Button>
            </Link>
            <button 
              onClick={() => {
                console.log("Button clicked, navigating to /panel")
                window.location.href = "/panel"
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg mr-2"
            >
              Buraya debug buton metni gelecek
            </button>
            <button 
              onClick={handlePanelClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg rounded-lg"
            >
              Buraya router buton metni gelecek
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/70 border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl text-slate-800">Buraya özellik başlığı gelecek</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Buraya özellik açıklaması gelecek
              </p>
              <div className="mt-4 flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Buraya özellik etiketi gelecek</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-slate-800">Buraya özellik başlığı gelecek</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Buraya özellik açıklaması gelecek
              </p>
              <div className="mt-4 flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Buraya özellik etiketi gelecek</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-slate-800">Buraya özellik başlığı gelecek</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Buraya özellik açıklaması gelecek
              </p>
              <div className="mt-4 flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Buraya özellik etiketi gelecek</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl text-slate-800">Buraya özellik başlığı gelecek</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Buraya özellik açıklaması gelecek
              </p>
              <div className="mt-4 flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Buraya özellik etiketi gelecek</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="text-xl text-slate-800">Buraya özellik başlığı gelecek</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Buraya özellik açıklaması gelecek
              </p>
              <div className="mt-4 flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Buraya özellik etiketi gelecek</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl text-slate-800">Buraya özellik başlığı gelecek</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Buraya özellik açıklaması gelecek
              </p>
              <div className="mt-4 flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Buraya özellik etiketi gelecek</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Buraya CTA başlığı gelecek</h2>
          <p className="text-xl mb-8 opacity-90">
            Buraya CTA açıklaması gelecek
          </p>
          <Link href="/panel">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold">
              <Settings className="h-5 w-5 mr-2" />
              Buraya CTA buton metni gelecek
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <ChefHat className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Buraya footer başlığı gelecek</span>
          </div>
          <p className="text-slate-400">
            Buraya footer açıklaması gelecek
          </p>
        </div>
      </footer>
      
      {/* Erişilebilirlik Test Component'i */}
      <AccessibilityTester />
    </div>
  )
}

// ==========================================
// PLACEHOLDER UI COMPONENTS
// ==========================================

// Button component placeholder
function Button({ children, className, variant, size, onClick }: any) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

// Card components placeholder
function Card({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function CardHeader({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function CardTitle({ children, className }: any) {
  return <h3 className={className}>{children}</h3>
}

function CardContent({ children, className }: any) {
  return <div className={className}>{children}</div>
}

// Badge component placeholder
function Badge({ children, className }: any) {
  return <span className={className}>{children}</span>
}

// Link component placeholder
function Link({ href, children, onClick }: any) {
  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  )
}

// AccessibilityTester component placeholder
function AccessibilityTester() {
  return <div className="sr-only">Accessibility tester</div>
} 