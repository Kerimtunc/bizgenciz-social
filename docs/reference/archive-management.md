"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Archive, 
  RotateCcw, 
  Trash2, 
  Search, 
  Filter,
  Calendar,
  Clock,
  User,
  Eye,
  Download,
  RefreshCw,
  AlertTriangle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ArchivedItem {
  id: number
  type: 'product' | 'category' | 'template'
  name: string
  description: string
  archivedBy: string
  archivedAt: string
  originalData: any
  canRestore: boolean
  canDelete: boolean
}

interface ArchiveManagementProps {
  searchQuery: string
  viewMode: "grid" | "list"
  selectedItems: number[]
  onSelectionChange: (items: number[]) => void
}

export function ArchiveManagement({ 
  searchQuery, 
  viewMode, 
  selectedItems, 
  onSelectionChange 
}: ArchiveManagementProps) {
  const [archivedItems, setArchivedItems] = useState<ArchivedItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterType, setFilterType] = useState<'all' | 'product' | 'category' | 'template'>('all')
  const [dateFilter, setDateFilter] = useState<string>('')
  const { toast } = useToast()

  // TODO: API entegrasyonu - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const loadArchivedItems = async () => {
      try {
        setIsLoading(true)
        // TODO: Gerçek API çağrısı yapılacak
        // const response = await fetch('/api/archive')
        // const data = await response.json()
        
        // Simüle edilmiş API çağrısı
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // TODO: Mock data yerine gerçek veri kullanılacak
        const mockArchivedItems: ArchivedItem[] = [
          {
            id: 1,
            type: 'product',
            name: 'Eski Pizza Margherita',
            description: 'Eski tarif ile yapılan pizza',
            archivedBy: 'admin@restaurant.com',
            archivedAt: '2025-07-20T10:30:00Z',
            originalData: { price: 40, category: 'Pizza' },
            canRestore: true,
            canDelete: true
          },
          {
            id: 2,
            type: 'category',
            name: 'Eski Tatlılar',
            description: 'Artık kullanılmayan tatlı kategorisi',
            archivedBy: 'manager@restaurant.com',
            archivedAt: '2025-07-15T14:20:00Z',
            originalData: { productCount: 5 },
            canRestore: true,
            canDelete: false
          },
          {
            id: 3,
            type: 'template',
            name: 'Yaz Menüsü 2024',
            description: 'Geçen yılın yaz menüsü şablonu',
            archivedBy: 'admin@restaurant.com',
            archivedAt: '2025-06-30T09:15:00Z',
            originalData: { theme: 'summer', layout: 'grid' },
            canRestore: true,
            canDelete: true
          }
        ]
        
        setArchivedItems(mockArchivedItems)
      } catch (error) {
        console.error('Arşiv öğeleri yüklenirken hata:', error)
        toast({
          title: "Hata",
          description: "Arşiv öğeleri yüklenirken bir hata oluştu.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadArchivedItems()
  }, [toast])

  const filteredItems = archivedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || item.type === filterType
    const matchesDate = !dateFilter || item.archivedAt.includes(dateFilter)
    
    return matchesSearch && matchesType && matchesDate
  })

  const handleRestore = async (itemId: number) => {
    try {
      // TODO: API çağrısı yapılacak
      // await fetch(`/api/archive/${itemId}/restore`, { method: 'POST' })
      
      console.log('Öğe geri yükleniyor:', itemId)
      
      setArchivedItems(prev => prev.filter(item => item.id !== itemId))
      
      toast({
        title: "Öğe Geri Yüklendi",
        description: "Öğe başarıyla arşivden geri yüklendi.",
      })
    } catch (error) {
      console.error('Öğe geri yüklenirken hata:', error)
      toast({
        title: "Hata",
        description: "Öğe geri yüklenirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (itemId: number) => {
    try {
      // TODO: API çağrısı yapılacak
      // await fetch(`/api/archive/${itemId}`, { method: 'DELETE' })
      
      console.log('Öğe kalıcı olarak siliniyor:', itemId)
      
      setArchivedItems(prev => prev.filter(item => item.id !== itemId))
      
      toast({
        title: "Öğe Silindi",
        description: "Öğe kalıcı olarak silindi.",
      })
    } catch (error) {
      console.error('Öğe silinirken hata:', error)
      toast({
        title: "Hata",
        description: "Öğe silinirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const handleBulkRestore = async () => {
    try {
      // TODO: API çağrısı yapılacak
      // await fetch('/api/archive/bulk-restore', { 
      //   method: 'POST', 
      //   body: JSON.stringify({ ids: selectedItems }) 
      // })
      
      console.log('Seçili öğeler geri yükleniyor:', selectedItems)
      
      setArchivedItems(prev => prev.filter(item => !selectedItems.includes(item.id)))
      onSelectionChange([])
      
      toast({
        title: "Toplu Geri Yükleme",
        description: `${selectedItems.length} öğe başarıyla geri yüklendi.`,
      })
    } catch (error) {
      console.error('Toplu geri yükleme hatası:', error)
      toast({
        title: "Hata",
        description: "Toplu geri yükleme sırasında bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const handleBulkDelete = async () => {
    try {
      // TODO: API çağrısı yapılacak
      // await fetch('/api/archive/bulk-delete', { 
      //   method: 'DELETE', 
      //   body: JSON.stringify({ ids: selectedItems }) 
      // })
      
      console.log('Seçili öğeler kalıcı olarak siliniyor:', selectedItems)
      
      setArchivedItems(prev => prev.filter(item => !selectedItems.includes(item.id)))
      onSelectionChange([])
      
      toast({
        title: "Toplu Silme",
        description: `${selectedItems.length} öğe kalıcı olarak silindi.`,
      })
    } catch (error) {
      console.error('Toplu silme hatası:', error)
      toast({
        title: "Hata",
        description: "Toplu silme sırasında bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product': return '🍕'
      case 'category': return '📁'
      case 'template': return '📋'
      default: return '📄'
    }
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      product: { label: "Ürün", variant: "default" as const, color: "bg-blue-100 text-blue-800" },
      category: { label: "Kategori", variant: "secondary" as const, color: "bg-green-100 text-green-800" },
      template: { label: "Şablon", variant: "outline" as const, color: "bg-purple-100 text-purple-800" },
    }
    return variants[type as keyof typeof variants] || variants.product
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-2">Arşiv öğeleri yükleniyor...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Arşiv Yönetimi
          </h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-muted-foreground">{filteredItems.length} arşivlenmiş öğe bulundu</p>
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedItems.length === filteredItems.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onSelectionChange(filteredItems.map(item => item.id))
                    } else {
                      onSelectionChange([])
                    }
                  }}
                />
                <span className="text-sm text-muted-foreground">
                  {selectedItems.length === filteredItems.length ? "Seçimi kaldır" : "Tümünü seç"} (
                  {selectedItems.length} seçili)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {selectedItems.length > 0 && (
            <>
              <Button
                onClick={handleBulkRestore}
                variant="outline"
                size="sm"
                className="bg-green-50 border-green-200 text-green-700"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Seçilenleri Geri Yükle</span>
                <span className="sm:hidden">Geri Yükle</span>
              </Button>
              <Button
                onClick={handleBulkDelete}
                variant="outline"
                size="sm"
                className="bg-red-50 border-red-200 text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Seçilenleri Sil</span>
                <span className="sm:hidden">Sil</span>
              </Button>
            </>
          )}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Öğe Türü</Label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Tümü</option>
                <option value="product">Ürünler</option>
                <option value="category">Kategoriler</option>
                <option value="template">Şablonlar</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Arşivlenme Tarihi</Label>
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
                <Switch id="restorable" defaultChecked />
                <Label htmlFor="restorable">Geri yüklenebilir</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Archived Items */}
      <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
        {filteredItems.map((item) => {
          const typeBadge = getTypeBadge(item.type)
          
          return (
            <Card key={item.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getTypeIcon(item.type)}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </div>
                  </div>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onSelectionChange([...selectedItems, item.id])
                      } else {
                        onSelectionChange(selectedItems.filter(id => id !== item.id))
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className={typeBadge.color}>
                    {typeBadge.label}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    {formatDate(item.archivedAt)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Arşivleyen: {item.archivedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Arşivlenme: {formatDate(item.archivedAt)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {item.canRestore && (
                    <Button
                      onClick={() => handleRestore(item.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Geri Yükle
                    </Button>
                  )}
                  {item.canDelete && (
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Kalıcı Sil
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredItems.length === 0 && (
        <Card className="p-8 text-center">
          <Archive className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Arşiv Boş</h3>
          <p className="text-muted-foreground">
            {searchQuery || filterType !== 'all' || dateFilter 
              ? "Arama kriterlerinize uygun arşivlenmiş öğe bulunamadı."
              : "Henüz arşivlenmiş öğe bulunmuyor."
            }
          </p>
        </Card>
      )}
    </div>
  )
} 