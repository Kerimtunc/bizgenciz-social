// ==========================================
// ANA PANEL SAYFASI (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/page.tsx
// Satır Sayısı: 753 satır

"use client"

import { useEffect, useState, Suspense, lazy } from "react"
import {
  BarChart3,
  BookOpen,
  Calculator,
  CalendarDays,
  CreditCard,
  FileText,
  FolderOpen,
  Heart,
  MessageSquare,
  Package,
  PieChart,
  Settings,
  ShoppingCart,
  Users,
  Utensils,
  MenuIcon,
} from "lucide-react"

// 🔒 Tenant Context
import { TenantProvider } from "../../contexts/TenantProvider"
import { CartProvider } from "../../contexts/CartContext"

// WebSocket Real-time imports
import useRealTimeModule from "../../hooks/useRealTimeModule";

// Core UI Components
import ModuleHeader from "@/components/common/ModuleHeader"
import { NavItem } from "./components/NavItem"
import { StatusItem } from "./components/StatusItem"
import { AdminFloatingMenu } from "./components/AdminFloatingMenu"
import { MetricCard } from "./components/MetricCard"
import { FeedbackItem } from "./components/FeedbackItem"
import { StaffMessage } from "./components/StaffMessage"
import { ActionButton } from "./components/ActionButton"

// Layout Components
import DashboardOverview from "./components/DashboardOverview"
import { RightSidebar } from "./components/RightSidebar"
import { LoyaltyRightSidebar } from "./components/LoyaltyRightSidebar"
import { OrdersRightSidebar } from "./components/OrdersRightSidebar"
import { TablesRightSidebar } from "./components/TablesRightSidebar"
import { ParticleCanvas } from "./components/ParticleCanvas"
import { DashboardHeader } from "./components/DashboardHeader"
import { POSModule } from "./components/POSModule"
import { PlaceholderModule } from "./components/PlaceholderModule"
import { MobileSidebar } from "./components/MobileSidebar"
import { DesktopSidebar } from "./components/DesktopSidebar"
import { ModernLayout } from "./components/ModernLayout"
import { ModernCard } from "./components/ModernCard"

// ✅ LAZY LOADING - Büyük modülleri sadece gerektiğinde yükle
const FileManager = lazy(() => import("@/components/AdminComponents/file-manager"))
const AccountingModule = lazy(() => import("@/components/AdminComponents/accounting-module"))

// Module imports - ALL LAZY LOADED
const TablesModule = lazy(() => import("./modules/TablesModule"))
const OrdersModule = lazy(() => import("./modules/OrdersModule").then(module => ({ default: module.OrdersModule })))
const CustomersModule = lazy(() => import("./modules/CustomersModule").then(module => ({ default: module.CustomersModule })))
const MenuManagementModule = lazy(() => import("./modules/MenuManagementModule").then(module => ({ default: module.MenuManagementModule })))
const InventoryModule = lazy(() => import("./modules/InventoryModule").then(module => ({ default: module.InventoryModule })))
const ReportsModule = lazy(() => import("./modules/ReportsModule").then(module => ({ default: module.ReportsModule })))
const LoyaltyModule = lazy(() => import("./modules/LoyaltyModule").then(module => ({ default: module.LoyaltyModule })))
const SettingsModule = lazy(() => import("./modules/SettingsModule").then(module => ({ default: module.SettingsModule })))
const CommunicationsModule = lazy(() => import("./modules/CommunicationsModule").then(module => ({ default: module.CommunicationsModule })))
const CalendarModule = lazy(() => import("./modules/CalendarModule").then(module => ({ default: module.CalendarModule })))
const HelpModule = lazy(() => import("./modules/HelpModule").then(module => ({ default: module.HelpModule })))
const KitchenModule = lazy(() => import("./modules/KitchenModule"))
const CustomerFeedbackModule = lazy(() => import("./modules/CustomerFeedbackModule").then(module => ({ default: module.CustomerFeedbackModule })))
const NotificationModule = lazy(() => import("./modules/NotificationModule").then(module => ({ default: module.NotificationModule })))
const StaffModule = lazy(() => import("./modules/StaffModule"))
const ReservationModule = lazy(() => import("./modules/ReservationModule"))

