'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Shield, UserPlus, Settings } from 'lucide-react';
import UserRoleManager from '@/components/users/UserRoleManager';

export default function UsersSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h2>
        </div>
        <p className="text-gray-600">
          Kullanıcı rolleri, izinler ve kullanıcı hesaplarını yönetin
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Roller</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Kullanıcılar</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">İzinler</span>
          </TabsTrigger>
        </TabsList>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kullanıcı Rolleri</CardTitle>
              <CardDescription>
                Sistem içindeki kullanıcı rollerini oluşturun, düzenleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserRoleManager />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kullanıcı Hesapları</CardTitle>
              <CardDescription>
                Sistem kullanıcılarını görüntüleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* User List Placeholder */}
                <div className="text-center py-12">
                  <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Kullanıcı Yönetimi
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Kullanıcı hesaplarını görüntülemek ve yönetmek için bu alan kullanılacak
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>• Kullanıcı listesi görüntüleme</p>
                    <p>• Yeni kullanıcı ekleme</p>
                    <p>• Kullanıcı bilgilerini düzenleme</p>
                    <p>• Kullanıcı durumu yönetimi</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>İzin Matrisi</CardTitle>
              <CardDescription>
                Rol bazlı izinleri görüntüleyin ve yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Permissions Matrix Placeholder */}
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    İzin Matrisi
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Rol bazlı izinleri görüntülemek ve yapılandırmak için bu alan kullanılacak
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>• Modül bazlı izin kontrolü</p>
                    <p>• Aksiyon bazlı izin yönetimi</p>
                    <p>• Rol-izin eşleştirme</p>
                    <p>• İzin hiyerarşisi</p>
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