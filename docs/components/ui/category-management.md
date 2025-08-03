"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Edit,
  Trash2,
  Palette,
  Calendar,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Save,
  Archive,
  Clock,
} from "lucide-react"

/**
 * CategoryManagement Component - Kurtarılmış UI
 * 
 * @description Complete category management system with CRUD operations, drag & drop, and seasonality
 * @location Original: menu-management/components/category-management.tsx
 * @usage Menu management category administration
 * 
 * @features
 * - Category CRUD operations
 * - Drag & drop reordering
 * - Seasonality management
 * - Color and icon customization
 * - Bulk selection
 * - Search and filtering
 * - Active/inactive status
 * - Product count tracking
 */

interface Category {
  categoryId: number
  name: string
  description: string
  color: string
  icon: string
  isActive: boolean
  seasonality: "spring" | "summer" | "autumn" | "winter" | "all-year"
  discountPercentage?: number
  productCount: number
  sortOrder: number
  createdAt?: string
  updatedAt?: string
}

interface CategoryManagementProps {
  searchQuery: string
  viewMode: "grid" | "list"
  selectedItems: number[]
  onSelectionChange: (items: number[]) => void
  onAddCategory?: () => void
  onEditCategory?: (category: Category) => void
  dragHandlers?: any
  categories?: Category[]
}

export function CategoryManagement({
  searchQuery,
  viewMode,
  selectedItems,
  onSelectionChange,
  categories: propCategories = [],
}: CategoryManagementProps) {
  const [categories, setCategories] = useState<Category[]>(propCategories)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isDragMode, setIsDragMode] = useState(false)
  const [hasUnsavedOrder, setHasUnsavedOrder] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Placeholder functions
  const loadCategories = async () => {
    // Buraya API çağrısı gelecek
    console.log('Buraya kategoriler yükleniyor metni gelecek')
  }

  const handleToggleActive = async (categoryId: number) => {
    // Buraya API çağrısı gelecek
    console.log('Buraya kategori durumu güncelleniyor metni gelecek')
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDelete = async (categoryId: number) => {
    // Buraya API çağrısı gelecek
    console.log('Buraya kategori siliniyor metni gelecek')
  }

  const handleSelectionChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, categoryId])
    } else {
      onSelectionChange(selectedItems.filter((id) => id !== categoryId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(filteredCategories.map((c) => c.categoryId))
    } else {
      onSelectionChange([])
    }
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(filteredCategories)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedCategories = categories.map((cat) => {
      const newIndex = items.findIndex((item) => item.categoryId === cat.categoryId)
      if (newIndex !== -1) {
        return { ...cat, sortOrder: newIndex + 1 }
      }
      return cat
    })

    setCategories(updatedCategories)
    setHasUnsavedOrder(true)
  }

  const handleSaveOrder = async () => {
    // Buraya API çağrısı gelecek
    console.log('Buraya sıralama kaydediliyor metni gelecek')
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getSeasonalityBadge = (seasonality: Category["seasonality"]) => {
    const variants = {
      spring: { label: "Buraya ilkbahar metni gelecek", variant: "secondary" as const, color: "text-green-600" },
      summer: { label: "Buraya yaz metni gelecek", variant: "secondary" as const, color: "text-yellow-600" },
      autumn: { label: "Buraya sonbahar metni gelecek", variant: "outline" as const, color: "text-orange-600" },
      winter: { label: "Buraya kış metni gelecek", variant: "outline" as const, color: "text-blue-600" },
      "all-year": { label: "Buraya tüm yıl metni gelecek", variant: "default" as const, color: "text-gray-600" },
    }
    return variants[seasonality] || variants["all-year"]
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-2">Buraya kategoriler yükleniyor metni gelecek</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Buraya kategori yönetimi başlığı gelecek
          </h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-muted-foreground">{filteredCategories.length} Buraya kategori bulundu metni gelecek</p>
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedItems.length === filteredCategories.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">
                  {selectedItems.length === filteredCategories.length ? "Buraya seçimi kaldır metni gelecek" : "Buraya tümünü seç metni gelecek"} (
                  {selectedItems.length} Buraya seçili metni gelecek)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Responsive Control Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex gap-2">
            {hasUnsavedOrder && (
              <Button
                onClick={handleSaveOrder}
                variant="outline"
                size="sm"
                className="bg-orange-50 border-orange-200 text-orange-700 whitespace-nowrap"
              >
                <Save className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Buraya sıralamayı kaydet metni gelecek</span>
                <span className="sm:hidden">Buraya kaydet metni gelecek</span>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDragMode(!isDragMode)}
              className={isDragMode ? "bg-blue-50 border-blue-200 text-blue-700" : ""}
            >
              <GripVertical className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">{isDragMode ? "Buraya sıralama modunu kapat metni gelecek" : "Buraya sıralama modu metni gelecek"}</span>
              <span className="sm:hidden">{isDragMode ? "Buraya kapat metni gelecek" : "Buraya sırala metni gelecek"}</span>
            </Button>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg whitespace-nowrap"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Buraya kategori ekle metni gelecek</span>
              <span className="sm:hidden">Buraya ekle metni gelecek</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Ordering Instructions */}
      {isDragMode && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-4">
            <p className="text-sm text-blue-700">
              <strong>Buraya sıralama modu başlığı gelecek:</strong> Buraya sıralama açıklaması gelecek
            </p>
          </CardContent>
        </Card>
      )}

      {/* Categories Display */}
      <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
          {filteredCategories.map((category) => {
            const seasonalityBadge = getSeasonalityBadge(category.seasonality)

            return (
              <Card key={category.categoryId} id={`category-${category.categoryId}`} className="group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedItems.includes(category.categoryId)}
                        onCheckedChange={(checked) => handleSelectionChange(category.categoryId, checked as boolean)}
                      />
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
                        style={{ backgroundColor: category.color + "20" }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {category.productCount} Buraya ürün metni gelecek • Buraya sıra etiketi gelecek: {category.sortOrder}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(category.categoryId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant={seasonalityBadge.variant} className={seasonalityBadge.color}>
                      <Calendar className="mr-1 h-3 w-3" />
                      {seasonalityBadge.label}
                    </Badge>
                    {category.discountPercentage && category.discountPercentage > 0 && (
                      <Badge variant="destructive">%{category.discountPercentage} Buraya indirim metni gelecek</Badge>
                    )}
                    <Badge variant="outline" style={{ borderColor: category.color, color: category.color }}>
                      <Palette className="mr-1 h-3 w-3" />
                      Buraya renk metni gelecek
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.isActive ? "Buraya aktif metni gelecek" : "Buraya pasif metni gelecek"}</span>
                    <Switch
                      checked={category.isActive}
                      onCheckedChange={() => handleToggleActive(category.categoryId)}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

      {filteredCategories.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Buraya kategori bulunamadı metni gelecek</p>
        </Card>
      )}

      <div>Buraya kategori modal bileşeni gelecek</div>
    </div>
  )
} 