// ==========================================
// INVENTORY MODULE COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/modules/InventoryModule.tsx
// Satır Sayısı: 679 satır

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import useInventory from "@/hooks/useInventory"
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Truck,
  BarChart3,
  Calendar,
  ShoppingCart,
  Archive,
  RefreshCw,
  Download,
  Upload,
  Filter
} from "lucide-react"
import ModuleHeader from "@/components/common/ModuleHeader"

/**
 * InventoryModule Component
 * 
 * @description Complete inventory management system with stock tracking, supplier management, and automated reordering
 * @location Original: panel/page.tsx renderMainContent() - case "inventory" (placeholder)
 * @usage Panel dashboard inventory management section
 * 
 * @features
 * - Real-time stock tracking
 * - Low stock alerts
 * - Supplier management
 * - Purchase order management
 * - Stock movement history
 * - Inventory valuation
 * - Expiration date tracking
 * - Automated reordering
 * - Barcode scanning
 * - Waste tracking
 * - Cost analysis
 * - Inventory reports
 * 
 * @props
 * - modules: Module navigation data
 * - activeModule: Current active module
 * - onModuleChange: Module change handler
 * - theme: Dark/light theme setting
 */

interface InventoryModuleProps {
  modules: any[]
  activeModule: string
  onModuleChange: (module: string) => void
  theme: string
}

interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  costPerUnit: number
  totalValue: number
  supplier: string
  lastRestocked: Date
  expirationDate?: Date
  location: string
  status: "in-stock" | "low-stock" | "out-of-stock" | "expired"
  movements: StockMovement[]
  description?: string
  barcode?: string
}

interface StockMovement {
  id: string
  type: "in" | "out" | "adjustment"
  quantity: number
  reason: string
  date: Date
  user: string
  reference?: string
}

interface Supplier {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  address: string
  rating: number
  activeOrders: number
  totalOrders: number
}

