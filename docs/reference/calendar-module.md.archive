// ==========================================
// CALENDAR MODULE COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/modules/CalendarModule.tsx
// Satır Sayısı: 627 satır

'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, CalendarDays, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight, X, Trash2, Bell, Repeat } from 'lucide-react'
import ModuleHeader from "@/components/common/ModuleHeader"
import { ModernCard } from '../components/ModernCard'

interface CalendarModuleProps {
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

export const CalendarModule: React.FC<CalendarModuleProps> = ({
  modules,
  activeModule,
  onModuleChange,
  theme
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'day'>('month')
  const [showEventModal, setShowEventModal] = useState(false)
  const [events, setEvents] = useState<any[]>([])
  const [notes, setNotes] = useState<{[key: string]: string}>({})
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    type: 'reservation',
    location: '',
    reminder: false,
    repeat: 'none'
  })

  // Event types with colors
  const eventTypes = [
    { id: 'reservation', label: 'Buraya rezervasyon metni gelecek', color: 'bg-blue-500' },
    { id: 'event', label: 'Buraya etkinlik metni gelecek', color: 'bg-green-500' },
    { id: 'meeting', label: 'Buraya toplantı metni gelecek', color: 'bg-purple-500' },
    { id: 'training', label: 'Buraya eğitim metni gelecek', color: 'bg-orange-500' },
    { id: 'maintenance', label: 'Buraya bakım metni gelecek', color: 'bg-red-500' },
    { id: 'holiday', label: 'Buraya tatil metni gelecek', color: 'bg-yellow-500' }
  ]

  // Sample events data
  useEffect(() => {
    const sampleEvents = [
      {
        id: '1',
        title: 'Buraya doğum günü rezervasyonu metni gelecek',
        description: 'Buraya ahmet bey 8 kişilik masa açıklaması gelecek',
        date: '2024-01-15',
        startTime: '19:00',
        endTime: '22:00',
        type: 'reservation',
        location: 'Buraya salon a metni gelecek',
        reminder: true,
        repeat: 'none'
      },
      {
        id: '2',
        title: 'Buraya personel toplantısı metni gelecek',
        description: 'Buraya aylık değerlendirme toplantısı açıklaması gelecek',
        date: '2024-01-20',
        startTime: '10:00',
        endTime: '11:30',
        type: 'meeting',
        location: 'Buraya ofis metni gelecek',
        reminder: true,
        repeat: 'monthly'
      },
      {
        id: '3',
        title: 'Buraya canlı müzik gecesi metni gelecek',
        description: 'Buraya akustik performans açıklaması gelecek',
        date: '2024-01-25',
        startTime: '21:00',
        endTime: '23:30',
        type: 'event',
        location: 'Buraya ana salon metni gelecek',
        reminder: false,
        repeat: 'weekly'
      }
    ]
    setEvents(sampleEvents)
  }, [])

