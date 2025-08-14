"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import {
  Search,
  Users,
  GraduationCap,
  Rocket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// BizGenciz Grup Veri Yapısı
const groupData = {
  akademik: [
    {
      id: 1,
      grupAdi: "Bilgisayar Mühendisliği",
      fakulte: "Mühendislik-Mimarlık Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/bilgisayar-muhendisligi",
      uyeSayisi: 150,
      aciklama: "Bilgisayar mühendisliği öğrencileri için akademik destek grubu"
    },
    {
      id: 2,
      grupAdi: "Elektrik-Elektronik Mühendisliği",
      fakulte: "Mühendislik-Mimarlık Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/elektrik-elektronik",
      uyeSayisi: 120,
      aciklama: "Elektrik-Elektronik mühendisliği öğrencileri için akademik destek grubu"
    },
    {
      id: 3,
      grupAdi: "Makine Mühendisliği",
      fakulte: "Mühendislik-Mimarlık Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/makine-muhendisligi",
      uyeSayisi: 95,
      aciklama: "Makine mühendisliği öğrencileri için akademik destek grubu"
    },
    {
      id: 4,
      grupAdi: "İnşaat Mühendisliği",
      fakulte: "Mühendislik-Mimarlık Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/insaat-muhendisligi",
      uyeSayisi: 110,
      aciklama: "İnşaat mühendisliği öğrencileri için akademik destek grubu"
    },
    {
      id: 5,
      grupAdi: "Endüstri Mühendisliği",
      fakulte: "Mühendislik-Mimarlık Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/endustri-muhendisligi",
      uyeSayisi: 85,
      aciklama: "Endüstri mühendisliği öğrencileri için akademik destek grubu"
    },
    {
      id: 6,
      grupAdi: "Matematik",
      fakulte: "Fen-Edebiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/matematik",
      uyeSayisi: 75,
      aciklama: "Matematik bölümü öğrencileri için akademik destek grubu"
    },
    {
      id: 7,
      grupAdi: "Fizik",
      fakulte: "Fen-Edebiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/fizik",
      uyeSayisi: 60,
      aciklama: "Fizik bölümü öğrencileri için akademik destek grubu"
    },
    {
      id: 8,
      grupAdi: "Kimya",
      fakulte: "Fen-Edebiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/kimya",
      uyeSayisi: 70,
      aciklama: "Kimya bölümü öğrencileri için akademik destek grubu"
    },
    {
      id: 9,
      grupAdi: "Biyoloji",
      fakulte: "Fen-Edebiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/biyoloji",
      uyeSayisi: 65,
      aciklama: "Biyoloji bölümü öğrencileri için akademik destek grubu"
    },
    {
      id: 10,
      grupAdi: "Tıp",
      fakulte: "Tıp Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/tip",
      uyeSayisi: 200,
      aciklama: "Tıp fakültesi öğrencileri için akademik destek grubu"
    },
    {
      id: 11,
      grupAdi: "Diş Hekimliği",
      fakulte: "Diş Hekimliği Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/dis-hekimligi",
      uyeSayisi: 140,
      aciklama: "Diş hekimliği fakültesi öğrencileri için akademik destek grubu"
    },
    {
      id: 12,
      grupAdi: "Eczacılık",
      fakulte: "Eczacılık Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/eczacilik",
      uyeSayisi: 90,
      aciklama: "Eczacılık fakültesi öğrencileri için akademik destek grubu"
    }
  ],
  sosyal: [
    {
      id: 101,
      grupAdi: "Fotoğrafçılık Kulübü",
      kategori: "Sanat & Hobi",
      whatsappLinki: "https://chat.whatsapp.com/fotografcilik",
      uyeSayisi: 45,
      aciklama: "Fotoğrafçılık tutkunları için sosyal grup"
    },
    {
      id: 102,
      grupAdi: "Müzik Kulübü",
      kategori: "Sanat & Hobi",
      whatsappLinki: "https://chat.whatsapp.com/muzik-kulubu",
      uyeSayisi: 60,
      aciklama: "Müzik tutkunları için sosyal grup"
    },
    {
      id: 103,
      grupAdi: "Spor Kulübü",
      kategori: "Spor & Sağlık",
      whatsappLinki: "https://chat.whatsapp.com/spor-kulubu",
      uyeSayisi: 80,
      aciklama: "Spor tutkunları için sosyal grup"
    },
    {
      id: 104,
      grupAdi: "Yemek Kulübü",
      kategori: "Yaşam & Lezzet",
      whatsappLinki: "https://chat.whatsapp.com/yemek-kulubu",
      uyeSayisi: 55,
      aciklama: "Yemek tutkunları için sosyal grup"
    },
    {
      id: 105,
      grupAdi: "Seyahat Kulübü",
      kategori: "Seyahat & Keşif",
      whatsappLinki: "https://chat.whatsapp.com/seyahat-kulubu",
      uyeSayisi: 40,
      aciklama: "Seyahat tutkunları için sosyal grup"
    },
    {
      id: 106,
      grupAdi: "Teknoloji Kulübü",
      kategori: "Teknoloji & İnovasyon",
      whatsappLinki: "https://chat.whatsapp.com/teknoloji-kulubu",
      uyeSayisi: 70,
      aciklama: "Teknoloji tutkunları için sosyal grup"
    }
  ],
  kariyer: [
    {
      id: 201,
      grupAdi: "Staj & İş İlanları",
      kategori: "Kariyer Gelişimi",
      whatsappLinki: "https://chat.whatsapp.com/staj-is-ilanlari",
      uyeSayisi: 300,
      aciklama: "Staj ve iş ilanları paylaşım grubu"
    },
    {
      id: 202,
      grupAdi: "CV & Mülakat Hazırlığı",
      kategori: "Kariyer Gelişimi",
      whatsappLinki: "https://chat.whatsapp.com/cv-mulakat",
      uyeSayisi: 250,
      aciklama: "CV hazırlama ve mülakat teknikleri grubu"
    },
    {
      id: 203,
      grupAdi: "Girişimcilik Kulübü",
      kategori: "Girişimcilik",
      whatsappLinki: "https://chat.whatsapp.com/girisimcilik",
      uyeSayisi: 120,
      aciklama: "Girişimcilik projeleri ve fikirler grubu"
    },
    {
      id: 204,
      grupAdi: "Networking & Mentorluk",
      kategori: "Kariyer Gelişimi",
      whatsappLinki: "https://chat.whatsapp.com/networking",
      uyeSayisi: 180,
      aciklama: "Profesyonel networking ve mentorluk grubu"
    }
  ]
}

