// ==========================================
// ANALYTICS WIDGET COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/AnalyticsWidget.tsx
// Satır Sayısı: 296 satır

import React, { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, BarChart3, PieChart, Target, Zap } from "lucide-react"

interface AnalyticsData {
  label: string
  value: number
  trend: "up" | "down" | "stable"
  percentage: number
  color: string
}

interface AnalyticsWidgetProps {
  title: string
  data: AnalyticsData[]
  theme: "light" | "dark"
  size?: "small" | "medium" | "large"
  chartType?: "donut" | "bar" | "progress"
}

export function AnalyticsWidget({
  title,
  data,
  theme,
  size = "medium",
  chartType = "donut"
}: AnalyticsWidgetProps) {
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationProgress(100), 300)
    return () => clearTimeout(timer)
  }, [])

  const getWidgetSize = () => {
    switch (size) {
      case "small":
        return { width: "w-64", height: "h-48", chart: "w-16 h-16" }
      case "large":
        return { width: "w-96", height: "h-80", chart: "w-32 h-32" }
      default:
        return { width: "w-80", height: "h-64", chart: "w-24 h-24" }
    }
  }

  const sizeConfig = getWidgetSize()

  const CircularChart = ({ item, index }: { item: AnalyticsData; index: number }) => {
    const circumference = 2 * Math.PI * 45
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (item.percentage / 100) * circumference

    return (
      <div className="relative group">
        <svg className={`${sizeConfig.chart} transform -rotate-90`} viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={theme === "dark" ? "#1E293B" : "#E2E8F0"}
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={item.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-2000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${item.color}40)`,
              animationDelay: `${index * 200}ms`
            }}
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div 
            className="text-xl font-bold"
            style={{ color: item.color }}
          >
            {item.value}
          </div>
          <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            {item.percentage}%
          </div>
        </div>

        {/* Trend Indicator */}
        <div className={`absolute -top-2 -right-2 p-1 rounded-full ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        } shadow-lg`}>
          {item.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
          {item.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
          {item.trend === "stable" && <BarChart3 className="h-4 w-4 text-blue-500" />}
        </div>
      </div>
    )
  }

  const ProgressBar = ({ item, index }: { item: AnalyticsData; index: number }) => {
    return (
      <div 
        className="mb-4 group"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ background: item.color }}
            />
            <span className={`text-sm font-medium ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}>
              {item.label}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-bold ${
              theme === "dark" ? "text-slate-100" : "text-slate-800"
            }`}>
              {item.value}
            </span>
            {item.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
            {item.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
            {item.trend === "stable" && <BarChart3 className="h-4 w-4 text-blue-500" />}
          </div>
        </div>
        
        <div 
          className="h-3 rounded-full overflow-hidden"
          style={{
            background: theme === "dark" ? "rgba(51, 65, 85, 0.5)" : "rgba(226, 232, 240, 0.8)"
          }}
        >
          <div 
            className="h-full rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
            style={{ 
              width: `${(animationProgress * item.percentage) / 100}%`,
              background: `linear-gradient(90deg, ${item.color}dd, ${item.color})`,
              boxShadow: `0 0 10px ${item.color}40`
            }}
          >
            {/* Animated shimmer */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                animation: "shimmer 2s infinite"
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  const BarChart = ({ item, index }: { item: AnalyticsData; index: number }) => {
    return (
      <div className="flex flex-col items-center space-y-2 group">
        <div 
          className="relative w-8 rounded-t-lg overflow-hidden"
          style={{ 
            height: `${Math.max(item.percentage * 1.2, 20)}px`,
            background: `linear-gradient(to top, ${item.color}dd, ${item.color})`,
            boxShadow: `0 0 15px ${item.color}40`,
            animationDelay: `${index * 150}ms`
          }}
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 opacity-50 blur-sm"
            style={{ background: item.color }}
          />
        </div>
        
        <div className="text-center">
          <div className={`text-sm font-bold ${
            theme === "dark" ? "text-slate-100" : "text-slate-800"
          }`}>
            {item.value}
          </div>
          <div className={`text-xs ${
            theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}>
            {item.label}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`${sizeConfig.width} ${sizeConfig.height} relative overflow-hidden rounded-3xl p-6 group`}
      style={{
        background: theme === "dark" 
          ? "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 251, 235, 0.9))",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(59, 130, 246, 0.2)"
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl bg-gradient-to-r from-blue-400 to-purple-500" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full blur-2xl bg-gradient-to-r from-green-400 to-blue-500" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg">
            {chartType === "donut" && <PieChart className="h-5 w-5 text-white" />}
            {chartType === "bar" && <BarChart3 className="h-5 w-5 text-white" />}
            {chartType === "progress" && <Target className="h-5 w-5 text-white" />}
          </div>
          <h3 className={`text-lg font-bold ${
            theme === "dark" ? "text-slate-100" : "text-slate-800"
          }`}>
            {title}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Zap className={`h-4 w-4 ${
            theme === "dark" ? "text-yellow-400" : "text-yellow-500"
          }`} />
          <div className={`text-sm font-medium ${
            theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}>
            Canlı
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        {chartType === "donut" && (
          <div className="grid grid-cols-2 gap-4 items-center">
            {data.map((item, index) => (
              <CircularChart key={item.label} item={item} index={index} />
            ))}
          </div>
        )}

        {chartType === "progress" && (
          <div className="space-y-4">
            {data.map((item, index) => (
              <ProgressBar key={item.label} item={item} index={index} />
            ))}
          </div>
        )}

        {chartType === "bar" && (
          <div className="flex items-end justify-center space-x-4 h-32">
            {data.map((item, index) => (
              <BarChart key={item.label} item={item} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="relative z-10 mt-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {data.map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ background: item.color }}
              />
              <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/10 to-purple-500/10" />
      </div>
    </div>
  )
} 