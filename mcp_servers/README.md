# MCP Servers (Model Context Protocol) for BizGenciz

Bu klasör, projeye entegre edilecek MCP (Model Context Protocol) sunucularının başlangıç scaffolding'ini içerir. Amaç:

- Proje sağlık verilerini, Supabase/Redis/Sentry durumlarını MCP üzerinden paylaşabilmek
- CI / dev araçlarının MCP ile konuşarak proje durumunu sorgulayabilmesi

Seçilen SDK'lar
- **TypeScript SDK** (öncelikli): `modelcontextprotocol/typescript-sdk` — Node/TS ekosistemiyle doğrudan entegre edebilmek için.
- **Python SDK** (opsiyonel): opsiyonel analiz ve entegrasyon görevleri için kullanılabilir.

Hızlı başlama
1. `cd mcp_servers`
2. `npm install` (package.json içinde SDK referansı var)
3. `npm run start` — yerel MCP sunucusunu başlatır (örnek, henüz prod-ready değil)

Notlar
- Bu klasör başlangıç içindir; gerçek deployment için service account/secret management, TLS, auth ve scaling eklenmelidir.


