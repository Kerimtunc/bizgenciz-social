/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  output: 'standalone',
  
  // TypeScript configuration - kök nedenleri çöz
  typescript: {
    ignoreBuildErrors: false, // Hataları görmezden gelme, çöz
  },
  
  // Performance optimizations
  experimental: {
    esmExternals: true,
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    // Bundle optimization
    bundlePagesRouterDependencies: true,
  },
  
  // Image optimization
  images: {
    domains: ['localhost', 'your-supabase-project.supabase.co'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
  },
  
  // Compression
  compress: true,
  
  // Powered by header
  poweredByHeader: false,
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Server external packages
  serverExternalPackages: ['@prisma/client'],
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
                           {
                   key: 'Permissions-Policy',
                   value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()',
                 },
                 {
                   key: 'X-XSS-Protection',
                   value: '1; mode=block',
                 },
                 {
                   key: 'X-Content-Type-Options',
                   value: 'nosniff',
                 },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
      {
        source: '/:path*.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/panel',
        permanent: true,
      },
    ];
  },
  
  // Webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
               // Production optimizations
           if (!dev) {
             // Tree shaking
             config.optimization.usedExports = true;
             config.optimization.sideEffects = false;

             // Split chunks optimization
             config.optimization.splitChunks = {
               chunks: 'all',
               cacheGroups: {
                 vendor: {
                   test: /[\\/]node_modules[\\/]/,
                   name: 'vendors',
                   chunks: 'all',
                   priority: 10,
                 },
                 react: {
                   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                   name: 'react',
                   chunks: 'all',
                   priority: 20,
                 },
                 three: {
                   test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
                   name: 'three',
                   chunks: 'all',
                   priority: 15,
                 },
                 radix: {
                   test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
                   name: 'radix',
                   chunks: 'all',
                   priority: 15,
                 },
                 common: {
                   name: 'common',
                   minChunks: 2,
                   chunks: 'all',
                   enforce: true,
                   priority: 5,
                 },
               },
             };

             // Minification optimization
             config.optimization.minimize = true;
           }
    
    return config;
  },
};

module.exports = nextConfig; 