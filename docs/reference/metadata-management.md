"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
  Palette,
  Calendar,
  Star,
  Clock,
  Users,
  TrendingUp,
  Loader2,
  Tag,
  Hash,
  FileText,
  Image,
  Link,
  Settings
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Metadata {
  id: number
  name: string
  type: string
  value: string
  description: string
  isRequired: boolean
  isActive: boolean
  isSystem: boolean
  dataType: string
  validation: string
  defaultValue: string
  createdAt: string
  updatedAt: string
}

interface MetaDataManagementProps {
  searchQuery: string
  viewMode: "grid" | "list"
  selectedItems: number[]
  onSelectionChange: (items: number[]) => void
}

export function MetaDataManagement({ 
  searchQuery, 
  viewMode, 
  selectedItems, 
  onSelectionChange 
}: MetaDataManagementProps) {
  const [metadata, setMetadata] = useState<Metadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  // TODO: API entegrasyonu - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        setIsLoading(true)
        // TODO: Gerçek API çağrısı yapılacak
        // const response = await fetch('/api/metadata')
        // const data = await response.json()
        
        // Simüle edilmiş API çağrısı
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // TODO: Mock data yerine gerçek veri kullanılacak
        const mockMetadata: Metadata[] = [
          {
            id: 1,
            name: "Kalori",
            type: "nutrition",
            value: "kcal",
            description: "Ürün kalori değeri",
            isRequired: true,
            isActive: true,
            isSystem: true,
            dataType: "number",
            validation: "min:0,max:2000",
            defaultValue: "0",
            createdAt: "2025-01-15",
            updatedAt: "2025-07-20"
          },
          {
            id: 2,
            name: "Protein",
            type: "nutrition",
            value: "g",
            description: "Protein miktarı",
            isRequired: false,
            isActive: true,
            isSystem: true,
            dataType: "number",
            validation: "min:0,max:100",
            defaultValue: "0",
            createdAt: "2025-01-15",
            updatedAt: "2025-07-20"
          },
          {
            id: 3,
            name: "Alerjenler",
            type: "safety",
            value: "text",
            description: "Alerjen bilgileri",
            isRequired: true,
            isActive: true,
            isSystem: false,
            dataType: "text",
            validation: "max:500",
            defaultValue: "",
            createdAt: "2025-02-10",
            updatedAt: "2025-07-18"
          },
          {
            id: 4,
            name: "Hazırlama Süresi",
            type: "service",
            value: "dakika",
            description: "Hazırlama süresi",
            isRequired: false,
            isActive: true,
            isSystem: false,
            dataType: "number",
            validation: "min:1,max:120",
            defaultValue: "15",
            createdAt: "2025-03-05",
            updatedAt: "2025-07-15"
          },
          {
            id: 5,
            name: "Porsiyon Boyutu",
            type: "service",
            value: "gram",
            description: "Porsiyon ağırlığı",
            isRequired: false,
            isActive: false,
            isSystem: false,
            dataType: "number",
            validation: "min:1,max:2000",
            defaultValue: "250",
            createdAt: "2025-03-15",
            updatedAt: "2025-07-10"
          },
          {
            id: 6,
            name: "Özel Notlar",
            type: "custom",
            value: "text",
            description: "Özel ürün notları",
            isRequired: false,
            isActive: true,
            isSystem: false,
            dataType: "textarea",
            validation: "max:1000",
            defaultValue: "",
            createdAt: "2025-04-01",
            updatedAt: "2025-07-05"
          }
        ]
        
        setMetadata(mockMetadata)
      } catch (error) {
        console.error('Meta veriler yüklenirken hata:', error)
        toast({
          title: "Yükleme Hatası",
          description: "Meta veriler yüklenirken bir hata oluştu.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadMetadata()
  }, [toast])

  const filteredMetadata = metadata.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectionChange = (itemId: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, itemId])
    } else {
      onSelectionChange(selectedItems.filter(id => id !== itemId))
    }
  }

  const handleToggleActive = async (itemId: number) => {
    try {
      // TODO: API çağrısı yapılacak
      // await fetch(`/api/metadata/${itemId}/toggle`, { method: 'PATCH' })
      
      setMetadata(prev => prev.map(item =>
        item.id === itemId
          ? { ...item, isActive: !item.isActive }
          : item
      ))
      
      toast({
        title: "Başarılı",
        description: "Meta veri durumu güncellendi.",
      })
    } catch (error) {
      console.error('Meta veri güncellenirken hata:', error)
      toast({
        title: "Hata",
        description: "Meta veri güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (itemId: number) => {
    if (!confirm('Bu meta veriyi silmek istediğinizden emin misiniz?')) return
    
    try {
      // TODO: API çağrısı yapılacak
      // await fetch(`/api/metadata/${itemId}`, { method: 'DELETE' })
      
      setMetadata(prev => prev.filter(item => item.id !== itemId))
      onSelectionChange(selectedItems.filter(id => id !== itemId))
      
      toast({
        title: "Başarılı",
        description: "Meta veri başarıyla silindi.",
      })
    } catch (error) {
      console.error('Meta veri silinirken hata:', error)
      toast({
        title: "Hata",
        description: "Meta veri silinirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'nutrition': return <Hash className="h-4 w-4" />
      case 'safety': return <Eye className="h-4 w-4" />
      case 'service': return <Clock className="h-4 w-4" />
      case 'custom': return <Tag className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'nutrition': return 'bg-green-100 text-green-700'
      case 'safety': return 'bg-red-100 text-red-700'
      case 'service': return 'bg-blue-100 text-blue-700'
      case 'custom': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getDataTypeColor = (dataType: string) => {
    switch (dataType) {
      case 'number': return 'bg-blue-100 text-blue-700'
      case 'text': return 'bg-green-100 text-green-700'
      case 'textarea': return 'bg-orange-100 text-orange-700'
      case 'boolean': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Meta veriler yükleniyor...</span>
      </div>
    )
  }

  if (filteredMetadata.length === 0) {
    return (
      <Card className="border-dashed border-2 border-muted-foreground/25">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 text-muted-foreground">
            <Settings className="h-16 w-16" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Meta Veri Bulunamadı</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            {searchQuery ? 'Arama kriterlerinize uygun meta veri bulunamadı.' : 'Henüz meta veri tanımlanmamış.'}
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            İlk Meta Veriyi Oluştur
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Meta Veri Yönetimi</h2>
          <p className="text-muted-foreground">
            Ürünler için özel alanlar ve meta veriler tanımlayın
          </p>
        </div>
        <Button disabled={isCreating}>
          {isCreating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          Yeni Meta Veri
        </Button>
      </div>

      <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
        {filteredMetadata.map(item => (
          <Card 
            key={item.id} 
            className={`group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              !item.isActive && 'opacity-60'
            }`}
          >
            <div className="absolute top-3 left-3 z-10">
              <Checkbox 
                checked={selectedItems.includes(item.id)}
                onCheckedChange={(checked: boolean) => handleSelectionChange(item.id, checked)}
                className="bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white">
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    {item.isSystem && (
                      <Badge variant="secondary" className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                        Sistem
                      </Badge>
                    )}
                    {item.isRequired && (
                      <Badge variant="destructive" className="text-xs">
                        Zorunlu
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getTypeColor(item.type)}>
                  {getTypeIcon(item.type)}
                  <span className="ml-1 capitalize">{item.type}</span>
                </Badge>
                <Badge className={getDataTypeColor(item.dataType)}>
                  <span className="capitalize">{item.dataType}</span>
                </Badge>
                <Badge variant="outline">
                  {item.value}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Varsayılan:</span>
                  <p className="font-medium">{item.defaultValue || 'Yok'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Doğrulama:</span>
                  <p className="font-medium">{item.validation || 'Yok'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Durum:</span>
                  <p className="font-medium">{item.isActive ? 'Aktif' : 'Pasif'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Oluşturulma:</span>
                  <p className="font-medium">{item.createdAt}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.isActive ? "Aktif" : "Pasif"}</span>
                  <Switch 
                    checked={item.isActive} 
                    onCheckedChange={() => handleToggleActive(item.id)} 
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 