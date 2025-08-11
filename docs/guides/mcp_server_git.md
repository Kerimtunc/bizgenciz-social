## mcp-server-git kurulumu ve Cursor entegrasyonu (Windows)

Bu belge, mcp-server-git sunucusunu Cursor MCP altyapısı ile kullanmak için yapılan `mcp.json` ayarını, parametrelerin ne işe yaradığını ve uçtan uca çalışma akışını açıklar.

### 1) Amaç
- Git deposu bilgilerini MCP araçları üzerinden erişilebilir kılmak (örn. `git_status`).
- GitHub Actions ve uzak repo ile ilgili kontrolleri MCP üzerinden tetiklemek/okumak.

### 2) Gereksinimler
- Git kurulu olmalı ve depo başlatılmış olmalı (`git init`, ilk commit, `origin` bağlandı ve push yapıldı).
- GitHub CLI (`gh`) ile giriş yapılmış olması önerilir (Actions ve remote işlemleri için):
  - `gh auth login`
- Python `uv` aracı (komut: `uvx`) sistemde kurulu olmalı. `uvx mcp-server-git` ile paket, sanal ortamda anlık çalıştırılır.

### 3) mcp-server-git’in orijinal kurulumu (önerilen: uvx ile)
- Uygulama olarak ayrı bir kurulum yapmanıza gerek yok; `uvx` mcp-server-git’i gerektiğinde indirip çalıştırır:
  - Örnek yardım çıktısı: `uvx mcp-server-git --help`
  - Sunucuyu elle başlatma örneği: `uvx mcp-server-git -r C:\kod\cekirdek --verbose`

Alternatifler (bilgi amaçlı):
- pipx ile global kurulum veya doğrudan `pip install mcp-server-git` de mümkündür; ancak bu projede `uvx` tercih edildi.

### 4) Cursor MCP entegrasyonu (mcp.json)
`c:\Users\tunc\.cursor\mcp.json` içine şu yapı eklenir/güncellenir:

```json
{
  "mcpServers": {
    "mcp-server-git": {
      "command": "uvx",
      "args": [
        "mcp-server-git",
        "-r",
        "C:\\kod\\cekirdek",
        "--verbose"
      ]
    }
  }
}
```

#### Parametrelerin anlamı
- `-r <PATH>`: mcp-server-git’in hangi Git deposu ile çalışacağını belirtir. Windows’ta tam yol kullanmak en sağlam yöntemdir (örn. `C:\\kod\\cekirdek`).
- `--verbose`: Ayrıntılı log üretir; hata ayıklamayı kolaylaştırır.

Notlar:
- mcp-server-git bir “sunucu”dur. CLI’dan `git_status` gibi alt komutlar çalıştırılmaz. Bu araçları, MCP destekli istemci (Cursor) sunucuya bağlandıktan sonra uzaktan çağırır.
- CLI’da `mcp-server-git git_status` gibi kullanım “unexpected extra argument” hatası üretir; doğru kullanım sunucuyu başlatmaktır.

### 5) Doğrulama ve tipik akış
1. Depoyu hazırlayın: `git init`, `git add -A`, `git commit -m "init"`, `git branch -M main`, `git remote add origin <repo>`, `git push -u origin main`.
2. `mcp.json`’u yukarıdaki gibi ayarlayın. Cursor yeniden yüklendiğinde mcp-server-git otomatik başlatılır.
3. Cursor içinde mcp-server-git araçları (ör. `git_status`) görünür hale gelir. Çağrı yapıldığında sunucuya `-r` ile verdiğiniz depo bağlamı ile işlem yapılır.

### 6) Sorun/Çözüm
- `fatal: not a git repository`: Depo başlatılmamış. `git init` ve ilk commit/push adımlarını tamamlayın.
- `Aborted!` sadece CLI ile sunucu çalıştırıldığında görülebilir; bu, istemci olmadan başlatıldığı için normaldir. Cursor bağlandığında araçlar aktif çalışır.
- `unexpected extra argument (git_status)`: Sunucuya CLI ile alt komut verilmiş demektir. Doğru kullanım: sunucuyu başlatmak; yöntem çağrılarını Cursor MCP yapar.

### 7) Güvenlik
- GitHub’a push ve Actions erişimi için `gh auth login` önerilir. Token’ı dosyaya yazmak yerine `gh` ile oturum daha güvenlidir.


