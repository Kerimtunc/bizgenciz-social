'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, Clock, TrendingUp, ArrowLeft, Menu, ChevronDown, Home, Bell, Globe, Check, LogOut, User } from 'lucide-react';

// ============================================================================
// GLOBAL SEARCH COMPONENT
// ============================================================================

interface SearchResult {
  id: string;
  title: string;
  module: string;
  type: string;
  description?: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface GlobalSearchProps {
  placeholder?: string;
  onResultSelect?: (result: SearchResult) => void;
  modules?: string[];
}

export function GlobalSearch({ 
  placeholder = "Tüm modüllerde ara...", 
  onResultSelect,
  modules = ['orders', 'customers', 'products', 'tables', 'staff', 'kitchen']
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState<string[]>([
    'bugünkü siparişler', 'aktif masalar', 'stok durumu', 'müşteri geçmişi'
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Search debouncing
  useEffect(() => {
    if (query.length >= 2) {
      setLoading(true);
      
      // Clear previous debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Debounce search
      debounceRef.current = setTimeout(() => {
        performSearch(query);
      }, 300);
    } else {
      setResults([]);
      setLoading(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Close search on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/global-search?q=${encodeURIComponent(searchQuery)}&modules=${modules.join(',')}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addToRecentSearches(query.trim());
      // Trigger search analytics
      fetch('/api/search-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim(), timestamp: new Date() })
      }).catch(() => {});
    }
  };

  const addToRecentSearches = (searchTerm: string) => {
    setRecentSearches(prev => {
      const updated = [searchTerm, ...prev.filter(term => term !== searchTerm)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleResultClick = (result: SearchResult) => {
    addToRecentSearches(query);
    onResultSelect?.(result);
    result.onClick();
    setIsOpen(false);
    setQuery('');
  };

  const getModuleIcon = (module: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      orders: <div className="w-4 h-4 bg-blue-500 rounded"></div>,
      customers: <div className="w-4 h-4 bg-green-500 rounded"></div>,
      products: <div className="w-4 h-4 bg-purple-500 rounded"></div>,
      tables: <div className="w-4 h-4 bg-orange-500 rounded"></div>,
      staff: <div className="w-4 h-4 bg-pink-500 rounded"></div>,
      kitchen: <div className="w-4 h-4 bg-red-500 rounded"></div>
    };
    return icons[module] || <div className="w-4 h-4 bg-gray-500 rounded"></div>;
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          
          {/* Loading State */}
          {loading && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2 text-sm">Aranıyor...</p>
            </div>
          )}

          {/* Search Results */}
          {!loading && results.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2 uppercase tracking-wide">
                Arama Sonuçları ({results.length})
              </div>
              {results.map((result, index) => (
                <button
                  key={`${result.id}-${index}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  {getModuleIcon(result.module)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                        {result.title}
                      </span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded capitalize">
                        {result.module}
                      </span>
                    </div>
                    {result.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {result.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">"{query}" için sonuç bulunamadı</p>
              <p className="text-xs mt-1">Farklı anahtar kelimeler deneyin</p>
            </div>
          )}

          {/* Recent & Popular Searches */}
          {!loading && query.length < 2 && (
            <div className="p-2">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 px-3 py-2 uppercase tracking-wide">
                    <Clock className="w-3 h-3" />
                    Son Aramalar
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 px-3 py-2 uppercase tracking-wide">
                  <TrendingUp className="w-3 h-3" />
                  Popüler Aramalar
                </div>
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MODULE HEADER COMPONENT
// ============================================================================

interface ModuleHeaderProps {
  modules: Array<{
    id: string
    label: string
    icon: any
    description: string
  }>
  activeModule: string
  onModuleChange: (moduleId: string) => void
  theme?: string
}

export function ModuleHeader({
  modules,
  activeModule,
  onModuleChange,
  theme = "light",
}: ModuleHeaderProps) {
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)

  const handleModuleClick = (moduleId: string) => {
    onModuleChange(moduleId)
    setIsDesktopDropdownOpen(false)
    setIsMobileDropdownOpen(false)
  }

  return (
    <div className={`${
      theme === "dark" ? "bg-slate-900/90 border-slate-700/50" : "bg-white/90 border-orange-200"
    } backdrop-blur-lg border-0 border-b shadow-sm relative z-[99999]`}>
      <div className="flex items-center justify-between p-3 sm:p-4">
        {/* Sol: Ana Menü + Diğer Modüller (Desktop) / Sadece Ana Menü (Mobil) */}
        <div className="flex items-center space-x-2">
          {/* Ana Menü Butonu */}
          <button
            onClick={() => onModuleChange("dashboard")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-lg text-xs sm:text-sm px-2 sm:px-4 relative z-[99999] rounded-md py-2"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
            <span className="hidden sm:inline">Ana Menü</span>
            <span className="sm:hidden">Ana Menü</span>
          </button>

          {/* Diğer Modüller Butonu - Desktop'ta sol tarafta, mobilde gizli */}
          <div className="hidden sm:block">
            <div className="relative z-[99999]">
              <button
                onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                className={`border-orange-300 text-orange-600 hover:bg-orange-50 text-xs sm:text-sm px-2 sm:px-3 relative z-[99999] rounded-md py-2 border ${
                  theme === "dark" 
                    ? "border-slate-600 hover:bg-slate-800 text-slate-300" 
                    : "border-orange-200 hover:bg-orange-50 text-slate-600"
                }`}
              >
                <Menu className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
                Diğer Modüller
                <ChevronDown className={`h-2 w-2 sm:h-3 sm:w-3 ml-1 sm:ml-2 transition-transform duration-200 inline ${
                  isDesktopDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {/* Modern Dropdown Design - ULTRA HIGH Z-INDEX */}
              {isDesktopDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 sm:w-80 bg-white border border-orange-200 rounded-lg shadow-2xl z-[999999]">
                  <div className="p-3 relative z-[999999]">
                    <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">TÜM MODÜLLER</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 max-h-80 overflow-y-auto">
                      {modules.map((module) => {
                        const IconComponent = module.icon
                        return (
                          <button
                            key={module.id}
                            onClick={() => handleModuleClick(module.id)}
                            className="p-2 sm:p-3 rounded-lg text-left hover:bg-orange-50 transition-colors text-gray-700 group/item relative z-[999999]"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 group-hover/item:text-orange-600" />
                              <span className="font-medium text-xs sm:text-sm">{module.label}</span>
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">{module.description}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Dropdown dışına tıklayınca kapanması için overlay - ULTRA HIGH Z-INDEX */}
              {isDesktopDropdownOpen && (
                <div 
                  className="fixed inset-0 z-[999998] bg-black/10" 
                  onClick={() => setIsDesktopDropdownOpen(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Orta/Sağ: Kullanıcı Durumu ve Diğer Modüller (Mobil) */}
        <div className="flex items-center space-x-2">
          {/* Kullanıcı Durumu - Sadece giriş yapılmışsa göster */}
          <div className="hidden sm:block relative z-[99999]">
            <UserProfileCompact user={{ id: '1', name: 'Kullanıcı', email: 'user@example.com', picture: '', given_name: 'Kullanıcı', family_name: 'Adı' }} onSignOut={() => {}} />
          </div>

          {/* Diğer Modüller (Sadece Mobil) */}
          <div className="flex items-center sm:hidden">
            <div className="relative z-[99999]">
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="border-orange-300 text-orange-600 hover:bg-orange-50 text-xs px-2 relative z-[99999] rounded-md py-2 border"
              >
                <Menu className="h-3 w-3 mr-1 inline" />
                Modüller
                <ChevronDown className={`h-2 w-2 ml-1 transition-transform duration-200 inline ${
                  isMobileDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {/* Mobile Dropdown - ULTRA HIGH Z-INDEX */}
              {isMobileDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-orange-200 rounded-lg shadow-2xl z-[999999]">
                  <div className="p-3 relative z-[999999]">
                    {/* Mobilde kullanıcı bilgisi dropdown içinde göster */}
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <UserProfileCompact user={{ id: '1', name: 'Kullanıcı', email: 'user@example.com', picture: '', given_name: 'Kullanıcı', family_name: 'Adı' }} onSignOut={() => {}} />
                    </div>
                    
                    <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">TÜM MODÜLLER</div>
                    <div className="grid grid-cols-2 gap-1 max-h-80 overflow-y-auto">
                      {modules.map((module) => {
                        const IconComponent = module.icon
                        return (
                          <button
                            key={module.id}
                            onClick={() => handleModuleClick(module.id)}
                            className="p-2 rounded-lg text-left hover:bg-orange-50 transition-colors text-gray-700 group/item relative z-[999999]"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <IconComponent className="w-3 h-3 text-orange-500 group-hover/item:text-orange-600" />
                              <span className="font-medium text-xs">{module.label}</span>
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">{module.description}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Dropdown dışına tıklayınca kapanması için overlay - ULTRA HIGH Z-INDEX */}
              {isMobileDropdownOpen && (
                <div 
                  className="fixed inset-0 z-[999998] bg-black/10" 
                  onClick={() => setIsMobileDropdownOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MODULE HEADER SIMPLE COMPONENT
// ============================================================================

interface ModuleHeaderSimpleProps {
  title: string
  searchPlaceholder?: string
  showSearch?: boolean
  modules?: Array<{
    id: string
    label: string
    icon: any
    description: string
  }>
  activeModule?: string
  onModuleChange?: (moduleId: string) => void
}

export function ModuleHeaderSimple({ 
  title, 
  searchPlaceholder = "Ara...", 
  showSearch = true,
  modules = [], 
  activeModule, 
  onModuleChange 
}: ModuleHeaderSimpleProps) {
  return (
    <header className="bg-white border-b border-orange-200 px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Left side - Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ana Menü Button */}
          {onModuleChange && (
            <button
              onClick={() => onModuleChange("dashboard")}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-lg text-xs sm:text-sm px-2 sm:px-4 rounded-md py-2"
            >
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              <span className="hidden sm:inline">Ana Menü</span>
              <span className="sm:hidden">Ana</span>
            </button>
          )}

          {/* Hamburger Menu - Z-index ve spacing düzeltmesi */}
          {onModuleChange && modules.length > 0 && (
            <div className="relative group">
              <button
                className="border-orange-300 text-orange-600 hover:bg-orange-50 text-xs sm:text-sm px-2 sm:px-3 rounded-md py-2 border"
              >
                <Menu className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
                <span className="hidden sm:inline">Diğer Modüller</span>
                <span className="sm:hidden">Modüller</span>
                <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 ml-1 sm:ml-2 inline" />
              </button>
              
              {/* Dropdown - Z-index artırıldı, spacing azaltıldı */}
              <div className="absolute top-full left-0 mt-1 w-72 sm:w-80 bg-white border border-orange-200 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3">
                  <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">TÜM MODÜLLER</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 max-h-80 overflow-y-auto">
                    {modules.filter(m => m.id !== activeModule).map((module) => {
                      const IconComponent = module.icon
                      return (
                        <button
                          key={module.id}
                          onClick={() => onModuleChange(module.id)}
                          className="p-2 sm:p-3 rounded-lg text-left hover:bg-orange-50 transition-colors text-gray-700 group/item"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 group-hover/item:text-orange-600" />
                            <span className="font-medium text-xs sm:text-sm">{module.label}</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">{module.description}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Title - Mobile responsive */}
        <div className="hidden lg:block">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>

        {/* Search Bar - Mobile responsive */}
        {showSearch && (
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-8 sm:pl-10 bg-white/50 border-orange-200 focus:border-orange-400 text-xs sm:text-sm h-8 sm:h-10 rounded-md border w-full"
            />
          </div>
        )}

        {/* Right side - Mobile responsive */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="text-gray-500 hover:text-orange-600 h-8 w-8 sm:h-10 sm:w-10 rounded-md hover:bg-gray-100">
            <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          
          <div className="h-6 w-6 sm:h-8 sm:w-8 overflow-hidden rounded-full bg-gray-300">
            {/* Placeholder for user image */}
          </div>
        </div>
      </div>
    </header>
  )
}

// ============================================================================
// USER PROFILE COMPONENT
// ============================================================================

interface GoogleUser {
  id: string
  name: string
  email: string
  picture: string
  given_name: string
  family_name: string
}

interface UserProfileProps {
  user: GoogleUser
  onSignOut: () => void
}

export const UserProfile = ({ user, onSignOut }: UserProfileProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-xl bg-white rounded-lg">
      <div className="text-center pb-2 p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">Hoş geldiniz!</h3>
          <button
            onClick={onSignOut}
            className="text-gray-500 hover:text-red-600 rounded-md p-1"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="text-center space-y-4 p-4">
        <div className="h-20 w-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-2xl font-semibold text-orange-600">
            {getInitials(user.name)}
          </span>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-xl font-semibold text-gray-900">{user.name}</h4>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        
        <div className="pt-4 space-y-3">
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <User className="h-3 w-3" />
              <span>Google ID: {user.id.slice(0, 12)}...</span>
            </div>
          </div>
          
          <button
            onClick={onSignOut}
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-md py-2 px-4"
          >
            <LogOut className="mr-2 h-4 w-4 inline" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  )
}

// Compact version for header
export const UserProfileCompact = ({ user, onSignOut }: UserProfileProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-white shadow-sm">
      <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
        <span className="text-xs font-semibold text-orange-600">
          {getInitials(user.name)}
        </span>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{user.given_name}</p>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>
      
      <button
        onClick={onSignOut}
        className="text-gray-400 hover:text-red-600 p-1 rounded-md"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  )
}

// ============================================================================
// LANGUAGE SELECTOR COMPONENT
// ============================================================================

const languages = [
  { code: 'tr', name: 'Türkçe', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', native: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', native: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', native: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', native: 'Русский', flag: '🇷🇺' },
]

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState('tr')

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.flag} {currentLanguage.native}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            <div className="p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    language === lang.code
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{lang.native}</div>
                      <div className="text-xs text-gray-500">{lang.name}</div>
                    </div>
                  </div>
                  {language === lang.code && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ============================================================================
// PLACEHOLDER COMPONENTS (Mock implementations for missing dependencies)
// ============================================================================

// Button placeholder
function LocalButton({ children, variant, size, className, onClick }: any) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

// Card placeholder
function LocalCard({ children, className }: any) {
  return <div className={className}>{children}</div>;
}

// CardContent placeholder
function LocalCardContent({ children, className }: any) {
  return <div className={className}>{children}</div>;
}

// Input placeholder
function LocalInput({ type, placeholder, className }: any) {
  return <input type={type} placeholder={placeholder} className={className} />;
}

// Badge placeholder
function LocalBadge({ children, className }: any) {
  return <span className={className}>{children}</span>;
}

// Avatar placeholder
function LocalAvatar({ children, className }: any) {
  return <div className={className}>{children}</div>;
}

// AvatarImage placeholder
function LocalAvatarImage({ src, alt }: any) {
  return <img src={src} alt={alt} />;
}

// AvatarFallback placeholder
function LocalAvatarFallback({ children, className }: any) {
  return <div className={className}>{children}</div>;
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  LocalButton as Button,
  LocalCard as Card,
  LocalCardContent as CardContent,
  LocalInput as Input,
  LocalBadge as Badge,
  LocalAvatar as Avatar,
  LocalAvatarImage as AvatarImage,
  LocalAvatarFallback as AvatarFallback
}; 