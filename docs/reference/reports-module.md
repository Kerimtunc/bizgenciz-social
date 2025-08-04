"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  Clock,
  PieChart,
  LineChart,
  Download,
  Upload,
  FileText,
  Calendar as CalendarIcon,
  Filter,
  RefreshCw,
  Eye,
  Share,
  Printer,
  Mail,
  AlertTriangle,
  CheckCircle,
  Star,
  ShoppingCart,
  Utensils
} from "lucide-react"

/**
 * ReportsModule Component - Kurtarılmış UI
 * 
 * @description Complete reporting and analytics system with real-time dashboards, custom reports, and business intelligence
 * @location Original: panel/page.tsx renderMainContent() - case "reports" (placeholder)
 * @usage Panel dashboard reports and analytics section
 * 
 * @features
 * - Real-time analytics dashboard
 * - Sales performance reports
 * - Customer analytics
 * - Inventory reports
 * - Financial reports
 * - Staff performance tracking
 * - Custom report builder
 * - Automated report scheduling
 * - Export functionality (PDF, Excel, CSV)
 * - Trend analysis
 * - Comparative analytics
 * - KPI monitoring
 */

interface ReportsModuleProps {
  modules: any[]
  activeModule: string
  onModuleChange: (module: string) => void
  theme: string
}

// Placeholder interfaces
interface SalesData {
  date: string
  revenue: number
  orders: number
  customers: number
  averageOrderValue: number
}

interface TopProduct {
  id: string
  name: string
  category: string
  sales: number
  revenue: number
  orders: number
  trend: "up" | "down" | "stable"
}

interface CustomerMetrics {
  totalCustomers: number
  newCustomers: number
  returningCustomers: number
  averageLifetimeValue: number
  churnRate: number
}

interface FinancialSummary {
  totalRevenue: number
  totalCosts: number
  grossProfit: number
  netProfit: number
  profitMargin: number
  revenueGrowth: number
}

interface BusinessIntelligence {
  executive_dashboard: {
    kpis: {
      revenue: number
      orders: number
      table_efficiency: number
      kitchen_efficiency: number
      avg_order_value: number
    }
    alerts: Array<{
      type: 'error' | 'warning' | 'info'
      message: string
      value: string
    }>
    quick_insights: string[]
  }
  operational_insights: {
    capacity_utilization: {
      current_occupancy: number
      optimal_range: string
      recommendation: string
    }
    service_efficiency: {
      avg_prep_time: number
      order_completion_rate: number
      staff_productivity: number
    }
  }
  financial_analytics: {
    revenue_analysis: {
      total_revenue: number
      product_mix: Array<any>
      growth_opportunities: Array<any>
    }
    profitability: {
      high_margin_products: Array<any>
      cost_optimization: Array<any>
    }
  }
  predictive_reports: {
    demand_forecast: {
      predicted_daily_orders: number
      peak_hours: Array<any>
    }
    customer_retention: {
      at_risk_customers: number
      retention_rate: number
      recommended_actions: string[]
    }
  }
  generated_at: string
  period: {
    startDate: string
    endDate: string
  }
}

interface ModuleMetrics {
  tables: any
  orders: any
  kitchen: any
  customers: any
  staff: any
  menu_inventory: any
}

