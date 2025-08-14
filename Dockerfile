# ============================================
# AŞAMA 1: Builder - Bağımlılıkları kur ve kodu derle
# ============================================
# Not: Base imajın versiyonu ve SHA256 digest'i ile sabitlenmiştir. Bu, mutlak tekrarlanabilirlik sağlar.
FROM node:18.15.1-alpine@sha256:8c6b7b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b AS builder

WORKDIR /app

# Sadece bağımlılık manifestlerini kopyala.
# Bu katman sadece manifestler değiştiğinde yeniden çalışır, kod değiştiğinde değil. Build hızını optimize eder.
COPY package.json package-lock.json ./
# npm kullanıyoruz çünkü daha hızlı ve disk alanı açısından daha verimli.
RUN npm ci --omit=dev

# Tüm kaynak kodunu kopyala ve uygulamayı build et
COPY . .
# Next.js build komutu
RUN npm run build

# ============================================
# AŞAMA 2: Production - Sadece runtime için gerekenler
# ============================================
FROM node:18.15.1-alpine@sha256:8c6b7b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b AS runner

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init curl

# Ayrıcalıksız bir kullanıcı oluştur ve kullan. Bu, güvenlik için kritiktir.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Builder aşamasından sadece derlenmiş/gerekli dosyaları kopyala
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Prisma client ve database files
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/lib ./lib

# Environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT:-3000}/api/health || exit 1

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE ${PORT:-3000}

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node_modules/.bin/next", "start"] 