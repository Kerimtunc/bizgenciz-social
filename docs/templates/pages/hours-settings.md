'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar, AlertTriangle, Settings } from 'lucide-react';
import BusinessHoursEditor from '@/components/business/BusinessHoursEditor';

export default function HoursSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Clock className="h-6 w-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900">Çalışma Saatleri</h2>
        </div>
        <p className="text-gray-600">
          Haftalık çalışma programı, tatil günleri ve özel saatleri yönetin
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Program</span>
          </TabsTrigger>
          <TabsTrigger value="holidays" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Tatiller</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Ayarlar</span>
          </TabsTrigger>
        </TabsList>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Haftalık Çalışma Programı</CardTitle>
              <CardDescription>
                Günlük açılış-kapanış saatleri ve mola zamanlarını ayarlayın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BusinessHoursEditor />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Holidays Tab */}
        <TabsContent value="holidays" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tatil Günleri</CardTitle>
              <CardDescription>
                Resmi tatiller ve özel kapalı günleri yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Holidays Management Placeholder */}
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tatil Günü Yönetimi
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tatil günlerini eklemek ve yönetmek için bu alan kullanılacak
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>• Tatil günü ekleme</p>
                    <p>• Özel çalışma saatleri</p>
                    <p>• Tatil takvimi görüntüleme</p>
                    <p>• Yıllık tatil planlaması</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Çalışma Saatleri Ayarları</CardTitle>
              <CardDescription>
                Çalışma saatleri ile ilgili genel ayarları yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Time Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Zaman Ayarları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Varsayılan Açılış Saati</label>
                      <input 
                        type="time" 
                        defaultValue="09:00"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Varsayılan Kapanış Saati</label>
                      <input 
                        type="time" 
                        defaultValue="18:00"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mola Süresi (dakika)</label>
                      <input 
                        type="number" 
                        defaultValue="60"
                        min="0"
                        max="480"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Zaman Dilimi</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="Europe/Istanbul" selected>Europe/Istanbul</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="Europe/London">Europe/London</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Display Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Görüntüleme Ayarları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Saat Formatı</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="24" selected>24 Saat</option>
                        <option value="12">12 Saat (AM/PM)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Hafta Başlangıcı</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="monday" selected>Pazartesi</option>
                        <option value="sunday">Pazar</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Bildirim Ayarları</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="schedule-notifications" defaultChecked />
                      <label htmlFor="schedule-notifications" className="text-sm">
                        Çalışma saati değişikliklerinde bildirim gönder
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="holiday-notifications" defaultChecked />
                      <label htmlFor="holiday-notifications" className="text-sm">
                        Tatil günü yaklaştığında hatırlatma gönder
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="auto-schedule" />
                      <label htmlFor="auto-schedule" className="text-sm">
                        Otomatik program kopyalama özelliğini etkinleştir
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 