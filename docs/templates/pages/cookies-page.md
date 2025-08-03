// ==========================================
// ÇEREZLER SAYFASI (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/cerezler/page.tsx
// Satır Sayısı: 315 satır

"use client"

import { Shield, Brain, Target, Sparkles, TrendingUp, Clock, Users, Lock, Mail, Phone } from "lucide-react"
import CookieConsentPopup from "@/components/CookieConsentPopup"

export default function CerezPolitikasi() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <CookieConsentPopup />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Buraya çerez politikası başlığı gelecek</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Buraya çerez politikası açıklaması gelecek
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          {/* Quick Summary */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
              Buraya özet başlığı gelecek
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Brain className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Buraya akıllı kişiselleştirme başlığı gelecek</h3>
                  <p className="text-sm text-gray-600">Buraya akıllı kişiselleştirme açıklaması gelecek</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Buraya performans iyileştirme başlığı gelecek</h3>
                  <p className="text-sm text-gray-600">Buraya performans iyileştirme açıklaması gelecek</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Buraya özel kampanyalar başlığı gelecek</h3>
                  <p className="text-sm text-gray-600">Buraya özel kampanyalar açıklaması gelecek</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Buraya güvenli veri başlığı gelecek</h3>
                  <p className="text-sm text-gray-600">Buraya güvenli veri açıklaması gelecek</p>
                </div>
              </div>
            </div>
          </div>

          {/* What are cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Buraya çerezler nedir başlığı gelecek</h2>
            <p className="text-gray-600 mb-4">
              Buraya çerezler nedir açıklaması gelecek
            </p>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-blue-800 text-sm">
                Buraya basit açıklama metni gelecek
              </p>
            </div>
          </section>

          {/* Cookie categories */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Buraya çerez kategorileri başlığı gelecek</h2>

            <div className="space-y-6">
              {/* Necessary */}
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Buraya zorunlu çerezler başlığı gelecek</h3>
                  <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-full">
                    Buraya her zaman aktif etiketi gelecek
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Buraya zorunlu çerezler açıklaması gelecek
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Buraya ne yapar başlığı gelecek:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Buraya güvenli oturum yönetimi gelecek</li>
                      <li>• Buraya ödeme işlemleri güvenliği gelecek</li>
                      <li>• Buraya dil ve bölge tercihleri gelecek</li>
                      <li>• Buraya sepet içeriği saklama gelecek</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Buraya teknik detaylar başlığı gelecek:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Buraya saklama süresi gelecek</li>
                      <li>• Buraya paylaşım bilgisi gelecek</li>
                      <li>• Buraya devre dışı bırakılamaz gelecek</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Buraya performans analiz çerezleri başlığı gelecek</h3>
                  <span className="px-3 py-1 bg-blue-200 text-blue-700 text-sm font-medium rounded-full">
                    Buraya AI destekli etiketi gelecek
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Buraya performans analiz çerezleri açıklaması gelecek
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Buraya AI ile neler yapıyoruz başlığı gelecek:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Buraya sayfa yükleme hızı optimizasyonu gelecek</li>
                      <li>• Buraya kullanıcı deneyimi analizi gelecek</li>
                      <li>• Buraya hata tespiti ve düzeltme gelecek</li>
                      <li>• Buraya akıllı içerik önerileri gelecek</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Buraya teknik detaylar başlığı gelecek:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Buraya saklama süresi gelecek</li>
                      <li>• Buraya kullanılan araçlar gelecek</li>
                      <li>• Buraya anonim veri toplama gelecek</li>
                      <li>• Buraya IP adresi maskeleme gelecek</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Buraya pazarlama reklam çerezleri başlığı gelecek</h3>
                  <span className="px-3 py-1 bg-green-200 text-green-700 text-sm font-medium rounded-full">
                    Buraya kişisel teklifler etiketi gelecek
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Buraya pazarlama reklam çerezleri açıklaması gelecek
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Buraya size özel avantajlar başlığı gelecek:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Buraya ürün önerileri gelecek</li>
                      <li>• Buraya kişiselleştirilmiş indirimler gelecek</li>
                      <li>• Buraya özel kampanya bildirimleri gelecek</li>
                      <li>• Buraya sosyal medya reklamları gelecek</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Buraya teknik detaylar başlığı gelecek:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Buraya saklama süresi gelecek</li>
                      <li>• Buraya ortaklar gelecek</li>
                      <li>• Buraya çapraz cihaz takibi gelecek</li>
                      <li>• Buraya lookalike audience gelecek</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Personalization */}
              <div className="p-6 bg-purple-50 rounded-2xl border border-purple-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Buraya kişiselleştirme çerezleri başlığı gelecek</h3>
                  <span className="px-3 py-1 bg-purple-200 text-purple-700 text-sm font-medium rounded-full">
                    Buraya akıllı hatırlama etiketi gelecek
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Buraya kişiselleştirme çerezleri açıklaması gelecek
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Buraya kişisel deneyim özellikleri başlığı gelecek:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Buraya favori kategoriler hatırlama gelecek</li>
                      <li>• Buraya özel arayüz düzeni gelecek</li>
                      <li>• Buraya tercih edilen içerik türleri gelecek</li>
                      <li>• Buraya kişisel dashboard gelecek</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Buraya teknik detaylar başlığı gelecek:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Buraya saklama süresi gelecek</li>
                      <li>• Buraya yerel depolama gelecek</li>
                      <li>• Buraya üçüncü taraflarla paylaşım gelecek</li>
                      <li>• Buraya şifrelenmiş veri saklama gelecek</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Buraya haklarınız başlığı gelecek</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Lock className="w-5 h-5 text-blue-600 mr-2" />
                  Buraya veri kontrolü başlığı gelecek
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Buraya çerez tercihleri değiştirme gelecek</li>
                  <li>• Buraya veri toplama öğrenme gelecek</li>
                  <li>• Buraya veri silme talebi gelecek</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Users className="w-5 h-5 text-green-600 mr-2" />
                  Buraya şeffaflık başlığı gelecek
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Buraya veri kullanım açıklaması gelecek</li>
                  <li>• Buraya üçüncü taraflar listesi gelecek</li>
                  <li>• Buraya saklama süreleri belirtme gelecek</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to manage */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Buraya çerez tercihleri yönetimi başlığı gelecek</h2>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Buraya site üzerinden başlığı gelecek</h3>
                <p className="text-sm text-gray-600">
                  Buraya site üzerinden açıklaması gelecek
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Buraya tarayıcı ayarları başlığı gelecek</h3>
                <p className="text-sm text-gray-600">
                  Buraya tarayıcı ayarları açıklaması gelecek
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Buraya iletişim sorular başlığı gelecek</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-4">Buraya veri koruma sorumlusu başlığı gelecek</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Buraya email adresi gelecek</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Buraya telefon numarası gelecek</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-4">Buraya yanıt süremiz başlığı gelecek</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>Buraya email yanıt süresi gelecek</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>Buraya telefon yanıt süresi gelecek</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Last updated */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Buraya son güncelleme metni gelecek
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// PLACEHOLDER UI COMPONENTS
// ==========================================

// CookieConsentPopup component placeholder
function CookieConsentPopup() {
  return (
    <div>
      {/* Cookie consent popup placeholder */}
    </div>
  )
} 