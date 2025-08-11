import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  MessageSquare, 
  Star, 
  StarHalf,
  AlertTriangle,
  Lightbulb,
  Heart,
  MessageCircle,
  Utensils,
  User,
  Search,
  Filter,
  Plus,
  Eye,
  Reply,
  Check,
  X,
  Clock,
  RefreshCw,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar
} from "lucide-react"

/**
 * CustomerFeedbackModule Component - Kurtarılmış UI
 * 
 * @description Complete customer feedback management system with rating analysis, response tracking, and satisfaction metrics
 * @location Original: panel/page.tsx renderMainContent() - case "customer-feedback" (placeholder)
 * @usage Panel dashboard customer feedback management section
 * 
 * @features
 * - Multi-dimensional rating system (overall, food, service, atmosphere, speed)
 * - Feedback categorization (complaint, suggestion, compliment, general, food_issue, service_issue)
 * - Priority management (low, normal, high, urgent)
 * - Staff response system with threading
 * - Public/private feedback visibility
 * - Resolution tracking and status management
 * - Analytics dashboard with satisfaction trends
 * - Order/table/session integration
 * - Real-time feedback monitoring
 * - Automated sentiment analysis
 */

interface CustomerFeedbackModuleProps {
  modules: any[]
  activeModule: string
  onModuleChange: (module: string) => void
  theme: string
}

interface CustomerFeedback {
  id: number
  order_id?: number
  table_id?: number
  session_id?: number
  customer_name?: string
  customer_phone?: string
  customer_email?: string
  rating: number
  food_rating: number
  service_rating: number
  atmosphere_rating: number
  speed_rating: number
  feedback_text: string
  feedback_type: 'complaint' | 'suggestion' | 'compliment' | 'general' | 'food_issue' | 'service_issue'
  response_text?: string
  response_by?: number
  response_by_name?: string
  response_date?: string
  is_public: boolean
  is_resolved: boolean
  priority: 'low' | 'normal' | 'high' | 'urgent'
  created_at: string
  updated_at: string
  order_number?: string
  table_number?: string
}

interface FeedbackStats {
  totalFeedbacks: number
  averageRating: number
  resolvedCount: number
  pendingCount: number
  todayCount: number
  satisfactionTrend: number
}