export function InventoryModule({
  modules, activeModule, onModuleChange, theme
}: InventoryModuleProps) {
  // State hooks - her zaman aynı sırada
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [activeTab, setActiveTab] = useState("items")

  // Use inventory hook for dynamic data - her zaman çağrılmalı
  const { 
    inventory, 
    suppliers, 
    loading: isLoading, 
    error,
    refetch,
    getStockStatus,
    getStockPercentage,
    getStockColor,
    stats
  } = useInventory({
    search: searchTerm,
    category: categoryFilter !== "all" ? categoryFilter : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    sort_by: "name"
  })

  // Transform API data to match component interface - useMemo ile optimize edildi
  const inventoryItems = useMemo(() => inventory.map(item => ({
    id: item.id,
    name: item.name,
    sku: item.sku,
    category: item.category,
    currentStock: item.current_stock,
    minStock: item.min_stock,
    maxStock: item.max_stock,
    unit: item.unit,
    costPerUnit: item.cost_per_unit,
    totalValue: item.total_value,
    supplier: item.supplier_name || 'Buraya bilinmeyen metni gelecek',
    lastRestocked: item.last_restocked ? new Date(item.last_restocked) : new Date(),
    expirationDate: item.expiration_date ? new Date(item.expiration_date) : undefined,
    location: item.location,
    status: item.status,
    movements: (item.movements || []).map(movement => ({
      ...movement,
      date: new Date(movement.date)
    })),
    description: item.description,
    barcode: item.barcode
  })), [inventory])

  // Transform suppliers data - useMemo ile optimize edildi
  const suppliersData = useMemo(() => suppliers.map(supplier => ({
    id: supplier.id,
    name: supplier.name,
    contact: supplier.contact_person,
    email: supplier.email,
    phone: supplier.phone,
    address: supplier.address,
    rating: supplier.rating,
    activeOrders: supplier.active_products,
    totalOrders: supplier.total_inventory_value
  })), [suppliers])

  // Filter items based on search and filters - useMemo ile optimize edildi
  const filteredInventoryItems = useMemo(() => {
    let filtered = inventoryItems

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.sku.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        item.supplier.toLowerCase().includes(searchLower)
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter)
    }

    return filtered
  }, [inventoryItems, searchTerm, categoryFilter, statusFilter])

  // Enhanced stats - useMemo ile optimize edildi
  const enhancedStats = useMemo(() => {
    const totalItems = inventoryItems.length
    const lowStockItems = inventoryItems.filter(item => item.status === 'low-stock').length
    const outOfStockItems = inventoryItems.filter(item => item.status === 'out-of-stock').length
    const totalValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0)
    const averageStock = totalItems > 0 ? inventoryItems.reduce((sum, item) => sum + item.currentStock, 0) / totalItems : 0

    return {
      totalItems,
      lowStockItems,
      outOfStockItems,
      totalValue,
      averageStock,
      suppliersCount: suppliersData.length
    }
  }, [inventoryItems, suppliersData])

  // Low stock items - useMemo ile optimize edildi
  const lowStockItems = useMemo(() => 
    inventoryItems.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock')
      .slice(0, 5), 
    [inventoryItems]
  )

  // Get unique categories - useMemo ile optimize edildi
  const categories = useMemo(() => {
    const categorySet = new Set(inventoryItems.map(item => item.category))
    return Array.from(categorySet).sort()
  }, [inventoryItems])

  // Loading state - sadece gerçekten loading ve veri yoksa göster
  if (isLoading && inventory.length === 0 && suppliers.length === 0) {
    return (
      <div className="space-y-6">
        <div className="lg:hidden">
          <ModuleHeader 
            modules={modules} 
            activeModule={activeModule} 
            onModuleChange={onModuleChange}
            theme={theme}
          />
        </div>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-orange-500" />
          <span className="ml-2 text-lg">Buraya stok bilgileri yükleniyor metni gelecek...</span>
        </div>
      </div>
    )
  }

  // Get status badge
  const getStatusBadge = (status: InventoryItem['status']) => {
    const styles = {
      "in-stock": "bg-green-100 text-green-800 border-green-200",
      "low-stock": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "out-of-stock": "bg-red-100 text-red-800 border-red-200",
      "expired": "bg-gray-100 text-gray-800 border-gray-200"
    }

    const labels = {
      "in-stock": "Buraya stokta metni gelecek",
      "low-stock": "Buraya az stok metni gelecek",
      "out-of-stock": "Buraya stok yok metni gelecek",
      "expired": "Buraya süresi dolmuş metni gelecek"
    }

    return (
      <Badge className={`${styles[status]} border`}>
        {labels[status]}
      </Badge>
    )
  }

  // Use methods from hook (getStockPercentage, getStockColor are already available from useInventory)

  if (error) {
    return (
      <div className="space-y-6">
        <div className="lg:hidden">
          <ModuleHeader 
            modules={modules} 
            activeModule={activeModule} 
            onModuleChange={onModuleChange}
            theme={theme}
          />
        </div>
        <div className="flex items-center justify-center h-64 text-red-600">
          <AlertTriangle className="h-8 w-8 mr-2" />
          <span className="text-lg">Buraya hata metni gelecek: {error}</span>
          <Button onClick={refetch} className="ml-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Buraya tekrar dene buton metni gelecek
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ModuleHeader sadece mobilde göster */}
      <div className="lg:hidden">
        <ModuleHeader 
          modules={modules} 
          activeModule={activeModule} 
          onModuleChange={onModuleChange}
          theme={theme}
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buraya toplam ürün başlığı gelecek</p>
                <p className="text-2xl font-bold">{enhancedStats.totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buraya düşük stok başlığı gelecek</p>
                <p className="text-2xl font-bold text-yellow-600">{enhancedStats.lowStockItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buraya stok değeri başlığı gelecek</p>
                <p className="text-2xl font-bold text-green-600">₺{enhancedStats.totalValue.toFixed(0)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buraya yakında bitecek başlığı gelecek</p>
                <p className="text-2xl font-bold text-red-600">{enhancedStats.outOfStockItems}</p>
              </div>
              <Clock className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="items">Buraya stok öğeleri başlığı gelecek ({enhancedStats.totalItems})</TabsTrigger>
          <TabsTrigger value="low-stock">Buraya düşük stok başlığı gelecek ({enhancedStats.lowStockItems})</TabsTrigger>
          <TabsTrigger value="suppliers">Buraya tedarikçiler başlığı gelecek ({enhancedStats.suppliersCount})</TabsTrigger>
          <TabsTrigger value="movements">Buraya hareketler başlığı gelecek</TabsTrigger>
        </TabsList>

        {/* Inventory Items Tab */}
        <TabsContent value="items" className="mt-6">
          {/* Filters and Search */}
          <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm mb-6`}>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buraya ürün adı SKU kategori veya tedarikçi ara placeholder metni gelecek..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Buraya kategori placeholder metni gelecek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Buraya tüm kategoriler metni gelecek</SelectItem>
                    <SelectItem value="Et Ürünleri">Buraya et ürünleri metni gelecek</SelectItem>
                    <SelectItem value="Süt Ürünleri">Buraya süt ürünleri metni gelecek</SelectItem>
                    <SelectItem value="Sebze">Buraya sebze metni gelecek</SelectItem>
                    <SelectItem value="Ekmek">Buraya ekmek metni gelecek</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-40">
                    <SelectValue placeholder="Buraya durum placeholder metni gelecek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Buraya tüm durumlar metni gelecek</SelectItem>
                    <SelectItem value="in-stock">Buraya stokta metni gelecek</SelectItem>
                    <SelectItem value="low-stock">Buraya az stok metni gelecek</SelectItem>
                    <SelectItem value="out-of-stock">Buraya stok yok metni gelecek</SelectItem>
                    <SelectItem value="expired">Buraya süresi dolmuş metni gelecek</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Buraya yeni ürün buton metni gelecek
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Buraya içe aktar buton metni gelecek
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Items Grid */}
          <div className="grid gap-4">
            {filteredInventoryItems.length === 0 ? (
              <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
                <CardContent className="p-8 text-center">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Buraya ürün bulunamadı başlığı gelecek</h3>
                  <p className="text-muted-foreground">Buraya aradığınız kriterlere uygun ürün bulunmuyor açıklaması gelecek.</p>
                </CardContent>
              </Card>
            ) : (
              filteredInventoryItems.map((item) => (
                <Card key={item.id} className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                      {/* Item Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                        
                        <div className="text-sm space-y-1">
                          <p><strong>Buraya tedarikçi etiketi gelecek:</strong> {item.supplier}</p>
                          <p><strong>Buraya konum etiketi gelecek:</strong> {item.location}</p>
                          <p><strong>Buraya son stok etiketi gelecek:</strong> {item.lastRestocked.toLocaleDateString('tr-TR')}</p>
                          {item.expirationDate && (
                            <p><strong>Buraya son kullanma etiketi gelecek:</strong> {item.expirationDate.toLocaleDateString('tr-TR')}</p>
                          )}
                        </div>
                      </div>

                      {/* Stock Levels */}
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Buraya stok durumu başlığı gelecek</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Buraya mevcut etiketi gelecek:</span>
                              <span className="font-medium">{item.currentStock} {item.unit}</span>
                            </div>
                            <Progress 
                              value={getStockPercentage(item.currentStock, item.maxStock)} 
                              className="h-2"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Buraya min etiketi gelecek: {item.minStock}</span>
                              <span>Buraya max etiketi gelecek: {item.maxStock}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cost Info */}
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Buraya maliyet bilgisi başlığı gelecek</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Buraya birim fiyat etiketi gelecek:</span>
                              <span className="font-medium">₺{item.costPerUnit.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-1">
                              <span>Buraya toplam değer etiketi gelecek:</span>
                              <span className="font-medium text-green-600">₺{item.totalValue.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Movements */}
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Buraya son hareketler başlığı gelecek</h4>
                          <div className="space-y-2">
                            {item.movements.slice(0, 2).map((movement) => (
                              <div key={movement.id} className="text-xs border-l-2 border-gray-200 pl-2">
                                <div className="flex items-center gap-1">
                                  {movement.type === "in" ? (
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                  ) : movement.type === "out" ? (
                                    <TrendingDown className="h-3 w-3 text-red-500" />
                                  ) : (
                                    <RefreshCw className="h-3 w-3 text-blue-500" />
                                  )}
                                  <span className={movement.type === "in" ? "text-green-600" : "text-red-600"}>
                                    {movement.type === "in" ? "+" : "-"}{movement.quantity} {item.unit}
                                  </span>
                                </div>
                                <p className="text-muted-foreground">{movement.reason}</p>
                                <p className="text-muted-foreground">{movement.date.toLocaleDateString('tr-TR')}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            Buraya detaylar buton metni gelecek
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="h-4 w-4 mr-2" />
                            Buraya düzenle buton metni gelecek
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Buraya sipariş ver buton metni gelecek
                          </Button>
                          <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Buraya sil buton metni gelecek
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Low Stock Tab */}
        <TabsContent value="low-stock" className="mt-6">
          <div className="grid gap-4">
            {lowStockItems.map((item) => (
              <Card key={item.id} className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm border-l-4 ${item.status === "out-of-stock" ? "border-l-red-500" : "border-l-yellow-500"}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${item.status === "out-of-stock" ? "bg-red-100" : "bg-yellow-100"}`}>
                        {item.status === "out-of-stock" ? 
                          <XCircle className="h-6 w-6 text-red-600" /> : 
                          <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        }
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Buraya mevcut etiketi gelecek: {item.currentStock} {item.unit} / Buraya min etiketi gelecek: {item.minStock} {item.unit}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buraya sipariş ver buton metni gelecek
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="mt-6">
          <div className="grid gap-4">
                            {suppliersData.map((supplier) => (
              <Card key={supplier.id} className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold mb-2">{supplier.name}</h3>
                      <div className="space-y-1 text-sm">
                        <p><strong>Buraya iletişim etiketi gelecek:</strong> {supplier.contact}</p>
                        <p><strong>Buraya email etiketi gelecek:</strong> {supplier.email}</p>
                        <p><strong>Buraya telefon etiketi gelecek:</strong> {supplier.phone}</p>
                        <p><strong>Buraya adres etiketi gelecek:</strong> {supplier.address}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Buraya istatistikler başlığı gelecek</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Buraya değerlendirme etiketi gelecek:</span>
                            <span className="font-medium">{supplier.rating}/5.0</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Buraya aktif siparişler etiketi gelecek:</span>
                            <span className="font-medium">{supplier.activeOrders}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Buraya toplam siparişler etiketi gelecek:</span>
                            <span className="font-medium">{supplier.totalOrders}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Buraya detaylar buton metni gelecek
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Buraya düzenle buton metni gelecek
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Truck className="h-4 w-4 mr-2" />
                        Buraya sipariş ver buton metni gelecek
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Movements Tab */}
        <TabsContent value="movements" className="mt-6">
          <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
            <CardContent className="p-8 text-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Buraya stok hareketleri başlığı gelecek</h3>
              <p className="text-muted-foreground">Buraya bu özellik yakında eklenecek açıklaması gelecek.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ==========================================
// PLACEHOLDER COMPONENTS
// ==========================================

// Card component placeholder
function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}

// CardContent component placeholder
function CardContent({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}

// CardHeader component placeholder
function CardHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}

// CardTitle component placeholder
function CardTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h3 className={className}>{children}</h3>
}

// Button component placeholder
function Button({ children, className, onClick, size, variant, type }: { children: React.ReactNode, className?: string, onClick?: () => void, size?: string, variant?: string, type?: string }) {
  return <button className={className} onClick={onClick} type={type}>{children}</button>
}

// Badge component placeholder
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return <span className={className}>{children}</span>
}

// Input component placeholder
function Input({ placeholder, value, onChange, className }: { placeholder?: string, value?: string, onChange?: (e: any) => void, className?: string }) {
  return <input placeholder={placeholder} value={value} onChange={onChange} className={className} />
}

// Select component placeholder
function Select({ children, value, onValueChange }: { children: React.ReactNode, value?: string, onValueChange?: (value: string) => void }) {
  return <select value={value} onChange={(e) => onValueChange?.(e.target.value)}>{children}</select>
}

// SelectTrigger component placeholder
function SelectTrigger({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}

// SelectValue component placeholder
function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>
}

// SelectContent component placeholder
function SelectContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

// SelectItem component placeholder
function SelectItem({ children, value }: { children: React.ReactNode, value?: string }) {
  return <option value={value}>{children}</option>
}

// Tabs component placeholder
function Tabs({ children, value, onValueChange }: { children: React.ReactNode, value?: string, onValueChange?: (value: string) => void }) {
  return <div>{children}</div>
}

// TabsList component placeholder
function TabsList({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}

// TabsTrigger component placeholder
function TabsTrigger({ children, value }: { children: React.ReactNode, value?: string }) {
  return <button value={value}>{children}</button>
}

// TabsContent component placeholder
function TabsContent({ children, value, className }: { children: React.ReactNode, value?: string, className?: string }) {
  return <div className={className}>{children}</div>
}

// Progress component placeholder
function Progress({ value, className }: { value?: number, className?: string }) {
  return <div className={className} style={{ width: `${value}%` }}></div>
}

// ModuleHeader component placeholder
function ModuleHeader({ modules, activeModule, onModuleChange, theme }: { modules: any[], activeModule: string, onModuleChange: (module: string) => void, theme: string }) {
  return <div className="module-header"></div>
}

// useInventory hook placeholder
function useInventory(config: any) {
  return {
    inventory: [],
    suppliers: [],
    loading: false,
    error: null,
    refetch: () => {},
    getStockStatus: () => 'in-stock',
    getStockPercentage: (current: number, max: number) => (current / max) * 100,
    getStockColor: () => 'green',
    stats: {}
  }
} 