"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Edit,
  Trash2,
  Copy,
  Star,
  ChefHat,
  Crown,
  TrendingUp,
} from "lucide-react"

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

interface ProductCardProps {
  product: Product
  isSelected: boolean
  onSelectionChange: (productId: number, checked: boolean) => void
  onEdit: (product: Product) => void
  onDelete: (productId: number) => void
  onDuplicate: (product: Product) => void
  onToggleActive: (productId: number) => void
}

export function ProductCard({
  product,
  isSelected,
  onSelectionChange,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleActive,
}: ProductCardProps) {
  const handleSelectionChange = (checked: boolean) => {
    onSelectionChange(product.productId, checked)
  }

  const handleToggleActive = () => {
    onToggleActive(product.productId)
  }

  return (
    <Card className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleSelectionChange}
            />
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {product.categoryName}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {product.isPremium && (
              <Crown className="h-4 w-4 text-yellow-500" />
            )}
            {product.isChefRecommendation && (
              <ChefHat className="h-4 w-4 text-orange-500" />
            )}
            {product.isPopular && (
              <TrendingUp className="h-4 w-4 text-green-500" />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Fiyat Bilgisi */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">
                ₺{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ₺{product.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={product.isActive}
                onCheckedChange={handleToggleActive}
              />
              <span className="text-xs text-gray-500">
                {product.isActive ? 'Buraya aktif metni gelecek' : 'Buraya pasif metni gelecek'}
              </span>
            </div>
          </div>

          {/* Açıklama */}
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Etiketler */}
          <div className="flex flex-wrap gap-1">
            {product.isPremium && (
              <Badge variant="secondary" className="text-xs">
                {product.premiumLabel || 'Buraya premium metni gelecek'}
              </Badge>
            )}
            {product.calories && (
              <Badge variant="outline" className="text-xs">
                {product.calories} Buraya kcal metni gelecek
              </Badge>
            )}
            {product.stockStatus && (
              <Badge 
                variant={product.stockStatus === 'in_stock' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {product.stockStatus === 'in_stock' ? 'Buraya stokta metni gelecek' : 'Buraya stok yok metni gelecek'}
              </Badge>
            )}
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(product)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDuplicate(product)}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(product.productId)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-gray-500">4.5</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 