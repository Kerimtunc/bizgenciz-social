// ==========================================
// STATUS WIDGET COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/StatusWidget.tsx
// Satır Sayısı: 277 satır

import React from "react"
import { CheckCircle, Clock, AlertTriangle, XCircle, Zap, TrendingUp } from "lucide-react"

interface StatusItem {
  id: string
  title: string
  value: string | number
  status: "success" | "pending" | "warning" | "error"
  description: string
  progress?: number
  trend?: "up" | "down" | "stable"
}

interface StatusWidgetProps {
  title: string
  items: StatusItem[]
  theme: "light" | "dark"
  layout?: "grid" | "list"
}

export function StatusWidget({
  title,
  items,
  theme,
  layout = "grid"
}: StatusWidgetProps) {
  
  const getStatusConfig = (status: StatusItem["status"]) => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle,
          color: "#10B981",
          bgColor: "rgba(16, 185, 129, 0.1)",
          borderColor: "rgba(16, 185, 129, 0.2)",
          textColor: "#10B981",
          gradient: "linear-gradient(135deg, #10B981, #059669)"
        }
      case "pending":
        return {
          icon: Clock,
          color: "#3B82F6",
          bgColor: "rgba(59, 130, 246, 0.1)",
          borderColor: "rgba(59, 130, 246, 0.2)",
          textColor: "#3B82F6",
          gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)"
        }
      case "warning":
        return {
          icon: AlertTriangle,
          color: "#F59E0B",
          bgColor: "rgba(245, 158, 11, 0.1)",
          borderColor: "rgba(245, 158, 11, 0.2)",
          textColor: "#F59E0B",
          gradient: "linear-gradient(135deg, #F59E0B, #D97706)"
        }
      case "error":
        return {
          icon: XCircle,
          color: "#EF4444",
          bgColor: "rgba(239, 68, 68, 0.1)",
          borderColor: "rgba(239, 68, 68, 0.2)",
          textColor: "#EF4444",
          gradient: "linear-gradient(135deg, #EF4444, #DC2626)"
        }
      default:
        return {
          icon: Clock,
          color: "#6B7280",
          bgColor: "rgba(107, 114, 128, 0.1)",
          borderColor: "rgba(107, 114, 128, 0.2)",
          textColor: "#6B7280",
          gradient: "linear-gradient(135deg, #6B7280, #4B5563)"
        }
    }
  }

  const StatusCard = ({ item, index }: { item: StatusItem; index: number }) => {
    const config = getStatusConfig(item.status)
    const IconComponent = config.icon

    return (
      <div
        className="relative overflow-hidden rounded-2xl p-4 group cursor-pointer transition-all duration-300 hover:scale-105"
        style={{
          background: theme === "dark" 
            ? "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 251, 235, 0.8))",
          backdropFilter: "blur(20px)",
          border: `1px solid ${config.borderColor}`,
          boxShadow: `0 4px 20px ${config.bgColor}`,
          animationDelay: `${index * 100}ms`
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <div 
            className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-xl"
            style={{ background: config.gradient }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div 
              className="p-2 rounded-xl shadow-lg"
              style={{ background: config.gradient }}
            >
              <IconComponent className="h-5 w-5 text-white" />
            </div>
            
            {item.trend && (
              <div 
                className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  background: config.bgColor,
                  color: config.textColor
                }}
              >
                <TrendingUp className={`h-3 w-3 ${
                  item.trend === "down" ? "rotate-180" : ""
                } ${
                  item.trend === "stable" ? "rotate-90" : ""
                }`} />
                <span>{item.trend === "up" ? "↗" : item.trend === "down" ? "↘" : "→"}</span>
              </div>
            )}
          </div>

          {/* Title & Value */}
          <div className="mb-2">
            <h4 className={`text-sm font-semibold mb-1 ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}>
              {item.title}
            </h4>
            <div 
              className="text-2xl font-bold"
              style={{ color: config.textColor }}
            >
              {item.value}
            </div>
          </div>

          {/* Description */}
          <p className={`text-xs mb-3 ${
            theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}>
            {item.description}
          </p>

          {/* Progress Bar (if exists) */}
          {item.progress !== undefined && (
            <div className="relative">
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{
                  background: theme === "dark" ? "rgba(51, 65, 85, 0.5)" : "rgba(226, 232, 240, 0.5)"
                }}
              >
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${item.progress}%`,
                    background: config.gradient,
                    boxShadow: `0 0 10px ${config.bgColor}`
                  }}
                />
              </div>
              <div 
                className="text-xs font-medium mt-1"
                style={{ color: config.textColor }}
              >
                {item.progress}% Tamamlandı
              </div>
            </div>
          )}
        </div>

        {/* Hover Effect Border */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, transparent, ${config.borderColor}, transparent)`,
            padding: "1px"
          }}
        >
          <div 
            className="w-full h-full rounded-2xl"
            style={{
              background: theme === "dark" 
                ? "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 251, 235, 0.8))"
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}>
            {title}
          </h3>
          <p className={`text-sm ${
            theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}>
            Sistem durumu ve performans göstergeleri
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Zap className={`h-4 w-4 ${
            theme === "dark" ? "text-yellow-400" : "text-yellow-500"
          }`} />
          <span className={`text-xs font-medium ${
            theme === "dark" ? "text-slate-300" : "text-slate-600"
          }`}>
            Canlı
          </span>
        </div>
      </div>

      {/* Status Items */}
      <div className={`
        ${layout === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4" 
          : "space-y-4"
        }
      `}>
        {items.map((item, index) => (
          <StatusCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 p-4 rounded-xl" style={{
        background: theme === "dark" 
          ? "linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.4))"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 251, 235, 0.4))",
        backdropFilter: "blur(10px)",
        border: theme === "dark" 
          ? "1px solid rgba(51, 65, 85, 0.3)" 
          : "1px solid rgba(226, 232, 240, 0.3)"
      }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["success", "pending", "warning", "error"].map(status => {
            const count = items.filter(item => item.status === status).length
            const config = getStatusConfig(status as StatusItem["status"])
            
            return (
              <div key={status} className="text-center">
                <div className="text-lg font-bold" style={{ color: config.textColor }}>
                  {count}
                </div>
                <div className={`text-xs capitalize ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`}>
                  {status === "success" ? "Başarılı" : 
                   status === "pending" ? "Beklemede" :
                   status === "warning" ? "Uyarı" : "Hata"}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 