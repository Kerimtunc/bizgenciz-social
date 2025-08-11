'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Clock, ChefHat, AlertTriangle, CheckCircle2, Timer, Users, Flame, Package, TrendingUp } from 'lucide-react';

/**
 * Kitchen Management Module - Kurtarılmış UI
 * 
 * Features:
 * - Real-time order tracking
 * - Chef assignment
 * - Prep time management
 * - Priority handling
 * - Kitchen statistics
 * - Order status updates
 */

interface KitchenOrder {
  id: number;
  order_id: number;
  order_number: string;
  table_number: string;
  item_name: string;
  quantity: number;
  special_instructions?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
  chef_id?: number;
  chef_name?: string;
  prep_time_minutes?: number;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

interface Chef {
  id: number;
  name: string;
  status: 'active' | 'break' | 'offline';
  current_orders: number;
  avg_prep_time: number;
}

interface KitchenStats {
  pending_orders: number;
  preparing_orders: number;
  ready_orders: number;
  avg_prep_time: number;
  total_chefs: number;
  active_chefs: number;
}

const KitchenModule: React.FC = () => {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [stats, setStats] = useState<KitchenStats>({
    pending_orders: 0,
    preparing_orders: 0,
    ready_orders: 0,
    avg_prep_time: 0,
    total_chefs: 0,
    active_chefs: 0
  });
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  // Placeholder functions for API calls
  const fetchOrders = async () => {
    // Buraya API çağrısı gelecek
    console.log('Siparişler yükleniyor...');
  };

  const fetchChefs = async () => {
    // Buraya API çağrısı gelecek
    console.log('Şefler yükleniyor...');
  };

  const updateOrderStatus = async (orderId: number, status: string, chefId?: number) => {
    // Buraya API çağrısı gelecek
    console.log('Sipariş durumu güncelleniyor...');
  };

  const assignChef = async (orderId: number, chefId: number) => {
    // Buraya API çağrısı gelecek
    console.log('Şef atanıyor...');
  };

  // Calculate statistics
  const calculateStats = () => {
    const pending = orders.filter(o => o.status === 'pending').length;
    const preparing = orders.filter(o => o.status === 'preparing').length;
    const ready = orders.filter(o => o.status === 'ready').length;
    const activeChefs = chefs.filter(c => c.status === 'active').length;
    
    const completedOrders = orders.filter(o => o.completed_at && o.started_at);
    const avgPrepTime = completedOrders.length > 0 
      ? completedOrders.reduce((acc, order) => {
          const start = new Date(order.started_at!).getTime();
          const end = new Date(order.completed_at!).getTime();
          return acc + (end - start) / (1000 * 60); // minutes
        }, 0) / completedOrders.length
      : 0;

    setStats({
      pending_orders: pending,
      preparing_orders: preparing,
      ready_orders: ready,
      avg_prep_time: Math.round(avgPrepTime),
      total_chefs: chefs.length,
      active_chefs: activeChefs
    });
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const statusMatch = selectedStatus === 'all' || order.status === selectedStatus;
    const priorityMatch = selectedPriority === 'all' || order.priority === selectedPriority;
    return statusMatch && priorityMatch;
  });

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'preparing': return 'text-blue-600 bg-blue-100';
      case 'ready': return 'text-green-600 bg-green-100';
      case 'served': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Get time since order
  const getTimeSince = (createdAt: string) => {
    const now = new Date().getTime();
    const created = new Date(createdAt).getTime();
    const diff = Math.floor((now - created) / (1000 * 60)); // minutes
    
    if (diff < 60) return `${diff}dk`;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}s ${minutes}dk`;
  };

  useEffect(() => {
    fetchOrders();
    fetchChefs();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [orders, chefs]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ChefHat className="h-8 w-8 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buraya mutfak yönetimi başlığı gelecek</h1>
            <p className="text-gray-600">Buraya mutfak yönetimi açıklaması gelecek</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">
            Buraya son güncelleme zamanı gelecek
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <Timer className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-900">Buraya bekleyen başlığı gelecek</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.pending_orders}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Flame className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-900">Buraya hazırlanıyor başlığı gelecek</p>
              <p className="text-2xl font-bold text-blue-900">{stats.preparing_orders}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900">Buraya hazır başlığı gelecek</p>
              <p className="text-2xl font-bold text-green-900">{stats.ready_orders}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-900">Buraya ortalama süre başlığı gelecek</p>
              <p className="text-2xl font-bold text-purple-900">{stats.avg_prep_time}dk</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-indigo-900">Buraya aktif şef başlığı gelecek</p>
              <p className="text-2xl font-bold text-indigo-900">{stats.active_chefs}/{stats.total_chefs}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-900">Buraya acil başlığı gelecek</p>
              <p className="text-2xl font-bold text-red-900">
                {orders.filter(o => o.priority === 'urgent' && o.status !== 'served').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buraya durum etiketi gelecek</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Buraya tümü seçeneği gelecek</option>
              <option value="pending">Buraya bekleyen seçeneği gelecek</option>
              <option value="preparing">Buraya hazırlanıyor seçeneği gelecek</option>
              <option value="ready">Buraya hazır seçeneği gelecek</option>
              <option value="served">Buraya servis edildi seçeneği gelecek</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buraya öncelik etiketi gelecek</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Buraya tümü seçeneği gelecek</option>
              <option value="urgent">Buraya acil seçeneği gelecek</option>
              <option value="high">Buraya yüksek seçeneği gelecek</option>
              <option value="medium">Buraya orta seçeneği gelecek</option>
              <option value="low">Buraya düşük seçeneği gelecek</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chef Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Buraya şef durumu başlığı gelecek</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {chefs.map((chef) => (
            <div key={chef.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{chef.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      chef.status === 'active' ? 'bg-green-100 text-green-800' :
                      chef.status === 'break' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {chef.status === 'active' ? 'Buraya aktif metni gelecek' : chef.status === 'break' ? 'Buraya mola metni gelecek' : 'Buraya çevrimdışı metni gelecek'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{chef.current_orders} Buraya sipariş metni gelecek</p>
                  <p className="text-xs text-gray-500">{chef.avg_prep_time}dk Buraya ortalama metni gelecek</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Buraya aktif siparişler başlığı gelecek</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Buraya yükleme metni gelecek</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Buraya boş durum metni gelecek</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{order.item_name}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600">
                            {order.order_number} • {order.table_number}
                          </span>
                          <span className="text-sm text-gray-600">Buraya adet metni gelecek: {order.quantity}</span>
                          <span className="text-sm text-gray-500">{getTimeSince(order.created_at)} Buraya önce metni gelecek</span>
                        </div>
                        {order.special_instructions && (
                          <p className="text-sm text-orange-600 mt-1">
                            Buraya özel not metni gelecek: {order.special_instructions}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                      {order.priority === 'urgent' ? 'Buraya acil metni gelecek' :
                       order.priority === 'high' ? 'Buraya yüksek metni gelecek' :
                       order.priority === 'medium' ? 'Buraya orta metni gelecek' : 'Buraya düşük metni gelecek'}
                    </span>

                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status === 'pending' ? 'Buraya bekleyen metni gelecek' :
                       order.status === 'preparing' ? 'Buraya hazırlanıyor metni gelecek' :
                       order.status === 'ready' ? 'Buraya hazır metni gelecek' :
                       order.status === 'served' ? 'Buraya servis edildi metni gelecek' : 'Buraya iptal metni gelecek'}
                    </span>

                    {order.chef_name && (
                      <span className="text-sm text-gray-600">{order.chef_name}</span>
                    )}

                    <div className="flex space-x-2">
                      {order.status === 'pending' && (
                        <select
                          onChange={(e) => e.target.value && assignChef(order.id, parseInt(e.target.value))}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                          defaultValue=""
                        >
                          <option value="">Buraya şef ata metni gelecek</option>
                          {chefs.filter(c => c.status === 'active').map(chef => (
                            <option key={chef.id} value={chef.id}>{chef.name}</option>
                          ))}
                        </select>
                      )}

                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                        >
                          Buraya hazır butonu metni gelecek
                        </button>
                      )}

                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'served')}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                        >
                          Buraya servis et butonu metni gelecek
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenModule; 