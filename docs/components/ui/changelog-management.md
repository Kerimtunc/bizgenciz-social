"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  History, 
  Search, 
  Filter,
  Calendar,
  User,
  Eye,
  Download,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Archive,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ChangelogEntry {
  id: number
  type: 'create' | 'update' | 'delete' | 'archive' | 'restore'
  entityType: 'product' | 'category' | 'template' | 'settings'
  entityName: string
  description: string
  changes: {
    field: string
    oldValue: any
    newValue: any
  }[]
  user: string
  timestamp: string
  ipAddress: string
  userAgent: string
}

interface ChangelogManagementProps {
  searchQuery: string
  viewMode: "grid" | "list"
  selectedItems: number[]
  onSelectionChange: (items: number[]) => void
}

export function ChangelogManagement({ 
  searchQuery, 
  viewMode, 
  selectedItems, 
  onSelectionChange 
}: ChangelogManagementProps) {
  const [changelogEntries, setChangelogEntries] = useState<ChangelogEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterType, setFilterType] = useState<'all' | 'create' | 'update' | 'delete' | 'archive' | 'restore'>('all')
  const [filterEntity, setFilterEntity] = useState<'all' | 'product' | 'category' | 'template' | 'settings'>('all')
  const [dateFilter, setDateFilter] = useState<string>('')
  const [showDetails, setShowDetails] = useState<number[]>([])
  const { toast } = useToast()

  // TODO: API entegrasyonu - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const loadChangelog = async () => {
      try {
        setIsLoading(true)
        // TODO: Gerçek API çağrısı yapılacak
        // const response = await fetch('/api/changelog')
        // const data = await response.json()
        
        // Simüle edilmiş API çağrısı
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // TODO: Mock data yerine gerçek veri kullanılacak
        const mockChangelog: ChangelogEntry[] = [
          {
            id: 1,
            type: 'create',
            entityType: 'product',
            entityName: 'Margherita Pizza',
            description: 'Yeni ürün eklendi',
            changes: [
              { field: 'name', oldValue: null, newValue: 'Margherita Pizza' },
              { field: 'price', oldValue: null, newValue: 45 },
              { field: 'category', oldValue: null, newValue: 'Pizza' }
            ],
            user: 'admin@restaurant.com',
            timestamp: '2025-07-26T15:30:00Z',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          {
            id: 2,
            type: 'update',
            entityType: 'category',
            entityName: 'Pizza Kategorisi',
            description: 'Kategori fiyatı güncellendi',
            changes: [
              { field: 'discountPercentage', oldValue: 0, newValue: 15 },
              { field: 'description', oldValue: 'Pizza çeşitleri', newValue: 'Lezzetli pizza çeşitleri' }
            ],
            user: 'manager@restaurant.com',
            timestamp: '2025-07-26T14:20:00Z',
            ipAddress: '192.168.1.101',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
          },
          {
            id: 3,
            type: 'delete',
            entityType: 'product',
            entityName: 'Eski Pizza',
            description: 'Ürün silindi',
            changes: [
              { field: 'isActive', oldValue: true, newValue: false }
            ],
            user: 'admin@restaurant.com',
            timestamp: '2025-07-26T13:15:00Z',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          {
            id: 4,
            type: 'archive',
            entityType: 'template',
            entityName: 'Yaz Menüsü 2024',
            description: 'Şablon arşivlendi',
            changes: [
              { field: 'isActive', oldValue: true, newValue: false },
              { field: 'archivedAt', oldValue: null, newValue: '2025-07-26T12:00:00Z' }
            ],
            user: 'admin@restaurant.com',
            timestamp: '2025-07-26T12:00:00Z',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        ]
        
        setChangelogEntries(mockChangelog)
      } catch (error) {
        console.error('Değişiklik geçmişi yüklenirken hata:', error)
        toast({
          title: "Hata",
          description: "Değişiklik geçmişi yüklenirken bir hata oluştu.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadChangelog()
  }, [toast])

  const filteredEntries = changelogEntries.filter(entry => {
    const matchesSearch = entry.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || entry.type === filterType
    const matchesEntity = filterEntity === 'all' || entry.entityType === filterEntity
    const matchesDate = !dateFilter || entry.timestamp.includes(dateFilter)
    
    return matchesSearch && matchesType && matchesEntity && matchesDate
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'create': return <Plus className="h-4 w-4" />
      case 'update': return <Edit className="h-4 w-4" />
      case 'delete': return <Trash2 className="h-4 w-4" />
      case 'archive': return <Archive className="h-4 w-4" />
      case 'restore': return <RefreshCw className="h-4 w-4" />
      default: return <Settings className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      create: { label: "Oluşturma", variant: "default" as const, color: "bg-green-100 text-green-800" },
      update: { label: "Güncelleme", variant: "secondary" as const, color: "bg-blue-100 text-blue-800" },
      delete: { label: "Silme", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
      archive: { label: "Arşivleme", variant: "outline" as const, color: "bg-yellow-100 text-yellow-800" },
      restore: { label: "Geri Yükleme", variant: "outline" as const, color: "bg-purple-100 text-purple-800" },
    }
    return variants[type as keyof typeof variants] || variants.update
  }

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'product': return '🍕'
      case 'category': return '📁'
      case 'template': return '📋'
      case 'settings': return '⚙️'
      default: return '📄'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const toggleDetails = (entryId: number) => {
    setShowDetails(prev => 
      prev.includes(entryId) 
        ? prev.filter(id => id !== entryId)
        : [...prev, entryId]
    )
  }

  const exportChangelog = () => {
    // TODO: CSV export functionality would go here
    // const csvContent = generateCSV(changelogEntries)
    // downloadCSV(csvContent, 'changelog.csv')
    
    console.log('Değişiklik geçmişi dışa aktarılıyor...')
    toast({
      title: "Dışa Aktarma",
      description: "Değişiklik geçmişi CSV formatında dışa aktarıldı.",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-2">Değişiklik geçmişi yükleniyor...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Değişiklik Geçmişi
          </h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-muted-foreground">{filteredEntries.length} değişiklik kaydı bulundu</p>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button
            onClick={exportChangelog}
            variant="outline"
            size="sm"
            className="bg-blue-50 border-blue-200 text-blue-700"
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Dışa Aktar</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>İşlem Türü</Label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Tümü</option>
                <option value="create">Oluşturma</option>
                <option value="update">Güncelleme</option>
                <option value="delete">Silme</option>
                <option value="archive">Arşivleme</option>
                <option value="restore">Geri Yükleme</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Varlık Türü</Label>
              <select
                value={filterEntity}
                onChange={(e) => setFilterEntity(e.target.value as any)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Tümü</option>
                <option value="product">Ürünler</option>
                <option value="category">Kategoriler</option>
                <option value="template">Şablonlar</option>
                <option value="settings">Ayarlar</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Tarih</Label>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                placeholder="Tarih seçin"
              />
            </div>
            <div className="space-y-2">
              <Label>Durum</Label>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="showDetails" defaultChecked />
                <Label htmlFor="showDetails">Detayları göster</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Changelog Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => {
          const typeBadge = getTypeBadge(entry.type)
          const isExpanded = showDetails.includes(entry.id)
          
          return (
            <Card key={entry.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getEntityIcon(entry.entityType)}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{entry.entityName}</CardTitle>
                      <CardDescription>{entry.description}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleDetails(entry.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className={typeBadge.color}>
                    {getTypeIcon(entry.type)}
                    <span className="ml-1">{typeBadge.label}</span>
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    {formatDate(entry.timestamp)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <User className="mr-1 h-3 w-3" />
                    {entry.user}
                  </Badge>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="space-y-4">
                  {/* Changes Details */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Yapılan Değişiklikler:</h4>
                    <div className="space-y-2">
                      {entry.changes.map((change, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                          <span className="font-medium text-sm">{change.field}:</span>
                          <span className="text-sm text-muted-foreground">
                            {change.oldValue === null ? 'null' : String(change.oldValue)}
                          </span>
                          <span className="text-sm">→</span>
                          <span className="text-sm font-medium">
                            {change.newValue === null ? 'null' : String(change.newValue)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Teknik Detaylar</h4>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div><strong>IP Adresi:</strong> {entry.ipAddress}</div>
                        <div><strong>Kullanıcı Ajanı:</strong> {entry.userAgent.substring(0, 50)}...</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Zaman Bilgisi</h4>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div><strong>Tam Tarih:</strong> {entry.timestamp}</div>
                        <div><strong>Kullanıcı:</strong> {entry.user}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {filteredEntries.length === 0 && (
        <Card className="p-8 text-center">
          <History className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Değişiklik Geçmişi Boş</h3>
          <p className="text-muted-foreground">
            {searchQuery || filterType !== 'all' || filterEntity !== 'all' || dateFilter 
              ? "Arama kriterlerinize uygun değişiklik kaydı bulunamadı."
              : "Henüz değişiklik kaydı bulunmuyor."
            }
          </p>
        </Card>
      )}
    </div>
  )
} 