// Data imports
import { tables, getLocations, defaultCartItems } from "./data/mockData"

// ✅ LOADING COMPONENT
const ModuleLoadingFallback = ({ theme, moduleName }: { theme: string, moduleName?: string }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center space-y-4">
      <div className={`
        w-12 h-12 mx-auto rounded-full border-4 animate-spin
        ${theme === "dark" 
          ? "border-blue-500/30 border-t-blue-500" 
          : "border-orange-500/30 border-t-orange-500"
        }
      `} />
      <div className={`text-lg font-medium ${
        theme === "dark" ? "text-slate-300" : "text-slate-700"
      }`}>
        {moduleName ? `${moduleName} Buraya yükleniyor metni gelecek...` : "Buraya modül yükleniyor metni gelecek..."}
      </div>
      <div className={`text-sm ${
        theme === "dark" ? "text-slate-500" : "text-slate-600"
      }`}>
        Buraya lütfen bekleyin metni gelecek...
      </div>
    </div>
  </div>
)

export default function RestaurantDashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [dailySales, setDailySales] = useState(12450)
  const [activeOrders, setActiveOrders] = useState(23)
  const [tableOccupancy, setTableOccupancy] = useState(78)
  const [kitchenEfficiency, setKitchenEfficiency] = useState(92)
  const [customerSatisfaction, setCustomerSatisfaction] = useState(4.7)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [activeModule, setActiveModule] = useState("dashboard") // Default dashboard
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [realTimeStatus, setRealTimeStatus] = useState('disconnected')
  
  // POS Cart State
  const [orderMode, setOrderMode] = useState<"dine-in" | "takeaway" | "delivery">("dine-in")
  const [cartItems, setCartItems] = useState(defaultCartItems)

  // ✅ API'DEN MODÜLLERI ÇEKME
  const [modules, setModules] = useState<any[]>([])
  const [modulesLoading, setModulesLoading] = useState(true)
  
  const currentModule = modules.find(m => m.id === activeModule) || { label: activeModule }
  
  // ✅ API'DEN MODÜLLERI ÇEKME FONKSİYONU
  const fetchModules = async () => {
    try {
      // Tüm modülleri içeren statik liste
      const staticModules = [
        { id: 'dashboard', label: 'Buraya dashboard etiketi gelecek', icon: BarChart3, description: 'Buraya ana dashboard açıklaması gelecek' },
        { id: 'orders', label: 'Buraya siparişler etiketi gelecek', icon: ShoppingCart, description: 'Buraya sipariş yönetimi açıklaması gelecek' },
        { id: 'tables', label: 'Buraya masalar etiketi gelecek', icon: Users, description: 'Buraya masa yönetimi açıklaması gelecek' },
        { id: 'menu-management', label: 'Buraya menü yönetimi etiketi gelecek', icon: Utensils, description: 'Buraya menü yönetimi açıklaması gelecek' },
        { id: 'inventory', label: 'Buraya envanter etiketi gelecek', icon: Package, description: 'Buraya envanter yönetimi açıklaması gelecek' },
        { id: 'reports', label: 'Buraya raporlar etiketi gelecek', icon: PieChart, description: 'Buraya raporlar ve analitik açıklaması gelecek' },
        { id: 'customers', label: 'Buraya müşteriler etiketi gelecek', icon: Users, description: 'Buraya müşteri yönetimi açıklaması gelecek' },
        { id: 'loyalty', label: 'Buraya sadakat programı etiketi gelecek', icon: Heart, description: 'Buraya sadakat programı yönetimi açıklaması gelecek' },
        { id: 'kitchen', label: 'Buraya mutfak etiketi gelecek', icon: Utensils, description: 'Buraya mutfak siparişleri açıklaması gelecek' },
        { id: 'staff', label: 'Buraya personel etiketi gelecek', icon: Users, description: 'Buraya personel yönetimi açıklaması gelecek' },
        { id: 'reservations', label: 'Buraya rezervasyon etiketi gelecek', icon: CalendarDays, description: 'Buraya rezervasyon yönetimi açıklaması gelecek' },
        { id: 'feedback', label: 'Buraya müşteri geribildirimi etiketi gelecek', icon: MessageSquare, description: 'Buraya müşteri geribildirimi açıklaması gelecek' },
        { id: 'notifications', label: 'Buraya bildirimler etiketi gelecek', icon: MessageSquare, description: 'Buraya bildirim ayarları açıklaması gelecek' },
        { id: 'communications', label: 'Buraya iletişim etiketi gelecek', icon: MessageSquare, description: 'Buraya iletişim yönetimi açıklaması gelecek' },
        { id: 'calendar', label: 'Buraya takvim etiketi gelecek', icon: CalendarDays, description: 'Buraya etkinlik takvimi açıklaması gelecek' },
        { id: 'help', label: 'Buraya yardım etiketi gelecek', icon: BookOpen, description: 'Buraya yardım ve destek açıklaması gelecek' },
        { id: 'settings', label: 'Buraya ayarlar etiketi gelecek', icon: Settings, description: 'Buraya sistem ayarları açıklaması gelecek' }
      ];
      
      setModules(staticModules);
      console.log(`✅ ${staticModules.length} Buraya modül yüklendi metni gelecek`);
    } catch (err) {
      console.error('Buraya system modules hatası metni gelecek:', err)
      setModules([])
    } finally {
      setModulesLoading(false)
    }
  }

  // WebSocket real-time entegrasyonu
  const { 
    isConnected, 
    connectionStats, 
    emitModuleEvent,
    emitOrderStatusChange,
    emitTableStatusChange 
  } = useRealTimeModule({
    modules: ['dashboard', 'orders', 'tables', 'kitchen'],
    onDatabaseEvent: (event) => {
      console.log('📡 Buraya database event received metni gelecek:', event);
      if (event.table === 'orders' || event.table === 'tables') {
        window.dispatchEvent(new CustomEvent('dashboard-refresh'));
      }
    },
    onOrderUpdate: (data) => {
      console.log('📋 Buraya order update received metni gelecek:', data);
      window.dispatchEvent(new CustomEvent('orders-update', { detail: data }));
    },
    onTableUpdate: (data) => {
      console.log('🏠 Buraya table update received metni gelecek:', data);
      window.dispatchEvent(new CustomEvent('tables-update', { detail: data }));
    },
    onKitchenUpdate: (data) => {
      console.log('👨‍🍳 Buraya kitchen update received metni gelecek:', data);
      window.dispatchEvent(new CustomEvent('kitchen-update', { detail: data }));
    },
    onMetricsUpdate: (data) => {
      console.log('📊 Buraya metrics update received metni gelecek:', data);
      window.dispatchEvent(new CustomEvent('metrics-update', { detail: data }));
    },
    onNotification: (data) => {
      console.log('🔔 Buraya notification received metni gelecek:', data);
      showNotification(data);
    },
    onCriticalUpdate: (data) => {
      console.log('🚨 Buraya critical update received metni gelecek:', data);
      showCriticalNotification(data);
    }
  });

  // WebSocket bağlantı durumunu izle
  useEffect(() => {
    const checkConnection = () => {
      setRealTimeStatus(isConnected ? 'connected' : 'disconnected');
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, [isConnected]);

  // Bildirim gösterme fonksiyonları
  const showNotification = (data: any) => {
    console.log('🔔 Buraya notification metni gelecek:', data.message || 'Buraya yeni güncelleme metni gelecek');
  };

  const showCriticalNotification = (data: any) => {
    console.error('🚨 Buraya critical update metni gelecek:', data.message || 'Buraya acil durum metni gelecek');
  };

  // ✅ COMPONENT MOUNT VE MODÜL YÜKLEME
  useEffect(() => {
    fetchModules()
  }, [])

  // Data from imported mock data
  const locations = getLocations()
  const filteredTables = selectedLocation === "all" 
    ? tables 
    : tables.filter(table => table.location === selectedLocation)

  // Update time - Client-only to prevent hydration mismatch
  useEffect(() => {
    setCurrentTime(new Date())
    
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data - Only on dashboard
  useEffect(() => {
    if (activeModule !== "dashboard") return

    const interval = setInterval(() => {
      setActiveOrders(Math.floor(Math.random() * 10) + 18)
      setTableOccupancy(Math.floor(Math.random() * 20) + 65)
      setKitchenEfficiency(Math.floor(Math.random() * 15) + 85)
      setDailySales((prev) => prev + Math.floor(Math.random() * 200) - 100)
    }, 5000)

    return () => clearInterval(interval)
  }, [activeModule])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Format time
  const formatTime = (date: Date | null) => {
    if (!date) return "--:--:--"
    return date.toLocaleTimeString("tr-TR", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return "Buraya yükleniyor metni gelecek..."
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // POS Cart Functions
  const addToCart = (item: any) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        ),
      )
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }

  const updateCartItem = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Get selected table info for POS
  const currentTable = selectedTable ? tables.find(t => t.id === selectedTable) : tables.find(t => t.status === "occupied") || tables[0]

  const closeMobileSidebar = () => setIsMobileSidebarOpen(false)

  // Admin Floating Menu Functions
  const handleQuickOrder = () => {
    console.log('Buraya hızlı sipariş ekleniyor metni gelecek...')
    setActiveModule("pos")
  }

  const handleStaffCall = () => {
    console.log('Buraya personel çağrılıyor metni gelecek...')
    alert('Buraya personel çağrısı gönderildi metni gelecek!')
  }

  const handleEmergencyAlert = () => {
    console.log('Buraya acil durum bildirimi metni gelecek...')
    alert('Buraya acil durum bildirimi gönderildi metni gelecek!')
  }

  const handleNewCustomer = () => {
    console.log('Buraya yeni müşteri kaydı metni gelecek...')
    setActiveModule("customers")
  }

  const handleTodayReports = () => {
    console.log('Buraya günlük raporlar açılıyor metni gelecek...')
    setActiveModule("reports")
  }

  // Table management handlers
  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId)
  }

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId)
  }

  const handleNavigateToPos = (tableId: string) => {
    setSelectedTable(tableId)
    setActiveModule("pos")
  }

  // Right sidebar renderer - Module-specific content
  const renderRightSidebar = () => {
    switch (activeModule) {
      case "dashboard":
        return (
          <RightSidebar
            theme={theme}
            currentTime={currentTime}
            tableOccupancy={tableOccupancy}
          />
        )
      
      case "loyalty":
        return (
          <LoyaltyRightSidebar
            theme={theme}
          />
        )
      
      case "orders":
        return (
          <OrdersRightSidebar
            theme={theme}
          />
        )
      
      case "tables":
        return (
          <TablesRightSidebar
            theme={theme}
          />
        )
      
      default:
        return (
          <div className="grid gap-6">
            <ModernCard
              theme={theme}
              variant="glass"
              title="Buraya bu sayfa için başlığı gelecek"
              subtitle="Buraya modüle özel araçlar ve bilgiler açıklaması gelecek"
              className="text-center"
            >
              <div className="space-y-3">
                <div className={`
                  w-16 h-16 mx-auto rounded-2xl flex items-center justify-center
                  ${theme === "dark" 
                    ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30" 
                    : "bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30"
                  }
                  backdrop-blur-sm
                `}>
                  <div className={`
                    w-8 h-8 rounded-lg
                    ${theme === "dark" ? "bg-blue-400/30" : "bg-orange-400/30"}
                  `} />
                </div>
                <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Buraya bu modüle özel araçlar ve bilgiler burada görünecek açıklaması gelecek.
                </p>
                <div className={`
                  text-xs px-3 py-1 rounded-full inline-block
                  ${theme === "dark" 
                    ? "bg-slate-800/50 text-slate-500 border border-slate-700/50" 
                    : "bg-orange-50/50 text-orange-600 border border-orange-200/50"
                  }
                `}>
                  Buraya yakında gelecek etiketi gelecek
                </div>
              </div>
            </ModernCard>
          </div>
        )
    }
  }

  // Render content based on active module
  const renderMainContent = () => {
    switch (activeModule) {
      case "accounting":
        return (
          <div>
            <div className="lg:hidden">
              <ModuleHeader 
                modules={modules} 
                activeModule={activeModule} 
                onModuleChange={setActiveModule}
                theme={theme}
              />
            </div>
            <AccountingModule modules={modules} activeModule={activeModule} onModuleChange={setActiveModule} />
          </div>
        )
      
      case "files":
        return (
          <div>
            <div className="lg:hidden">
              <ModuleHeader 
                modules={modules} 
                activeModule={activeModule} 
                onModuleChange={setActiveModule}
                theme={theme}
              />
            </div>
            <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya dosya yöneticisi metni gelecek" />}>
              <FileManager modules={modules} activeModule={activeModule} onModuleChange={setActiveModule} />
            </Suspense>
          </div>
        )
      
      case "pos":
        return (
          <POSModule
            modules={modules}
            activeModule={activeModule}
            onModuleChange={setActiveModule}
            theme={theme}
            cartItems={cartItems}
            onAddToCart={addToCart}
            onUpdateCartItem={updateCartItem}
            onRemoveFromCart={removeFromCart}
          />
        )
      
      case "tables":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya masa yönetimi metni gelecek" />}>
            <TablesModule />
          </Suspense>
        )

      case "orders":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya sipariş yönetimi metni gelecek" />}>
            <OrdersModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "customers":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya müşteri yönetimi metni gelecek" />}>
            <CustomersModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "menu":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya menü görüntüleme metni gelecek" />}>
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Buraya menü görüntüleme başlığı gelecek</h2>
              <p className="text-muted-foreground">Buraya bu modül henüz geliştirilmedi metni gelecek.</p>
            </div>
          </Suspense>
        )

      case "menu-management":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya menü yönetimi metni gelecek" />}>
            <MenuManagementModule />
          </Suspense>
        )

      case "inventory":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya envanter yönetimi metni gelecek" />}>
            <InventoryModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "reports":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya raporlar metni gelecek" />}>
            <ReportsModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "loyalty":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya sadakat programı metni gelecek" />}>
            <LoyaltyModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "calendar":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya takvim metni gelecek" />}>
            <CalendarModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "communications":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya iletişim metni gelecek" />}>
            <CommunicationsModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "settings":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya ayarlar metni gelecek" />}>
            <SettingsModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "help":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya yardım metni gelecek" />}>
            <HelpModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "staff":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya personel yönetimi metni gelecek" />}>
            <StaffModule />
          </Suspense>
        )

      case "reservations":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya rezervasyon metni gelecek" />}>
            <ReservationModule />
          </Suspense>
        )

      case "kitchen":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya mutfak metni gelecek" />}>
            <KitchenModule />
          </Suspense>
        )

      case "feedback":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya müşteri geribildirimi metni gelecek" />}>
            <CustomerFeedbackModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "notifications":
        return (
          <Suspense fallback={<ModuleLoadingFallback theme={theme} moduleName="Buraya bildirim ayarları metni gelecek" />}>
            <NotificationModule
              modules={modules}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              theme={theme}
            />
          </Suspense>
        )

      case "dashboard":
      default:
        return <DashboardOverview />
    }
  }

  return (
    <TenantProvider>
      <CartProvider>
        <ModernLayout theme={theme} className={theme}>
        <ParticleCanvas theme={theme} />

      {/* Real-time Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          realTimeStatus === 'connected' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {realTimeStatus === 'connected' ? '🟢 Buraya bağlı etiketi gelecek' : '🔴 Buraya bağlantı yok etiketi gelecek'}
        </div>
      </div>

      <div className="max-w-[95vw] mx-auto p-2 lg:p-6 relative z-10">
        {/* Header */}
        <DashboardHeader
          theme={theme}
          activeModule={activeModule}
          currentModule={currentModule}
          onToggleTheme={toggleTheme}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Mobile Sidebar Overlay */}
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={closeMobileSidebar}
          modules={modules}
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          theme={theme}
          tableOccupancy={tableOccupancy}
          kitchenEfficiency={kitchenEfficiency}
          customerSatisfaction={customerSatisfaction}
        />

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Desktop Sidebar */}
          <DesktopSidebar
            modules={modules}
            activeModule={activeModule}
            onModuleChange={setActiveModule}
            theme={theme}
            tableOccupancy={tableOccupancy}
            kitchenEfficiency={kitchenEfficiency}
            customerSatisfaction={customerSatisfaction}
          />

          {/* Main dashboard */}
          <div className={`${
            activeModule === "pos" || activeModule === "files"
              ? "col-span-12 lg:col-span-8 xl:col-span-9" 
              : activeModule === "accounting"
                ? "col-span-12 lg:col-span-8 xl:col-span-9"
                : "col-span-12 lg:col-span-5 xl:col-span-6"
          }`}>
            {renderMainContent()}
          </div>

          {/* Right sidebar - Module-specific content */}
          {activeModule !== "pos" && activeModule !== "files" && (
            <div className="col-span-12 lg:col-span-3">
              {renderRightSidebar()}
            </div>
          )}
        </div>
      </div>

      {/* Admin Floating Menu */}
      <AdminFloatingMenu
        theme={theme}
        activeOrders={activeOrders}
        onQuickOrder={handleQuickOrder}
        onNewCustomer={handleNewCustomer}
        onStaffCall={handleStaffCall}
        onTodayReports={handleTodayReports}
        onEmergencyAlert={handleEmergencyAlert}
      />
        </ModernLayout>
      </CartProvider>
    </TenantProvider>
  )
}

