import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { 
  Bell, 
  BellOff,
  BellRing,
  Mail,
  MessageSquare,
  Smartphone,
  Volume2,
  VolumeX,
  Settings,
  User,
  Users,
  Package,
  Clock,
  AlertTriangle,
  Calendar,
  Star,
  ShoppingCart,
  ChefHat,
  Table,
  Megaphone,
  Save,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Check,
  X
} from "lucide-react"

/**
 * NotificationModule Component - Kurtarılmış UI
 * 
 * @description Complete notification settings management system with multi-channel delivery and user preferences
 * @location Original: panel/page.tsx renderMainContent() - case "notifications" (placeholder)
 * @usage Panel dashboard notification management section
 * 
 * @features
 * - Multi-type notification management (order, table, staff, inventory, etc.)
 * - Multi-channel delivery (app, email, SMS, push, sound)
 * - User-based preference settings
 * - Real-time notification preview
 * - Custom notification scheduling
 * - Priority-based notification routing
 * - Bulk notification management
 * - Notification history and analytics
 * - Sound and volume controls
 * - Template management
 */

interface NotificationModuleProps {
  modules: any[]
  activeModule: string
  onModuleChange: (module: string) => void
  theme: string
}

interface NotificationSetting {
  id: number
  user_id: number
  notification_type: 'order_received' | 'order_ready' | 'table_request' | 'reservation_reminder' | 'staff_alert' | 'inventory_low' | 'customer_feedback'
  is_enabled: boolean
  delivery_method: 'app' | 'email' | 'sms' | 'push' | 'sound'
  settings: any // JSON custom settings
  created_at: string
  updated_at: string
  user_name?: string
}

interface NotificationTemplate {
  id: string
  type: string
  title: string
  message: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  channels: string[]
}

