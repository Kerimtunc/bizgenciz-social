import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  UserPlus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Star,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Heart,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Gift,
  Crown,
  RefreshCw
} from "lucide-react"

/**
 * CustomersModule Component - Kurtarılmış UI
 * 
 * @description Complete customer relationship management (CRM) system with customer profiles, analytics, and loyalty program integration
 * @location Original: panel/page.tsx renderMainContent() - case "customers" (placeholder)
 * @usage Panel dashboard customer management section
 * 
 * @features
 * - Customer profile management
 * - Customer analytics and insights
 * - Order history tracking
 * - Loyalty program integration
 * - Customer segmentation
 * - Communication tools
 * - Birthday and anniversary tracking
 * - Customer feedback management
 * - Advanced search and filtering
 * - Customer lifetime value (CLV) calculation
 */

interface CustomersModuleProps {
  modules: any[]
  activeModule: string
  onModuleChange: (module: string) => void
  theme: string
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  address?: string
  birthday?: Date
  registrationDate: Date
  lastVisit: Date
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  loyaltyPoints: number
  tier: "bronze" | "silver" | "gold" | "platinum"
  status: "active" | "inactive" | "vip"
  notes?: string
  preferences: {
    favoriteItems: string[]
    dietaryRestrictions: string[]
    communicationPreference: "email" | "sms" | "both" | "none"
  }
  socialMedia?: {
    instagram?: string
    twitter?: string
    facebook?: string
  }
}

