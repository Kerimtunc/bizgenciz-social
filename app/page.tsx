"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import {
  Search,
  Users,
  GraduationCap,
  BookOpen,
  Instagram,
  MessageCircle,
  Linkedin,
  ChevronRight,
  MapPin,
  Compass,
  Coffee,
  Calendar,
  Star,
  Sparkles,
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
      grupAdi: "Endüstri Mühendisliği",
      fakulte: "Mühendislik-Mimarlık Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/endustri-muhendisligi",
      uyeSayisi: 95,
      aciklama: "Endüstri mühendisliği öğrencileri için akademik destek grubu"
    },
    {
      id: 4,
      grupAdi: "İktisat",
      fakulte: "İktisadi ve İdari Bilimler Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/iktisat",
      uyeSayisi: 200,
      aciklama: "İktisat öğrencileri için akademik destek grubu"
    },
    {
      id: 5,
      grupAdi: "İşletme",
      fakulte: "İktisadi ve İdari Bilimler Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/isletme",
      uyeSayisi: 180,
      aciklama: "İşletme öğrencileri için akademik destek grubu"
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
      grupAdi: "Kariyer Danışmanlığı",
      kategori: "Kariyer Gelişimi",
      whatsappLinki: "https://chat.whatsapp.com/kariyer-danismanligi",
      uyeSayisi: 150,
      aciklama: "Kariyer danışmanlığı ve mentorluk grubu"
    },
    {
      id: 203,
      grupAdi: "Networking",
      kategori: "Kariyer Gelişimi",
      whatsappLinki: "https://chat.whatsapp.com/networking",
      uyeSayisi: 200,
      aciklama: "Profesyonel networking grubu"
    }
  ],
  lisans: [
    {
      id: 3,
      bolumAdi: "Antropoloji",
      fakulte: "Fen-Edebiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example3",
    },
    {
      id: 4,
      bolumAdi: "Arkeoloji",
      fakulte: "Fen-Edebiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example4",
    },
    {
      id: 5,
      bolumAdi: "Beslenme ve Diyetetik",
      fakulte: "Sağlık Bilimleri Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example5",
    },
    {
      id: 6,
      bolumAdi: "Bilgisayar Mühendisliği",
      fakulte: "Mühendislik-Mimarlık Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example6",
    },
    {
      id: 7,
      bolumAdi: "Bilişim Sistemleri Mühendisliği",
      fakulte: "Bucak Bilgisayar ve Bilişim Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example7",
    },
    {
      id: 8,
      bolumAdi: "Bilişim Sistemleri ve Teknolojileri",
      fakulte: "Bucak Zeliha Tolunay Uygulamalı Teknoloji ve İşletmecilik Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example8",
    },
    {
      id: 9,
      bolumAdi: "Bilişim Sistemleri ve Teknolojileri",
      fakulte: "Gölhisar Uygulamalı Bilimler Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example9",
    },
    {
      id: 10,
      bolumAdi: "Biyoloji",
      fakulte: "Fen-Edebiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example10",
    },
    {
      id: 11,
      bolumAdi: "Coğrafya",
      fakulte: "Fen-Edebiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example11",
    },
    {
      id: 12,
      bolumAdi: "Çocuk Gelişimi",
      fakulte: "Bucak Sağlık Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example12",
    },
    {
      id: 13,
      bolumAdi: "Diş Hekimliği",
      fakulte: "Diş Hekimliği Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example13",
    },
    {
      id: 14,
      bolumAdi: "Ebelik",
      fakulte: "Bucak Sağlık Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example14",
    },
    {
      id: 15,
      bolumAdi: "Ekonomi ve Finans",
      fakulte: "Bucak İşletme Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example15",
    },
    {
      id: 16,
      bolumAdi: "Elektrik-Elektronik Mühendisliği",
      fakulte: "Mühendislik-Mimarlık Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example16",
    },
    {
      id: 17,
      bolumAdi: "Endüstri Mühendisliği",
      fakulte: "Mühendislik-Mimarlık Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example17",
    },
    {
      id: 18,
      bolumAdi: "Felsefe",
      fakulte: "Fen-Edebiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example18",
    },
    {
      id: 19,
      bolumAdi: "Fen Bilgisi Öğretmenliği",
      fakulte: "Eğitim Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example19",
    },
    {
      id: 20,
      bolumAdi: "Finans ve Bankacılık",
      fakulte: "İktisadi ve İdari Bilimler Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example20",
    },
    {
      id: 21,
      bolumAdi: "Fizyoterapi ve Rehabilitasyon",
      fakulte: "Sağlık Bilimleri Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example21",
    },
    {
      id: 22,
      bolumAdi: "Gastronomi ve Mutfak Sanatları",
      fakulte: "Turizm Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example22",
    },
    {
      id: 23,
      bolumAdi: "Gerontoloji",
      fakulte: "Sağlık Bilimleri Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example23",
    },
    {
      id: 24,
      bolumAdi: "Görsel İletişim Tasarımı",
      fakulte: "Sanat ve Tasarım Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example24",
    },
    {
      id: 25,
      bolumAdi: "Gümrük İşletme",
      fakulte: "Bucak Zeliha Tolunay Uygulamalı Teknoloji ve İşletmecilik Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example25",
    },
    {
      id: 26,
      bolumAdi: "Halkla İlişkiler ve Tanıtım",
      fakulte: "Bucak İşletme Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example26",
    },
    {
      id: 27,
      bolumAdi: "Hemşirelik",
      fakulte: "Bucak Sağlık Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example27",
    },
    {
      id: 28,
      bolumAdi: "Hemşirelik",
      fakulte: "Sağlık Bilimleri Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example28",
    },
    {
      id: 29,
      bolumAdi: "İktisat",
      fakulte: "İktisadi ve İdari Bilimler Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example29",
    },
    {
      id: 30,
      bolumAdi: "İlahiyat",
      fakulte: "İlahiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example30",
    },
    {
      id: 31,
      bolumAdi: "İlahiyat (M.T.O.K.)",
      fakulte: "İlahiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example31",
    },
    {
      id: 32,
      bolumAdi: "İlköğretim Matematik Öğretmenliği",
      fakulte: "Eğitim Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example32",
    },
    {
      id: 33,
      bolumAdi: "İngiliz Dili ve Edebiyatı (İngilizce)",
      fakulte: "Fen-Edebiyat Fakültesi",
      whatsappLinki: "https://chat.whatsapp.com/example33",
    },
  ],
  onlisans: [
    {
      id: 101,
      bolumAdi: "Acil Durum ve Afet Yönetimi",
      fakulte: "Altınyayla Mehmet Tuğrul Güvenlik Hizmetleri Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example101",
    },
    {
      id: 102,
      bolumAdi: "Ağız ve Diş Sağlığı",
      fakulte: "Burdur Sağlık Hizmetleri Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example102",
    },
    {
      id: 103,
      bolumAdi: "Alternatif Enerji Kaynakları Teknolojisi",
      fakulte: "Bucak Emin Gülmez Teknik Bilimler Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example103",
    },
    {
      id: 104,
      bolumAdi: "Ameliyathane Hizmetleri",
      fakulte: "Burdur Sağlık Hizmetleri Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example104",
    },
    {
      id: 105,
      bolumAdi: "Anestezi",
      fakulte: "Burdur Sağlık Hizmetleri Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example105",
    },
    {
      id: 106,
      bolumAdi: "Aşçılık",
      fakulte: "Yeşilova İsmail Akın Turizm Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example106",
    },
    {
      id: 107,
      bolumAdi: "Aşçılık",
      fakulte: "Burdur Gıda Tarım ve Hayvancılık Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example107",
    },
    {
      id: 108,
      bolumAdi: "Bahçe Tarımı",
      fakulte: "Burdur Gıda Tarım ve Hayvancılık Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example108",
    },
    {
      id: 109,
      bolumAdi: "Bankacılık ve Sigortacılık",
      fakulte: "Ağlasun Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example109",
    },
    {
      id: 110,
      bolumAdi: "Bankacılık ve Sigortacılık",
      fakulte: "Gölhisar Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example110",
    },
    {
      id: 111,
      bolumAdi: "Basım ve Yayım Teknolojileri",
      fakulte: "Sosyal Bilimler Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example111",
    },
    {
      id: 112,
      bolumAdi: "Bilgi Yönetimi",
      fakulte: "Bucak Emin Gülmez Teknik Bilimler Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example112",
    },
    {
      id: 113,
      bolumAdi: "Bilgisayar Destekli Tasarım ve Animasyon",
      fakulte: "Bucak Emin Gülmez Teknik Bilimler Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example113",
    },
    {
      id: 114,
      bolumAdi: "Bilgisayar Programcılığı",
      fakulte: "Gölhisar Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example114",
    },
    {
      id: 115,
      bolumAdi: "Bilgisayar Programcılığı",
      fakulte: "Ağlasun Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example115",
    },
    {
      id: 116,
      bolumAdi: "Bilgisayar Programcılığı",
      fakulte: "Teknik Bilimler Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example116",
    },
    {
      id: 117,
      bolumAdi: "Bilişim Güvenliği Teknolojisi",
      fakulte: "Ağlasun Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example117",
    },
    {
      id: 118,
      bolumAdi: "Bitki Koruma",
      fakulte: "Burdur Gıda Tarım ve Hayvancılık Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example118",
    },
    {
      id: 119,
      bolumAdi: "Biyomedikal Cihaz Teknolojisi",
      fakulte: "Bucak Emin Gülmez Teknik Bilimler Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example119",
    },
    {
      id: 120,
      bolumAdi: "Büro Yönetimi ve Yönetici Asistanlığı",
      fakulte: "Sosyal Bilimler Meslek Yüksekokulu",
      whatsappLinki: "https://chat.whatsapp.com/example120",
    },
  ],
}