  // Utility functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date)
  }

  const getEventsForTimeSlot = (date: string, timeSlot: string) => {
    return events.filter(event => {
      return event.date === date && 
             event.startTime <= timeSlot && 
             event.endTime > timeSlot
    })
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const formatDateTurkish = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const navigateDay = (direction: 'prev' | 'next') => {
    if (!selectedDate) return
    
    const newDate = new Date(selectedDate)
    if (direction === 'prev') {
      newDate.setDate(selectedDate.getDate() - 1)
    } else {
      newDate.setDate(selectedDate.getDate() + 1)
    }
    setSelectedDate(newDate)
  }

  // Event handlers
  const handleAddEvent = () => {
    if (!newEvent.title || !selectedDate) return

    const event = {
      id: Date.now().toString(),
      ...newEvent,
      date: formatDate(selectedDate)
    }

    setEvents(prev => [...prev, event])
    setNewEvent({
      title: '',
      description: '',
      date: '',
      startTime: '09:00',
      endTime: '10:00',
      type: 'reservation',
      location: '',
      reminder: false,
      repeat: 'none'
    })
    setShowEventModal(false)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
  }

  const handleSaveNote = (date: string, note: string) => {
    setNotes(prev => ({ ...prev, [date]: note }))
  }

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border-r border-b border-gray-200 dark:border-gray-700"></div>
      )
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dateString = formatDate(date)
      const dayEvents = getEventsForDate(dateString)
      const isToday = dateString === formatDate(new Date())
      const isSelected = selectedDate && dateString === formatDate(selectedDate)

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-24 border-r border-b border-gray-200 dark:border-gray-700 p-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
            isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          } ${isSelected ? 'bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-500' : ''}`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {dayEvents.slice(0, 2).map((event) => {
              const eventType = eventTypes.find(type => type.id === event.type)
              return (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded text-white truncate ${eventType?.color || 'bg-gray-500'}`}
                  title={event.title}
                >
                  {event.title}
                </div>
              )
            })}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} Buraya daha metni gelecek</div>
            )}
          </div>
        </div>
      )
    }

    return days
  }

  const renderDayView = () => {
    if (!selectedDate) return null

    const dateString = formatDate(selectedDate)
    const dayEvents = getEventsForDate(dateString)
    const timeSlots = []

    // Generate time slots from 08:00 to 23:00
    for (let hour = 8; hour <= 23; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`
      const slotEvents = getEventsForTimeSlot(dateString, timeSlot)
      
      timeSlots.push(
        <div key={timeSlot} className="flex border-b border-gray-200 dark:border-gray-700">
          <div className="w-20 p-3 text-sm font-medium text-gray-500 border-r border-gray-200 dark:border-gray-700">
            {timeSlot}
          </div>
          <div className="flex-1 p-3 min-h-[60px]">
            {slotEvents.map((event) => {
              const eventType = eventTypes.find(type => type.id === event.type)
              return (
                <div
                  key={event.id}
                  className={`p-2 rounded-lg border-l-4 ${eventType?.color || 'border-gray-500'} bg-gray-50 dark:bg-gray-800 mb-2`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteEvent(event.id)
                      }}
                      className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <ModernCard variant="glass" className="p-6" theme={theme}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{formatDateTurkish(selectedDate)}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => navigateDay('prev')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigateDay('next')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {timeSlots}
        </div>

        {/* Day Events Summary */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Buraya günün etkinlikleri başlığı gelecek</h3>
          <div className="space-y-3">
            {dayEvents.length > 0 ? (
              dayEvents.map((event) => {
                const eventType = eventTypes.find(type => type.id === event.type)
                return (
                  <div
                    key={event.id}
                    className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${eventType?.color || 'border-gray-500'} bg-gray-50 dark:bg-gray-800`}
                  >
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.description && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {event.description}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteEvent(event.id)
                      }}
                      className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )
              })
            ) : (
              <div className="text-gray-400 text-sm">
                Buraya etkinlik eklemek için tıklayın metni gelecek
              </div>
            )}
          </div>
        </div>
      </ModernCard>
    )
  }

  const renderEventModal = () => {
    if (!showEventModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Buraya yeni etkinlik başlığı gelecek</h3>
            <button
              onClick={() => setShowEventModal(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Buraya başlık etiketi gelecek</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Buraya etkinlik başlığı placeholder metni gelecek"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Buraya açıklama etiketi gelecek</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                rows={3}
                placeholder="Buraya etkinlik açıklaması placeholder metni gelecek"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Buraya başlangıç etiketi gelecek</label>
                <input
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Buraya bitiş etiketi gelecek</label>
                <input
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Buraya tür etiketi gelecek</label>
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {eventTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Buraya konum etiketi gelecek</label>
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Buraya etkinlik konumu placeholder metni gelecek"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newEvent.reminder}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, reminder: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm">Buraya hatırlatıcı metni gelecek</span>
              </label>

              <select
                value={newEvent.repeat}
                onChange={(e) => setNewEvent(prev => ({ ...prev, repeat: e.target.value }))}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              >
                <option value="none">Buraya tekrar yok metni gelecek</option>
                <option value="daily">Buraya günlük metni gelecek</option>
                <option value="weekly">Buraya haftalık metni gelecek</option>
                <option value="monthly">Buraya aylık metni gelecek</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAddEvent}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Buraya kaydet buton metni gelecek
              </button>
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                Buraya iptal buton metni gelecek
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <ModuleHeader 
          modules={modules} 
          activeModule={activeModule} 
          onModuleChange={onModuleChange}
          theme={theme}
        />
      </div>

      {/* Calendar Header */}
      <ModernCard variant="glass" className="p-6" theme={theme}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <CalendarDays className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Buraya akıllı takvim başlığı gelecek
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Buraya rezervasyonlar etkinlikler ve günlük notlarınızı yönetin açıklaması gelecek
            </p>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {['month', 'day'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {mode === 'month' ? 'Buraya ay görünümü metni gelecek' : 'Buraya gün görünümü metni gelecek'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Buraya bugün buton metni gelecek
            </button>
            
            <button
              onClick={() => setShowEventModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              <Plus className="h-4 w-4" />
              Buraya etkinlik ekle buton metni gelecek
            </button>
          </div>
        </div>

        {viewMode === 'month' && (
          <>
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString('tr-TR', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </h2>
              
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {/* Header Days */}
              {['Buraya paz metni gelecek', 'Buraya pzt metni gelecek', 'Buraya sal metni gelecek', 'Buraya çar metni gelecek', 'Buraya per metni gelecek', 'Buraya cum metni gelecek', 'Buraya cmt metni gelecek'].map((day) => (
                <div
                  key={day}
                  className="h-10 bg-gray-50 dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 flex items-center justify-center font-medium text-sm"
                >
                  {day}
                </div>
              ))}
              
              {/* Calendar Days */}
              {renderMonthView()}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4">
              {eventTypes.map((type) => (
                <div key={type.id} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                  <span className="text-sm">{type.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </ModernCard>

      {/* Day View */}
      {viewMode === 'day' && selectedDate && (
        <div>
          {renderDayView()}
        </div>
      )}

      {/* Event Modal */}
      {renderEventModal()}
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