export function CustomersModule({
  modules, activeModule, onModuleChange, theme
}: CustomersModuleProps) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [tierFilter, setTierFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Placeholder functions
  const fetchCustomers = async (): Promise<Customer[]> => {
    // Buraya API çağrısı gelecek
    console.log('Customers data yükleniyor...')
    return []
  }

  useEffect(() => {
    const loadCustomersData = async () => {
      setIsLoading(true)
      
      try {
        const customersData = await fetchCustomers()
        
        setCustomers(customersData)
        setFilteredCustomers(customersData)
        
        console.log(`✅ Dinamik müşteri verileri yüklendi: ${customersData.length} müşteri`)
      } catch (error) {
        console.error('❌ Müşteri veri yükleme hatası:', error)
        // Hata durumunda fallback veriler
        setCustomers([])
        setFilteredCustomers([])
      } finally {
        setIsLoading(false)
      }
    }
    
    loadCustomersData()
  }, [])

  // Filter customers based on search and filters
  useEffect(() => {
    let filtered = customers

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      )
    }

    // Tier filter
    if (tierFilter !== "all") {
      filtered = filtered.filter(customer => customer.tier === tierFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(customer => customer.status === statusFilter)
    }

    // Tab filter
    if (activeTab === "vip") {
      filtered = filtered.filter(customer => customer.status === "vip")
    } else if (activeTab === "new") {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(customer => customer.registrationDate > thirtyDaysAgo)
    } else if (activeTab === "inactive") {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(customer => customer.lastVisit < thirtyDaysAgo)
    }

    setFilteredCustomers(filtered)
  }, [customers, searchTerm, tierFilter, statusFilter, activeTab])

  // Tier badge styling
  const getTierBadge = (tier: Customer['tier']) => {
    const styles = {
      bronze: "bg-amber-100 text-amber-800 border-amber-200",
      silver: "bg-gray-100 text-gray-800 border-gray-200",
      gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
      platinum: "bg-purple-100 text-purple-800 border-purple-200"
    }

    const labels = {
      bronze: "Buraya bronz metni gelecek",
      silver: "Buraya gümüş metni gelecek", 
      gold: "Buraya altın metni gelecek",
      platinum: "Buraya platin metni gelecek"
    }

    return (
      <Badge className={`${styles[tier]} border`}>
        {labels[tier]}
      </Badge>
    )
  }

  // Status badge styling
  const getStatusBadge = (status: Customer['status']) => {
    const styles = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-red-100 text-red-800 border-red-200",
      vip: "bg-purple-100 text-purple-800 border-purple-200"
    }

    const labels = {
      active: "Buraya aktif metni gelecek",
      inactive: "Buraya pasif metni gelecek",
      vip: "Buraya VIP metni gelecek"
    }

    return (
      <Badge className={`${styles[status]} border`}>
        {labels[status]}
      </Badge>
    )
  }

  // Calculate statistics
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active" || c.status === "vip").length,
    vip: customers.filter(c => c.status === "vip").length,
    newThisMonth: customers.filter(c => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      return c.registrationDate > thirtyDaysAgo
    }).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageLifetimeValue: customers.length > 0 ? customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length : 0
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-orange-500" />
          <span className="ml-2 text-lg">Buraya müşteriler yükleniyor metni gelecek</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buraya toplam müşteri etiketi gelecek</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buraya aktif müşteri etiketi gelecek</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buraya VIP müşteri etiketi gelecek</p>
                <p className="text-2xl font-bold text-purple-600">{stats.vip}</p>
              </div>
              <Crown className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buraya bu ay yeni etiketi gelecek</p>
                <p className="text-2xl font-bold text-blue-600">{stats.newThisMonth}</p>
              </div>
              <UserPlus className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buraya toplam gelir etiketi gelecek</p>
                <p className="text-2xl font-bold text-green-600">₺{stats.totalRevenue.toFixed(0)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buraya ort. CLV etiketi gelecek</p>
                <p className="text-2xl font-bold text-orange-600">₺{stats.averageLifetimeValue.toFixed(0)}</p>
              </div>
              <Heart className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buraya arama placeholder metni gelecek"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Buraya seviye placeholder metni gelecek" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Buraya tüm seviyeler metni gelecek</SelectItem>
                <SelectItem value="bronze">Buraya bronz metni gelecek</SelectItem>
                <SelectItem value="silver">Buraya gümüş metni gelecek</SelectItem>
                <SelectItem value="gold">Buraya altın metni gelecek</SelectItem>
                <SelectItem value="platinum">Buraya platin metni gelecek</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Buraya durum placeholder metni gelecek" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Buraya tüm durumlar metni gelecek</SelectItem>
                <SelectItem value="active">Buraya aktif metni gelecek</SelectItem>
                <SelectItem value="inactive">Buraya pasif metni gelecek</SelectItem>
                <SelectItem value="vip">Buraya VIP metni gelecek</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Buraya yeni müşteri metni gelecek
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Buraya tüm müşteriler metni gelecek ({stats.total})</TabsTrigger>
          <TabsTrigger value="vip">Buraya VIP müşteriler metni gelecek ({stats.vip})</TabsTrigger>
          <TabsTrigger value="new">Buraya yeni müşteriler metni gelecek ({stats.newThisMonth})</TabsTrigger>
          <TabsTrigger value="inactive">Buraya pasif müşteriler metni gelecek</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4">
            {filteredCustomers.length === 0 ? (
              <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
                <CardContent className="p-8 text-center">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Buraya müşteri bulunamadı başlığı gelecek</h3>
                  <p className="text-muted-foreground">Buraya müşteri bulunamadı açıklaması gelecek</p>
                </CardContent>
              </Card>
            ) : (
              filteredCustomers.map((customer) => (
                <Card key={customer.id} className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Customer Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{customer.name}</h3>
                              {getTierBadge(customer.tier)}
                              {getStatusBadge(customer.status)}
                            </div>
                            
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>{customer.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{customer.phone}</span>
                              </div>
                              {customer.address && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span className="text-xs">{customer.address}</span>
                                </div>
                              )}
                              {customer.birthday && (
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>Buraya doğum günü etiketi gelecek: {customer.birthday.toLocaleDateString('tr-TR')}</span>
                                </div>
                              )}
                            </div>

                            {customer.notes && (
                              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                                <strong>Buraya not etiketi gelecek:</strong> {customer.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Customer Stats */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Buraya müşteri istatistikleri başlığı gelecek</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Buraya toplam sipariş etiketi gelecek:</span>
                              <span className="font-medium">{customer.totalOrders}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Buraya toplam harcama etiketi gelecek:</span>
                              <span className="font-medium">₺{customer.totalSpent.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Buraya ortalama sipariş etiketi gelecek:</span>
                              <span className="font-medium">₺{customer.averageOrderValue.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Buraya sadakat puanı etiketi gelecek:</span>
                              <span className="font-medium text-orange-600">{customer.loyaltyPoints.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Buraya favori ürünler başlığı gelecek</h4>
                          <div className="flex flex-wrap gap-1">
                            {customer.preferences.favoriteItems.slice(0, 3).map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                          <p>Buraya kayıt etiketi gelecek: {customer.registrationDate.toLocaleDateString('tr-TR')}</p>
                          <p>Buraya son ziyaret etiketi gelecek: {customer.lastVisit.toLocaleDateString('tr-TR')}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            Buraya detaylar metni gelecek
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Buraya mesaj gönder metni gelecek
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <Gift className="h-4 w-4 mr-2" />
                            Buraya hediye gönder metni gelecek
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="h-4 w-4 mr-2" />
                            Buraya düzenle metni gelecek
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
      </Tabs>
    </div>
  )
}

export default CustomersModule 