const mainGroups = [
  {
    id: 1,
    name: "MAKÜ Geneli Sohbet",
    description: "Tüm MAKÜ öğrencilerinin buluşma noktası",
    link: "https://chat.whatsapp.com/main1",
    bgImage: "/placeholder.svg?height=200&width=300",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    name: "MAKÜ Etkinlik Grubu",
    description: "Kampüs etkinlikleri ve duyurular",
    link: "https://chat.whatsapp.com/main2",
    bgImage: "/placeholder.svg?height=200&width=300",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    name: "MAKÜ Ders Paylaşım",
    description: "Ders notları ve kaynak paylaşımı",
    link: "https://chat.whatsapp.com/main3",
    bgImage: "/placeholder.svg?height=200&width=300",
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: 4,
    name: "MAKÜ Spor Grubu",
    description: "Spor etkinlikleri ve turnuvalar",
    link: "https://chat.whatsapp.com/main4",
    bgImage: "/placeholder.svg?height=200&width=300",
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 5,
    name: "Bu Siteyi Kim Yaptı?",
    description: "Geliştirici hakkında bilgi",
    link: "#footer",
    bgImage: "/placeholder.svg?height=200&width=300",
    gradient: "from-gray-600 to-gray-800",
  },
]

const sitePages = [
  {
    id: 1,
    name: "Burdur Rehberi",
    description: "Şehri keşfet",
    icon: MapPin,
    link: "/burdur-rehberi",
    color: "from-emerald-500 to-teal-600",
    sections: [
      { id: "kafeler", name: "Kafeler", icon: Coffee },
      { id: "ev-tutma", name: "Nerede Ev Tutmalı?", icon: MapPin },
      { id: "gezilecek", name: "Gezilecek Yerler", icon: Compass },
      { id: "otobus", name: "Otobüs Kartı", icon: Users },
      { id: "yurtlar", name: "Yurtlar", icon: GraduationCap },
    ],
  },
  {
    id: 2,
    name: "MAKÜ Rehberi",
    description: "Kampüs rehberi",
    icon: Compass,
    link: "/maku-rehberi",
    color: "from-blue-500 to-indigo-600",
    sections: [
      { id: "yurtlar", name: "Yurtlar", icon: GraduationCap },
      { id: "fakulteler", name: "Fakulteler", icon: BookOpen },
      { id: "rektorluk", name: "Rektörlük", icon: Star },
      { id: "kampus", name: "Kampüs Haritası", icon: MapPin },
      { id: "hizmetler", name: "Öğrenci Hizmetleri", icon: Users },
    ],
  },
  {
    id: 3,
    name: "Burdura Dair",
    description: "Yerel kültür",
    icon: Coffee,
    link: "/burdura-dair",
    color: "from-amber-500 to-orange-600",
    sections: [
      { id: "kultur", name: "Yerel Kültür", icon: Star },
      { id: "yemekler", name: "Yerel Lezzetler", icon: Coffee },
      { id: "tarih", name: "Tarih", icon: BookOpen },
      { id: "festivaller", name: "Festivaller", icon: Sparkles },
    ],
  },
  {
    id: 4,
    name: "Etkinlik Takvimi",
    description: "Yaklaşan etkinlikler",
    icon: Calendar,
    link: "/etkinlikler",
    color: "from-purple-500 to-pink-600",
    sections: [
      { id: "akademik", name: "Akademik Etkinlikler", icon: BookOpen },
      { id: "sosyal", name: "Sosyal Etkinlikler", icon: Users },
      { id: "spor", name: "Spor Etkinlikleri", icon: Star },
      { id: "kultur", name: "Kültürel Etkinlikler", icon: Sparkles },
    ],
  },
]

