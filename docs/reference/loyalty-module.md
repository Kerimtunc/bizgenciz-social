"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Star,
  Gift,
  Trophy,
  Users,
  TrendingUp,
  Search,
  Plus,
  Edit,
  Trash2,
  Crown,
  Diamond,
  Award,
  Calendar,
  DollarSign,
  UserPlus,
  BarChart3,
  Clock,
  CheckCircle,
  Percent,
  Loader2
} from "lucide-react"

/**
 * LoyaltyModule Component - Kurtarılmış UI
 * 
 * @description Complete loyalty program management system with customer tiers, points, and rewards
 * @location Original: panel/page.tsx renderMainContent() - case "loyalty" (placeholder)
 * @usage Panel dashboard loyalty program management section
 * 
 * @features
 * - Loyalty program management
 * - Points system
 * - Rewards management
 * - Customer tiers
 * - Campaign management
 * - Customer analytics
 * - Tier benefits
 * - Reward tracking
 */

interface LoyaltyModuleProps {
  modules: any[]
  activeModule: string
  onModuleChange: (module: string) => void
  theme: "dark" | "light"
}

interface LoyaltyTier {
  id: number
  name: string
  minPoints: number
  maxPoints: number
  benefits: string[]
  discountPercentage: number
  color: string
  icon: string
  memberCount: number
  isActive: boolean
}

interface LoyaltyCustomer {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  tier: string
  points: number
  totalSpent: number
  visits: number
  joinDate: string
  lastVisit: string
  tierColor?: string
  tierIcon?: string
}

interface RewardCampaign {
  id: number
  title: string
  description: string
  pointsCost: number
  discountPercentage: number
  validUntil: string
  maxUsage: number
  usageCount: number
  status: string
  type: string
}

