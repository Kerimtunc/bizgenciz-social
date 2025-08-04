import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🍽️ YemekZen QR Menu Elite Edition
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gelişmiş QR kod tabanlı dijital menü sistemi
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                ✅ Proje Başarıyla Kuruldu!
              </h2>
              <p className="text-gray-700 mb-4">
                T3 Stack ile geliştirilmiş modern web uygulaması hazır.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✅ Tamamlanan</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Proje yapısı kuruldu</li>
                  <li>• CI/CD pipeline hazır</li>
                  <li>• Veritabanı şeması tasarlandı</li>
                  <li>• API altyapısı kuruldu</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🚧 Geliştirilecek</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Frontend component'leri</li>
                  <li>• Authentication sistemi</li>
                  <li>• Admin panel</li>
                  <li>• QR kod sistemi</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/api/health" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                🔍 Health Check
              </Link>
              <Link 
                href="/panel" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                🛠️ Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 