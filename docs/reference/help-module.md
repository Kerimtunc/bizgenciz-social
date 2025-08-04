'use client'

import React, { useState } from 'react'
import { BookOpen, Search, HelpCircle, FileText, Video, MessageCircle, Phone, Mail, ExternalLink, ChevronRight, Star } from 'lucide-react'

/**
 * HelpModule Component - Kurtarılmış UI
 * 
 * @description Complete help and support system with guides, FAQ, videos, and support channels
 * @location Original: panel/page.tsx renderMainContent() - case "help" (placeholder)
 * @usage Panel dashboard help and support section
 * 
 * @features
 * - Help documentation
 * - FAQ management
 * - Support tickets
 * - Tutorial system
 * - Video tutorials
 * - Support channels
 * - System information
 * - Search functionality
 */

interface HelpModuleProps {
  modules: Array<{
    id: string
    label: string
    icon: any
    description: string
  }>
  activeModule: string
  onModuleChange: (moduleId: string) => void
  theme: 'dark' | 'light'
}

export const HelpModule: React.FC<HelpModuleProps> = ({
  modules,
  activeModule,
  onModuleChange,
  theme
}) => {
  const [activeTab, setActiveTab] = useState('guides')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)

  // Placeholder data
  const guides = [
    {
      id: '1',
      title: 'Buraya başlangıç başlığı gelecek',
      category: 'Buraya başlangıç kategorisi gelecek',
      description: 'Buraya başlangıç açıklaması gelecek',
      readTime: 'Buraya okuma süresi gelecek',
      difficulty: 'Buraya zorluk seviyesi gelecek',
      rating: 4.8,
      sections: [
        'Buraya bölüm 1 gelecek',
        'Buraya bölüm 2 gelecek',
        'Buraya bölüm 3 gelecek',
        'Buraya bölüm 4 gelecek'
      ]
    },
    {
      id: '2',
      title: 'Buraya menü yönetimi başlığı gelecek',
      category: 'Buraya menü kategorisi gelecek',
      description: 'Buraya menü yönetimi açıklaması gelecek',
      readTime: 'Buraya okuma süresi gelecek',
      difficulty: 'Buraya zorluk seviyesi gelecek',
      rating: 4.9,
      sections: [
        'Buraya bölüm 1 gelecek',
        'Buraya bölüm 2 gelecek',
        'Buraya bölüm 3 gelecek',
        'Buraya bölüm 4 gelecek'
      ]
    },
    {
      id: '3',
      title: 'Buraya sipariş takibi başlığı gelecek',
      category: 'Buraya siparişler kategorisi gelecek',
      description: 'Buraya sipariş takibi açıklaması gelecek',
      readTime: 'Buraya okuma süresi gelecek',
      difficulty: 'Buraya zorluk seviyesi gelecek',
      rating: 4.7,
      sections: [
        'Buraya bölüm 1 gelecek',
        'Buraya bölüm 2 gelecek',
        'Buraya bölüm 3 gelecek',
        'Buraya bölüm 4 gelecek'
      ]
    },
    {
      id: '4',
      title: 'Buraya masa yönetimi başlığı gelecek',
      category: 'Buraya masalar kategorisi gelecek',
      description: 'Buraya masa yönetimi açıklaması gelecek',
      readTime: 'Buraya okuma süresi gelecek',
      difficulty: 'Buraya zorluk seviyesi gelecek',
      rating: 4.6,
      sections: [
        'Buraya bölüm 1 gelecek',
        'Buraya bölüm 2 gelecek',
        'Buraya bölüm 3 gelecek',
        'Buraya bölüm 4 gelecek'
      ]
    },
    {
      id: '5',
      title: 'Buraya raporlar başlığı gelecek',
      category: 'Buraya raporlar kategorisi gelecek',
      description: 'Buraya raporlar açıklaması gelecek',
      readTime: 'Buraya okuma süresi gelecek',
      difficulty: 'Buraya zorluk seviyesi gelecek',
      rating: 4.5,
      sections: [
        'Buraya bölüm 1 gelecek',
        'Buraya bölüm 2 gelecek',
        'Buraya bölüm 3 gelecek',
        'Buraya bölüm 4 gelecek'
      ]
    }
  ]

  const faqs = [
    {
      id: '1',
      question: 'Buraya QR kod sorusu gelecek',
      answer: 'Buraya QR kod cevabı gelecek',
      category: 'Buraya QR kodlar kategorisi gelecek'
    },
    {
      id: '2',
      question: 'Buraya menü fiyatları sorusu gelecek',
      answer: 'Buraya menü fiyatları cevabı gelecek',
      category: 'Buraya menü kategorisi gelecek'
    },
    {
      id: '3',
      question: 'Buraya sipariş bildirimleri sorusu gelecek',
      answer: 'Buraya sipariş bildirimleri cevabı gelecek',
      category: 'Buraya siparişler kategorisi gelecek'
    },
    {
      id: '4',
      question: 'Buraya müşteri verileri sorusu gelecek',
      answer: 'Buraya müşteri verileri cevabı gelecek',
      category: 'Buraya güvenlik kategorisi gelecek'
    },
    {
      id: '5',
      question: 'Buraya offline çalışma sorusu gelecek',
      answer: 'Buraya offline çalışma cevabı gelecek',
      category: 'Buraya teknik kategorisi gelecek'
    }
  ]

  const supportChannels = [
    {
      id: 'phone',
      title: 'Buraya telefon desteği başlığı gelecek',
      description: 'Buraya telefon desteği açıklaması gelecek',
      contact: 'Buraya telefon numarası gelecek',
      hours: 'Buraya çalışma saatleri gelecek',
      icon: Phone,
      color: 'text-green-600'
    },
    {
      id: 'email',
      title: 'Buraya e-posta desteği başlığı gelecek',
      description: 'Buraya e-posta desteği açıklaması gelecek',
      contact: 'Buraya e-posta adresi gelecek',
      hours: 'Buraya yanıt süresi gelecek',
      icon: Mail,
      color: 'text-blue-600'
    },
    {
      id: 'chat',
      title: 'Buraya canlı sohbet başlığı gelecek',
      description: 'Buraya canlı sohbet açıklaması gelecek',
      contact: 'Buraya canlı sohbet metni gelecek',
      hours: 'Buraya canlı sohbet saatleri gelecek',
      icon: MessageCircle,
      color: 'text-purple-600'
    }
  ]

  const helpTabs = [
    { id: 'guides', label: 'Buraya kılavuzlar metni gelecek', icon: BookOpen },
    { id: 'faq', label: 'Buraya SSS metni gelecek', icon: HelpCircle },
    { id: 'videos', label: 'Buraya video eğitimler metni gelecek', icon: Video },
    { id: 'support', label: 'Buraya destek metni gelecek', icon: Phone }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Buraya kolay metni gelecek':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'Buraya orta metni gelecek':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'Buraya ileri metni gelecek':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderGuides = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Buraya kılavuzlarda ara placeholder metni gelecek"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setSelectedGuide(guide.id)}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{guide.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {guide.description}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">{guide.readTime}</span>
              <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(guide.difficulty)}`}>
                {guide.difficulty}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-gray-600 dark:text-gray-400">{guide.rating}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500">
                {guide.sections.length} Buraya bölüm metni gelecek
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderFAQ = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Buraya sık sorulan sorularda ara placeholder metni gelecek"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">{faq.question}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                    {faq.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderVideos = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Video className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Buraya video eğitimler yakında eklenecek metni gelecek
        </p>
      </div>
    </div>
  )

  const renderSupport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportChannels.map((channel) => {
          const Icon = channel.icon
          return (
            <div
              key={channel.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 ${channel.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">{channel.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {channel.description}
              </p>
              <div className="space-y-2">
                <div className="font-medium text-sm">{channel.contact}</div>
                <div className="text-xs text-gray-500">{channel.hours}</div>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                Buraya iletişime geç metni gelecek
              </button>
            </div>
          )
        })}
      </div>

      {/* System Info */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="font-semibold mb-4">Buraya sistem bilgileri başlığı gelecek</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Buraya versiyon etiketi gelecek</div>
            <div className="font-medium">Buraya versiyon değeri gelecek</div>
          </div>
          <div>
            <div className="text-gray-500">Buraya son güncelleme etiketi gelecek</div>
            <div className="font-medium">Buraya son güncelleme tarihi gelecek</div>
          </div>
          <div>
            <div className="text-gray-500">Buraya lisans etiketi gelecek</div>
            <div className="font-medium">Buraya lisans değeri gelecek</div>
          </div>
          <div>
            <div className="text-gray-500">Buraya durum etiketi gelecek</div>
            <div className="font-medium text-green-600">Buraya durum değeri gelecek</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'guides':
        return renderGuides()
      case 'faq':
        return renderFAQ()
      case 'videos':
        return renderVideos()
      case 'support':
        return renderSupport()
      default:
        return renderGuides()
    }
  }

  return (
    <div className="space-y-6">
      {/* Help Header */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <BookOpen className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Buraya yardım merkezi başlığı gelecek
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Buraya yardım merkezi açıklaması gelecek
            </p>
          </div>
        </div>

        <div className="text-center py-8">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Buraya yardım modülü yakında eklenecek metni gelecek
          </p>
        </div>
      </div>
    </div>
  )
}

export default HelpModule 