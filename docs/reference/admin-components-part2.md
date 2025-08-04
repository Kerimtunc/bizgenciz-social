// ==========================================
// ADMIN COMPONENTS PART 2
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/AdminComponents.tsx
// Satır Sayısı: 947 satır

import React, { useState } from "react"
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Receipt, 
  ShoppingCart, 
  Coffee, 
  Zap, 
  Car, 
  Filter, 
  Download,
  Plus,
  Minus,
  ArrowRight,
  Calendar,
  Building,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Utility function for class names
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

interface Account {
  id: string
  name: string
  description: string
  balance: number
  type: "cash" | "bank" | "credit" | "debt" | "investment"
  color: string
}

interface Transaction {
  id: string
  title: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  timestamp: string
  status: "completed" | "pending" | "failed"
  icon: any
  paymentMethod: string
}

interface Bill {
  id: string
  name: string
  amount: number
  dueDate: string
  frequency: "weekly" | "monthly" | "quarterly" | "yearly"
  category: string
  isRecurring: boolean
  status: "pending" | "paid" | "overdue"
  supplier: string
}

interface Goal {
  id: string
  title: string
  subtitle: string
  current: number
  target: number
  progress: number
  targetDate: string
  type: "savings" | "revenue" | "cost_reduction" | "investment"
  color: string
  icon: any
}

// ============================================================================
// ENHANCED RECENT TRANSACTIONS
// ============================================================================

