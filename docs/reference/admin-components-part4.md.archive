// ==========================================
// FILE MANAGER COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/components/AdminComponents/file-manager.tsx
// Satır Sayısı: 377 satır

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { 
  Bell, Grid, LayoutGrid, Plus, Search, Upload, 
  FolderOpen, Video, Camera, FileText, Image as ImageIcon,
  Coffee, Users, Heart, Star, Download, Menu, X
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import ModuleHeader from "@/components/common/ModuleHeader"

interface FileManagerProps {
  modules?: Array<{
    id: string
    label: string
    icon: any
    description: string
  }>
  activeModule?: string
  onModuleChange?: (moduleId: string) => void
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

function NavItem({ href, icon, children, active, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-orange-50 transition-colors",
        active && "bg-orange-100 text-orange-700 font-medium"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

function FolderItem({ href, children, fileCount, onClick }: { 
  href: string; 
  children: React.ReactNode; 
  fileCount?: number;
  onClick?: () => void;
}) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
    >
      <FolderOpen className="w-4 h-4 text-orange-500 group-hover:text-orange-600" />
      <span className="flex-1">{children}</span>
      {fileCount && (
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
          {fileCount}
        </span>
      )}
    </Link>
  )
}

function FileCard({ 
  title, 
  metadata, 
  thumbnail, 
  type = "image",
  size 
}: { 
  title: string; 
  metadata: string; 
  thumbnail: string;
  type?: "image" | "video" | "document" | "menu";
  size?: string;
}) {
  const getTypeIcon = () => {
    switch (type) {
      case "video": return <Video className="w-5 h-5 text-blue-500" />
      case "document": return <FileText className="w-5 h-5 text-green-500" />
      case "menu": return <Coffee className="w-5 h-5 text-orange-500" />
      default: return <ImageIcon className="w-5 h-5 text-purple-500" />
    }
  }

  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Thumbnail */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            {getTypeIcon()}
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
        
        {/* Action buttons */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-500 truncate">{metadata}</p>
        {size && (
          <p className="text-xs text-gray-400 mt-1">{size}</p>
        )}
      </div>
    </div>
  )
}

export default function FileManager({ modules = [], activeModule, onModuleChange }: FileManagerProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Dosya Yöneticisi</h1>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Dosya Yöneticisi</h2>
                <button
                  onClick={closeMobileSidebar}
                  className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              <NavItem href="/files" icon={<Grid className="w-4 h-4" />} active>
                Tüm Dosyalar
              </NavItem>
              <NavItem href="/files/images" icon={<ImageIcon className="w-4 h-4" />}>
                Resimler
              </NavItem>
              <NavItem href="/files/videos" icon={<Video className="w-4 h-4" />}>
                Videolar
              </NavItem>
              <NavItem href="/files/documents" icon={<FileText className="w-4 h-4" />}>
                Belgeler
              </NavItem>
              <NavItem href="/files/menus" icon={<Coffee className="w-4 h-4" />}>
                Menüler
              </NavItem>
            </nav>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-200">
              <Button className="w-full" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Dosya Yükle
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tüm Dosyalar</h1>
                <p className="text-gray-600">Dosyalarınızı yönetin ve organize edin</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Yükle
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Klasör
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6">
            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Dosyalarda ara..."
                    className="pl-10"
                  />
                </div>
                <Tabs defaultValue="grid" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="grid">
                      <Grid className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="list">
                      <LayoutGrid className="w-4 h-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Files Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <FileCard
                title="Restaurant Menu 2024"
                metadata="Son güncelleme: 2 saat önce"
                thumbnail="/api/placeholder/300/300"
                type="menu"
                size="2.4 MB"
              />
              <FileCard
                title="Restaurant Interior"
                metadata="Son güncelleme: 1 gün önce"
                thumbnail="/api/placeholder/300/300"
                type="image"
                size="1.8 MB"
              />
              <FileCard
                title="Chef Cooking Video"
                metadata="Son güncelleme: 3 gün önce"
                thumbnail="/api/placeholder/300/300"
                type="video"
                size="15.2 MB"
              />
              <FileCard
                title="Food Safety Guidelines"
                metadata="Son güncelleme: 1 hafta önce"
                thumbnail="/api/placeholder/300/300"
                type="document"
                size="856 KB"
              />
              <FileCard
                title="Staff Training Manual"
                metadata="Son güncelleme: 2 hafta önce"
                thumbnail="/api/placeholder/300/300"
                type="document"
                size="2.1 MB"
              />
              <FileCard
                title="Restaurant Logo"
                metadata="Son güncelleme: 1 ay önce"
                thumbnail="/api/placeholder/300/300"
                type="image"
                size="512 KB"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 