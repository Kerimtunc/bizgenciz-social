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
  Settings,
  DollarSign,
  Percent,
  Target,
  Zap
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UpsellCrosssell {
  id: number
  name: string
  type: 'upsell' | 'crosssell'
  description: string
  isActive: boolean
  isPremium: boolean
  triggerType: string
  targetProducts: number
  conversionRate: number
  revenue: number
  priority: number
  conditions: string
  createdAt: string
  updatedAt: string
}

interface UpsellCrosssellManagementProps {
  searchQuery: string
  viewMode: "grid" | "list"
  selectedItems: number[]
  onSelectionChange: (items: number[]) => void
}

export function UpsellCrosssellManagement({ 
  searchQuery, 
  viewMode, 
  selectedItems, 
  onSelectionChange 
}: UpsellCrosssellManagementProps) {
  const [strategies, setStrategies] = useState<UpsellCrosssell[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  // Mock data - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const loadStrategies = async () => {
      try {
        setIsLoading(true)
        // Simüle edilmiş API çağrısı
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockStrategies: UpsellCrosssell[] = [
          {
            id: 1,
            name: "Buraya tatlı önerisi başlığı gelecek",
            type: 'upsell',
            description: "Buraya ana yemek sonrası tatlı önerisi açıklaması gelecek",
            isActive: true,
            isPremium: true,
            triggerType: 'post-purchase',
            targetProducts: 5,
            conversionRate: 25.5,
            revenue: 1250,
            priority: 1,
            conditions: 'Buraya ana yemek siparişi koşulu gelecek',
            createdAt: "2025-01-15",
            updatedAt: "2025-07-20"
          },
          {
            id: 2,
            name: "Buraya içecek önerisi başlığı gelecek",
            type: 'crosssell',
            description: "Buraya yemek ile birlikte içecek önerisi açıklaması gelecek",
            isActive: true,
            isPremium: false,
            triggerType: 'cart',
            targetProducts: 3,
            conversionRate: 18.2,
            revenue: 850,
            priority: 2,
            conditions: 'Buraya yemek siparişi koşulu gelecek',
            createdAt: "2025-02-10",
            updatedAt: "2025-07-18"
          },
          {
            id: 3,
            name: "Buraya garnitür önerisi başlığı gelecek",
            type: 'upsell',
            description: "Buraya ana yemek ile garnitür önerisi açıklaması gelecek",
            isActive: false,
            isPremium: true,
            triggerType: 'product-view',
            targetProducts: 8,
            conversionRate: 32.1,
            revenue: 2100,
            priority: 3,
            conditions: 'Buraya ana yemek görüntüleme koşulu gelecek',
            createdAt: "2025-03-05",
            updatedAt: "2025-07-15"
          }
        ]
        
        setStrategies(mockStrategies)
      } catch (error) {
        console.error("Buraya strateji yükleme hatası gelecek:", error)
        toast({
          title: "Buraya hata başlığı gelecek",
          description: "Buraya strateji yükleme hatası açıklaması gelecek",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadStrategies()
  }, [toast])

  const handleSelectionChange = (strategyId: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, strategyId])
    } else {
      onSelectionChange(selectedItems.filter(id => id !== strategyId))
    }
  }

  const handleToggleActive = async (strategyId: number) => {
    try {
      setStrategies(prev => prev.map(strategy => 
        strategy.id === strategyId ? { ...strategy, isActive: !strategy.isActive } : strategy
      ))
      
      toast({
        title: "Buraya başarı başlığı gelecek",
        description: "Buraya strateji durumu güncellendi açıklaması gelecek",
      })
    } catch (error) {
      console.error("Buraya strateji güncelleme hatası gelecek:", error)
      toast({
        title: "Buraya hata başlığı gelecek",
        description: "Buraya strateji güncelleme hatası açıklaması gelecek",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (strategyId: number) => {
    try {
      setStrategies(prev => prev.filter(strategy => strategy.id !== strategyId))
      
      toast({
        title: "Buraya başarı başlığı gelecek",
        description: "Buraya strateji başarıyla silindi açıklaması gelecek",
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

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      upsell: <TrendingUp className="h-4 w-4" />,
      crosssell: <Link className="h-4 w-4" />
    }
    return icons[type] || <Target className="h-4 w-4" />
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      upsell: "bg-green-100 text-green-800",
      crosssell: "bg-blue-100 text-blue-800"
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const getTriggerColor = (triggerType: string) => {
    const colors: Record<string, string> = {
      'post-purchase': "bg-purple-100 text-purple-800",
      'cart': "bg-orange-100 text-orange-800",
      'product-view': "bg-pink-100 text-pink-800"
    }
    return colors[triggerType] || "bg-gray-100 text-gray-800"
  }

  const filteredStrategies = strategies.filter(strategy =>
    strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    strategy.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Buraya stratejiler yükleniyor metni gelecek</span>
      </div>
    )
  }

  if (filteredStrategies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          <Target className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Buraya strateji bulunamadı başlığı gelecek
        </h3>
        <p className="text-gray-500 mb-4">
          Buraya arama kriterlerinize uygun strateji bulunamadı açıklaması gelecek
        </p>
        <Button onClick={() => window.location.reload()}>
          Buraya yenile metni gelecek
        </Button>
      </div>
    )
  }

  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {filteredStrategies.map((strategy) => (
        <Card key={strategy.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedItems.includes(strategy.id)}
                  onCheckedChange={(checked) => handleSelectionChange(strategy.id, checked as boolean)}
                />
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    {getTypeIcon(strategy.type)}
                    {strategy.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {strategy.description}
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {strategy.isPremium && (
                  <Star className="h-4 w-4 text-yellow-500" />
                )}
                <Switch
                  checked={strategy.isActive}
                  onCheckedChange={() => handleToggleActive(strategy.id)}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Strateji Bilgileri */}
              <div className="flex flex-wrap gap-2">
                <Badge className={`text-xs ${getTypeColor(strategy.type)}`}>
                  {strategy.type}
                </Badge>
                <Badge className={`text-xs ${getTriggerColor(strategy.triggerType)}`}>
                  {strategy.triggerType}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {strategy.targetProducts} Buraya ürün metni gelecek
                </Badge>
                {strategy.isPremium && (
                  <Badge variant="secondary" className="text-xs">
                    Buraya premium metni gelecek
                  </Badge>
                )}
              </div>

              {/* Performans Metrikleri */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-medium">{strategy.conversionRate}%</p>
                    <p className="text-xs text-gray-500">Buraya dönüşüm oranı etiketi gelecek</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium">₺{strategy.revenue}</p>
                    <p className="text-xs text-gray-500">Buraya gelir etiketi gelecek</p>
                  </div>
                </div>
              </div>

              {/* Koşullar */}
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Buraya koşullar etiketi gelecek:</p>
                <p className="text-gray-700">{strategy.conditions}</p>
              </div>

              {/* Aksiyon Butonları */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(strategy.id)}
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(strategy.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 