export default function BizGencizGroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("akademik")
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Arama fonksiyonu
  const filteredGroups = useMemo(() => {
    const groups = groupData[activeTab as keyof typeof groupData] || []
    if (!searchQuery.trim()) return groups

    return groups.filter(group => 
      group.grupAdi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (('fakulte' in group) && typeof (group as any).fakulte === 'string' && (group as any).fakulte.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (('kategori' in group) && typeof (group as any).kategori === 'string' && (group as any).kategori.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (('aciklama' in group) && typeof (group as any).aciklama === 'string' && (group as any).aciklama.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery, activeTab])

  // Sparkle efekti
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      if (Math.random() < 0.1) {
        const newSparkle = {
          id: Date.now(),
          x,
          y,
          delay: Math.random() * 1000
        }
        setSparkles(prev => [...prev.slice(-10), newSparkle])
      }
    }

    const createSparkle = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.random() * rect.width
      const y = Math.random() * rect.height
      
      const newSparkle = {
        id: Date.now(),
        x,
        y,
        delay: Math.random() * 1000
      }
      setSparkles(prev => [...prev.slice(-5), newSparkle])
    }

    document.addEventListener('mousemove', handleMouseMove)
    const sparkleInterval = setInterval(createSparkle, 2000)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearInterval(sparkleInterval)
    }
  }, [])

  // Grup katılma fonksiyonu
  const handleJoinGroup = (whatsappLink: string, isMainGroup = false) => {
    if (isMainGroup) {
      // Ana grup için özel işlem
      window.open(whatsappLink, '_blank')
    } else {
      // Normal grup için
      window.open(whatsappLink, '_blank')
    }
  }

  // Arama metni vurgulama
  const highlightSearchText = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </span>
      ) : part
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Sparkle Efektleri */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animationDelay: `${sparkle.delay}ms`
          }}
        >
          {/* Sparkles icon was removed from imports, so this will cause an error. */}
          {/* <Sparkles className="w-4 h-4 text-yellow-400" /> */}
        </div>
      ))}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BizGenciz Grupları
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Üniversite hayatınızı daha renkli hale getirmek için akademik, sosyal ve kariyer gruplarımıza katılın!
          </p>
        </div>

        {/* Arama */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Grup ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="akademik" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Akademik
            </TabsTrigger>
            <TabsTrigger value="sosyal" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Sosyal
            </TabsTrigger>
            <TabsTrigger value="kariyer" className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Kariyer
            </TabsTrigger>
          </TabsList>

          {/* Akademik Gruplar */}
          <TabsContent value="akademik" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                          {highlightSearchText(group.grupAdi, searchQuery)}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {'fakulte' in group ? (group as any).fakulte : ''}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {group.aciklama}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {group.uyeSayisi} üye
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        {/* MessageCircle icon was removed from imports, so this will cause an error. */}
                        {/* <MessageCircle className="w-4 h-4 mr-1" /> */}
                        WhatsApp Grubu
                      </div>
                      <Button
                        onClick={() => handleJoinGroup(group.whatsappLinki)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                      >
                        Katıl
                        {/* ChevronRight icon was removed from imports, so this will cause an error. */}
                        {/* <ChevronRight className="w-4 h-4 ml-1" /> */}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sosyal Gruplar */}
          <TabsContent value="sosyal" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                          {highlightSearchText(group.grupAdi, searchQuery)}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {'kategori' in group ? (group as any).kategori : ''}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {group.aciklama}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {group.uyeSayisi} üye
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        {/* MessageCircle icon was removed from imports, so this will cause an error. */}
                        {/* <MessageCircle className="w-4 h-4 mr-1" /> */}
                        WhatsApp Grubu
                      </div>
                      <Button
                        onClick={() => handleJoinGroup(group.whatsappLinki)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                      >
                        Katıl
                        {/* ChevronRight icon was removed from imports, so this will cause an error. */}
                        {/* <ChevronRight className="w-4 h-4 ml-1" /> */}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Kariyer Grupları */}
          <TabsContent value="kariyer" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                          {highlightSearchText(group.grupAdi, searchQuery)}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {'kategori' in group ? (group as any).kategori : ''}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {group.aciklama}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {group.uyeSayisi} üye
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        {/* MessageCircle icon was removed from imports, so this will cause an error. */}
                        {/* <MessageCircle className="w-4 h-4 mr-1" /> */}
                        WhatsApp Grubu
                      </div>
                      <Button
                        onClick={() => handleJoinGroup(group.whatsappLinki)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                      >
                        Katıl
                        {/* ChevronRight icon was removed from imports, so this will cause an error. */}
                        {/* <ChevronRight className="w-4 h-4 ml-1" /> */}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* İstatistikler */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-2">
              {Object.values(groupData).flat().length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Toplam Grup</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-300 mb-2">
              {Object.values(groupData).flat().reduce((sum, group) => sum + group.uyeSayisi, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Toplam Üye</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-300 mb-2">
              3
            </div>
            <div className="text-gray-600 dark:text-gray-300">Kategori</div>
          </Card>
        </div>
      </div>
    </div>
  )
} 