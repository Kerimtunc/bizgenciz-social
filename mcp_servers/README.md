# BizGenciz MCP Sunucusu

Bu paket, BizGenciz monorepo/proje kökünde (bir üst klasör) test/denetim araçlarını Model Context Protocol (MCP) üzerinden sunar.

## Kurulum

```bash
cd mcp_servers
npm install
```

## Geliştirme

```bash
npm run dev
```

Bu komut MCP sunucusunu stdio üzerinden başlatır. Bir MCP istemcisi (örn. Cursor, Claude Desktop) bu süreci MCP sunucusu olarak ekleyebilir.

## Üretim

```bash
npm run build
npm start
```

## Sağlanan Araçlar (Tools)

- `run` — Proje kökünde keyfi bir komutu çalıştırır (örn: `npx jest`).
- `check:all` — Tip kontrolü, lint, jest, playwright ve prisma doğrulamasını sırasıyla çalıştırır.
- `check:type` — `npx tsc --noEmit`
- `check:lint` — `npx next lint`
- `check:jest` — `npx jest --passWithNoTests`
- `check:e2e` — `npx playwright test --reporter=list`
- `check:prisma` — `npx prisma validate`

## Hızlı Doğrulama

```bash
npm run selftest
```

Bu komut iç testleri çalıştırır ve kısa bir özet yazdırır.