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
  Coffee,
  Utensils,
  Pizza,
  IceCream,
  Wine,
  Beer
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReadyCategory {
  id: number
  name: string
  description: string
  icon: string
  color: string
  isActive: boolean
  isPremium: boolean
  productCount: number
  categoryType: string
  cuisine: string
  seasonality: string
  createdAt: string
  updatedAt: string
}

interface ReadyCategoriesProps {
  searchQuery: string
  viewMode: "grid" | "list"
  selectedItems: number[]
  onSelectionChange: (items: number[]) => void
}

export function ReadyCategories({ 
  searchQuery, 
  viewMode, 
  selectedItems, 
  onSelectionChange 
}: ReadyCategoriesProps) {
  const [categories, setCategories] = useState<ReadyCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  // Mock data - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true)
        // Simüle edilmiş API çağrısı
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockCategories: ReadyCategory[] = [
          {
            id: 1,
            name: "Buraya kahve içecekler başlığı gelecek",
            description: "Buraya sıcak soğuk içecekler açıklaması gelecek",
            icon: "☕",
            color: "#8B4513",
            isActive: true,
            isPremium: false,
            productCount: 15,
            categoryType: "beverage",
            cuisine: "international",
            seasonality: "all-year",
            createdAt: "2025-01-15",
            updatedAt: "2025-07-20"
          },
          {
            id: 2,
            name: "Buraya ana yemekler başlığı gelecek",
            description: "Buraya geleneksel türk mutfağı açıklaması gelecek",
            icon: "🍽️",
            color: "#FF6B35",
            isActive: true,
            isPremium: false,
            productCount: 25,
            categoryType: "main",
            cuisine: "turkish",
            seasonality: "all-year",
            createdAt: "2025-01-15",
            updatedAt: "2025-07-20"
          },
          {
            id: 3,
            name: "Buraya tatlılar başlığı gelecek",
            description: "Buraya tatlılar açıklaması gelecek",
            icon: "🍰",
            color: "#FF69B4",
            isActive: true,
            isPremium: true,
            productCount: 12,
            categoryType: "dessert",
            cuisine: "international",
            seasonality: "all-year",
            createdAt: "2025-01-15",
            updatedAt: "2025-07-20"
          }
        ]
        
        setCategories(mockCategories)
      } catch (error) {
        console.error("Buraya kategori yükleme hatası gelecek:", error)
        toast({
          title: "Buraya hata başlığı gelecek",
          description: "Buraya kategori yükleme hatası açıklaması gelecek",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [toast])

  const handleSelectionChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, categoryId])
    } else {
      onSelectionChange(selectedItems.filter(id => id !== categoryId))
    }
  }

  const handleToggleActive = async (categoryId: number) => {
    try {
      setCategories(prev => prev.map(cat => 
        cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
      ))
      
      toast({
        title: "Buraya başarı başlığı gelecek",
        description: "Buraya kategori durumu güncellendi açıklaması gelecek",
      })
    } catch (error) {
      console.error("Buraya kategori güncelleme hatası gelecek:", error)
      toast({
        title: "Buraya hata başlığı gelecek",
        description: "Buraya kategori güncelleme hatası açıklaması gelecek",
        variant: "destructive",
      })
    }
  }

  const handleImport = async (category: ReadyCategory) => {
    try {
      setIsCreating(true)
      // Simüle edilmiş import işlemi
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Buraya başarı başlığı gelecek",
        description: "Buraya kategori başarıyla içe aktarıldı açıklaması gelecek",
      })
    } catch (error) {
      console.error("Buraya import hatası gelecek:", error)
      toast({
        title: "Buraya hata başlığı gelecek",
        description: "Buraya import hatası açıklaması gelecek",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const getCuisineIcon = (cuisine: string) => {
    const icons: Record<string, React.ReactNode> = {
      turkish: <Utensils className="h-4 w-4" />,
      international: <Globe className="h-4 w-4" />,
      italian: <Pizza className="h-4 w-4" />,
      mediterranean: <Wine className="h-4 w-4" />,
      asian: <Chopsticks className="h-4 w-4" />
    }
    return icons[cuisine] || <Utensils className="h-4 w-4" />
  }

  const getCuisineColor = (cuisine: string) => {
    const colors: Record<string, string> = {
      turkish: "bg-red-100 text-red-800",
      international: "bg-blue-100 text-blue-800",
      italian: "bg-green-100 text-green-800",
      mediterranean: "bg-purple-100 text-purple-800",
      asian: "bg-orange-100 text-orange-800"
    }
    return colors[cuisine] || "bg-gray-100 text-gray-800"
  }

  const getSeasonalityColor = (seasonality: string) => {
    const colors: Record<string, string> = {
      "all-year": "bg-gray-100 text-gray-800",
      spring: "bg-pink-100 text-pink-800",
      summer: "bg-yellow-100 text-yellow-800",
      autumn: "bg-orange-100 text-orange-800",
      winter: "bg-blue-100 text-blue-800"
    }
    return colors[seasonality] || "bg-gray-100 text-gray-800"
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Buraya kategoriler yükleniyor metni gelecek</span>
      </div>
    )
  }

  if (filteredCategories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          <Coffee className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Buraya kategori bulunamadı başlığı gelecek
        </h3>
        <p className="text-gray-500 mb-4">
          Buraya arama kriterlerinize uygun kategori bulunamadı açıklaması gelecek
        </p>
        <Button onClick={() => window.location.reload()}>
          Buraya yenile metni gelecek
        </Button>
      </div>
    )
  }

  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {filteredCategories.map((category) => (
        <Card key={category.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedItems.includes(category.id)}
                  onCheckedChange={(checked) => handleSelectionChange(category.id, checked as boolean)}
                />
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {category.description}
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {category.isPremium && (
                  <Star className="h-4 w-4 text-yellow-500" />
                )}
                <Switch
                  checked={category.isActive}
                  onCheckedChange={() => handleToggleActive(category.id)}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Kategori Bilgileri */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {category.productCount} Buraya ürün metni gelecek
                </Badge>
                <Badge className={`text-xs ${getCuisineColor(category.cuisine)}`}>
                  {category.cuisine}
                </Badge>
                <Badge className={`text-xs ${getSeasonalityColor(category.seasonality)}`}>
                  {category.seasonality}
                </Badge>
                {category.isPremium && (
                  <Badge variant="secondary" className="text-xs">
                    Buraya premium metni gelecek
                  </Badge>
                )}
              </div>

              {/* Aksiyon Butonları */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleImport(category)}
                    disabled={isCreating}
                    className="h-8 w-8 p-0"
                  >
                    {isCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
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
                  <span>{new Date(category.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Placeholder components for missing imports
const Globe = ({ className }: { className?: string }) => <div className={className}>🌍</div>
const Chopsticks = ({ className }: { className?: string }) => <div className={className}>🥢</div> 