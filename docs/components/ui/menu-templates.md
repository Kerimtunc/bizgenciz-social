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
  Loader2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MenuTemplate {
  id: number
  name: string
  description: string
  isActive: boolean
  isDefault: boolean
  theme: string
  layout: string
  categoryCount: number
  productCount: number
  lastUsed: string
  createdAt: string
  updatedAt: string
}

interface MenuTemplatesProps {
  searchQuery: string
  viewMode: "grid" | "list"
  selectedItems: number[]
  onSelectionChange: (items: number[]) => void
}

export function MenuTemplates({ 
  searchQuery, 
  viewMode, 
  selectedItems, 
  onSelectionChange 
}: MenuTemplatesProps) {
  const [templates, setTemplates] = useState<MenuTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  // Mock data - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoading(true)
        // Simüle edilmiş API çağrısı
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockTemplates: MenuTemplate[] = [
          {
            id: 1,
            name: "Buraya modern restoran başlığı gelecek",
            description: "Buraya çağdaş şık tasarım açıklaması gelecek",
            isActive: true,
            isDefault: true,
            theme: "modern",
            layout: "grid",
            categoryCount: 8,
            productCount: 45,
            lastUsed: "2025-07-26",
            createdAt: "2025-01-15",
            updatedAt: "2025-07-20"
          },
          {
            id: 2,
            name: "Buraya geleneksel kahve başlığı gelecek",
            description: "Buraya sıcak samimi atmosfer açıklaması gelecek",
            isActive: true,
            isDefault: false,
            theme: "traditional",
            layout: "list",
            categoryCount: 6,
            productCount: 32,
            lastUsed: "2025-07-25",
            createdAt: "2025-02-10",
            updatedAt: "2025-07-18"
          },
          {
            id: 3,
            name: "Buraya lüks restoran başlığı gelecek",
            description: "Buraya premium lüks tasarım açıklaması gelecek",
            isActive: true,
            isDefault: false,
            theme: "luxury",
            layout: "grid",
            categoryCount: 12,
            productCount: 78,
            lastUsed: "2025-07-24",
            createdAt: "2025-03-05",
            updatedAt: "2025-07-15"
          }
        ]
        
        setTemplates(mockTemplates)
      } catch (error) {
        console.error("Buraya şablon yükleme hatası gelecek:", error)
        toast({
          title: "Buraya hata başlığı gelecek",
          description: "Buraya şablon yükleme hatası açıklaması gelecek",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadTemplates()
  }, [toast])

  const handleSelectionChange = (templateId: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, templateId])
    } else {
      onSelectionChange(selectedItems.filter(id => id !== templateId))
    }
  }

  const handleToggleActive = async (templateId: number) => {
    try {
      setTemplates(prev => prev.map(template => 
        template.id === templateId ? { ...template, isActive: !template.isActive } : template
      ))
      
      toast({
        title: "Buraya başarı başlığı gelecek",
        description: "Buraya şablon durumu güncellendi açıklaması gelecek",
      })
    } catch (error) {
      console.error("Buraya şablon güncelleme hatası gelecek:", error)
      toast({
        title: "Buraya hata başlığı gelecek",
        description: "Buraya şablon güncelleme hatası açıklaması gelecek",
        variant: "destructive",
      })
    }
  }

  const handleDuplicate = async (template: MenuTemplate) => {
    try {
      setIsCreating(true)
      // Simüle edilmiş kopyalama işlemi
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newTemplate = {
        ...template,
        id: Date.now(),
        name: `${template.name} (Kopya)`,
        isDefault: false,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      setTemplates(prev => [...prev, newTemplate])
      
      toast({
        title: "Buraya başarı başlığı gelecek",
        description: "Buraya şablon başarıyla kopyalandı açıklaması gelecek",
      })
    } catch (error) {
      console.error("Buraya kopyalama hatası gelecek:", error)
      toast({
        title: "Buraya hata başlığı gelecek",
        description: "Buraya kopyalama hatası açıklaması gelecek",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async (templateId: number) => {
    try {
      setTemplates(prev => prev.filter(template => template.id !== templateId))
      
      toast({
        title: "Buraya başarı başlığı gelecek",
        description: "Buraya şablon başarıyla silindi açıklaması gelecek",
      })
    } catch (error) {
      console.error("Buraya silme hatası gelecek:", error)
      toast({
        title: "Buraya hata başlığı gelecek",
        description: "Buraya silme hatası açıklaması gelecek",
        variant: "destructive",
      })
    }
  }

  const getThemeIcon = (theme: string) => {
    const icons: Record<string, React.ReactNode> = {
      modern: <Palette className="h-4 w-4" />,
      traditional: <Clock className="h-4 w-4" />,
      luxury: <Star className="h-4 w-4" />,
      minimal: <TrendingUp className="h-4 w-4" />
    }
    return icons[theme] || <Palette className="h-4 w-4" />
  }

  const getThemeColor = (theme: string) => {
    const colors: Record<string, string> = {
      modern: "bg-blue-100 text-blue-800",
      traditional: "bg-orange-100 text-orange-800",
      luxury: "bg-purple-100 text-purple-800",
      minimal: "bg-gray-100 text-gray-800"
    }
    return colors[theme] || "bg-gray-100 text-gray-800"
  }

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Buraya şablonlar yükleniyor metni gelecek</span>
      </div>
    )
  }

  if (filteredTemplates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          <Palette className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Buraya şablon bulunamadı başlığı gelecek
        </h3>
        <p className="text-gray-500 mb-4">
          Buraya arama kriterlerinize uygun şablon bulunamadı açıklaması gelecek
        </p>
        <Button onClick={() => window.location.reload()}>
          Buraya yenile metni gelecek
        </Button>
      </div>
    )
  }

  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {filteredTemplates.map((template) => (
        <Card key={template.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedItems.includes(template.id)}
                  onCheckedChange={(checked) => handleSelectionChange(template.id, checked as boolean)}
                />
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    {getThemeIcon(template.theme)}
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {template.description}
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {template.isDefault && (
                  <Star className="h-4 w-4 text-yellow-500" />
                )}
                <Switch
                  checked={template.isActive}
                  onCheckedChange={() => handleToggleActive(template.id)}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Şablon Bilgileri */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {template.categoryCount} Buraya kategori metni gelecek
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {template.productCount} Buraya ürün metni gelecek
                </Badge>
                <Badge className={`text-xs ${getThemeColor(template.theme)}`}>
                  {template.theme}
                </Badge>
                {template.isDefault && (
                  <Badge variant="secondary" className="text-xs">
                    Buraya varsayılan metni gelecek
                  </Badge>
                )}
              </div>

              {/* Aksiyon Butonları */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDuplicate(template)}
                    disabled={isCreating}
                    className="h-8 w-8 p-0"
                  >
                    {isCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(template.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(template.lastUsed).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 