export const LoyaltyModule = ({
  modules,
  activeModule,
  onModuleChange,
  theme,
}: LoyaltyModuleProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTier, setSelectedTier] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Placeholder state
  const [loyaltyTiers, setLoyaltyTiers] = useState<LoyaltyTier[]>([])
  const [loyaltyCustomers, setLoyaltyCustomers] = useState<LoyaltyCustomer[]>([])
  const [rewardCampaigns, setRewardCampaigns] = useState<RewardCampaign[]>([])

  // Placeholder API functions
  const fetchLoyaltyTiers = async () => {
    // Buraya API çağrısı gelecek
    console.log('Loyalty tiers yükleniyor...')
  }

  const fetchLoyaltyCustomers = async () => {
    // Buraya API çağrısı gelecek
    console.log('Loyalty customers yükleniyor...')
  }

  const fetchRewardCampaigns = async () => {
    // Buraya API çağrısı gelecek
    console.log('Reward campaigns yükleniyor...')
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        await Promise.all([
          fetchLoyaltyTiers(),
          fetchLoyaltyCustomers(), 
          fetchRewardCampaigns()
        ])
      } catch (err) {
        setError('Buraya veriler yüklenemedi metni gelecek')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Placeholder filters
  const filteredCustomers = loyaltyCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = selectedTier === "all" || customer.tier === selectedTier
    return matchesSearch && matchesTier
  })

  // Placeholder calculations
  const totalMembers = loyaltyCustomers.length
  const totalPoints = loyaltyCustomers.reduce((sum, customer) => sum + customer.points, 0)
  const totalSpent = loyaltyCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  const averageSpent = totalMembers > 0 ? totalSpent / totalMembers : 0

  const getTierColor = (tierName: string) => {
    const tier = loyaltyTiers.find(t => t.name === tierName)
    return tier?.color || "bg-gray-400"
  }

  const getTierIcon = (tierName: string) => {
    const tier = loyaltyTiers.find(t => t.name === tierName)
    const iconName = tier?.icon || "Trophy"
    
    // Icon mapping
    const iconMap: { [key: string]: any } = {
      Trophy, Award, Crown, Diamond, Star, Gift, Heart
    }
    
    return iconMap[iconName] || Trophy
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-lg">Buraya sadakat sistemi yükleniyor metni gelecek</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-lg">{error}</div>
          <Button onClick={() => window.location.reload()} variant="outline">
            Buraya yeniden yükle metni gelecek
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Buraya toplam üye etiketi gelecek</p>
                <p className="text-2xl font-bold">{totalMembers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Buraya toplam puan etiketi gelecek</p>
                <p className="text-2xl font-bold">{totalPoints.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Buraya toplam harcama etiketi gelecek</p>
                <p className="text-2xl font-bold">₺{totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Buraya ortalama harcama etiketi gelecek</p>
                <p className="text-2xl font-bold">₺{averageSpent.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Buraya müşteriler metni gelecek</TabsTrigger>
          <TabsTrigger value="tiers">Buraya seviyeler metni gelecek</TabsTrigger>
          <TabsTrigger value="campaigns">Buraya kampanyalar metni gelecek</TabsTrigger>
        </TabsList>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buraya müşteri ara placeholder metni gelecek"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-48">
              <select 
                value={selectedTier} 
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="all">Buraya tüm seviyeler metni gelecek</option>
                {loyaltyTiers.map(tier => (
                  <option key={tier.id} value={tier.name}>{tier.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredCustomers.map((customer) => {
              const IconComponent = getTierIcon(customer.tier)
              return (
                <Card key={customer.id} className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar} alt={customer.name} />
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{customer.name}</h3>
                            <Badge className={`${getTierColor(customer.tier)} text-white`}>
                              <IconComponent className="h-3 w-3 mr-1" />
                              {customer.tier}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{customer.email}</p>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm text-gray-600">Buraya puan etiketi gelecek</p>
                            <p className="font-bold text-lg">{customer.points.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Buraya harcama etiketi gelecek</p>
                            <p className="font-bold text-lg">₺{customer.totalSpent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Buraya ziyaret etiketi gelecek</p>
                            <p className="font-bold text-lg">{customer.visits}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Buraya son etiketi gelecek: {customer.lastVisit}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Tiers Tab */}
        <TabsContent value="tiers" className="space-y-4">
          <div className="grid gap-4">
            {loyaltyTiers.map((tier) => {
              const IconComponent = getTierIcon(tier.name)
              return (
                <Card key={tier.id} className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 ${tier.color} rounded-lg`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{tier.name}</h3>
                          <p className="text-gray-600">{tier.minPoints} - {tier.maxPoints} Buraya puan metni gelecek</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-6">
                          <div>
                            <p className="text-sm text-gray-600">Buraya üye sayısı etiketi gelecek</p>
                            <p className="font-bold text-lg">{tier.memberCount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Buraya indirim etiketi gelecek</p>
                            <p className="font-bold text-lg">%{tier.discountPercentage}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Buraya avantajlar etiketi gelecek:</p>
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(tier.benefits).map((benefit: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4">
            {rewardCampaigns.map((campaign) => (
              <Card key={campaign.id} className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-red-500/20 rounded-lg">
                        <Gift className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{campaign.title}</h3>
                        <p className="text-gray-600">{campaign.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-6">
                        <div>
                          <p className="text-sm text-gray-600">Buraya puan maliyeti etiketi gelecek</p>
                          <p className="font-bold text-lg">{campaign.pointsCost.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Buraya kullanım etiketi gelecek</p>
                          <p className="font-bold text-lg">{campaign.usageCount}/{campaign.maxUsage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status === 'active' ? 'Buraya aktif metni gelecek' : 'Buraya pasif metni gelecek'}
                        </Badge>
                        <Badge variant="outline">
                          {campaign.type === 'discount' ? 'Buraya indirim metni gelecek' : 'Buraya hediye metni gelecek'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Buraya son etiketi gelecek: {campaign.validUntil}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={(campaign.usageCount / campaign.maxUsage) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LoyaltyModule 