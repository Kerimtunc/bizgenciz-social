'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Users, MapPin, Phone, Mail, Plus, Edit3, 
  Trash2, CheckCircle, XCircle, AlertTriangle, Search, Filter,
  User, CalendarDays, Timer, TrendingUp, Star, Bell
} from 'lucide-react';

/**
 * ReservationModule Component - Kurtarılmış UI
 * 
 * @description Complete reservation management system with calendar view, table assignment, and customer management
 * @location Original: panel/page.tsx renderMainContent() - case "reservations" (placeholder)
 * @usage Panel dashboard reservation management section
 * 
 * @features
 * - Reservation calendar view
 * - Table assignment
 * - Customer management
 * - Waitlist handling
 * - Reservation statistics
 * - Check-in system
 * - Real-time availability
 * - Priority management
 * - Special requests handling
 */

interface Reservation {
  id: number;
  reservation_number: string;
  table_id?: number;
  table_number?: string;
  table_location?: string;
  customer_id?: number;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  duration: number;
  status: 'confirmed' | 'waitlist' | 'seated' | 'no_show' | 'cancelled' | 'completed';
  special_requests?: string;
  staff_id?: number;
  staff_name?: string;
  source: 'manual' | 'online' | 'phone' | 'app';
  priority: 'low' | 'medium' | 'high';
  waitlist_position?: number;
  created_at: string;
  total_visits?: number;
}

interface TimeSlot {
  time: string;
  table_id?: number;
  table_number?: string;
  capacity?: number;
  location?: string;
}

interface ReservationStats {
  total_reservations: number;
  confirmed: number;
  completed: number;
  no_shows: number;
  cancelled: number;
  waitlisted: number;
  avg_party_size: number;
  today_total: number;
  today_confirmed: number;
  today_seated: number;
  imminent: number;
}

const ReservationModule: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [stats, setStats] = useState<ReservationStats>({
    total_reservations: 0,
    confirmed: 0,
    completed: 0,
    no_shows: 0,
    cancelled: 0,
    waitlisted: 0,
    avg_party_size: 0,
    today_total: 0,
    today_confirmed: 0,
    today_seated: 0,
    imminent: 0
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);

  // Form state for add/edit
  const [formData, setFormData] = useState<Partial<Reservation>>({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    reservation_date: new Date().toISOString().split('T')[0],
    reservation_time: '19:00',
    party_size: 2,
    duration: 120,
    special_requests: '',
    source: 'manual',
    priority: 'medium'
  });

  // Placeholder functions
  const fetchReservations = async () => {
    // Buraya API çağrısı gelecek
    console.log('Reservations yükleniyor...')
  };

  const fetchAvailableSlots = async (date: string, partySize: number = 2) => {
    // Buraya API çağrısı gelecek
    console.log('Available slots yükleniyor...')
  };

  const createReservation = async () => {
    // Buraya API çağrısı gelecek
    console.log('Reservation oluşturuluyor...')
  };

  const updateReservation = async () => {
    // Buraya API çağrısı gelecek
    console.log('Reservation güncelleniyor...')
  };

  const updateReservationStatus = async (reservationId: number, status: string) => {
    // Buraya API çağrısı gelecek
    console.log('Reservation status güncelleniyor...')
  };

  const checkInReservation = async (reservationId: number) => {
    // Buraya API çağrısı gelecek
    console.log('Check-in yapılıyor...')
  };

  const deleteReservation = async (reservationId: number) => {
    // Buraya API çağrısı gelecek
    console.log('Reservation siliniyor...')
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      customer_name: '',
      customer_phone: '',
      customer_email: '',
      reservation_date: new Date().toISOString().split('T')[0],
      reservation_time: '19:00',
      party_size: 2,
      duration: 120,
      special_requests: '',
      source: 'manual',
      priority: 'medium'
    });
  };

  // Calculate statistics
  const calculateStats = () => {
    // Buraya istatistik hesaplama gelecek
    console.log('Stats hesaplanıyor...')
  };

  // Filter reservations
  const filteredReservations = reservations.filter(reservation => {
    const statusMatch = selectedStatus === 'all' || reservation.status === selectedStatus;
    const searchMatch = searchTerm === '' || 
      reservation.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customer_phone?.includes(searchTerm) ||
      reservation.reservation_number.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'waitlist': return 'text-yellow-600 bg-yellow-100';
      case 'seated': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'no_show': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Get time until reservation
  const getTimeUntilReservation = (date: string, time: string) => {
    const reservationDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = reservationDateTime.getTime() - now.getTime();
    
    if (diff < 0) return 'Buraya geçmiş metni gelecek';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) return `${minutes} Buraya dakika sonra metni gelecek`;
    if (hours < 24) return `${hours} Buraya saat metni gelecek ${minutes} Buraya dakika sonra metni gelecek`;
    
    const days = Math.floor(hours / 24);
    return `${days} Buraya gün sonra metni gelecek`;
  };

  useEffect(() => {
    fetchReservations();
    fetchAvailableSlots(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    calculateStats();
  }, [reservations]);

  useEffect(() => {
    if (formData.reservation_date && formData.party_size) {
      fetchAvailableSlots(formData.reservation_date, formData.party_size);
    }
  }, [formData.reservation_date, formData.party_size]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buraya rezervasyon yönetimi başlığı gelecek</h1>
            <p className="text-gray-600">Buraya rezervasyon takibi açıklaması gelecek</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Buraya rezervasyon ekle butonu metni gelecek</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-900">Buraya toplam etiketi gelecek</p>
              <p className="text-2xl font-bold text-purple-900">{stats.total_reservations}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900">Buraya onaylı etiketi gelecek</p>
              <p className="text-2xl font-bold text-green-900">{stats.confirmed}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-900">Buraya beklemde etiketi gelecek</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.waitlisted}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-900">Buraya ort kişi etiketi gelecek</p>
              <p className="text-2xl font-bold text-blue-900">{stats.avg_party_size}</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center">
            <CalendarDays className="h-8 w-8 text-indigo-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-indigo-900">Buraya bugün etiketi gelecek</p>
              <p className="text-2xl font-bold text-indigo-900">{stats.today_total}</p>
            </div>
          </div>
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <div className="flex items-center">
            <Timer className="h-8 w-8 text-teal-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-teal-900">Buraya oturan etiketi gelecek</p>
              <p className="text-2xl font-bold text-teal-900">{stats.today_seated}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-900">Buraya gelmedi etiketi gelecek</p>
              <p className="text-2xl font-bold text-red-900">{stats.no_shows}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <Bell className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-900">Buraya yakın etiketi gelecek</p>
              <p className="text-2xl font-bold text-orange-900">{stats.imminent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buraya tarih etiketi gelecek</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buraya durum etiketi gelecek</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">Buraya tümü etiketi gelecek</option>
              <option value="confirmed">Buraya onaylı etiketi gelecek</option>
              <option value="waitlist">Buraya beklemede etiketi gelecek</option>
              <option value="seated">Buraya oturan etiketi gelecek</option>
              <option value="completed">Buraya tamamlandı etiketi gelecek</option>
              <option value="no_show">Buraya gelmedi etiketi gelecek</option>
              <option value="cancelled">Buraya iptal etiketi gelecek</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buraya arama etiketi gelecek</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buraya arama placeholder metni gelecek"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reservations List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Buraya rezervasyonlar başlığı gelecek ({filteredReservations.length})
          </h3>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Buraya rezervasyonlar yükleniyor metni gelecek</p>
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Buraya rezervasyon bulunamadı metni gelecek</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {reservation.customer_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{reservation.customer_name}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600">
                            {reservation.reservation_number}
                          </span>
                          <span className="text-sm text-gray-600">
                            {reservation.reservation_time} • {reservation.party_size} Buraya kişi etiketi gelecek
                          </span>
                          {reservation.table_number && (
                            <span className="text-sm text-blue-600">
                              {reservation.table_number} ({reservation.table_location})
                            </span>
                          )}
                          {reservation.total_visits && reservation.total_visits > 1 && (
                            <span className="text-sm text-purple-600 flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              {reservation.total_visits} Buraya ziyaret etiketi gelecek
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          {reservation.customer_phone && (
                            <span className="text-xs text-gray-500 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {reservation.customer_phone}
                            </span>
                          )}
                          {reservation.customer_email && (
                            <span className="text-xs text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {reservation.customer_email}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {getTimeUntilReservation(reservation.reservation_date, reservation.reservation_time)}
                          </span>
                        </div>
                        {reservation.special_requests && (
                          <p className="text-sm text-orange-600 mt-1">
                            Buraya özel istek etiketi gelecek: {reservation.special_requests}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                      {reservation.status === 'confirmed' ? 'Buraya onaylı metni gelecek' :
                       reservation.status === 'waitlist' ? 'Buraya beklemede metni gelecek' :
                       reservation.status === 'seated' ? 'Buraya oturan metni gelecek' :
                       reservation.status === 'completed' ? 'Buraya tamamlandı metni gelecek' :
                       reservation.status === 'no_show' ? 'Buraya gelmedi metni gelecek' : 'Buraya iptal metni gelecek'}
                    </span>

                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(reservation.priority)}`}>
                      {reservation.priority === 'high' ? 'Buraya yüksek metni gelecek' :
                       reservation.priority === 'medium' ? 'Buraya orta metni gelecek' : 'Buraya düşük metni gelecek'}
                    </span>

                    {reservation.waitlist_position && (
                      <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                        Buraya sıra etiketi gelecek: {reservation.waitlist_position}
                      </span>
                    )}

                    <div className="flex space-x-2">
                      {reservation.status === 'confirmed' && (
                        <button
                          onClick={() => checkInReservation(reservation.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                        >
                          Buraya check-in metni gelecek
                        </button>
                      )}

                      {reservation.status === 'waitlist' && (
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                        >
                          Buraya onayla metni gelecek
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedReservation(reservation);
                          setFormData(reservation);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => deleteReservation(reservation.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Reservation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Buraya yeni rezervasyon başlığı gelecek</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya müşteri adı etiketi gelecek *</label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya telefon etiketi gelecek</label>
                <input
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya e-posta etiketi gelecek</label>
                <input
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya kişi sayısı etiketi gelecek *</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.party_size}
                  onChange={(e) => setFormData({...formData, party_size: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya tarih etiketi gelecek *</label>
                <input
                  type="date"
                  value={formData.reservation_date}
                  onChange={(e) => setFormData({...formData, reservation_date: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya saat etiketi gelecek *</label>
                <select
                  value={formData.reservation_time}
                  onChange={(e) => setFormData({...formData, reservation_time: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {availableSlots.map((slot) => (
                    <option key={`${slot.time}-${slot.table_id}`} value={slot.time}>
                      {slot.time} - {slot.table_number} ({slot.capacity} Buraya kişi etiketi gelecek, {slot.location})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya süre dakika etiketi gelecek</label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  step="30"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya öncelik etiketi gelecek</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="low">Buraya düşük metni gelecek</option>
                  <option value="medium">Buraya orta metni gelecek</option>
                  <option value="high">Buraya yüksek metni gelecek</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya özel istekler etiketi gelecek</label>
                <textarea
                  value={formData.special_requests}
                  onChange={(e) => setFormData({...formData, special_requests: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Buraya özel istekler placeholder metni gelecek"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Buraya iptal metni gelecek
              </button>
              <button
                onClick={createReservation}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Buraya rezervasyon oluştur metni gelecek
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Reservation Modal */}
      {showEditModal && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Buraya rezervasyon düzenle başlığı gelecek</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya müşteri adı etiketi gelecek *</label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya telefon etiketi gelecek</label>
                <input
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya e-posta etiketi gelecek</label>
                <input
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya kişi sayısı etiketi gelecek *</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.party_size}
                  onChange={(e) => setFormData({...formData, party_size: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya tarih etiketi gelecek *</label>
                <input
                  type="date"
                  value={formData.reservation_date}
                  onChange={(e) => setFormData({...formData, reservation_date: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya saat etiketi gelecek *</label>
                <input
                  type="time"
                  value={formData.reservation_time}
                  onChange={(e) => setFormData({...formData, reservation_time: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya süre dakika etiketi gelecek</label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  step="30"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya durum etiketi gelecek</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="confirmed">Buraya onaylı metni gelecek</option>
                  <option value="waitlist">Buraya beklemede metni gelecek</option>
                  <option value="seated">Buraya oturan metni gelecek</option>
                  <option value="completed">Buraya tamamlandı metni gelecek</option>
                  <option value="no_show">Buraya gelmedi metni gelecek</option>
                  <option value="cancelled">Buraya iptal metni gelecek</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya özel istekler etiketi gelecek</label>
                <textarea
                  value={formData.special_requests}
                  onChange={(e) => setFormData({...formData, special_requests: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Buraya özel istekler placeholder metni gelecek"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedReservation(null);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Buraya iptal metni gelecek
              </button>
              <button
                onClick={updateReservation}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Buraya güncelle metni gelecek
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationModule; 