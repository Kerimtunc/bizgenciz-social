'use client';

import React, { Component, ErrorInfo, ReactNode, useState, useEffect, useCallback } from 'react';

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className="font-inter">
        <GlobalErrorBoundary showErrorDetails={process.env.NODE_ENV === 'development'}>
          <AccessibilityProvider>
            <ClientWrapper>
              {children}
            </ClientWrapper>
            <ErrorToastManager maxToasts={5} autoCloseDuration={8000} />
          </AccessibilityProvider>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}

// ============================================================================
// CLIENT WRAPPER COMPONENT
// ============================================================================

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <TenantProvider>
        {children}
        <CookieConsentPopup />
        <ConsentRenewalPopup />
      </TenantProvider>
    </ErrorBoundary>
  );
}

// ============================================================================
// GLOBAL ERROR BOUNDARY COMPONENT
// ============================================================================

interface GlobalErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({ errorInfo, errorId });

    console.error('🔒 Global Error Boundary caught an error:', {
      errorId,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorId: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private copyErrorDetails = () => {
    const errorDetails = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2))
      .then(() => {
        alert('Hata detayları panoya kopyalandı');
      })
      .catch(() => {
        alert('Hata detayları kopyalanamadı');
      });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-red-800 mb-2">
                Beklenmeyen Bir Hata Oluştu
              </h1>
              <p className="text-red-600 text-lg">
                Uygulama beklenmeyen bir hata ile karşılaştı. Lütfen aşağıdaki seçeneklerden birini deneyin.
              </p>
            </div>

            {/* Error Details */}
            {this.state.error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-red-800">Hata Detayları</h3>
                  {this.state.errorId && (
                    <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                      ID: {this.state.errorId}
                    </span>
                  )}
                </div>
                <p className="text-sm text-red-700 mb-2">
                  {this.state.error.message}
                </p>
                
                {this.props.showErrorDetails && this.state.error.stack && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-xs text-red-600 hover:text-red-800 font-medium">
                      Stack Trace (Geliştirici Modu)
                    </summary>
                    <pre className="mt-2 p-3 bg-red-100 rounded text-xs text-red-800 overflow-auto max-h-32">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button
                onClick={this.handleRetry}
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Tekrar Dene
              </button>

              <button
                onClick={this.handleReload}
                className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Sayfayı Yenile
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Ana Sayfaya Dön
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.copyErrorDetails}
                className="flex items-center justify-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Hata Detaylarını Kopyala
              </button>

              <a
                href="mailto:support@example.com?subject=Uygulama Hatası"
                className="flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Destek Ekibine Bildir
              </a>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                Hata ID: {this.state.errorId || 'N/A'} | 
                Zaman: {new Date().toLocaleString('tr-TR')}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Bu hata otomatik olarak kaydedildi ve geliştirici ekibimize bildirildi.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================================
// ERROR TOAST MANAGER COMPONENT
// ============================================================================

interface ErrorToast {
  id: string;
  type: string;
  severity: string;
  message: string;
  title?: string;
  action?: string;
  retry?: () => void;
  timestamp: number;
}

interface ErrorToastManagerProps {
  maxToasts?: number;
  autoCloseDuration?: number;
}

const ErrorToastManager: React.FC<ErrorToastManagerProps> = ({
  maxToasts = 5,
  autoCloseDuration = 8000
}) => {
  const [toasts, setToasts] = useState<ErrorToast[]>([]);

  // Add new toast
  const addToast = useCallback((toast: Omit<ErrorToast, 'id' | 'timestamp'>) => {
    const newToast: ErrorToast = {
      ...toast,
      id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };

    setToasts(prev => {
      const updated = [newToast, ...prev];
      
      if (updated.length > maxToasts) {
        return updated.slice(0, maxToasts);
      }
      
      return updated;
    });
  }, [maxToasts]);

  // Remove toast
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Clear all toasts
  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Auto-remove toasts after duration
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setToasts(prev => 
        prev.filter(toast => now - toast.timestamp < autoCloseDuration)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [autoCloseDuration]);

  // Expose addToast method globally
  useEffect(() => {
    (window as any).showErrorToast = addToast;
    (window as any).clearErrorToasts = clearAllToasts;

    return () => {
      delete (window as any).showErrorToast;
      delete (window as any).clearErrorToasts;
    };
  }, [addToast, clearAllToasts]);

  // Calculate toast positions
  const getToastPosition = (index: number) => {
    const baseTop = 16;
    const spacing = 8;
    const toastHeight = 200;
    
    return {
      top: `${baseTop + (index * (toastHeight + spacing))}px`,
      right: '16px'
    };
  };

  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="pointer-events-auto"
          style={getToastPosition(index)}
        >
          <ErrorToast
            error={toast}
            onClose={() => removeToast(toast.id)}
            autoClose={true}
            duration={autoCloseDuration}
          />
        </div>
      ))}
      
      {/* Clear All Button */}
      {toasts.length > 1 && (
        <div
          className="fixed top-4 right-4 z-50 pointer-events-auto"
          style={{ top: `${16 + (toasts.length * 208)}px` }}
        >
          <button
            onClick={clearAllToasts}
            className="bg-gray-800 text-white px-3 py-1 rounded-md text-xs hover:bg-gray-700 transition-colors shadow-lg"
          >
            Tümünü Temizle ({toasts.length})
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// ERROR TOAST COMPONENT
// ============================================================================

interface ErrorToastProps {
  error: {
    type: string;
    severity: string;
    message: string;
    title?: string;
    action?: string;
    retry?: () => void;
  };
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const ErrorToast: React.FC<ErrorToastProps> = ({
  error,
  onClose,
  autoClose = true,
  duration = 8000
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  // Auto-close functionality
  useEffect(() => {
    if (!autoClose) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;
      
      setProgress(newProgress);

      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      } else {
        handleClose();
      }
    };

    const animationId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationId);
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleRetry = () => {
    if (error.retry) {
      error.retry();
    }
    handleClose();
  };

  // Get icon based on error type
  const getIcon = () => {
    switch (error.type) {
      case 'NETWORK':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        );
      case 'AUTHENTICATION':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'VALIDATION':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'TIMEOUT':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
    }
  };

  // Get color scheme based on severity
  const getColorScheme = () => {
    switch (error.severity) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-500',
          border: 'border-red-600',
          text: 'text-white',
          icon: 'text-red-100',
          progress: 'bg-red-300'
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-500',
          border: 'border-orange-600',
          text: 'text-white',
          icon: 'text-orange-100',
          progress: 'bg-orange-300'
        };
      case 'MEDIUM':
        return {
          bg: 'bg-yellow-500',
          border: 'border-yellow-600',
          text: 'text-white',
          icon: 'text-yellow-100',
          progress: 'bg-yellow-300'
        };
      case 'LOW':
        return {
          bg: 'bg-blue-500',
          border: 'border-blue-600',
          text: 'text-white',
          icon: 'text-blue-100',
          progress: 'bg-blue-300'
        };
      default:
        return {
          bg: 'bg-gray-500',
          border: 'border-gray-600',
          text: 'text-white',
          icon: 'text-gray-100',
          progress: 'bg-gray-300'
        };
    }
  };

  const colors = getColorScheme();

  // Get user-friendly title
  const getTitle = () => {
    if (error.title) return error.title;

    switch (error.type) {
      case 'NETWORK':
        return 'Bağlantı Hatası';
      case 'AUTHENTICATION':
        return 'Kimlik Doğrulama Hatası';
      case 'VALIDATION':
        return 'Doğrulama Hatası';
      case 'TIMEOUT':
        return 'Zaman Aşımı';
      case 'SERVER_ERROR':
        return 'Sunucu Hatası';
      case 'NOT_FOUND':
        return 'Bulunamadı';
      default:
        return 'Bir Hata Oluştu';
    }
  };

  // Get user-friendly message
  const getUserFriendlyMessage = () => {
    const messages: Record<string, string> = {
      'NETWORK': 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.',
      'AUTHENTICATION': 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.',
      'AUTHORIZATION': 'Bu işlem için yetkiniz bulunmuyor.',
      'VALIDATION': 'Lütfen girdiğiniz bilgileri kontrol edin.',
      'NOT_FOUND': 'Aradığınız içerik bulunamadı.',
      'SERVER_ERROR': 'Sunucu geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
      'CLIENT_ERROR': 'İstek işlenirken bir hata oluştu.',
      'TIMEOUT': 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.',
      'UNKNOWN': 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.'
    };

    return messages[error.type] || error.message;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div
        className={`
          ${colors.bg} ${colors.border} ${colors.text}
          border-2 rounded-lg shadow-xl p-4 transform transition-all duration-300
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`${colors.icon} flex-shrink-0`}>
              {getIcon()}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {getTitle()}
              </h3>
              {error.action && (
                <p className="text-sm opacity-90">
                  İşlem: {error.action}
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message */}
        <div className="mb-4">
          <p className="text-sm leading-relaxed">
            {getUserFriendlyMessage()}
          </p>
        </div>

        {/* Progress Bar */}
        {autoClose && (
          <div className="mb-4">
            <div className="w-full bg-white bg-opacity-20 rounded-full h-1">
              <div
                className={`${colors.progress} h-1 rounded-full transition-all duration-100`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          {error.retry && (
            <button
              onClick={handleRetry}
              className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
            >
              Tekrar Dene
            </button>
          )}
          
          <button
            onClick={handleClose}
            className="flex-1 bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
          >
            Kapat
          </button>
        </div>

        {/* Technical Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-3">
            <summary className="cursor-pointer text-xs opacity-75 hover:opacity-100">
              Teknik Detaylar
            </summary>
            <div className="mt-2 p-2 bg-white bg-opacity-10 rounded text-xs">
              <p><strong>Tip:</strong> {error.type}</p>
              <p><strong>Önem:</strong> {error.severity}</p>
              <p><strong>Mesaj:</strong> {error.message}</p>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// PLACEHOLDER COMPONENTS (Mock implementations for missing dependencies)
// ============================================================================

// ErrorBoundary placeholder
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// AccessibilityProvider placeholder
function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// TenantProvider placeholder
function TenantProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// CookieConsentPopup placeholder
function CookieConsentPopup() {
  return null;
}

// ConsentRenewalPopup placeholder
function ConsentRenewalPopup() {
  return null;
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  GlobalErrorBoundary,
  ErrorToastManager,
  ErrorToast,
  ErrorBoundary,
  AccessibilityProvider,
  TenantProvider,
  CookieConsentPopup,
  ConsentRenewalPopup
}; 