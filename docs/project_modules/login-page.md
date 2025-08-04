// ==========================================
// GİRİŞ SAYFASI (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/giris/page.tsx
// Satır Sayısı: 326 satır

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useGoogleAuth } from "@/hooks/useGoogleAuth"
import { GoogleSignInFallback } from "@/components/ui/google-signin-button"
import { UserProfile } from "@/components/ui/user-profile"
import { useRouter } from 'next/navigation'

export default function GirisSayfasi() {
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const { user, isLoading, signIn, signOut, isAuthenticated, isDevelopmentMode } = useGoogleAuth()
  const router = useRouter()

  // Eğer kullanıcı giriş yapmışsa profil göster
  if (isAuthenticated && user) {
    return (
      <div className="flex min-h-screen bg-black items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Buraya uygulama başlığı gelecek</h1>
            <p className="text-gray-400">
              {isDevelopmentMode ? 
                "Buraya development mode mesajı gelecek" : 
                "Buraya başarılı giriş mesajı gelecek"
              }
            </p>
            {isDevelopmentMode && (
              <div className="mt-2 p-2 rounded bg-orange-900/20 border border-orange-800">
                <p className="text-orange-300 text-sm">
                  Buraya development mode uyarı mesajı gelecek
                </p>
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <UserProfile user={user} onSignOut={signOut} />
            
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-900 p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">Buraya hızlı erişim başlığı gelecek</h3>
                <div className="space-y-3">
                  <Button 
                    onClick={() => router.push('/panel')}
                    className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Buraya panel buton metni gelecek
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/pos')}
                    className="w-full h-12 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Buraya POS buton metni gelecek
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/')}
                    className="w-full h-12 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Buraya ana sayfa buton metni gelecek
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Buraya geliştirme modu notu gelecek
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sol Bölüm */}
      <div className="relative hidden w-1/2 p-8 lg:block">
        <div className="h-full w-full overflow-hidden rounded-[40px] bg-gradient-to-b from-orange-400 via-orange-600 to-black">
          <div className="flex h-full flex-col items-center justify-center px-8 text-center text-white">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">Buraya sol panel başlığı gelecek</h1>
            </div>
            <h2 className="mb-6 text-4xl font-bold">Buraya hoş geldiniz başlığı gelecek</h2>
            <p className="mb-12 text-lg">Buraya sol panel açıklaması gelecek</p>

            <div className="w-full max-w-sm space-y-4">
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">1</span>
                  <span className="text-lg">Buraya adım 1 metni gelecek</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                    2
                  </span>
                  <span className="text-lg">Buraya adım 2 metni gelecek</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                    3
                  </span>
                  <span className="text-lg">Buraya adım 3 metni gelecek</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sağ Bölüm */}
      <div className="flex w-full items-center justify-center bg-black p-6 lg:w-1/2">
        <div className="w-full max-w-md rounded-[40px] p-12">
          <div className="mx-auto max-w-sm">
            <h2 className="mb-2 text-3xl font-bold text-white">Buraya giriş başlığı gelecek</h2>
            <p className="mb-8 text-gray-400">Buraya giriş açıklaması gelecek</p>

            {/* Google OAuth Status */}
            <div className="mb-6">
              {isDevelopmentMode ? (
                <div className="p-3 rounded-lg bg-orange-900/20 border border-orange-800 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-orange-300 text-sm font-medium">Buraya development mode başlığı gelecek</p>
                    <p className="text-orange-200 text-xs mt-1">
                      Buraya development mode açıklaması gelecek
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-green-900/20 border border-green-800 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Buraya OAuth aktif başlığı gelecek</p>
                    <p className="text-green-200 text-xs mt-1">
                      Buraya OAuth aktif açıklaması gelecek
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-8 grid gap-4">
              <GoogleSignInFallback
                onClick={signIn}
                isLoading={isLoading}
                text={isDevelopmentMode ? "Buraya test kullanıcı buton metni gelecek" : "Buraya Google giriş buton metni gelecek"}
              />
              <Button variant="outline" className="h-12">
                <Github className="mr-2 h-5 w-5" />
                Buraya Github giriş buton metni gelecek
              </Button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-black px-2 text-gray-400">Buraya ayırıcı metni gelecek</span>
              </div>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <Input
                  className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                  placeholder="Buraya email placeholder gelecek"
                  type="email"
                />
              </div>

              <div className="space-y-2">
                <Input
                  className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                  placeholder="Buraya şifre placeholder gelecek"
                  type="password"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-gray-400">
                  <input type="checkbox" className="rounded border-gray-600 bg-gray-800" />
                  <span>Buraya beni hatırla metni gelecek</span>
                </label>
                <a href="#" className="text-sm text-orange-500 hover:text-orange-400">
                  Buraya şifremi unuttum metni gelecek
                </a>
              </div>

              <Button className="h-12 w-full bg-orange-600 text-white hover:bg-orange-700">Buraya giriş yap buton metni gelecek</Button>

              <p className="text-center text-sm text-gray-400">
                Buraya hesap yok mu metni gelecek{" "}
                <button 
                  type="button"
                  onClick={() => setIsSignupOpen(true)}
                  className="text-orange-500 hover:text-orange-400 hover:underline"
                >
                  Buraya kayıt ol link metni gelecek
                </button>
              </p>
            </form>
            
            {/* Geliştirme modu bilgisi */}
            <div className="mt-8 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
              <p className="text-center text-sm text-blue-300">
                Buraya geliştirme modu bilgisi gelecek <br />
                <button 
                  onClick={() => router.push('/panel')}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Buraya giriş yapmadan panel link metni gelecek
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kayıt Modal/Dialog */}
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white">Buraya hesap oluştur başlığı gelecek</DialogTitle>
          </DialogHeader>
          
          <div className="p-6">
            <p className="mb-6 text-center text-gray-400">Buraya hesap oluştur açıklaması gelecek</p>

            <div className="mb-6 grid gap-4">
              <GoogleSignInFallback
                onClick={signIn}
                isLoading={isLoading}
                text={isDevelopmentMode ? "Buraya test kullanıcı devam et metni gelecek" : "Buraya Google devam et metni gelecek"}
              />
              <Button variant="outline" className="h-12 border-gray-600 text-gray-300 hover:bg-gray-800">
                <Github className="mr-2 h-5 w-5" />
                Buraya Github devam et metni gelecek
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-900 px-2 text-gray-400">Buraya modal ayırıcı metni gelecek</span>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  className="h-12 border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                  placeholder="Buraya ad placeholder gelecek"
                  type="text"
                />
                <Input
                  className="h-12 border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                  placeholder="Buraya soyad placeholder gelecek"
                  type="text"
                />
              </div>

              <Input
                className="h-12 border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                placeholder="Buraya email placeholder gelecek"
                type="email"
              />

              <Input
                className="h-12 border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                placeholder="Buraya şifre placeholder gelecek"
                type="password"
              />

              <Input
                className="h-12 border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                placeholder="Buraya şifre tekrar placeholder gelecek"
                type="password"
              />

              <div className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1 rounded border-gray-600 bg-gray-800" />
                <span className="text-sm text-gray-400">
                  <a href="#" className="text-orange-500 hover:text-orange-400">Buraya kullanım şartları link metni gelecek</a> ve{" "}
                  <a href="#" className="text-orange-500 hover:text-orange-400">Buraya gizlilik politikası link metni gelecek</a>'nı kabul ediyorum.
                </span>
              </div>

              <Button className="h-12 w-full bg-orange-600 text-white hover:bg-orange-700">
                Buraya hesap oluştur buton metni gelecek
              </Button>

              <p className="text-center text-sm text-gray-400">
                Buraya zaten hesap var mı metni gelecek{" "}
                <button 
                  type="button"
                  onClick={() => setIsSignupOpen(false)}
                  className="text-orange-500 hover:text-orange-400 hover:underline"
                >
                  Buraya giriş yap link metni gelecek
                </button>
              </p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ==========================================
// PLACEHOLDER UI COMPONENTS
// ==========================================

// Button component placeholder
function Button({ children, className, variant, onClick }: any) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

// Input component placeholder
function Input({ className, placeholder, type }: any) {
  return (
    <input className={className} placeholder={placeholder} type={type} />
  )
}

// Dialog components placeholder
function Dialog({ children, open, onOpenChange }: any) {
  return open ? <div>{children}</div> : null
}

function DialogContent({ children, className }: any) {
  return <div className={className}>{children}</div>
}

function DialogHeader({ children }: any) {
  return <div>{children}</div>
}

function DialogTitle({ children, className }: any) {
  return <h2 className={className}>{children}</h2>
}

// GoogleSignInFallback component placeholder
function GoogleSignInFallback({ onClick, isLoading, text }: any) {
  return (
    <button onClick={onClick} disabled={isLoading}>
      {text}
    </button>
  )
}

// UserProfile component placeholder
function UserProfile({ user, onSignOut }: any) {
  return (
    <div>
      <p>User Profile: {user?.name}</p>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  )
}

// useGoogleAuth hook placeholder
function useGoogleAuth() {
  return {
    user: null,
    isLoading: false,
    signIn: () => {},
    signOut: () => {},
    isAuthenticated: false,
    isDevelopmentMode: true
  }
}

// useRouter hook placeholder
function useRouter() {
  return {
    push: (path: string) => {}
  }
} 