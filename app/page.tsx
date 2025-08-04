import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎓 BizGenciz
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Üniversitelilerin Sosyal Platformu
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                ✅ Platform Başarıyla Kuruldu!
              </h2>
              <p className="text-gray-700 mb-4">
                Üniversite öğrencileri için modern sosyal platform hazır.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✅ Tamamlanan</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Proje yapısı kuruldu</li>
                  <li>• CI/CD pipeline hazır</li>
                  <li>• Veritabanı şeması tasarlandı</li>
                  <li>• Gruplar sayfası eklendi</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🚧 Geliştirilecek</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Kullanıcı profilleri</li>
                  <li>• Mesajlaşma sistemi</li>
                  <li>• Etkinlik yönetimi</li>
                  <li>• Mobil uygulama</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/gruplar" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                👥 Gruplar
              </Link>
              <Link 
                href="/api/health" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                🔍 Health Check
              </Link>
              <Link 
                href="/panel" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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