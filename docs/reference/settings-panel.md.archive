// ==========================================
// SETTINGS PANELİ (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/settings/layout.tsx
// Satır Sayısı: 243 satır

'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Users, 
  Clock, 
  Shield, 
  Globe,
  Settings,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Settings Menu Items
const settingsMenuItems = [
  {
    id: 'business',
    title: 'Buraya işletme ayarları başlığı gelecek',
    description: 'Buraya profil logo ve temel bilgiler açıklaması gelecek',
    icon: Building2,
    href: '/settings/business',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'users',
    title: 'Buraya kullanıcı yönetimi başlığı gelecek',
    description: 'Buraya roller izinler ve kullanıcılar açıklaması gelecek',
    icon: Users,
    href: '/settings/users',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'hours',
    title: 'Buraya çalışma saatleri başlığı gelecek',
    description: 'Buraya program ve tatil günleri açıklaması gelecek',
    icon: Clock,
    href: '/settings/hours',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 'permissions',
    title: 'Buraya izin yönetimi başlığı gelecek',
    description: 'Buraya rol ve izin matrisi açıklaması gelecek',
    icon: Shield,
    href: '/settings/permissions',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    id: 'tenant',
    title: 'Buraya tenant ayarları başlığı gelecek',
    description: 'Buraya multi-tenant yapılandırma açıklaması gelecek',
    icon: Globe,
    href: '/settings/tenant',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  }
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  // Check if we're on a specific settings page
  const isSpecificPage = pathname !== '/settings';

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-gray-600" />
          <h1 className="text-3xl font-bold text-gray-900">Buraya ayarlar başlığı gelecek</h1>
        </div>
        <p className="text-gray-600">
          Buraya işletme yönetimi ve sistem yapılandırması açıklaması gelecek
        </p>
      </div>

      {/* Breadcrumb */}
      {isSpecificPage && (
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/settings" className="hover:text-gray-700">
            Buraya ayarlar breadcrumb metni gelecek
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">
            {settingsMenuItems.find(item => pathname?.startsWith(item.href))?.title || 'Buraya sayfa metni gelecek'}
          </span>
        </nav>
      )}

      {/* Content */}
      {isSpecificPage ? (
        // Specific settings page
        <div className="space-y-6">
          {children}
        </div>
      ) : (
        // Settings overview page
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Buraya toplam kullanıcı başlığı gelecek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Buraya kullanıcı sayısı gelecek</div>
                <p className="text-xs text-gray-500">Buraya değişim metni gelecek</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Buraya aktif roller başlığı gelecek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Buraya rol sayısı gelecek</div>
                <p className="text-xs text-gray-500">Buraya rol detayları gelecek</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Buraya çalışma günleri başlığı gelecek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Buraya gün sayısı gelecek</div>
                <p className="text-xs text-gray-500">Buraya gün aralığı gelecek</p>
              </CardContent>
            </Card>
          </div>

          {/* Settings Menu */}
          <Card>
            <CardHeader>
              <CardTitle>Buraya sistem ayarları başlığı gelecek</CardTitle>
              <CardDescription>
                Buraya işletme yönetimi ve sistem yapılandırması için gerekli ayarlar açıklaması gelecek
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {settingsMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link key={item.id} href={item.href}>
                      <Card className={`hover:shadow-md transition-shadow cursor-pointer border-2 ${
                        isActive ? 'border-blue-500 bg-blue-50' : item.borderColor
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                              <Icon className={`h-5 w-5 ${item.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {item.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <Badge variant={isActive ? "default" : "secondary"}>
                                  {isActive ? 'Buraya aktif etiketi gelecek' : 'Buraya yapılandır etiketi gelecek'}
                                </Badge>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Buraya son aktiviteler başlığı gelecek</CardTitle>
              <CardDescription>
                Buraya sistem ayarlarında yapılan son değişiklikler açıklaması gelecek
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Buraya işletme profili güncellendi metni gelecek</p>
                    <p className="text-xs text-gray-500">Buraya zaman bilgisi gelecek</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Buraya yeni kullanıcı rolü oluşturuldu metni gelecek</p>
                    <p className="text-xs text-gray-500">Buraya zaman bilgisi gelecek</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Buraya çalışma saatleri değiştirildi metni gelecek</p>
                    <p className="text-xs text-gray-500">Buraya zaman bilgisi gelecek</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// ==========================================
// PLACEHOLDER COMPONENTS
// ==========================================

// Card component placeholder
function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}

// CardContent component placeholder
function CardContent({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}

// CardHeader component placeholder
function CardHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}

// CardTitle component placeholder
function CardTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h3 className={className}>{children}</h3>
}

// CardDescription component placeholder
function CardDescription({ children, className }: { children: React.ReactNode, className?: string }) {
  return <p className={className}>{children}</p>
}

// Badge component placeholder
function Badge({ children, variant }: { children: React.ReactNode, variant?: string }) {
  return <span className={`badge ${variant}`}>{children}</span>
}

// Separator component placeholder
function Separator() {
  return <hr className="separator" />
}

// Link component placeholder
function Link({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  return <a href={href} className={className}>{children}</a>
}

// usePathname hook placeholder
function usePathname() {
  return '/settings'
} 