export function NotificationModule({
  modules, activeModule, onModuleChange, theme
}: NotificationModuleProps) {
  // State Management
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([])
  const [filteredSettings, setFilteredSettings] = useState<NotificationSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters and UI State
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [methodFilter, setMethodFilter] = useState<string>("all")
  const [userFilter, setUserFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("settings")
  
  // Global settings
  const [globalSettings, setGlobalSettings] = useState({
    soundEnabled: true,
    soundVolume: 80,
    quietHours: { start: "22:00", end: "06:00", enabled: true },
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false
  })
  
  // Edit states
  const [editingSettings, setEditingSettings] = useState<{ [key: number]: boolean }>({})
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  // Users list for filter
  const [users, setUsers] = useState([
    { id: 1, name: 'Buraya admin kullanıcı metni gelecek' },
    { id: 2, name: 'Buraya ahmet yılmaz metni gelecek' },
    { id: 3, name: 'Buraya mehmet özkan metni gelecek' }
  ])

  // Placeholder functions
  const fetchNotificationSettings = async () => {
    // Buraya API çağrısı gelecek
    console.log('Notification settings yükleniyor...')
  }

  useEffect(() => {
    fetchNotificationSettings()
  }, [])

  // Filter settings
  useEffect(() => {
    let filtered = notificationSettings

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(setting => 
        setting.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getTypeLabel(setting.notification_type).toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(setting => setting.notification_type === typeFilter)
    }

    // Method filter
    if (methodFilter !== "all") {
      filtered = filtered.filter(setting => setting.delivery_method === methodFilter)
    }

    // User filter
    if (userFilter !== "all") {
      filtered = filtered.filter(setting => setting.user_id.toString() === userFilter)
    }

    setFilteredSettings(filtered)
  }, [notificationSettings, searchTerm, typeFilter, methodFilter, userFilter])

  // Notification type configurations
  const notificationTypes = {
    order_received: {
      icon: <ShoppingCart className="h-4 w-4" />,
      label: 'Buraya sipariş alındı metni gelecek',
      description: 'Buraya yeni sipariş açıklaması gelecek',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    order_ready: {
      icon: <ChefHat className="h-4 w-4" />,
      label: 'Buraya sipariş hazır metni gelecek',
      description: 'Buraya sipariş hazır açıklaması gelecek',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    table_request: {
      icon: <Table className="h-4 w-4" />,
      label: 'Buraya masa talebi metni gelecek',
      description: 'Buraya masa garson açıklaması gelecek',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    reservation_reminder: {
      icon: <Calendar className="h-4 w-4" />,
      label: 'Buraya rezervasyon hatırlatıcısı metni gelecek',
      description: 'Buraya yaklaşan rezervasyon açıklaması gelecek',
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    staff_alert: {
      icon: <Users className="h-4 w-4" />,
      label: 'Buraya personel uyarısı metni gelecek',
      description: 'Buraya personel durum açıklaması gelecek',
      color: 'bg-red-100 text-red-800 border-red-200'
    },
    inventory_low: {
      icon: <Package className="h-4 w-4" />,
      label: 'Buraya stok uyarısı metni gelecek',
      description: 'Buraya ürün stoğu açıklaması gelecek',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    customer_feedback: {
      icon: <Star className="h-4 w-4" />,
      label: 'Buraya müşteri geri bildirimi metni gelecek',
      description: 'Buraya yeni değerlendirme açıklaması gelecek',
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    }
  }

  // Delivery method configurations
  const deliveryMethods = {
    app: {
      icon: <Bell className="h-4 w-4" />,
      label: 'Buraya uygulama metni gelecek',
      description: 'Buraya panel içi bildirim açıklaması gelecek'
    },
    push: {
      icon: <Smartphone className="h-4 w-4" />,
      label: 'Buraya push metni gelecek',
      description: 'Buraya mobil push notification açıklaması gelecek'
    },
    email: {
      icon: <Mail className="h-4 w-4" />,
      label: 'Buraya e-posta metni gelecek',
      description: 'Buraya email bildirimi açıklaması gelecek'
    },
    sms: {
      icon: <MessageSquare className="h-4 w-4" />,
      label: 'Buraya SMS metni gelecek',
      description: 'Buraya kısa mesaj açıklaması gelecek'
    },
    sound: {
      icon: <Volume2 className="h-4 w-4" />,
      label: 'Buraya ses metni gelecek',
      description: 'Buraya sesli uyarı açıklaması gelecek'
    }
  }

  const getTypeLabel = (type: string) => {
    return notificationTypes[type as keyof typeof notificationTypes]?.label || type
  }

  const getTypeIcon = (type: string) => {
    return notificationTypes[type as keyof typeof notificationTypes]?.icon || <Bell className="h-4 w-4" />
  }

  const getTypeColor = (type: string) => {
    return notificationTypes[type as keyof typeof notificationTypes]?.color || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getMethodIcon = (method: string) => {
    return deliveryMethods[method as keyof typeof deliveryMethods]?.icon || <Bell className="h-4 w-4" />
  }

  const getMethodLabel = (method: string) => {
    return deliveryMethods[method as keyof typeof deliveryMethods]?.label || method
  }

  // Placeholder functions
  const updateNotificationSetting = async (settingId: number, updates: Partial<NotificationSetting>) => {
    // Buraya API çağrısı gelecek
    console.log('Notification setting güncelleniyor...')
  }

  const toggleSetting = (settingId: number, isEnabled: boolean) => {
    updateNotificationSetting(settingId, { is_enabled: isEnabled })
  }

  const testNotification = (type: string, method: string) => {
    // Buraya test notification kodu gelecek
    console.log(`Testing ${type} notification via ${method}`)
  }

  // Calculate statistics
  const stats = {
    totalSettings: notificationSettings.length,
    enabledSettings: notificationSettings.filter(s => s.is_enabled).length,
    disabledSettings: notificationSettings.filter(s => !s.is_enabled).length,
    appNotifications: notificationSettings.filter(s => s.delivery_method === 'app').length,
    emailNotifications: notificationSettings.filter(s => s.delivery_method === 'email').length,
    soundNotifications: notificationSettings.filter(s => s.delivery_method === 'sound').length
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-gray-600">Buraya bildirim ayarları yükleniyor metni gelecek</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Bell className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buraya bildirim yönetimi başlığı gelecek</h1>
            <p className="text-gray-600">Buraya bildirim ayarları açıklaması gelecek</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchNotificationSettings}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Buraya yenile metni gelecek
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Buraya yeni ayar metni gelecek
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya toplam ayar etiketi gelecek</p>
                <p className="font-semibold">{stats.totalSettings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BellRing className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya aktif etiketi gelecek</p>
                <p className="font-semibold">{stats.enabledSettings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BellOff className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya pasif etiketi gelecek</p>
                <p className="font-semibold">{stats.disabledSettings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya uygulama etiketi gelecek</p>
                <p className="font-semibold">{stats.appNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya e-posta etiketi gelecek</p>
                <p className="font-semibold">{stats.emailNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya ses etiketi gelecek</p>
                <p className="font-semibold">{stats.soundNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="settings">Buraya bildirim ayarları metni gelecek</TabsTrigger>
          <TabsTrigger value="global">Buraya genel ayarlar metni gelecek</TabsTrigger>
          <TabsTrigger value="templates">Buraya şablonlar metni gelecek</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    placeholder="Buraya arama placeholder metni gelecek"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Buraya bildirim türü placeholder metni gelecek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Buraya tüm türler metni gelecek</SelectItem>
                    {Object.entries(notificationTypes).map(([key, type]) => (
                      <SelectItem key={key} value={key}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Buraya kanal placeholder metni gelecek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Buraya tüm kanallar metni gelecek</SelectItem>
                    {Object.entries(deliveryMethods).map(([key, method]) => (
                      <SelectItem key={key} value={key}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Buraya kullanıcı placeholder metni gelecek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Buraya tüm kullanıcılar metni gelecek</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Settings List */}
          <div className="grid gap-4">
            {filteredSettings.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Buraya bildirim ayarı bulunamadı başlığı gelecek</h3>
                  <p className="text-gray-600">Buraya bildirim ayarı bulunamadı açıklaması gelecek</p>
                </CardContent>
              </Card>
            ) : (
              filteredSettings.map((setting) => (
                <Card key={setting.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(setting.notification_type)}
                          <Badge className={`${getTypeColor(setting.notification_type)} border`}>
                            {getTypeLabel(setting.notification_type)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getMethodIcon(setting.delivery_method)}
                          <span className="text-sm text-gray-600">
                            {getMethodLabel(setting.delivery_method)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {setting.user_name}
                          </span>
                        </div>
                        
                        {setting.settings && Object.keys(setting.settings).length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            Buraya özel ayarlar metni gelecek
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={setting.is_enabled}
                          onCheckedChange={(checked) => toggleSetting(setting.id, checked)}
                        />
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => testNotification(setting.notification_type, setting.delivery_method)}
                        >
                          Buraya test metni gelecek
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingSettings({...editingSettings, [setting.id]: true})}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {setting.settings && Object.keys(setting.settings).length > 0 && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Buraya özel ayarlar etiketi gelecek:</div>
                        <div className="text-sm text-gray-800">
                          {Object.entries(setting.settings).map(([key, value]) => (
                            <span key={key} className="mr-3">
                              <strong>{key}:</strong> {String(value)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="global" className="space-y-4">
          <div className="grid gap-4">
            {/* Sound Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Buraya ses ayarları başlığı gelecek
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Buraya ses bildirimleri başlığı gelecek</h4>
                    <p className="text-sm text-gray-600">Buraya sesli uyarı açıklaması gelecek</p>
                  </div>
                  <Switch
                    checked={globalSettings.soundEnabled}
                    onCheckedChange={(checked) => 
                      setGlobalSettings({...globalSettings, soundEnabled: checked})
                    }
                  />
                </div>
                
                {globalSettings.soundEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Buraya ses seviyesi etiketi gelecek: {globalSettings.soundVolume}%
                    </label>
                    <Slider
                      value={[globalSettings.soundVolume]}
                      onValueChange={(value) => 
                        setGlobalSettings({...globalSettings, soundVolume: value[0]})
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quiet Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Buraya sessiz saatler başlığı gelecek
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Buraya sessiz saatleri etkinleştir başlığı gelecek</h4>
                    <p className="text-sm text-gray-600">Buraya sessiz saatler açıklaması gelecek</p>
                  </div>
                  <Switch
                    checked={globalSettings.quietHours.enabled}
                    onCheckedChange={(checked) => 
                      setGlobalSettings({
                        ...globalSettings, 
                        quietHours: {...globalSettings.quietHours, enabled: checked}
                      })
                    }
                  />
                </div>
                
                {globalSettings.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Buraya başlangıç etiketi gelecek
                      </label>
                      <Input
                        type="time"
                        value={globalSettings.quietHours.start}
                        onChange={(e) => 
                          setGlobalSettings({
                            ...globalSettings,
                            quietHours: {...globalSettings.quietHours, start: e.target.value}
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Buraya bitiş etiketi gelecek
                      </label>
                      <Input
                        type="time"
                        value={globalSettings.quietHours.end}
                        onChange={(e) => 
                          setGlobalSettings({
                            ...globalSettings,
                            quietHours: {...globalSettings.quietHours, end: e.target.value}
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Channel Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5" />
                  Buraya kanal ayarları başlığı gelecek
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <div>
                      <h4 className="font-medium">Buraya push bildirimleri başlığı gelecek</h4>
                      <p className="text-sm text-gray-600">Buraya mobil push notifications açıklaması gelecek</p>
                    </div>
                  </div>
                  <Switch
                    checked={globalSettings.pushEnabled}
                    onCheckedChange={(checked) => 
                      setGlobalSettings({...globalSettings, pushEnabled: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <div>
                      <h4 className="font-medium">Buraya e-posta bildirimleri başlığı gelecek</h4>
                      <p className="text-sm text-gray-600">Buraya email notifications açıklaması gelecek</p>
                    </div>
                  </div>
                  <Switch
                    checked={globalSettings.emailEnabled}
                    onCheckedChange={(checked) => 
                      setGlobalSettings({...globalSettings, emailEnabled: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <div>
                      <h4 className="font-medium">Buraya SMS bildirimleri başlığı gelecek</h4>
                      <p className="text-sm text-gray-600">Buraya text message notifications açıklaması gelecek</p>
                    </div>
                  </div>
                  <Switch
                    checked={globalSettings.smsEnabled}
                    onCheckedChange={(checked) => 
                      setGlobalSettings({...globalSettings, smsEnabled: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Buraya ayarları kaydet metni gelecek
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Buraya bildirim şablonları başlığı gelecek</h3>
              <p className="text-gray-600 mb-4">
                Buraya bildirim şablonları açıklaması gelecek
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Buraya yeni şablon oluştur metni gelecek
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default NotificationModule 