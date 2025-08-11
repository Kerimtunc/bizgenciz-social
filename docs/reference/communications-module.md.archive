// ==========================================
// COMMUNICATIONS MODULE COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/modules/CommunicationsModule.tsx
// Satır Sayısı: 647 satır

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, Send, Users, Lock, Globe, Shield, 
  Crown, UserCheck, Briefcase, ChefHat, User,
  Settings, Search, Phone, Mail, MessageSquare,
  Paperclip, Smile, MoreVertical, Bell, Video,
  Mic, Share, Download, Trash2, Edit3, Copy,
  Pin, Star, Hash, Plus, X, Check, Circle,
  Wifi, WifiOff, Volume2, VolumeX, Eye, EyeOff
} from 'lucide-react'
import ModuleHeader from "@/components/common/ModuleHeader"
import { ModernCard } from '../components/ModernCard'

interface CommunicationsModuleProps {
  modules: Array<{
    id: string
    label: string
    icon: any
    description: string
  }>
  activeModule: string
  onModuleChange: (moduleId: string) => void
  theme: 'dark' | 'light'
}

// Types
interface User {
  id: string
  name: string
  role: 'super_admin' | 'admin' | 'manager' | 'staff' | 'customer'
  avatar?: string
  online: boolean
  lastSeen?: Date
  status: 'online' | 'away' | 'busy' | 'offline'
}

interface Room {
  id: string
  name: string
  type: 'public' | 'admin' | 'management' | 'staff' | 'private'
  description?: string
  memberCount: number
  unreadCount: number
  locked: boolean
  lastMessage?: Message
  created: Date
  members: string[]
}

interface Message {
  id: string
  userId: string
  userName: string
  userRole: string
  content: string
  timestamp: Date
  type: 'text' | 'file' | 'image' | 'system'
  replyTo?: string
  edited: boolean
  attachments?: Attachment[]
  reactions?: Reaction[]
}

interface Attachment {
  id: string
  name: string
  size: number
  type: string
  url: string
}

interface Reaction {
  emoji: string
  users: string[]
}