export function CustomerFeedbackModule({
  modules, activeModule, onModuleChange, theme
}: CustomerFeedbackModuleProps) {
  // State Management
  const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>([])
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<CustomerFeedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [ratingFilter, setRatingFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("dashboard")
  
  // Selected feedback for detail view/response
  const [selectedFeedback, setSelectedFeedback] = useState<CustomerFeedback | null>(null)
  const [responseText, setResponseText] = useState("")
  const [showResponseDialog, setShowResponseDialog] = useState(false)

  // Placeholder functions
  const fetchFeedbacks = async () => {
    // Buraya API çağrısı gelecek
    console.log('Feedbacks yükleniyor...')
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  // Filter feedbacks
  useEffect(() => {
    let filtered = feedbacks

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(feedback => 
        feedback.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.feedback_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.table_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.order_number?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(feedback => feedback.feedback_type === typeFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "resolved") {
        filtered = filtered.filter(feedback => feedback.is_resolved)
      } else if (statusFilter === "pending") {
        filtered = filtered.filter(feedback => !feedback.is_resolved)
      } else if (statusFilter === "public") {
        filtered = filtered.filter(feedback => feedback.is_public)
      }
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(feedback => feedback.priority === priorityFilter)
    }

    // Rating filter
    if (ratingFilter !== "all") {
      const minRating = parseInt(ratingFilter)
      filtered = filtered.filter(feedback => feedback.rating >= minRating)
    }

    // Sort by priority and creation time
    filtered.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 }
      const aPriority = priorityOrder[a.priority]
      const bPriority = priorityOrder[b.priority]
      
      if (aPriority !== bPriority) return bPriority - aPriority
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    setFilteredFeedbacks(filtered)
  }, [feedbacks, searchTerm, typeFilter, statusFilter, priorityFilter, ratingFilter])

  // Calculate statistics
  const calculateStats = (): FeedbackStats => {
    const today = new Date().toDateString()
    const todayFeedbacks = feedbacks.filter(feedback => 
      new Date(feedback.created_at).toDateString() === today
    )
    
    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0)
    const averageRating = feedbacks.length > 0 ? totalRating / feedbacks.length : 0
    
    // Calculate satisfaction trend (last 7 days vs previous 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    
    const recentFeedbacks = feedbacks.filter(f => new Date(f.created_at) >= sevenDaysAgo)
    const previousFeedbacks = feedbacks.filter(f => 
      new Date(f.created_at) >= fourteenDaysAgo && new Date(f.created_at) < sevenDaysAgo
    )
    
    const recentAvg = recentFeedbacks.length > 0 
      ? recentFeedbacks.reduce((sum, f) => sum + f.rating, 0) / recentFeedbacks.length 
      : 0
    const previousAvg = previousFeedbacks.length > 0 
      ? previousFeedbacks.reduce((sum, f) => sum + f.rating, 0) / previousFeedbacks.length 
      : 0
    
    const satisfactionTrend = previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0

    return {
      totalFeedbacks: feedbacks.length,
      averageRating: Math.round(averageRating * 10) / 10,
      resolvedCount: feedbacks.filter(f => f.is_resolved).length,
      pendingCount: feedbacks.filter(f => !f.is_resolved).length,
      todayCount: todayFeedbacks.length,
      satisfactionTrend: Math.round(satisfactionTrend * 10) / 10
    }
  }

  const stats = calculateStats()

  // Type icons and labels
  const getTypeIcon = (type: string) => {
    const icons = {
      complaint: <AlertTriangle className="h-4 w-4" />,
      suggestion: <Lightbulb className="h-4 w-4" />,
      compliment: <Heart className="h-4 w-4" />,
      general: <MessageCircle className="h-4 w-4" />,
      food_issue: <Utensils className="h-4 w-4" />,
      service_issue: <User className="h-4 w-4" />
    }
    return icons[type as keyof typeof icons] || <MessageSquare className="h-4 w-4" />
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      complaint: 'Buraya şikayet metni gelecek',
      suggestion: 'Buraya öneri metni gelecek',
      compliment: 'Buraya övgü metni gelecek',
      general: 'Buraya genel metni gelecek',
      food_issue: 'Buraya yemek sorunu metni gelecek',
      service_issue: 'Buraya servis sorunu metni gelecek'
    }
    return labels[type as keyof typeof labels] || type
  }

  const getTypeBadgeColor = (type: string) => {
    const colors = {
      complaint: 'bg-red-100 text-red-800 border-red-200',
      suggestion: 'bg-blue-100 text-blue-800 border-blue-200',
      compliment: 'bg-green-100 text-green-800 border-green-200',
      general: 'bg-gray-100 text-gray-800 border-gray-200',
      food_issue: 'bg-orange-100 text-orange-800 border-orange-200',
      service_issue: 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  // Priority badges
  const getPriorityBadge = (priority: string) => {
    const styles = {
      low: "bg-gray-100 text-gray-800 border-gray-200",
      normal: "bg-blue-100 text-blue-800 border-blue-200",
      high: "bg-orange-100 text-orange-800 border-orange-200",
      urgent: "bg-red-100 text-red-800 border-red-200"
    }

    const labels = {
      low: "Buraya düşük metni gelecek",
      normal: "Buraya normal metni gelecek",
      high: "Buraya yüksek metni gelecek",
      urgent: "Buraya acil metni gelecek"
    }

    return (
      <Badge className={`${styles[priority as keyof typeof styles]} border text-xs`}>
        {labels[priority as keyof typeof labels]}
      </Badge>
    )
  }

  // Star rating component
  const StarRating = ({ rating, size = 4 }: { rating: number; size?: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-${size} w-${size} ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : star <= rating + 0.5
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    )
  }

  // Placeholder functions
  const respondToFeedback = async (feedbackId: number, response: string) => {
    // Buraya API çağrısı gelecek
    console.log('Feedback yanıtlanıyor...')
  }

  const toggleResolution = async (feedbackId: number, isResolved: boolean) => {
    // Buraya API çağrısı gelecek
    console.log('Resolution status güncelleniyor...')
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-gray-600">Buraya geri bildirimler yükleniyor metni gelecek</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buraya müşteri geri bildirimleri başlığı gelecek</h1>
            <p className="text-gray-600">Buraya değerlendirmeler açıklaması gelecek</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchFeedbacks}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Buraya yenile metni gelecek
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Buraya yeni geri bildirim metni gelecek
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya toplam etiketi gelecek</p>
                <p className="font-semibold">{stats.totalFeedbacks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya ortalama etiketi gelecek</p>
                <p className="font-semibold">{stats.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya çözümlenmiş etiketi gelecek</p>
                <p className="font-semibold">{stats.resolvedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya bekleyen etiketi gelecek</p>
                <p className="font-semiboldhy">{stats.pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-xs text-gray-600">Buraya bugün etiketi gelecek</p>
                <p className="font-semibold">{stats.todayCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {stats.satisfactionTrend >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <div>
                <p className="text-xs text-gray-600">Buraya trend etiketi gelecek</p>
                <p className={`font-semibold ${stats.satisfactionTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.satisfactionTrend > 0 ? '+' : ''}{stats.satisfactionTrend}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Buraya tür placeholder metni gelecek" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Buraya tüm türler metni gelecek</SelectItem>
                <SelectItem value="complaint">Buraya şikayet metni gelecek</SelectItem>
                <SelectItem value="suggestion">Buraya öneri metni gelecek</SelectItem>
                <SelectItem value="compliment">Buraya övgü metni gelecek</SelectItem>
                <SelectItem value="general">Buraya genel metni gelecek</SelectItem>
                <SelectItem value="food_issue">Buraya yemek sorunu metni gelecek</SelectItem>
                <SelectItem value="service_issue">Buraya servis sorunu metni gelecek</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Buraya durum placeholder metni gelecek" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Buraya tümü metni gelecek</SelectItem>
                <SelectItem value="pending">Buraya bekleyen metni gelecek</SelectItem>
                <SelectItem value="resolved">Buraya çözümlenmiş metni gelecek</SelectItem>
                <SelectItem value="public">Buraya herkese açık metni gelecek</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Buraya öncelik placeholder metni gelecek" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Buraya tümü metni gelecek</SelectItem>
                <SelectItem value="urgent">Buraya acil metni gelecek</SelectItem>
                <SelectItem value="high">Buraya yüksek metni gelecek</SelectItem>
                <SelectItem value="normal">Buraya normal metni gelecek</SelectItem>
                <SelectItem value="low">Buraya düşük metni gelecek</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Buraya puan placeholder metni gelecek" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Buraya tüm puanlar metni gelecek</SelectItem>
                <SelectItem value="5">Buraya 5 yıldız metni gelecek</SelectItem>
                <SelectItem value="4">Buraya 4+ yıldız metni gelecek</SelectItem>
                <SelectItem value="3">Buraya 3+ yıldız metni gelecek</SelectItem>
                <SelectItem value="2">Buraya 2+ yıldız metni gelecek</SelectItem>
                <SelectItem value="1">Buraya 1+ yıldız metni gelecek</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="grid gap-4">
        {filteredFeedbacks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Buraya geri bildirim bulunamadı başlığı gelecek</h3>
              <p className="text-gray-600">Buraya geri bildirim bulunamadı açıklaması gelecek</p>
            </CardContent>
          </Card>
        ) : (
          filteredFeedbacks.map((feedback) => (
            <Card key={feedback.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(feedback.feedback_type)}
                        <Badge className={`${getTypeBadgeColor(feedback.feedback_type)} border`}>
                          {getTypeLabel(feedback.feedback_type)}
                        </Badge>
                      </div>
                      
                      {getPriorityBadge(feedback.priority)}
                      
                      {feedback.is_resolved && (
                        <Badge className="bg-green-50 text-green-700 border-green-200">
                          <Check className="h-3 w-3 mr-1" />
                          Buraya çözümlenmiş metni gelecek
                        </Badge>
                      )}
                      
                      {feedback.is_public && (
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                          Buraya herkese açık metni gelecek
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="font-semibold text-lg">
                        {feedback.customer_name || 'Buraya anonim müşteri metni gelecek'}
                      </h3>
                      {feedback.table_number && (
                        <span className="text-sm text-gray-500">{feedback.table_number}</span>
                      )}
                      {feedback.order_number && (
                        <span className="text-sm text-gray-500">{feedback.order_number}</span>
                      )}
                      <span className="text-sm text-gray-500">
                        {new Date(feedback.created_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <StarRating rating={feedback.rating} />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-3 w-3 text-gray-500" />
                        <span>Buraya yemek etiketi gelecek: {feedback.food_rating}/5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-gray-500" />
                        <span>Buraya servis etiketi gelecek: {feedback.service_rating}/5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-3 w-3 text-gray-500" />
                        <span>Buraya atmosfer etiketi gelecek: {feedback.atmosphere_rating}/5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span>Buraya hız etiketi gelecek: {feedback.speed_rating}/5</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">
                      "{feedback.feedback_text}"
                    </p>
                    
                    {feedback.response_text && (
                      <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Reply className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">
                            {feedback.response_by_name} Buraya yanıtladı metni gelecek
                          </span>
                          <span className="text-xs text-blue-600">
                            {new Date(feedback.response_date!).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <p className="text-blue-800 text-sm">
                          {feedback.response_text}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    {!feedback.response_text && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedFeedback(feedback)
                          setShowResponseDialog(true)
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Reply className="h-4 w-4 mr-2" />
                        Buraya yanıtla metni gelecek
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleResolution(feedback.id, !feedback.is_resolved)}
                    >
                      {feedback.is_resolved ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Buraya yeniden aç metni gelecek
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Buraya çözümle metni gelecek
                        </>
                      )}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedFeedback(feedback)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Buraya detay metni gelecek
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Response Dialog */}
      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Buraya geri bildirime yanıt ver başlığı gelecek</DialogTitle>
          </DialogHeader>
          
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{selectedFeedback.customer_name}</h4>
                  <StarRating rating={selectedFeedback.rating} size={3} />
                </div>
                <p className="text-gray-700 text-sm">
                  "{selectedFeedback.feedback_text}"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buraya yanıtınız etiketi gelecek
                </label>
                <Textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Buraya yanıt placeholder metni gelecek"
                  rows={4}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowResponseDialog(false)
                    setResponseText("")
                    setSelectedFeedback(null)
                  }}
                >
                  Buraya iptal metni gelecek
                </Button>
                <Button
                  onClick={() => selectedFeedback && respondToFeedback(selectedFeedback.id, responseText)}
                  disabled={!responseText.trim()}
                >
                  Buraya yanıtla metni gelecek
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CustomerFeedbackModule 