const alphabet = [
  "Tümü",
  "A",
  "B",
  "C",
  "Ç",
  "D",
  "E",
  "F",
  "G",
  "Ğ",
  "H",
  "I",
  "İ",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ö",
  "P",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Ü",
  "V",
  "Y",
  "Z",
]

export default function BizGencizGroupsPage() {
  const [activeTab, setActiveTab] = useState("lisans")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLetter, setSelectedLetter] = useState("Tümü")
  const [joinedCount, setJoinedCount] = useState(0)
  const [showLimitMessage, setShowLimitMessage] = useState(false)
  const [welcomeKitTab, setWelcomeKitTab] = useState("groups")
  const [activeGuideSection, setActiveGuideSection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedLetterFeedback, setSelectedLetterFeedback] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const [activeSubSection, setActiveSubSection] = useState(0)
  const [subSectionScrollPositions, setSubSectionScrollPositions] = useState<{ [key: string]: number }>({})

  // Mouse tracking for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Sparkle effect
  useEffect(() => {
    const createSparkle = () => {
      if (!containerRef.current) return

      const sparkle = document.createElement("div")
      sparkle.className = "sparkle"
      sparkle.style.left = Math.random() * window.innerWidth + "px"
      sparkle.style.top = Math.random() * window.innerHeight + "px"
      sparkle.style.animationDelay = Math.random() * 3 + "s"

      document.body.appendChild(sparkle)

      setTimeout(() => {
        if (document.body.contains(sparkle)) {
          document.body.removeChild(sparkle)
        }
      }, 3000)
    }

    const interval = setInterval(createSparkle, 800)
    return () => clearInterval(interval)
  }, [])

  // LocalStorage'dan katılım sayısını yükle
  useEffect(() => {
    const savedCount = localStorage.getItem("maku_joined_groups_count")
    if (savedCount) {
      const count = Number.parseInt(savedCount)
      setJoinedCount(count)
      if (count >= 3) {
        setShowLimitMessage(true)
      }
    }

    const savedTab = localStorage.getItem("maku_active_tab")
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  // Tab değişikliğini kaydet
  useEffect(() => {
    localStorage.setItem("maku_active_tab", activeTab)
  }, [activeTab])

  // Grup katılım fonksiyonu
  const handleJoinGroup = (whatsappLink: string, isMainGroup = false) => {
    if (!isMainGroup && joinedCount >= 3) {
      return
    }

    if (!isMainGroup) {
      const newCount = joinedCount + 1
      setJoinedCount(newCount)
      localStorage.setItem("maku_joined_groups_count", newCount.toString())

      if (newCount >= 3) {
        setShowLimitMessage(true)
      }
    }

    if (whatsappLink === "#footer") {
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })
    } else {
      window.open(whatsappLink, "_blank")
    }
  }

  // Harf seçimi geri bildirimi
  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter)
    setSelectedLetterFeedback(letter)
    setTimeout(() => setSelectedLetterFeedback(""), 1000)
  }

  const handleSubSectionScroll = (sectionId: string, scrollPosition: number) => {
    setSubSectionScrollPositions((prev) => ({
      ...prev,
      [sectionId]: scrollPosition,
    }))
  }

  const handleSubSectionChange = (newIndex: number) => {
    setActiveSubSection(newIndex)
  }

  // Arama metnini vurgulama fonksiyonu
  const highlightSearchText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  // Filtrelenmiş bölümler
  const filteredDepartments = useMemo(() => {
    const departmentData = {
      lisans: groupData.lisans,
      onlisans: groupData.onlisans,
    }
    const currentData = departmentData[activeTab as keyof typeof departmentData]
    let filtered = currentData

    // Arama filtresi
    if (searchQuery.trim()) {
      filtered = filtered.filter((dept: { bolumAdi: string; fakulte?: string }) =>
        dept.bolumAdi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dept.fakulte ?? '').toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Alfabetik filtre
    if (selectedLetter !== "Tümü") {
      filtered = filtered.filter((dept: { bolumAdi: string }) => dept.bolumAdi.charAt(0).toUpperCase() === selectedLetter)
    }

    return filtered.sort((a: { bolumAdi: string }, b: { bolumAdi: string }) => a.bolumAdi.localeCompare(b.bolumAdi, "tr"))
  }, [activeTab, searchQuery, selectedLetter])

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
    >
      {/* Mouse Spotlight Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />

      {/* Letter Feedback */}
      {selectedLetterFeedback && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-8xl font-bold text-indigo-500 opacity-50 animate-ping">{selectedLetterFeedback}</div>
        </div>
      )}

      {/* Limit Banner */}
      {showLimitMessage && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-2 text-center text-sm z-40">
          <Sparkles className="w-4 h-4 inline mr-2" />
          3&apos;ten fazla gruba katıldınız. Bu, diğer öğrencilere de yer açmak içindir. Anlayışınız için teşekkürler ❤️
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Books */}
        <div className="absolute top-20 left-10 animate-float">
          <BookOpen className="w-8 h-8 text-blue-200 opacity-60" />
        </div>
        <div className="absolute top-40 right-16 animate-float-delayed">
          <GraduationCap className="w-10 h-10 text-indigo-200 opacity-50" />
        </div>
        <div className="absolute top-60 left-20 animate-float-slow">
          <Users className="w-6 h-6 text-purple-200 opacity-70" />
        </div>
        <div className="absolute bottom-40 right-10 animate-float">
          <Sparkles className="w-7 h-7 text-pink-200 opacity-60" />
        </div>
        <div className="absolute bottom-60 left-8 animate-float-delayed">
          <BookOpen className="w-5 h-5 text-teal-200 opacity-50" />
        </div>

        {/* Animated Light Trails */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30 animate-slide-right"></div>
          <div className="absolute top-1/2 right-0 w-full h-px bg-gradient-to-l from-transparent via-purple-300 to-transparent opacity-30 animate-slide-left"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-30 animate-slide-right-delayed"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-32 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 animate-pulse-slower"></div>
      </div>

      {/* Hero Header */}
      <div className="relative min-h-[40vh] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-700"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-5"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full opacity-5"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full opacity-3"></div>
        </div>

        {/* Hero Content */}
        <div className="relative flex items-center justify-center min-h-[40vh] p-8">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6">
              <div className="golden-border p-1 rounded-full inline-block mb-4">
                <div className="p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                  <GraduationCap className="w-12 h-12" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-3 gradient-text-white">BizGenciz Grupları</h1>
            <p className="text-blue-100 text-sm mb-6">Üniversitelilerin Sosyal Platformu</p>
            <div className="flex items-center justify-center gap-2 text-xs text-blue-200">
              <Sparkles className="w-4 h-4" />
              <span>Öğrenciler için, öğrenciler tarafından</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-10 relative z-10">
        {/* MAKÜ'ye Hoş Geldin Başlangıç Kiti */}
        <div className="space-y-6">
          {/* Başlık */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-500 animate-pulse" />
              <h2 className="text-2xl font-bold gradient-text">MAKÜ&apos;ye Hoş Geldin!</h2>
              <Sparkles className="w-6 h-6 text-indigo-500 animate-pulse" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed px-4">
              Üniversiteye yeni başlamış bir öğrenciysen ve &quot;Hangi gruplara katılmalıyım? Neleri takip etmeliyim?&quot; diye düşünüyorsan, bu bölüm sana yol gösterecek.
            </p>
          </div>

          {/* Başlangıç Kiti - Sekmeli Yapı */}
          <div className="rounded-2xl overflow-hidden border-2 border-gradient-to-r from-indigo-200 to-purple-200 shadow-xl">
            <div className="bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm">
              <Tabs value={welcomeKitTab} onValueChange={setWelcomeKitTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-indigo-100 to-purple-100 backdrop-blur-sm m-2 rounded-xl">
                  <TabsTrigger
                    value="groups"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-lg"
                  >
                    <Rocket className="w-4 h-4" />
                    <span className="text-sm font-medium">Popüler Gruplar</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="guides"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-lg"
                  >
                    <Compass className="w-4 h-4" />
                    <span className="text-sm font-medium">Kampüs Rehberleri</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="groups" className="p-4 pt-2">
                  {/* Improved horizontal scrolling container */}
                  <div className="relative">
                    <div
                      className="flex gap-4 overflow-x-auto pb-4 px-2 -mx-2 touch-pan-x"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        WebkitOverflowScrolling: "touch",
                      }}
                    >
                      {mainGroups.map((group) => (
                        <Card
                          key={group.id}
                          className="flex-shrink-0 w-[260px] border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden hover-lift"
                        >
                          <CardContent className="p-0 relative h-36">
                            {/* Background Image */}
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: `url('${group.bgImage}')`,
                              }}
                            />
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${group.gradient} opacity-85`} />
                            {/* Glass Effect */}
                            <div className="absolute inset-0 backdrop-blur-[1px]" />

                            {/* Content */}
                            <div className="relative h-full p-4 flex flex-col justify-between text-white">
                              <div>
                                <h3 className="font-bold text-base mb-2 drop-shadow-lg leading-tight">{group.name}</h3>
                                <p className="text-sm opacity-90 drop-shadow-md leading-relaxed">{group.description}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-30 hover:bg-opacity-30 backdrop-blur-sm transition-all duration-300 hover:scale-105 mt-3"
                                onClick={() => handleJoinGroup(group.link, true)}
                              >
                                {group.name === "Bu Siteyi Kim Yaptı?" ? "Keşfet" : "Gruba Katıl"}
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Scroll indicators */}
                    <div className="absolute left-0 top-0 bottom-4 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-4 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                  </div>
                </TabsContent>

                <TabsContent value="guides" className="p-4 pt-2">
                  <div className="space-y-4">
                    {/* Horizontal Navigation - Main Sections */}
                    <div className="sticky top-0 z-30 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-2 border border-gray-200 shadow-sm">
                      <div
                        className="flex gap-2 overflow-x-auto pb-2 px-1 -mx-1 touch-pan-x"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                          WebkitOverflowScrolling: "touch",
                        }}
                      >
                        {sitePages.map((page, index) => {
                          const IconComponent = page.icon
                          return (
                            <Button
                              key={page.id}
                              variant={activeGuideSection === index ? "default" : "outline"}
                              size="sm"
                              className={`flex-shrink-0 min-w-[130px] h-10 text-xs transition-all duration-300 ${
                                activeGuideSection === index
                                  ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg"
                                  : "bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                              }`}
                              onClick={() => {
                                setActiveGuideSection(index)
                                setActiveSubSection(0) // Reset subsection when changing main section
                              }}
                            >
                              <IconComponent className="w-3 h-3 mr-2" />
                              {page.name}
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Sub-Navigation - Section Items */}
                    {sitePages[activeGuideSection] && sitePages[activeGuideSection].sections && (
                      <div className="sticky top-16 z-20 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-2 border border-gray-200 shadow-sm">
                        <div
                          className="flex gap-2 overflow-x-auto pb-2 px-1 -mx-1 touch-pan-x"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                          }}
                        >
                          {sitePages[activeGuideSection].sections?.map((section, index) => {
                            const SectionIconComponent = section.icon
                            return (
                              <Button
                                key={section.id}
                                variant={activeSubSection === index ? "default" : "outline"}
                                size="sm"
                                className={`flex-shrink-0 min-w-[120px] h-9 text-xs transition-all duration-300 ${
                                  activeSubSection === index
                                    ? `bg-gradient-to-r ${sitePages[activeGuideSection].color} text-white shadow-lg`
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                                onClick={() => handleSubSectionChange(index)}
                              >
                                <SectionIconComponent className="w-3 h-3 mr-1" />
                                {section.name}
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Content Display */}
                    <div className="space-y-6 pt-4">
                      {sitePages[activeGuideSection] && sitePages[activeGuideSection].sections && (
                        <div className="space-y-4">
                          {/* Current Section Header */}
                          <div className="text-center py-4">
                            <div
                              className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${sitePages[activeGuideSection].color} text-white mb-3`}
                            >
                              {(() => {
                                const currentSection = sitePages[activeGuideSection].sections?.[activeSubSection]
                                if (currentSection) {
                                  const SectionIconComponent = currentSection.icon
                                  return <SectionIconComponent className="w-6 h-6" />
                                }
                                return null
                              })()}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              {sitePages[activeGuideSection].sections?.[activeSubSection]?.name}
                            </h3>
                            <p className="text-sm text-gray-600 max-w-xs mx-auto">
                              {sitePages[activeGuideSection].name} -{" "}
                              {sitePages[activeGuideSection].sections?.[activeSubSection]?.name}
                            </p>
                          </div>

                          {/* Content Area with Scroll Position Memory */}
                          <div
                            className="min-h-[400px] bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200"
                            onScroll={(e) => {
                              const target = e.target as HTMLDivElement
                              const currentSectionId = `${activeGuideSection}-${activeSubSection}`
                              handleSubSectionScroll(currentSectionId, target.scrollTop)
                            }}
                            ref={(el) => {
                              if (el) {
                                const currentSectionId = `${activeGuideSection}-${activeSubSection}`
                                const savedPosition = subSectionScrollPositions[currentSectionId] || 0
                                el.scrollTop = savedPosition
                              }
                            }}
                          >
                            {/* Dynamic Content Based on Selected Section */}
                            {(() => {
                              const currentSection = sitePages[activeGuideSection].sections?.[activeSubSection]
                              if (!currentSection) return null

                              // Sample content for each section type
                              const sampleContent = {
                                kafeler: [
                                  {
                                    name: "Starbucks Burdur",
                                    address: "Merkez, Gazi Cad. No:15",
                                    rating: 4.2,
                                    price: "₺₺₺",
                                  },
                                  {
                                    name: "Kahve Dünyası",
                                    address: "İstiklal Mah. Atatürk Cad.",
                                    rating: 4.0,
                                    price: "₺₺",
                                  },
                                  { name: "Local Coffee", address: "Bahçelievler Mah.", rating: 4.5, price: "₺₺" },
                                  { name: "Cafe Nero", address: "Merkez, Cumhuriyet Cad.", rating: 4.1, price: "₺₺₺" },
                                  {
                                    name: "Mado",
                                    address: "Zafer Mah. Milli Egemenlik Cad.",
                                    rating: 4.3,
                                    price: "₺₺",
                                  },
                                ],
                                "ev-tutma": [
                                  {
                                    area: "Merkez",
                                    price: "1500-2500₺",
                                    pros: "Kampüse yakın, ulaşım kolay",
                                    cons: "Biraz pahalı",
                                  },
                                  {
                                    area: "Bahçelievler",
                                    price: "1200-2000₺",
                                    pros: "Uygun fiyat, sakin",
                                    cons: "Kampüse uzak",
                                  },
                                  {
                                    area: "Zafer Mahallesi",
                                    price: "1300-2200₺",
                                    pros: "Orta mesafe, uygun fiyat",
                                    cons: "Gece ulaşım zor",
                                  },
                                ],
                                gezilecek: [
                                  {
                                    name: "Salda Gölü",
                                    distance: "45 km",
                                    type: "Doğa",
                                    description: "Türkiye'nin Maldivleri",
                                  },
                                  {
                                    name: "Sagalassos",
                                    distance: "30 km",
                                    type: "Tarih",
                                    description: "Antik kent kalıntıları",
                                  },
                                  {
                                    name: "İnsuyu Mağarası",
                                    distance: "25 km",
                                    type: "Doğa",
                                    description: "Büyüleyici mağara",
                                  },
                                ],
                                otobus: [
                                  { info: "Burdur Kart", price: "Öğrenci: 1.50₺", where: "Belediye binası, PTT" },
                                  { info: "Dolmuş", price: "2-3₺", where: "Şehir içi ulaşım" },
                                ],
                                yurtlar: [
                                  {
                                    name: "KYK Erkek Yurdu",
                                    capacity: "500",
                                    location: "Merkez",
                                    contact: "0248 xxx xxxx",
                                  },
                                  {
                                    name: "KYK Kız Yurdu",
                                    capacity: "400",
                                    location: "Merkez",
                                    contact: "0248 xxx xxxx",
                                  },
                                  {
                                    name: "Özel Yurtlar",
                                    capacity: "Değişken",
                                    location: "Çeşitli",
                                    contact: "Araştırın",
                                  },
                                ],
                              }

                              const content = sampleContent[currentSection.id as keyof typeof sampleContent] || []

                              return (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2 mb-6">
                                    <div
                                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${sitePages[activeGuideSection].color}`}
                                    ></div>
                                    <h4 className="text-lg font-semibold text-gray-800">
                                      {currentSection.name} Rehberi
                                    </h4>
                                  </div>

                                  {content.map((item: any, index: number) => (
                                    <Card
                                      key={index}
                                      className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
                                    >
                                      <CardContent className="p-4">
                                        <div className="space-y-2">
                                          {item.name && (
                                            <div className="flex justify-between items-start">
                                              <h5 className="font-semibold text-gray-800">{item.name}</h5>
                                              {item.rating && (
                                                <div className="flex items-center gap-1">
                                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                  <span className="text-sm text-gray-600">{item.rating}</span>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                          {item.area && <h5 className="font-semibold text-gray-800">{item.area}</h5>}
                                          {item.address && (
                                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                              <MapPin className="w-3 h-3" />
                                              {item.address}
                                            </p>
                                          )}
                                          {item.price && (
                                            <p className="text-sm font-medium text-green-600">{item.price}</p>
                                          )}
                                          {item.pros && (
                                            <div className="text-sm">
                                              <span className="text-green-600">✓ {item.pros}</span>
                                            </div>
                                          )}
                                          {item.cons && (
                                            <div className="text-sm">
                                              <span className="text-red-500">✗ {item.cons}</span>
                                            </div>
                                          )}
                                          {item.description && (
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                          )}
                                          {item.distance && (
                                            <div className="flex gap-4 text-sm">
                                              <span className="text-blue-600">📍 {item.distance}</span>
                                              <span className="text-purple-600">🏷️ {item.type}</span>
                                            </div>
                                          )}
                                          {item.where && <p className="text-sm text-gray-600">📍 {item.where}</p>}
                                          {item.capacity && (
                                            <div className="flex gap-4 text-sm">
                                              <span className="text-blue-600">👥 {item.capacity} kişi</span>
                                              <span className="text-green-600">📍 {item.location}</span>
                                            </div>
                                          )}
                                          {item.contact && <p className="text-sm text-indigo-600">📞 {item.contact}</p>}
                                          {item.info && <h5 className="font-semibold text-gray-800">{item.info}</h5>}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}

                                  {content.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                      <Coffee className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                      <p className="text-lg font-medium mb-2">İçerik Hazırlanıyor</p>
                                      <p className="text-sm">Bu bölüm için detaylı bilgiler yakında eklenecek.</p>
                                    </div>
                                  )}
                                </div>
                              )
                            })()}
                          </div>

                          {/* Navigation Hints */}
                          <div className="flex justify-between items-center pt-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              {activeSubSection > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSubSectionChange(activeSubSection - 1)}
                                  className="text-xs"
                                >
                                  ← Önceki
                                </Button>
                              )}
                            </div>
                            <span>
                              {activeSubSection + 1} / {sitePages[activeGuideSection].sections?.length || 0}
                            </span>
                            <div className="flex items-center gap-1">
                              {activeSubSection < (sitePages[activeGuideSection].sections?.length || 0) - 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSubSectionChange(activeSubSection + 1)}
                                  className="text-xs"
                                >
                                  Sonraki →
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Elegant Separator */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-2 rounded-full">
              <Sparkles className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Sıra Sende Bölümü */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold gradient-text">Sıra Sende: Bölümünü Anında Bul</h2>
            <p className="text-gray-600 text-sm">Yapay zeka destekli arama ile bölümünü saniyeler içinde keşfet!</p>
          </div>

          {/* AI Arama */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-20"></div>
              <div className="relative rounded-xl overflow-hidden border-2 border-indigo-200 shadow-lg">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm p-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500 w-5 h-5" />
                    <Input
                      placeholder="Bölümünün linkini yapay zekaya sor! ✨"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 py-4 text-base border-0 bg-transparent focus:ring-2 focus:ring-indigo-300 rounded-lg placeholder:text-indigo-400"
                    />
                  </div>
                </div>
              </div>
            </div>
            {searchQuery && (
              <div className="text-sm text-indigo-700 bg-gradient-to-r from-indigo-50 to-blue-50 p-3 rounded-xl border border-indigo-100 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 inline mr-2" />
                <span className="font-medium">{filteredDepartments.length}</span> sonuç bulundu
              </div>
            )}
          </div>

          {/* Program Türü Seçimi */}
          <div className="rounded-xl overflow-hidden border-2 border-indigo-200 shadow-lg">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-blue-100 to-indigo-100 backdrop-blur-sm rounded-lg">
                  <TabsTrigger
                    value="lisans"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-md"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Lisans
                  </TabsTrigger>
                  <TabsTrigger
                    value="onlisans"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-md"
                  >
                    <BookOpen className="w-4 h-4" />
                    Önlisans
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-6 mt-6 p-4">
                  {/* Alfabetik Filtre - Improved */}
                  <div
                    className="flex gap-2 overflow-x-auto pb-2 px-1 -mx-1 touch-pan-x"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    {alphabet.map((letter) => (
                      <Button
                        key={letter}
                        variant={selectedLetter === letter ? "default" : "outline"}
                        size="sm"
                        className={`flex-shrink-0 min-w-[40px] h-9 text-xs transition-all duration-300 ${
                          selectedLetter === letter
                            ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg scale-105"
                            : "bg-white bg-opacity-70 text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:scale-105 backdrop-blur-sm"
                        }`}
                        onClick={() => handleLetterSelect(letter)}
                      >
                        {letter}
                      </Button>
                    ))}
                  </div>

                  {/* Bölüm Listesi */}
                  <div className="space-y-4">
                    {filteredDepartments.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium mb-2">Sonuç bulunamadı</p>
                        <p className="text-sm">Aradığınız kriterlere uygun bölüm bulunamadı.</p>
                      </div>
                    ) : (
                      filteredDepartments.map((dept, index) => (
                        <Card
                          key={dept.id}
                          className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-white bg-opacity-90 backdrop-blur-sm overflow-hidden hover-lift"
                        >
                          <CardContent className="p-0">
                            <div className="flex">
                              {/* Color Strip */}
                              <div
                                className={`w-1 bg-gradient-to-b ${
                                  index % 4 === 0
                                    ? "from-blue-500 to-indigo-600"
                                    : index % 4 === 1
                                      ? "from-purple-500 to-pink-600"
                                      : index % 4 === 2
                                        ? "from-green-500 to-teal-600"
                                        : "from-orange-500 to-red-600"
                                }`}
                              ></div>

                              {/* Content */}
                              <div className="flex-1 p-4">
                                <div className="flex justify-between items-start gap-3">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 text-sm mb-2 leading-tight">
                                      {highlightSearchText(dept.bolumAdi, searchQuery)}
                                    </h3>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border-indigo-200"
                                    >
                                      {highlightSearchText(dept.fakulte, searchQuery)}
                                    </Badge>
                                  </div>
                                  <Button
                                    size="sm"
                                    disabled={joinedCount >= 3}
                                    onClick={() => handleJoinGroup(dept.whatsappLinki)}
                                    className={`min-w-[90px] transition-all duration-300 ${
                                      joinedCount >= 3
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
                                    }`}
                                  >
                                    {joinedCount >= 3 ? "Limit Doldu" : "Gruba Katıl"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Kişisel PR */}
      <footer
        id="footer"
        className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white mt-16 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-700"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-5"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full opacity-5"></div>
        </div>

        <div className="relative max-w-md mx-auto p-8 text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-blue-300">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-yellow-800" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Platform Hakkında</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full mb-4"></div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            Bu platform, MAKÜ&apos;lü öğrencilerin hayatını kolaylaştırmak için tamamen gönüllü olarak geliştirilmiştir.
            Proje hakkındaki görüşlerinizi veya tanışmak isterseniz aşağıdaki hesaplarımdan ulaşabilirsiniz.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <Instagram className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-xs text-gray-400 pt-6 border-t border-gray-700 border-opacity-50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>© 2024 MAKÜ Bölüm Grupları Platformu</span>
              <Sparkles className="w-3 h-3" />
            </div>
            <p>Öğrenciler için, öğrenciler tarafından ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
