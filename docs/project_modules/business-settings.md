'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Palette, Globe, Share2 } from 'lucide-react';
import BusinessProfileEditor from '@/components/business/BusinessProfileEditor';
import SocialMediaManager from '@/components/business/SocialMediaManager';

export default function BusinessSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">İşletme Ayarları</h2>
        </div>
        <p className="text-gray-600">
          İşletme profil bilgileri, tema ayarları ve sosyal medya hesaplarını yönetin
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Tema</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center space-x-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Sosyal Medya</span>
          </TabsTrigger>
          <TabsTrigger value="localization" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Lokalizasyon</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>İşletme Profili</CardTitle>
              <CardDescription>
                İşletme adı, açıklama, iletişim bilgileri ve adres bilgilerini düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BusinessProfileEditor />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme Tab */}
        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tema Ayarları</CardTitle>
              <CardDescription>
                Renk paleti, font ailesi ve görsel kimlik ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Color Palette */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Renk Paleti</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ana Renk</label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                        <input 
                          type="color" 
                          defaultValue="#2563eb"
                          className="w-12 h-8 border rounded cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">İkincil Renk</label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-600 rounded border"></div>
                        <input 
                          type="color" 
                          defaultValue="#4b5563"
                          className="w-12 h-8 border rounded cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Vurgu Rengi</label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-600 rounded border"></div>
                        <input 
                          type="color" 
                          defaultValue="#16a34a"
                          className="w-12 h-8 border rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Font Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Font Ayarları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Font Ailesi</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="inter">Inter</option>
                        <option value="roboto">Roboto</option>
                        <option value="open-sans">Open Sans</option>
                        <option value="poppins">Poppins</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Font Boyutu</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="small">Küçük</option>
                        <option value="medium" selected>Orta</option>
                        <option value="large">Büyük</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sosyal Medya Hesapları</CardTitle>
              <CardDescription>
                Sosyal medya hesaplarınızı ekleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SocialMediaManager />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Localization Tab */}
        <TabsContent value="localization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lokalizasyon Ayarları</CardTitle>
              <CardDescription>
                Dil, para birimi, zaman dilimi ve tarih formatı ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Language */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Dil</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="tr" selected>Türkçe</option>
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  {/* Currency */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Para Birimi</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="TRY" selected>TRY - Türk Lirası</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>

                  {/* Timezone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Zaman Dilimi</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="Europe/Istanbul" selected>Europe/Istanbul</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Europe/London">Europe/London</option>
                    </select>
                  </div>

                  {/* Date Format */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tarih Formatı</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="DD/MM/YYYY" selected>DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
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