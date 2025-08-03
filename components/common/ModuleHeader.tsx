import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface ModuleHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function ModuleHeader({ title, subtitle, icon, children }: ModuleHeaderProps) {
  return (
    <Card className="bg-white border border-orange-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            {icon && icon}
            {title}
          </CardTitle>
          {children}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-600">{subtitle}</p>
        )}
      </CardHeader>
    </Card>
  );
} 