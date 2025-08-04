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
  Copy,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Save,
  Star,
  ChefHat,
  Crown,
  TrendingUp,
} from "lucide-react"

/**
 * ProductManagement Component - Kurtarılmış UI
 *
 * @description Complete product management system with CRUD operations, drag & drop, and filtering
 * @location Original: menu-management/components/product-management.tsx
 * @usage Menu management product administration
 *
 * @features
 * - Product CRUD operations
 * - Drag & drop reordering
 * - Category filtering
 * - Search functionality
 * - Bulk selection
 * - Sort and filter options
 * - Active/inactive status
 * - Duplicate products
 * - Modal management
 * - Responsive design
 */

interface Product {
  productId: number
  name: string
  description: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  categoryId: number
  categoryName: string
  imageUrl: string
  isActive: boolean
  isPremium: boolean
  premiumLabel?: string
  isChefRecommendation: boolean
  isPopular: boolean
  calories?: number
  allergens?: string
  tags?: string
  stockStatus: string
  sortOrder: number
  createdAt?: string
  updatedAt?: string
}

interface Category {
  categoryId: number
  name: string
  color: string
  icon: string
  productCount: number
}

interface ProductManagementProps {
  searchQuery: string
  viewMode: "grid" | "list"
  selectedItems: number[]
  onSelectionChange: (items: number[]) => void
  onAddProduct?: () => void
  onEditProduct?: (product: Product) => void
}

export function ProductManagement({
  searchQuery,
  viewMode,
  selectedItems,
  onSelectionChange,
}: ProductManagementProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDragMode, setIsDragMode] = useState(false)
  const [hasUnsavedOrder, setHasUnsavedOrder] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState<"sortOrder" | "name" | "price" | "rating" | "stock">("sortOrder")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Placeholder functions
  const loadCategories = async () => {
    // Buraya kategoriler yükleme API çağrısı gelecek
    console.log('Buraya kategoriler yükleniyor metni gelecek')
  }

  const loadProducts = async () => {
    // Buraya ürünler yükleme API çağrısı gelecek
    console.log('Buraya ürünler yükleniyor metni gelecek')
  }

  const handleDragEnd = (result: any) => {
    // Buraya drag & drop işlemi gelecek
    console.log('Buraya drag & drop işlemi gelecek')
  }

  const handleSaveOrder = async () => {
    // Buraya sıralama kaydetme API çağrısı gelecek
    console.log('Buraya sıralama kaydetme metni gelecek')
  }

  const handleToggleActive = async (productId: number) => {
    // Buraya ürün durumu güncelleme API çağrısı gelecek
    console.log('Buraya ürün durumu güncelleme metni gelecek')
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (productId: number) => {
    // Buraya ürün silme API çağrısı gelecek
    console.log('Buraya ürün silme metni gelecek')
  }

  const handleDuplicate = async (product: Product) => {
    // Buraya ürün kopyalama API çağrısı gelecek
    console.log('Buraya ürün kopyalama metni gelecek')
  }

  const handleSelectionChange = (productId: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, productId])
    } else {
      onSelectionChange(selectedItems.filter((id) => id !== productId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(products.map((p) => p.productId))
    } else {
      onSelectionChange([])
    }
  }

  const selectedCategory = categories.find((cat) => cat.categoryId === selectedCategoryId)

  if (isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Buraya yükleme metni gelecek</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Buraya ürün yönetimi başlığı gelecek
          </h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-muted-foreground">
              {selectedCategory?.name === "Buraya tümü metni gelecek"
                ? `${products.length} Buraya ürün bulundu metni gelecek`
                : `${selectedCategory?.name} - ${products.length} Buraya ürün metni gelecek`}
            </p>
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={
                    selectedItems.length === products.length && products.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">
                  {selectedItems.length === products.length && products.length > 0
                    ? "Buraya seçimi kaldır metni gelecek"
                    : "Buraya tümünü seç metni gelecek"}{" "}
                  ({selectedItems.length} Buraya seçili metni gelecek)
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasUnsavedOrder && (
            <Button
              onClick={handleSaveOrder}
              variant="outline"
              className="bg-orange-50 border-orange-200 text-orange-700"
              disabled={isLoading}
            >
              <Save className="mr-2 h-4 w-4" />
              Buraya sıralamayı kaydet metni gelecek
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => setIsDragMode(!isDragMode)}
            className={isDragMode ? "bg-blue-50 border-blue-200 text-blue-700" : ""}
          >
            <GripVertical className="mr-2 h-4 w-4" />
            {isDragMode ? "Buraya sıralama modunu kapat metni gelecek" : "Buraya sıralama modu metni gelecek"}
          </Button>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Buraya ürün ekle metni gelecek
          </Button>
        </div>
      </div>

      {/* Category Slider */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.categoryId}
            onClick={() => setSelectedCategoryId(category.categoryId)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedCategoryId === category.categoryId
                ? "bg-blue-100 text-blue-700 border border-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            <span className="text-xs text-gray-500">({category.productCount})</span>
          </button>
        ))}
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

      {/* Sort and Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedItems.length > 0 ? `${selectedItems.length} Buraya ürün seçili metni gelecek - Buraya toplu işlem metni gelecek` : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="sortOrder">Buraya sıraya göre metni gelecek</option>
            <option value="name">Buraya isme göre metni gelecek</option>
            <option value="price">Buraya fiyata göre metni gelecek</option>
          </select>

          <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "↑" : "↓"}
          </Button>
        </div>
      </div>

      {/* Products Display */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <ChefHat className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Buraya ürün bulunamadı başlığı gelecek</h3>
          <p className="text-gray-600 mb-4">
            {selectedCategory?.name === "Buraya tümü metni gelecek"
              ? "Buraya arama kriterleri açıklaması gelecek"
              : `${selectedCategory?.name} Buraya kategori açıklaması gelecek`}
          </p>
          <Button onClick={() => setIsModalOpen(true)}>
            Buraya ilk ürünü ekle metni gelecek
          </Button>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"}>
          {products.map((product) => (
            <div
              key={product.productId}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDuplicate(product)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(product.productId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">Buraya fiyat metni gelecek: {product.price}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  product.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}>
                  {product.isActive ? "Buraya aktif metni gelecek" : "Buraya pasif metni gelecek"}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500">
                  Buraya kategori metni gelecek: {product.categoryName}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Modal Placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Buraya ürün modal başlığı gelecek</h3>
            <p className="text-gray-600 mb-4">Buraya modal açıklaması gelecek</p>
            <div className="flex gap-2">
              <Button onClick={() => setIsModalOpen(false)}>
                Buraya kapat metni gelecek
              </Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Buraya iptal metni gelecek
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Placeholder UI components
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border rounded-lg p-4 ${className}`}>{children}</div>
}

function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export default ProductManagement 