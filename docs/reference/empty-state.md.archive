"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, Plus, Search } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  showSearch?: boolean
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function EmptyState({
  title,
  description,
  icon = <AlertCircle className="h-16 w-16 text-gray-400" />,
  actionLabel,
  onAction,
  showSearch = false,
  searchQuery = "",
  onSearchChange,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {description}
      </p>

      {showSearch && onSearchChange && (
        <div className="max-w-sm mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buraya ara placeholder gelecek"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {actionLabel && onAction && (
        <Button onClick={onAction} className="inline-flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
} 