export function EnhancedRecentTransactions() {
  const transactions: Transaction[] = [
    {
      id: "1",
      title: "Masa 5 - Yemek Siparişi",
      description: "Bugün, 14:45",
      amount: 285.50,
      type: "income",
      category: "food_sales",
      timestamp: "2024-01-15T14:45:00",
      status: "completed",
      icon: ShoppingCart,
      paymentMethod: "Kredi Kartı"
    },
    {
      id: "2",
      title: "Et Tedarikçisi - ABC Et",
      description: "Bugün, 09:30",
      amount: -1450.00,
      type: "expense",
      category: "supplies",
      timestamp: "2024-01-15T09:30:00",
      status: "completed",
      icon: Receipt,
      paymentMethod: "Banka Havalesi"
    },
    {
      id: "3",
      title: "Kahve ve İçecek Satışları",
      description: "Dün, 16:20",
      amount: 156.75,
      type: "income",
      category: "beverage_sales",
      timestamp: "2024-01-14T16:20:00",
      status: "completed",
      icon: Coffee,
      paymentMethod: "Nakit"
    },
    {
      id: "4",
      title: "Elektrik Faturası",
      description: "Dün, 11:00",
      amount: -380.25,
      type: "expense",
      category: "utilities",
      timestamp: "2024-01-14T11:00:00",
      status: "pending",
      icon: Zap,
      paymentMethod: "Otomatik Ödeme"
    },
    {
      id: "5",
      title: "Paket Servis - Yemeksepeti",
      description: "2 gün önce",
      amount: 420.80,
      type: "income",
      category: "delivery_sales",
      timestamp: "2024-01-13T19:15:00",
      status: "completed",
      icon: Car,
      paymentMethod: "QR Ödeme"
    }
  ]

  return (
    <Card className="bg-white border border-orange-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-orange-500" />
            Son İşlemler
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">Bu ay: Buraya işlem sayısı gelecek</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-lg ${
                transaction.type === "income" ? "bg-green-100" : "bg-red-100"
              }`}>
                <transaction.icon className={`h-4 w-4 ${
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 truncate">{transaction.title}</p>
                  <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                    {transaction.status === "completed" ? "Tamamlandı" : "Bekliyor"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{transaction.description} • {transaction.paymentMethod}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.type === "income" ? "+" : ""}₺{Math.abs(transaction.amount).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                </span>
                {transaction.type === "income" ? (
                  <ArrowDownLeft className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full border-orange-200 hover:bg-orange-50">
          Tüm İşlemleri Görüntüle
        </Button>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// RESTAURANT BILL MANAGER
// ============================================================================

export function RestaurantBillManager() {
  const initialBills: Bill[] = [
    {
      id: "1",
      name: "Elektrik Faturası",
      amount: 485.75,
      dueDate: "2024-01-20",
      frequency: "monthly",
      category: "utilities",
      isRecurring: true,
      status: "pending",
      supplier: "BEDAŞ"
    },
    {
      id: "2",
      name: "Su Faturası",
      amount: 125.30,
      dueDate: "2024-01-25",
      frequency: "monthly",
      category: "utilities",
      isRecurring: true,
      status: "pending",
      supplier: "İSKİ"
    },
    {
      id: "3",
      name: "Doğalgaz",
      amount: 380.00,
      dueDate: "2024-01-18",
      frequency: "monthly",
      category: "utilities",
      isRecurring: true,
      status: "overdue",
      supplier: "İGDAŞ"
    },
    {
      id: "4",
      name: "İnternet + Telefon",
      amount: 220.00,
      dueDate: "2024-01-30",
      frequency: "monthly",
      category: "communication",
      isRecurring: true,
      status: "pending",
      supplier: "Türk Telekom"
    }
  ]

  const [bills, setBills] = useState<Bill[]>(initialBills)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-600 bg-yellow-100"
      case "paid": return "text-green-600 bg-green-100"
      case "overdue": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const handlePayBill = (billId: string) => {
    setBills(bills.map(bill => 
      bill.id === billId ? { ...bill, status: "paid" as const } : bill
    ))
  }

  return (
    <>
      <Card className="bg-white border border-orange-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Receipt className="h-5 w-5 text-orange-500" />
              Fatura Yönetimi
            </CardTitle>
            <Button onClick={() => setIsAddModalOpen(true)} size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="h-4 w-4 mr-1" />
              Fatura Ekle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {bills.length > 0 ? (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {bills.map((bill) => (
                <div key={bill.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{bill.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                          {bill.status === "pending" ? "Bekliyor" : bill.status === "paid" ? "Ödendi" : "Gecikmiş"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(bill.dueDate).toLocaleDateString("tr-TR")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span>{bill.supplier}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ₺{bill.amount.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                    </span>
                    <Button
                      onClick={() => handlePayBill(bill.id)}
                      disabled={bill.status === "paid"}
                      size="sm"
                      className={bill.status === "paid" ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 text-white"}
                    >
                      {bill.status === "paid" ? "Ödendi" : "Öde"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Henüz fatura eklenmemiş</p>
              <Button onClick={() => setIsAddModalOpen(true)} className="bg-orange-600 hover:bg-orange-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                İlk Faturanızı Ekleyin
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AddBillModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  )
}

// ============================================================================
// BUSINESS GOALS TRACKER
// ============================================================================

export function BusinessGoalsTracker() {
  const goals: Goal[] = [
    {
      id: "1",
      title: "Aylık Ciro Hedefi",
      subtitle: "Ocak ayı satış hedefi",
      current: 485000,
      target: 650000,
      progress: 75,
      targetDate: "31 Ocak 2024",
      type: "revenue",
      color: "bg-green-100 text-green-600",
      icon: DollarSign
    },
    {
      id: "2",
      title: "Maliyet Optimizasyonu",
      subtitle: "Yiyecek maliyetlerini düşürme",
      current: 8500,
      target: 12000,
      progress: 71,
      targetDate: "Şubat 2024",
      type: "cost_reduction",
      color: "bg-orange-100 text-orange-600",
      icon: Target
    },
    {
      id: "3",
      title: "Acil Durum Fonu",
      subtitle: "3 aylık işletme masrafı",
      current: 45000,
      target: 75000,
      progress: 60,
      targetDate: "Mart 2024",
      type: "savings",
      color: "bg-blue-100 text-blue-600",
      icon: Wallet
    },
    {
      id: "4",
      title: "Yeni Şube Yatırımı",
      subtitle: "İkinci restoran için sermaye",
      current: 125000,
      target: 300000,
      progress: 42,
      targetDate: "Haziran 2024",
      type: "investment",
      color: "bg-purple-100 text-purple-600",
      icon: Building
    }
  ]

  return (
    <Card className="bg-white border border-orange-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            İş Hedefleri
          </CardTitle>
          <Button size="sm" variant="outline" className="border-orange-200">
            <Plus className="h-4 w-4 mr-1" />
            Hedef Ekle
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${goal.color}`}>
                  <goal.icon className="h-5 w-5" />
                </div>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {goal.targetDate}
                </span>
              </div>

              <div className="mb-3">
                <h3 className="font-medium text-gray-900 mb-1">{goal.title}</h3>
                <p className="text-sm text-gray-500">{goal.subtitle}</p>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">İlerleme</span>
                  <span className="font-medium text-gray-900">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  ₺{goal.current.toLocaleString("tr-TR")} / ₺{goal.target.toLocaleString("tr-TR")}
                </span>
                <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                  Detaylar
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// MODALS
// ============================================================================

// Gelir Ekleme Modal
interface AddIncomeModalProps {
  isOpen: boolean
  onClose: () => void
  accounts: Account[]
}

export function AddIncomeModal({ isOpen, onClose, accounts }: AddIncomeModalProps) {
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Gelir ekleniyor:", { amount, selectedAccount, category, description })
    onClose()
    setAmount("")
    setSelectedAccount("")
    setCategory("")
    setDescription("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Gelir Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Tutar</Label>
            <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">Hesap</Label>
            <Select value={selectedAccount} onValueChange={setSelectedAccount} required>
              <SelectTrigger>
                <SelectValue placeholder="Hesap seçin" />
              </SelectTrigger>
              <SelectContent>
                {accounts.filter(acc => acc.type !== "debt").map((account) => (
                  <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food_sales">Yemek Satışları</SelectItem>
                <SelectItem value="beverage_sales">İçecek Satışları</SelectItem>
                <SelectItem value="delivery_sales">Paket Servis</SelectItem>
                <SelectItem value="catering">Catering</SelectItem>
                <SelectItem value="other">Diğer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea id="description" placeholder="Gelir açıklaması" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">İptal</Button>
            <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">Ekle</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Gider Ekleme Modal
interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  accounts: Account[]
}

export function AddExpenseModal({ isOpen, onClose, accounts }: AddExpenseModalProps) {
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Gider ekleniyor:", { amount, selectedAccount, category, description })
    onClose()
    setAmount("")
    setSelectedAccount("")
    setCategory("")
    setDescription("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Gider Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Tutar</Label>
            <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">Hesap</Label>
            <Select value={selectedAccount} onValueChange={setSelectedAccount} required>
              <SelectTrigger>
                <SelectValue placeholder="Hesap seçin" />
              </SelectTrigger>
              <SelectContent>
                {accounts.filter(acc => acc.type !== "debt").map((account) => (
                  <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplies">Malzeme/Tedarik</SelectItem>
                <SelectItem value="utilities">Faturalar</SelectItem>
                <SelectItem value="staff">Personel</SelectItem>
                <SelectItem value="rent">Kira</SelectItem>
                <SelectItem value="maintenance">Bakım</SelectItem>
                <SelectItem value="marketing">Pazarlama</SelectItem>
                <SelectItem value="other">Diğer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea id="description" placeholder="Gider açıklaması" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">İptal</Button>
            <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">Ekle</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Transfer Modal
interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  accounts: Account[]
}

export function TransferModal({ isOpen, onClose, accounts }: TransferModalProps) {
  const [amount, setAmount] = useState("")
  const [fromAccount, setFromAccount] = useState("")
  const [toAccount, setToAccount] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Transfer yapılıyor:", { amount, fromAccount, toAccount, description })
    onClose()
    setAmount("")
    setFromAccount("")
    setToAccount("")
    setDescription("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hesaplar Arası Transfer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Tutar</Label>
            <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fromAccount">Gönderen Hesap</Label>
            <Select value={fromAccount} onValueChange={setFromAccount} required>
              <SelectTrigger>
                <SelectValue placeholder="Gönderen hesap seçin" />
              </SelectTrigger>
              <SelectContent>
                {accounts.filter(acc => acc.type !== "debt").map((account) => (
                  <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="toAccount">Alıcı Hesap</Label>
            <Select value={toAccount} onValueChange={setToAccount} required>
              <SelectTrigger>
                <SelectValue placeholder="Alıcı hesap seçin" />
              </SelectTrigger>
              <SelectContent>
                {accounts.filter(acc => acc.type !== "debt").map((account) => (
                  <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea id="description" placeholder="Transfer açıklaması" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">İptal</Button>
            <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">Transfer Yap</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Fatura Ekleme Modal
interface AddBillModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddBillModal({ isOpen, onClose }: AddBillModalProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [supplier, setSupplier] = useState("")
  const [category, setCategory] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Fatura ekleniyor:", { name, amount, dueDate, supplier, category, isRecurring })
    onClose()
    setName("")
    setAmount("")
    setDueDate("")
    setSupplier("")
    setCategory("")
    setIsRecurring(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fatura Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Fatura Adı</Label>
            <Input id="name" placeholder="Fatura adı" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Tutar</Label>
            <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Son Ödeme Tarihi</Label>
            <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Tedarikçi</Label>
            <Input id="supplier" placeholder="Tedarikçi adı" value={supplier} onChange={(e) => setSupplier(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utilities">Faturalar</SelectItem>
                <SelectItem value="supplies">Tedarik</SelectItem>
                <SelectItem value="rent">Kira</SelectItem>
                <SelectItem value="insurance">Sigorta</SelectItem>
                <SelectItem value="other">Diğer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="recurring">Tekrarlı Fatura</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">İptal</Button>
            <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">Ekle</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  Account,
  Transaction,
  Bill,
  Goal,
  AddIncomeModalProps,
  AddExpenseModalProps,
  TransferModalProps,
  AddBillModalProps
}; 