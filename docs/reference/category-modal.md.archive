"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface Category {
  categoryId?: number
  name: string
  description: string
  color: string
  icon: string
  isActive: boolean
  seasonality: "summer" | "winter" | "all-year" | "spring" | "autumn"
  discountPercentage?: number
  productCount: number
}

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category?: Category | null
  onSave: (category: Omit<Category, "categoryId">) => void
}

const colorOptions = [
  { value: "#ef4444", label: "Buraya kırmızı metni gelecek" },
  { value: "#f97316", label: "Buraya turuncu metni gelecek" },
  { value: "#eab308", label: "Buraya sarı metni gelecek" },
  { value: "#22c55e", label: "Buraya yeşil metni gelecek" },
  { value: "#3b82f6", label: "Buraya mavi metni gelecek" },
  { value: "#8b5cf6", label: "Buraya mor metni gelecek" },
  { value: "#ec4899", label: "Buraya pembe metni gelecek" },
  { value: "#10B981", label: "Buraya emerald metni gelecek" },
  { value: "#F59E0B", label: "Buraya amber metni gelecek" },
  { value: "#3B82F6", label: "Buraya blue metni gelecek" },
  { value: "#EC4899", label: "Buraya pink metni gelecek" },
  { value: "#8B5CF6", label: "Buraya violet metni gelecek" },
]

const iconOptions = ["🍽️", "🍲", "🥗", "🍕", "🍔", "🍰", "☕", "🥤", "🍜", "🥘", "🍖", "🍗", "🥩", "🍤", "🍣", "🍱", "🥟", "🍙", "🍚", "🍛"]

export function CategoryModal({ isOpen, onClose, category, onSave }: CategoryModalProps) {
  const [formData, setFormData] = useState<Omit<Category, "categoryId">>({
    name: "",
    description: "",
    color: "#ef4444",
    icon: "🍽️",
    isActive: true,
    seasonality: "all-year",
    productCount: 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        color: category.color,
        icon: category.icon,
        isActive: category.isActive,
        seasonality: category.seasonality,
        discountPercentage: category.discountPercentage,
        productCount: category.productCount,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        color: "#ef4444",
        icon: "🍽️",
        isActive: true,
        seasonality: "all-year",
        productCount: 0,
      })
    }
    setErrors({})
  }, [category, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Buraya kategori adı zorunlu hata mesajı gelecek"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Buraya açıklama zorunlu hata mesajı gelecek"
    }

    if (formData.discountPercentage && (formData.discountPercentage < 0 || formData.discountPercentage > 100)) {
      newErrors.discountPercentage = "Buraya indirim oranı hata mesajı gelecek"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{category ? "Buraya kategori düzenle başlığı gelecek" : "Buraya yeni kategori ekle başlığı gelecek"}</DialogTitle>
          <DialogDescription>Buraya kategori bilgileri açıklaması gelecek. Buraya zorunlu alanlar açıklaması gelecek.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name-input">Buraya kategori adı etiketi gelecek *</Label>
            <Input
              id="category-name-input"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Buraya kategori adı placeholder gelecek"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-description-input">Buraya açıklama etiketi gelecek *</Label>
            <Textarea
              id="category-description-input"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Buraya kategori açıklaması placeholder gelecek"
              rows={3}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Buraya renk etiketi gelecek</Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={`h-8 w-8 rounded-full border-2 ${
                      formData.color === color.value ? "border-foreground" : "border-muted"
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Buraya ikon etiketi gelecek</Label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className={`h-8 w-8 rounded border text-lg ${
                      formData.icon === icon ? "border-foreground bg-muted" : "border-muted"
                    }`}
                    onClick={() => setFormData((prev) => ({ ...prev, icon }))}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Buraya mevsimsellik etiketi gelecek</Label>
            <Select
              value={formData.seasonality}
              onValueChange={(value: "spring" | "summer" | "autumn" | "winter" | "all-year") =>
                setFormData((prev) => ({ ...prev, seasonality: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-year">🗓️ Buraya tüm yıl metni gelecek</SelectItem>
                <SelectItem value="spring">🌸 Buraya ilkbahar metni gelecek</SelectItem>
                <SelectItem value="summer">☀️ Buraya yaz metni gelecek</SelectItem>
                <SelectItem value="autumn">🍂 Buraya sonbahar metni gelecek</SelectItem>
                <SelectItem value="winter">❄️ Buraya kış metni gelecek</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount-rate-input">Buraya indirim oranı etiketi gelecek (%)</Label>
            <Input
              id="discount-rate-input"
              type="number"
              min="0"
              max="100"
              value={formData.discountPercentage || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  discountPercentage: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              placeholder="Buraya indirim oranı placeholder gelecek"
            />
            {errors.discountPercentage && <p className="text-sm text-destructive">{errors.discountPercentage}</p>}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="category-active-switch">Buraya aktif etiketi gelecek</Label>
            <Switch
              id="category-active-switch"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
            />
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Buraya önizleme etiketi gelecek</Label>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
                style={{ backgroundColor: formData.color + "20" }}
              >
                {formData.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{formData.name || "Buraya kategori adı placeholder gelecek"}</h4>
                <p className="text-sm text-muted-foreground">{formData.description || "Buraya kategori açıklaması placeholder gelecek"}</p>
              </div>
              <div className="flex gap-1">
                {formData.discountPercentage && <Badge variant="destructive">%{formData.discountPercentage}</Badge>}
                <Badge variant={formData.isActive ? "default" : "secondary"}>
                  {formData.isActive ? "Buraya aktif metni gelecek" : "Buraya pasif metni gelecek"}
                </Badge>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Buraya iptal metni gelecek
            </Button>
            <Button type="submit">{category ? "Buraya güncelle metni gelecek" : "Buraya ekle metni gelecek"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 