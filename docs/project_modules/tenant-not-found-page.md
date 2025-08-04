// ==========================================
// TENANT NOT FOUND SAYFASI (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/tenant-not-found/page.tsx
// Satır Sayısı: 73 satır

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TenantNotFoundPage() {
  const router = useRouter();
  const [currentDomain, setCurrentDomain] = useState('');
  
  useEffect(() => {
    setCurrentDomain(window.location.host);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Buraya işletme bulunamadı başlığı gelecek</h1>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold text-indigo-600">{currentDomain}</span> Buraya domain açıklaması gelecek
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Buraya olası nedenler başlığı gelecek:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Buraya işletme adı yanlış yazılmış açıklaması gelecek</li>
              <li>• Buraya abonelik süresi dolmuş açıklaması gelecek</li>
              <li>• Buraya hizmet geçici askıya alınmış açıklaması gelecek</li>
            </ul>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-4">
            <h3 className="font-medium text-indigo-900 mb-2">Buraya ne yapabilirsiniz başlığı gelecek?</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Buraya işletme adını kontrol edin açıklaması gelecek</li>
              <li>• Buraya işletme sahibiyle iletişim açıklaması gelecek</li>
              <li>• Buraya birkaç dakika sonra tekrar deneyin açıklaması gelecek</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Buraya tekrar dene buton metni gelecek
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Buraya ana sayfaya dön buton metni gelecek
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Buraya QR Menu Elite Edition açıklaması gelecek
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PLACEHOLDER HOOKS
// ==========================================

// useRouter hook placeholder
function useRouter() {
  return {
    push: (path: string) => {}
  }
}

// useState hook placeholder
function useState(initialValue: any) {
  return [initialValue, () => {}]
}

// useEffect hook placeholder
function useEffect(callback: () => void, dependencies: any[]) {
  // useEffect placeholder
} 