// ==========================================
// PLACEHOLDER COMPONENTS
// ==========================================

// TenantProvider component placeholder
function TenantProvider({ children }: any) {
  return <div>{children}</div>
}

// CartProvider component placeholder
function CartProvider({ children }: any) {
  return <div>{children}</div>
}

// ModernLayout component placeholder
function ModernLayout({ children, theme, className }: any) {
  return <div className={className}>{children}</div>
}

// ParticleCanvas component placeholder
function ParticleCanvas({ theme }: any) {
  return <div></div>
}

// DashboardHeader component placeholder
function DashboardHeader({ theme, activeModule, currentModule, onToggleTheme, onToggleMobileSidebar }: any) {
  return <div></div>
}

// MobileSidebar component placeholder
function MobileSidebar({ isOpen, onClose, modules, activeModule, onModuleChange, theme, tableOccupancy, kitchenEfficiency, customerSatisfaction }: any) {
  return <div></div>
}

// DesktopSidebar component placeholder
function DesktopSidebar({ modules, activeModule, onModuleChange, theme, tableOccupancy, kitchenEfficiency, customerSatisfaction }: any) {
  return <div></div>
}

// AdminFloatingMenu component placeholder
function AdminFloatingMenu({ theme, activeOrders, onQuickOrder, onNewCustomer, onStaffCall, onTodayReports, onEmergencyAlert }: any) {
  return <div></div>
}