export function ReportsModule({
  modules, activeModule, onModuleChange, theme
}: ReportsModuleProps) {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [customerMetrics, setCustomerMetrics] = useState<CustomerMetrics | null>(null)
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState("7days")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Business Intelligence state
  const [businessIntelligence, setBusinessIntelligence] = useState<BusinessIntelligence | null>(null)
  const [moduleMetrics, setModuleMetrics] = useState<ModuleMetrics | null>(null)
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date()
  })
  const [activeReportTab, setActiveReportTab] = useState("executive")

  // Placeholder functions
  const fetchSalesData = async (period: string = "7days"): Promise<SalesData[]> => {
    // Buraya API çağrısı gelecek
    console.log('Sales data yükleniyor...')
    return []
  }

  const fetchTopProducts = async () => {
    // Buraya API çağrısı gelecek
    console.log('Top products yükleniyor...')
    return []
  }

  const fetchCustomerMetrics = async (): Promise<CustomerMetrics | null> => {
    // Buraya API çağrısı gelecek
    console.log('Customer metrics yükleniyor...')
    return null
  }

  const fetchFinancialSummary = async (): Promise<FinancialSummary | null> => {
    // Buraya API çağrısı gelecek
    console.log('Financial summary yükleniyor...')
    return null
  }

  const fetchBusinessIntelligence = async (dateRange = selectedDateRange): Promise<BusinessIntelligence | null> => {
    // Buraya API çağrısı gelecek
    console.log('Business intelligence yükleniyor...')
    return null
  }

  const fetchModuleMetrics = async (dateRange = selectedDateRange): Promise<ModuleMetrics | null> => {
    // Buraya API çağrısı gelecek
    console.log('Module metrics yükleniyor...')
    return null
  }

  // Component mount ve veri yükleme
  useEffect(() => {
    const loadReportsData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Load traditional reports
        const [sales, products, customers, financial] = await Promise.all([
          fetchSalesData(selectedPeriod),
          fetchTopProducts(),
          fetchCustomerMetrics(),
          fetchFinancialSummary()
        ])

        setSalesData(sales)
        setTopProducts(products)
        setCustomerMetrics(customers)
        setFinancialSummary(financial)

        // Load comprehensive business intelligence
        const businessIntel = await fetchBusinessIntelligence()
        if (businessIntel) {
          setBusinessIntelligence(businessIntel)
        }

        const moduleMetrics = await fetchModuleMetrics()
        if (moduleMetrics) {
          setModuleMetrics(moduleMetrics)
        }

      } catch (error: any) {
        console.error('Reports loading error:', error)
        setError('Buraya raporlar yüklenemedi metni gelecek')
      } finally {
        setIsLoading(false)
      }
    }

    loadReportsData()
  }, [selectedPeriod, selectedDateRange])

  // Calculate period totals
  const periodTotals = salesData.reduce(
    (acc, day) => ({
      revenue: acc.revenue + day.revenue,
      orders: acc.orders + day.orders,
      customers: acc.customers + day.customers,
      averageOrderValue: (acc.revenue + day.revenue) / (acc.orders + day.orders)
    }),
    { revenue: 0, orders: 0, customers: 0, averageOrderValue: 0 }
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-orange-500" />
          <span className="ml-2 text-lg">Buraya raporlar yükleniyor metni gelecek</span>
        </div>
      </div>
    )
  }

  // Executive Dashboard Component
  const ExecutiveDashboard = () => (
    <div className="space-y-6">
      {businessIntelligence?.executive_dashboard && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Buraya total revenue etiketi gelecek</p>
                    <p className="text-2xl font-bold">₺{businessIntelligence.executive_dashboard.kpis.revenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Buraya total orders etiketi gelecek</p>
                    <p className="text-2xl font-bold">{businessIntelligence.executive_dashboard.kpis.orders}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Buraya table efficiency etiketi gelecek</p>
                    <p className="text-2xl font-bold">{businessIntelligence.executive_dashboard.kpis.table_efficiency}%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Buraya kitchen efficiency etiketi gelecek</p>
                    <p className="text-2xl font-bold">{businessIntelligence.executive_dashboard.kpis.kitchen_efficiency}%</p>
                  </div>
                  <Utensils className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100 text-sm">Buraya avg order value etiketi gelecek</p>
                    <p className="text-2xl font-bold">₺{businessIntelligence.executive_dashboard.kpis.avg_order_value}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-teal-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          {businessIntelligence.executive_dashboard.alerts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Buraya system alerts başlığı gelecek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businessIntelligence.executive_dashboard.alerts.map((alert, index) => (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                      alert.type === 'error' ? 'bg-red-50 border border-red-200' :
                      alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}>
                      <AlertTriangle className={`h-4 w-4 ${
                        alert.type === 'error' ? 'text-red-500' :
                        alert.type === 'warning' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-gray-600">{alert.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Buraya quick insights başlığı gelecek
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {businessIntelligence.executive_dashboard.quick_insights.map((insight, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )

  // Operational Insights Component
  const OperationalInsights = () => (
    <div className="space-y-6">
      {businessIntelligence?.operational_insights && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Capacity Utilization */}
            <Card>
              <CardHeader>
                <CardTitle>Buraya capacity utilization başlığı gelecek</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Buraya current occupancy etiketi gelecek</span>
                    <span className="text-sm font-bold">{businessIntelligence.operational_insights.capacity_utilization.current_occupancy}%</span>
                  </div>
                  <Progress 
                    value={businessIntelligence.operational_insights.capacity_utilization.current_occupancy} 
                    className="h-2"
                  />
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm"><strong>Buraya optimal range etiketi gelecek:</strong> {businessIntelligence.operational_insights.capacity_utilization.optimal_range}</p>
                  <p className="text-sm mt-1"><strong>Buraya recommendation etiketi gelecek:</strong> {businessIntelligence.operational_insights.capacity_utilization.recommendation}</p>
                </div>
              </CardContent>
            </Card>

            {/* Service Efficiency */}
            <Card>
              <CardHeader>
                <CardTitle>Buraya service efficiency başlığı gelecek</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Buraya avg prep time etiketi gelecek</span>
                    <span className="text-sm font-bold">{businessIntelligence.operational_insights.service_efficiency.avg_prep_time} min</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Buraya order completion rate etiketi gelecek</span>
                    <span className="text-sm font-bold">{businessIntelligence.operational_insights.service_efficiency.order_completion_rate}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Buraya staff productivity etiketi gelecek</span>
                    <span className="text-sm font-bold">₺{Math.round(businessIntelligence.operational_insights.service_efficiency.staff_productivity)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Module-specific insights */}
          {moduleMetrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tables Module Insights */}
              {moduleMetrics.tables && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Buraya tables performance başlığı gelecek</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Buraya total visits etiketi gelecek:</span>
                        <span className="font-bold">{moduleMetrics.tables.summary?.total_visits || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Buraya avg duration etiketi gelecek:</span>
                        <span className="font-bold">{moduleMetrics.tables.summary?.average_visit_duration || 0} min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Kitchen Module Insights */}
              {moduleMetrics.kitchen && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Buraya kitchen performance başlığı gelecek</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Buraya total orders etiketi gelecek:</span>
                        <span className="font-bold">{moduleMetrics.kitchen.summary?.total_kitchen_orders || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Buraya efficiency etiketi gelecek:</span>
                        <span className="font-bold">{moduleMetrics.kitchen.summary?.overall_efficiency || 0}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Customer Module Insights */}
              {moduleMetrics.customers && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Buraya customer insights başlığı gelecek</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Buraya total customers etiketi gelecek:</span>
                        <span className="font-bold">{moduleMetrics.customers.summary?.total_customers || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Buraya retention rate etiketi gelecek:</span>
                        <span className="font-bold">{moduleMetrics.customers.summary?.retention_rate || 0}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )

  // Financial Analytics Component
  const FinancialAnalytics = () => (
    <div className="space-y-6">
      {businessIntelligence?.financial_analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Revenue Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Buraya revenue analysis başlığı gelecek</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      ₺{businessIntelligence.financial_analytics.revenue_analysis.total_revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-700">Buraya total revenue etiketi gelecek</p>
                  </div>
                  
                  {businessIntelligence.financial_analytics.revenue_analysis.product_mix.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Buraya top revenue products başlığı gelecek</h4>
                      <div className="space-y-2">
                        {businessIntelligence.financial_analytics.revenue_analysis.product_mix.slice(0, 5).map((product: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">{product.name}</span>
                            <span className="text-sm font-bold">₺{product.revenue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Profitability */}
            <Card>
              <CardHeader>
                <CardTitle>Buraya profitability insights başlığı gelecek</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessIntelligence.financial_analytics.profitability.high_margin_products.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Buraya high margin products başlığı gelecek</h4>
                      <div className="space-y-2">
                        {businessIntelligence.financial_analytics.profitability.high_margin_products.map((product: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                            <span className="text-sm">{product.name}</span>
                            <Badge variant="outline" className="text-green-600">Buraya high margin badge metni gelecek</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {businessIntelligence.financial_analytics.profitability.cost_optimization.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Buraya cost optimization alerts başlığı gelecek</h4>
                      <div className="space-y-2">
                        {businessIntelligence.financial_analytics.profitability.cost_optimization.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                            <span className="text-sm">{item.name}</span>
                            <Badge variant="outline" className="text-red-600">Buraya critical stock badge metni gelecek</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )

  // Predictive Reports Component
  const PredictiveReports = () => (
    <div className="space-y-6">
      {businessIntelligence?.predictive_reports && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Demand Forecast */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Buraya demand forecast başlığı gelecek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {businessIntelligence.predictive_reports.demand_forecast.predicted_daily_orders}
                    </p>
                    <p className="text-sm text-blue-700">Buraya predicted daily orders etiketi gelecek</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Buraya peak hours forecast başlığı gelecek</h4>
                    <p className="text-sm text-gray-600">
                      Buraya peak hours açıklama metni gelecek
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Retention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Buraya customer retention analysis başlığı gelecek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-lg font-bold text-yellow-600">
                        {businessIntelligence.predictive_reports.customer_retention.at_risk_customers}
                      </p>
                      <p className="text-xs text-yellow-700">Buraya at risk customers etiketi gelecek</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-lg font-bold text-green-600">
                        {businessIntelligence.predictive_reports.customer_retention.retention_rate}%
                      </p>
                      <p className="text-xs text-green-700">Buraya retention rate etiketi gelecek</p>
                    </div>
                  </div>
                  
                  {businessIntelligence.predictive_reports.customer_retention.recommended_actions.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Buraya recommended actions başlığı gelecek</h4>
                      <ul className="space-y-1">
                        {businessIntelligence.predictive_reports.customer_retention.recommended_actions.map((action, index) => (
                          <li key={index} className="text-sm flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Date Range Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Buraya date range etiketi gelecek:</span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={selectedDateRange.startDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDateRange(prev => ({
                  ...prev,
                  startDate: new Date(e.target.value)
                }))}
                className="w-auto"
              />
              <span className="text-sm text-gray-500">Buraya to etiketi gelecek</span>
              <Input
                type="date"
                value={selectedDateRange.endDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDateRange(prev => ({
                  ...prev,
                  endDate: new Date(e.target.value)
                }))}
                className="w-auto"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const loadData = async () => {
                  const bi = await fetchBusinessIntelligence()
                  if (bi) setBusinessIntelligence(bi)
                  const mm = await fetchModuleMetrics()
                  if (mm) setModuleMetrics(mm)
                }
                loadData()
              }}
              className="ml-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Buraya refresh butonu metni gelecek
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">Buraya loading comprehensive business intelligence metni gelecek</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeReportTab} onValueChange={setActiveReportTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="executive">Buraya executive dashboard tab metni gelecek</TabsTrigger>
            <TabsTrigger value="operational">Buraya operational insights tab metni gelecek</TabsTrigger>
            <TabsTrigger value="financial">Buraya financial analytics tab metni gelecek</TabsTrigger>
            <TabsTrigger value="predictive">Buraya predictive reports tab metni gelecek</TabsTrigger>
          </TabsList>

          <TabsContent value="executive" className="mt-6">
            <ExecutiveDashboard />
          </TabsContent>

          <TabsContent value="operational" className="mt-6">
            <OperationalInsights />
          </TabsContent>

          <TabsContent value="financial" className="mt-6">
            <FinancialAnalytics />
          </TabsContent>

          <TabsContent value="predictive" className="mt-6">
            <PredictiveReports />
          </TabsContent>
        </Tabs>
      )}

      {/* Generation info */}
      {businessIntelligence && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Buraya generated etiketi gelecek: {new Date(businessIntelligence.generated_at).toLocaleString()}</span>
              <span>
                Buraya period etiketi gelecek: {new Date(businessIntelligence.period.startDate).toLocaleDateString()} - {new Date(businessIntelligence.period.endDate).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ReportsModule 