'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Clock, TrendingUp, Calendar, UserPlus, Edit3, Trash2, 
  CheckCircle, XCircle, Coffee, Moon, Sun, Activity, Award, Phone 
} from 'lucide-react';

/**
 * Staff Management Module - Kurtarılmış UI
 * 
 * Features:
 * - Staff CRUD operations
 * - Attendance tracking
 * - Performance metrics
 * - Shift management
 * - Role assignment
 * - Staff statistics
 */

interface StaffMember {
  id: number;
  name: string;
  email?: string;
  phone: string;
  role: 'chef' | 'waiter' | 'cashier' | 'manager' | 'admin';
  position?: string;
  salary?: number;
  hourly_rate?: number;
  shift_start: string;
  shift_end: string;
  status: 'active' | 'break' | 'offline' | 'vacation' | 'sick' | 'terminated';
  hire_date: string;
  emergency_contact?: string;
  emergency_phone?: string;
  assigned_tables?: number;
  total_orders_served?: number;
  avg_order_value?: number;
  is_working?: boolean;
  current_shift?: any;
}

interface AttendanceRecord {
  id: number;
  staff_id: number;
  check_in: string;
  check_out?: string;
  break_start?: string;
  break_end?: string;
  total_hours?: number;
  overtime_hours?: number;
  status: 'working' | 'on_break' | 'completed';
}

interface StaffStats {
  total_staff: number;
  active_staff: number;
  on_break: number;
  offline: number;
  avg_salary: number;
  checked_in_today: number;
  total_overtime_today: number;
}