// DashboardOverview component placeholder
function DashboardOverview() {
  return <div></div>
}

// POSModule component placeholder
function POSModule({ modules, activeModule, onModuleChange, theme, cartItems, onAddToCart, onUpdateCartItem, onRemoveFromCart }: any) {
  return <div></div>
}

// RightSidebar component placeholder
function RightSidebar({ theme, currentTime, tableOccupancy }: any) {
  return <div></div>
}

// LoyaltyRightSidebar component placeholder
function LoyaltyRightSidebar({ theme }: any) {
  return <div></div>
}

// OrdersRightSidebar component placeholder
function OrdersRightSidebar({ theme }: any) {
  return <div></div>
}

// TablesRightSidebar component placeholder
function TablesRightSidebar({ theme }: any) {
  return <div></div>
}

// ModernCard component placeholder
function ModernCard({ theme, variant, title, subtitle, className, children }: any) {
  return <div className={className}>{children}</div>
}

// ModuleHeader component placeholder
function ModuleHeader({ modules, activeModule, onModuleChange, theme }: any) {
  return <div></div>
}

// useRealTimeModule hook placeholder
function useRealTimeModule(config: any) {
  return {
    isConnected: false,
    connectionStats: {},
    emitModuleEvent: () => {},
    emitOrderStatusChange: () => {},
    emitTableStatusChange: () => {}
  }
} 