export const CommunicationsModule: React.FC<CommunicationsModuleProps> = ({
  modules,
  activeModule,
  onModuleChange,
  theme
}) => {
  // State Management
  const [selectedRoom, setSelectedRoom] = useState<string>('general')
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserList, setShowUserList] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected')
  const [notifications, setNotifications] = useState(true)
  const [sounds, setSounds] = useState(true)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock Data
  const currentUser: User = {
    id: 'user1',
    name: 'Buraya admin user metni gelecek',
    role: 'admin',
    online: true,
    status: 'online'
  }

  const [users] = useState<User[]>([
    { id: 'user1', name: 'Buraya admin user metni gelecek', role: 'admin', online: true, status: 'online' },
    { id: 'user2', name: 'Buraya mehmet yılmaz metni gelecek', role: 'manager', online: true, status: 'online' },
    { id: 'user3', name: 'Buraya ayşe kaya metni gelecek', role: 'staff', online: false, status: 'offline', lastSeen: new Date(Date.now() - 1800000) },
    { id: 'user4', name: 'Buraya ali demir metni gelecek', role: 'staff', online: true, status: 'busy' },
    { id: 'user5', name: 'Buraya fatma öz metni gelecek', role: 'customer', online: true, status: 'away' }
  ])

  const [rooms] = useState<Room[]>([
    {
      id: 'general',
      name: 'Buraya genel metni gelecek',
      type: 'public',
      description: 'Buraya herkese açık genel sohbet odası açıklaması gelecek',
      memberCount: 15,
      unreadCount: 3,
      locked: false,
      created: new Date(),
      members: ['user1', 'user2', 'user3', 'user4', 'user5']
    },
    {
      id: 'management',
      name: 'Buraya yönetim metni gelecek',
      type: 'management',
      description: 'Buraya sadece yönetim kadrosu için açıklaması gelecek',
      memberCount: 3,
      unreadCount: 0,
      locked: true,
      created: new Date(),
      members: ['user1', 'user2']
    },
    {
      id: 'staff',
      name: 'Buraya personel metni gelecek',
      type: 'staff',
      description: 'Buraya personel iletişimi açıklaması gelecek',
      memberCount: 8,
      unreadCount: 2,
      locked: false,
      created: new Date(),
      members: ['user2', 'user3', 'user4']
    },
    {
      id: 'kitchen',
      name: 'Buraya mutfak metni gelecek',
      type: 'staff',
      description: 'Buraya mutfak ekibi koordinasyonu açıklaması gelecek',
      memberCount: 4,
      unreadCount: 1,
      locked: false,
      created: new Date(),
      members: ['user3', 'user4']
    }
  ])

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    general: [
      {
        id: 'msg1',
        userId: 'user2',
        userName: 'Buraya mehmet yılmaz metni gelecek',
        userRole: 'manager',
        content: 'Buraya bugünkü rezervasyon sayısı oldukça yüksek hazırlıklı olalım mesajı gelecek.',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text',
        edited: false
      },
      {
        id: 'msg2',
        userId: 'user3',
        userName: 'Buraya ayşe kaya metni gelecek',
        userRole: 'staff',
        content: 'Buraya anlaşıldı masa düzenlemelerini kontrol ediyorum mesajı gelecek.',
        timestamp: new Date(Date.now() - 3000000),
        type: 'text',
        edited: false
      },
      {
        id: 'msg3',
        userId: 'user1',
        userName: 'Buraya admin user metni gelecek',
        userRole: 'admin',
        content: 'Buraya yeni menü güncellemesi yayınlandı lütfen kontrol edin mesajı gelecek.',
        timestamp: new Date(Date.now() - 300000),
        type: 'text',
        edited: false
      }
    ],
    management: [],
    staff: [
      {
        id: 'msg4',
        userId: 'user4',
        userName: 'Buraya ali demir metni gelecek',
        userRole: 'staff',
        content: 'Buraya vardiya değişimi için hazırım mesajı gelecek.',
        timestamp: new Date(Date.now() - 1800000),
        type: 'text',
        edited: false
      }
    ],
    kitchen: []
  })

  // Role Icons and Colors
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return <Crown className="h-4 w-4 text-yellow-500" />
      case 'admin': return <Shield className="h-4 w-4 text-red-500" />
      case 'manager': return <Briefcase className="h-4 w-4 text-blue-500" />
      case 'staff': return <ChefHat className="h-4 w-4 text-green-500" />
      case 'customer': return <User className="h-4 w-4 text-gray-500" />
      default: return <User className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'text-yellow-600 dark:text-yellow-400'
      case 'admin': return 'text-red-600 dark:text-red-400'
      case 'manager': return 'text-blue-600 dark:text-blue-400'
      case 'staff': return 'text-green-600 dark:text-green-400'
      case 'customer': return 'text-gray-600 dark:text-gray-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getRoomIcon = (type: string) => {
    switch (type) {
      case 'public': return <Globe className="h-4 w-4" />
      case 'admin': return <Shield className="h-4 w-4" />
      case 'management': return <Briefcase className="h-4 w-4" />
      case 'staff': return <Users className="h-4 w-4" />
      case 'private': return <Lock className="h-4 w-4" />
      default: return <Hash className="h-4 w-4" />
    }
  }

  // Message Handling
  const sendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      content: message.trim(),
      timestamp: new Date(),
      type: 'text',
      edited: false
    }

    setMessages(prev => ({
      ...prev,
      [selectedRoom]: [...(prev[selectedRoom] || []), newMessage]
    }))

    setMessage('')
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, selectedRoom])

  // Filter rooms based on user role
  const getAccessibleRooms = () => {
    return rooms.filter(room => {
      switch (room.type) {
        case 'public': return true
        case 'admin': return ['super_admin', 'admin'].includes(currentUser.role)
        case 'management': return ['super_admin', 'admin', 'manager'].includes(currentUser.role)
        case 'staff': return ['super_admin', 'admin', 'manager', 'staff'].includes(currentUser.role)
        case 'private': return room.members.includes(currentUser.id)
        default: return true
      }
    })
  }

  const selectedRoomData = rooms.find(r => r.id === selectedRoom)
  const currentMessages = messages[selectedRoom] || []

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

      {/* Header */}
      <ModernCard variant="glass" className="p-6" theme={theme}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <MessageCircle className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Buraya iletişim merkezi başlığı gelecek
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Buraya gerçek zamanlı iletişim ve mesajlaşma sistemi açıklaması gelecek
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {connectionStatus === 'connected' ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-sm ${connectionStatus === 'connected' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {connectionStatus === 'connected' ? 'Buraya bağlandı metni gelecek' : 'Buraya bağlantı kesildi metni gelecek'}
              </span>
            </div>

            {/* Settings */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNotifications(!notifications)}
                className={`p-2 rounded-lg transition-colors ${notifications ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}
              >
                <Bell className="h-4 w-4" />
              </button>
              <button
                onClick={() => setSounds(!sounds)}
                className={`p-2 rounded-lg transition-colors ${sounds ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}
              >
                {sounds ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </ModernCard>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-12 gap-6 h-[700px]">
        {/* Rooms Sidebar */}
        <div className="col-span-3">
          <ModernCard variant="glass" className="h-full flex flex-col" theme={theme}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Buraya odalar başlığı gelecek</h3>
                <button className="p-1 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buraya oda ara placeholder metni gelecek..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {getAccessibleRooms()
                .filter(room => room.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`w-full p-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    selectedRoom === room.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getRoomIcon(room.type)}
                    {room.locked && <Lock className="h-3 w-3 text-gray-400" />}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">{room.name}</span>
                      {room.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users className="h-3 w-3" />
                      <span>{room.memberCount}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ModernCard>
        </div>

        {/* Chat Area */}
        <div className="col-span-6">
          <ModernCard variant="glass" className="h-full flex flex-col" theme={theme}>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedRoomData && getRoomIcon(selectedRoomData.type)}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedRoomData?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedRoomData?.memberCount} Buraya üye metni gelecek
                      {selectedRoomData?.description && ` • ${selectedRoomData.description}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Phone className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Video className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <MoreVertical className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                    {msg.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {msg.userName}
                      </span>
                      {getRoleIcon(msg.userRole)}
                      <span className="text-xs text-gray-500">
                        {msg.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.edited && (
                        <span className="text-xs text-gray-400">Buraya düzenlendi metni gelecek</span>
                      )}
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-lg">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Typing Indicator */}
            {isTyping && (
              <div className="px-4 py-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <Circle className="h-2 w-2 animate-bounce" />
                    <Circle className="h-2 w-2 animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <Circle className="h-2 w-2 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span>Buraya birisi yazıyor metni gelecek...</span>
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Paperclip className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        // Handle file upload
                        console.log('File selected:', e.target.files?.[0])
                      }}
                    />
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      setIsTyping(e.target.value.length > 0)
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Buraya mesajınızı yazın placeholder metni gelecek..."
                    rows={2}
                    className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </ModernCard>
        </div>

        {/* Users Sidebar */}
        {showUserList && (
          <div className="col-span-3">
            <ModernCard variant="glass" className="h-full flex flex-col" theme={theme}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Buraya çevrimiçi kullanıcılar başlığı gelecek
                  </h3>
                  <button
                    onClick={() => setShowUserList(false)}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Online Users */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                    <Circle className="h-2 w-2 fill-current" />
                    Buraya çevrimiçi metni gelecek ({users.filter(u => u.online).length})
                  </h4>
                  <div className="space-y-2">
                    {users.filter(u => u.online).map((user) => (
                      <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                            user.status === 'online' ? 'bg-green-500' :
                            user.status === 'away' ? 'bg-yellow-500' :
                            user.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </span>
                            {getRoleIcon(user.role)}
                          </div>
                          <p className={`text-xs ${getRoleColor(user.role)}`}>
                            {user.role === 'super_admin' ? 'Buraya süper admin metni gelecek' :
                             user.role === 'admin' ? 'Buraya admin metni gelecek' :
                             user.role === 'manager' ? 'Buraya müdür metni gelecek' :
                             user.role === 'staff' ? 'Buraya personel metni gelecek' : 'Buraya müşteri metni gelecek'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Offline Users */}
                {users.filter(u => !u.online).length > 0 && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <Circle className="h-2 w-2 fill-current" />
                      Buraya çevrimdışı metni gelecek ({users.filter(u => !u.online).length})
                    </h4>
                    <div className="space-y-2">
                      {users.filter(u => !u.online).map((user) => (
                        <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg opacity-60">
                          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </span>
                              {getRoleIcon(user.role)}
                            </div>
                            <p className="text-xs text-gray-500">
                              {user.lastSeen ? `Buraya son görülme metni gelecek: ${user.lastSeen.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}` : 'Buraya çevrimdışı metni gelecek'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ModernCard>
          </div>
        )}

        {/* Show Users Button when sidebar is hidden */}
        {!showUserList && (
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => setShowUserList(true)}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors"
            >
              <Users className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ==========================================
// PLACEHOLDER COMPONENTS
// ==========================================

// ModuleHeader component placeholder
function ModuleHeader({ modules, activeModule, onModuleChange, theme }: { modules: any[], activeModule: string, onModuleChange: (moduleId: string) => void, theme: string }) {
  return <div className="module-header"></div>
}

// ModernCard component placeholder
function ModernCard({ children, variant, className, theme }: { children: React.ReactNode, variant?: string, className?: string, theme?: string }) {
  return <div className={className}>{children}</div>
} 