const StaffModule: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<StaffStats>({
    total_staff: 0,
    active_staff: 0,
    on_break: 0,
    offline: 0,
    avg_salary: 0,
    checked_in_today: 0,
    total_overtime_today: 0
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  // Form state for add/edit
  const [formData, setFormData] = useState<Partial<StaffMember>>({
    name: '',
    email: '',
    phone: '',
    role: 'waiter',
    position: '',
    salary: 0,
    hourly_rate: 0,
    shift_start: '09:00',
    shift_end: '17:00',
    emergency_contact: '',
    emergency_phone: ''
  });

  // Placeholder functions
  const fetchStaff = async () => {
    // Buraya API çağrısı gelecek
    console.log('Staff data yükleniyor...')
  };

  const fetchAttendance = async () => {
    // Buraya API çağrısı gelecek
    console.log('Attendance data yükleniyor...')
  };

  const checkInStaff = async (staffId: number) => {
    // Buraya API çağrısı gelecek
    console.log('Staff check-in yapılıyor...')
  };

  const checkOutStaff = async (staffId: number) => {
    // Buraya API çağrısı gelecek
    console.log('Staff check-out yapılıyor...')
  };

  const startBreak = async (staffId: number) => {
    // Buraya API çağrısı gelecek
    console.log('Break başlatılıyor...')
  };

  const endBreak = async (staffId: number) => {
    // Buraya API çağrısı gelecek
    console.log('Break bitiriliyor...')
  };

  const addStaff = async () => {
    // Buraya API çağrısı gelecek
    console.log('Staff ekleniyor...')
  };

  const updateStaff = async () => {
    // Buraya API çağrısı gelecek
    console.log('Staff güncelleniyor...')
  };

  const deleteStaff = async (staffId: number) => {
    // Buraya API çağrısı gelecek
    console.log('Staff siliniyor...')
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'waiter',
      position: '',
      salary: 0,
      hourly_rate: 0,
      shift_start: '09:00',
      shift_end: '17:00',
      emergency_contact: '',
      emergency_phone: ''
    });
  };

  // Calculate statistics
  const calculateStats = () => {
    const totalStaff = staff.length;
    const activeStaff = staff.filter(s => s.status === 'active').length;
    const onBreak = staff.filter(s => s.status === 'break').length;
    const offline = staff.filter(s => s.status === 'offline').length;
    const avgSalary = staff.filter(s => s.salary).reduce((acc, s) => acc + (s.salary || 0), 0) / staff.filter(s => s.salary).length || 0;
    const checkedInToday = staff.filter(s => s.is_working).length;

    setStats({
      total_staff: totalStaff,
      active_staff: activeStaff,
      on_break: onBreak,
      offline: offline,
      avg_salary: avgSalary,
      checked_in_today: checkedInToday,
      total_overtime_today: 0
    });
  };

  // Filter staff
  const filteredStaff = staff.filter(member => {
    const roleMatch = selectedRole === 'all' || member.role === selectedRole;
    const statusMatch = selectedStatus === 'all' || member.status === selectedStatus;
    return roleMatch && statusMatch;
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'break': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      case 'vacation': return 'text-blue-600 bg-blue-100';
      case 'sick': return 'text-red-600 bg-red-100';
      case 'terminated': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Get role display name
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'chef': return 'Buraya aşçı metni gelecek';
      case 'waiter': return 'Buraya garson metni gelecek';
      case 'cashier': return 'Buraya kasiyer metni gelecek';
      case 'manager': return 'Buraya müdür metni gelecek';
      case 'admin': return 'Buraya admin metni gelecek';
      default: return role;
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchAttendance();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [staff]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buraya personel yönetimi başlığı gelecek</h1>
            <p className="text-gray-600">Buraya personel bilgileri açıklaması gelecek</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <UserPlus className="h-5 w-5" />
          <span>Buraya personel ekle metni gelecek</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-900">Buraya toplam etiketi gelecek</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total_staff}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900">Buraya aktif etiketi gelecek</p>
              <p className="text-2xl font-bold text-green-900">{stats.active_staff}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <Coffee className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-900">Buraya molada etiketi gelecek</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.on_break}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <Moon className="h-8 w-8 text-gray-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Buraya çevrimdışı etiketi gelecek</p>
              <p className="text-2xl font-bold text-gray-900">{stats.offline}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-900">Buraya ort. maaş etiketi gelecek</p>
              <p className="text-2xl font-bold text-purple-900">₺{Math.round(stats.avg_salary)}</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center">
            <Sun className="h-8 w-8 text-indigo-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-indigo-900">Buraya bugün gelen etiketi gelecek</p>
              <p className="text-2xl font-bold text-indigo-900">{stats.checked_in_today}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-900">Buraya mesai etiketi gelecek</p>
              <p className="text-2xl font-bold text-orange-900">{stats.total_overtime_today}s</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buraya rol etiketi gelecek</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Buraya tümü metni gelecek</option>
              <option value="chef">Buraya aşçı metni gelecek</option>
              <option value="waiter">Buraya garson metni gelecek</option>
              <option value="cashier">Buraya kasiyer metni gelecek</option>
              <option value="manager">Buraya müdür metni gelecek</option>
              <option value="admin">Buraya admin metni gelecek</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buraya durum etiketi gelecek</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Buraya tümü metni gelecek</option>
              <option value="active">Buraya aktif metni gelecek</option>
              <option value="break">Buraya molada metni gelecek</option>
              <option value="offline">Buraya çevrimdışı metni gelecek</option>
              <option value="vacation">Buraya izinli metni gelecek</option>
              <option value="sick">Buraya hasta metni gelecek</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Buraya personel listesi başlığı gelecek</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Buraya personel bilgileri yükleniyor metni gelecek</p>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Buraya gösterilecek personel bulunamadı metni gelecek</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredStaff.map((member) => (
              <div key={member.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600">{getRoleDisplayName(member.role)}</span>
                          {member.position && (
                            <span className="text-sm text-gray-600">• {member.position}</span>
                          )}
                          <span className="text-sm text-gray-600">• {member.phone}</span>
                          {member.assigned_tables && member.assigned_tables > 0 && (
                            <span className="text-sm text-blue-600">{member.assigned_tables} Buraya masa metni gelecek</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            Buraya vardiya etiketi gelecek: {member.shift_start} - {member.shift_end}
                          </span>
                          {member.total_orders_served && (
                            <span className="text-xs text-gray-500">
                              {member.total_orders_served} Buraya sipariş servis etti metni gelecek
                            </span>
                          )}
                          {member.avg_order_value && (
                            <span className="text-xs text-gray-500">
                              Buraya ort. sepet etiketi gelecek: ₺{member.avg_order_value.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status === 'active' ? 'Buraya aktif metni gelecek' :
                       member.status === 'break' ? 'Buraya molada metni gelecek' :
                       member.status === 'offline' ? 'Buraya çevrimdışı metni gelecek' :
                       member.status === 'vacation' ? 'Buraya izinli metni gelecek' :
                       member.status === 'sick' ? 'Buraya hasta metni gelecek' : 'Buraya ayrıldı metni gelecek'}
                    </span>

                    <div className="flex space-x-2">
                      {member.status === 'offline' && (
                        <button
                          onClick={() => checkInStaff(member.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                        >
                          Buraya giriş yap metni gelecek
                        </button>
                      )}

                      {member.status === 'active' && (
                        <>
                          <button
                            onClick={() => startBreak(member.id)}
                            className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700"
                          >
                            Buraya mola ver metni gelecek
                          </button>
                          <button
                            onClick={() => checkOutStaff(member.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                          >
                            Buraya çıkış yap metni gelecek
                          </button>
                        </>
                      )}

                      {member.status === 'break' && (
                        <button
                          onClick={() => endBreak(member.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                        >
                          Buraya molayı bitir metni gelecek
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedStaff(member);
                          setFormData(member);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => deleteStaff(member.id)}
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

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Buraya yeni personel ekle başlığı gelecek</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya ad soyad etiketi gelecek *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya telefon etiketi gelecek *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya e-posta etiketi gelecek</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya rol etiketi gelecek *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="waiter">Buraya garson metni gelecek</option>
                  <option value="chef">Buraya aşçı metni gelecek</option>
                  <option value="cashier">Buraya kasiyer metni gelecek</option>
                  <option value="manager">Buraya müdür metni gelecek</option>
                  <option value="admin">Buraya admin metni gelecek</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya pozisyon etiketi gelecek</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya maaş etiketi gelecek (₺)</label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: parseFloat(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya vardiya başlangıç etiketi gelecek</label>
                <input
                  type="time"
                  value={formData.shift_start}
                  onChange={(e) => setFormData({...formData, shift_start: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya vardiya bitiş etiketi gelecek</label>
                <input
                  type="time"
                  value={formData.shift_end}
                  onChange={(e) => setFormData({...formData, shift_end: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya acil durum kişisi etiketi gelecek</label>
                <input
                  type="text"
                  value={formData.emergency_contact}
                  onChange={(e) => setFormData({...formData, emergency_contact: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya acil durum telefon etiketi gelecek</label>
                <input
                  type="tel"
                  value={formData.emergency_phone}
                  onChange={(e) => setFormData({...formData, emergency_phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
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
                onClick={addStaff}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Buraya ekle metni gelecek
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Buraya personel düzenle başlığı gelecek</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya ad soyad etiketi gelecek *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya telefon etiketi gelecek *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya e-posta etiketi gelecek</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya rol etiketi gelecek *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="waiter">Buraya garson metni gelecek</option>
                  <option value="chef">Buraya aşçı metni gelecek</option>
                  <option value="cashier">Buraya kasiyer metni gelecek</option>
                  <option value="manager">Buraya müdür metni gelecek</option>
                  <option value="admin">Buraya admin metni gelecek</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya pozisyon etiketi gelecek</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya maaş etiketi gelecek (₺)</label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: parseFloat(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya vardiya başlangıç etiketi gelecek</label>
                <input
                  type="time"
                  value={formData.shift_start}
                  onChange={(e) => setFormData({...formData, shift_start: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya vardiya bitiş etiketi gelecek</label>
                <input
                  type="time"
                  value={formData.shift_end}
                  onChange={(e) => setFormData({...formData, shift_end: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya acil durum kişisi etiketi gelecek</label>
                <input
                  type="text"
                  value={formData.emergency_contact}
                  onChange={(e) => setFormData({...formData, emergency_contact: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buraya acil durum telefon etiketi gelecek</label>
                <input
                  type="tel"
                  value={formData.emergency_phone}
                  onChange={(e) => setFormData({...formData, emergency_phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedStaff(null);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Buraya iptal metni gelecek
              </button>
              <button
                onClick={updateStaff}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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

export default StaffModule; 