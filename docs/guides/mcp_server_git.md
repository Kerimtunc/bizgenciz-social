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

#### Nasıl çalışır (adım adım, Windows yoluyla örnek)
1. Cursor, `mcp.json` içindeki `mcpServers` tanımlarını okuyup her bir servis için komut çalıştırır.
2. `mcp-server-git` için `command: "uvx"` olduğunda Cursor, arka planda `uvx` programını çağırır ve `args` dizisini komut satırı argümanları olarak geçirir.
   - Bu örnekte komut satırı şu hale gelir (tam olarak):
     - `uvx mcp-server-git -r C:\\kod\\cekirdek --verbose`
3. `uvx` çalıştırıldığı makinede gerekli Python paketi veya ikiliyi izole bir ortamda indirip çalıştırır. Bu nedenle global kurulum gerekmez.
4. `-r C:\\kod\\cekirdek` ile verdiğiniz yol, `mcp-server-git` sunucusuna hangi dizindeki Git deposunu izleyeceğini söyler. Cursor bu komut aracılığıyla repo içindeki branch, action ve PR bilgilerini sorgulayabilir.

Örnek: Windows PowerShell'de Cursor tarafından çağrılan komutun eşdeğeri
```powershell
uvx mcp-server-git -r C:\\kod\\cekirdek --verbose
```

Not: Eğer yolunuz boşluk veya özel karakter içeriyorsa, `"C:\\Users\\My Name\\Projects\\repo"` şeklinde çift tırnak kullanın.

#### Hangi koşullar gereklidir
- `C:\\kod\\cekirdek` dizininin gerçekten bir Git deposu olması (içinde `.git` dizini veya geçerli commit geçmişi) gerekir.
- Cursor çalıştırıldığı kullanıcı hesabının bu dizine erişim izni olmalı.
- `uvx` çalıştığında internet erişimi olmalı (paket indirme için) veya ilgili paketler önceden cache'te bulunmalı.

#### Neden `--verbose` kullandım
- `--verbose` ayrıntılı log tutar; ilk kurulum ve hata ayıklamada gerekli gösterimleri sağlar. Cursor / MCP entegrasyonunda, yapılandırma hataları veya yetki problemlerini hızlıca tespit etmek için başlangıçta açık tutmak faydalıdır.

#### Güvenlik/izinler
- `mcp-server-git` Git işlemlerini lokal dosya sistemi üzerinden okur; dolayısıyla dosya izinlerinin doğru olması gerekir.
- GitHub Actions veya uzaktan işlemler için `gh auth login` kullanarak GitHub CLI ile oturum açmak daha güvenlidir; token dosyaya yazmaktan kaçının.


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
 - GitHub’a push ve Actions erişimi için `gh auth login` önerilir. Token’ı dosyaya yazmak yerine `gh` ile oturum daha güvenlidir.

## Tam kurulum ve çalıştırma (adım adım, Windows PowerShell örneği)

Aşağıdaki adımlar, sıfırdan bir makinede Cursor + mcp-server-git entegrasyonunu çalışır hale getirmek içindir.

1) Gerekli araçları yükleyin
- Git (https://git-scm.com/)
- GitHub CLI (`gh`) (https://cli.github.com/)
- Node.js (LTS)
- uvx (projede önceden yapılandırıldıysa Cursor tarafından kullanılacak; sistemde olmaması sorun değil ama manuel test için pipx veya pip ile `mcp-server-git` kurulabilir)

2) GitHub CLI ile oturum açın (güvenli)
```powershell
gh auth login
# Web browser ile oturum açın; HTTPS protokolü tercih edilebilir
```

3) Proje dizinine git ve ilk commit/push
```powershell
cd C:\\kod\\cekirdek
git init
git config user.email "you@example.com"
git config user.name "your-name"
git add -A
git commit -m "chore: repo init for MCP integration"
git branch -M main
git remote add origin https://github.com/Kerimtunc/bizgenciz-social.git
git push -u origin main
```

4) Cursor tarafında `mcp.json` yapılandırması
- `c:\\Users\\<kullanici>\\.cursor\\mcp.json` içinde `mcp-server-git` kısmını şu şekilde tanımlayın:

```json
"mcp-server-git": {
  "command": "uvx",
  "args": ["mcp-server-git", "-r", "C:\\kod\\cekirdek", "--verbose"]
}
```

Not: Kullanıcı isminiz farklıysa tam path'i ona göre değiştirin. Örnek: `C:\\Users\\Kerim Bahadır\\Projects\\cekirdek`.

5) Manuel test: mcp-server-git'i doğrudan çalıştırma (isteğe bağlı)
- Eğer `uvx` yüklü değilse pipx/pip ile kurup test edebilirsiniz:

PowerShell örneği (pipx varsa):
```powershell
pipx run mcp-server-git --help
pipx run mcp-server-git -r C:\\kod\\cekirdek --verbose
```

Alternatif (uvx kullanılıyorsa Cursor bunu otomatik çağırır):
```powershell
uvx mcp-server-git -r C:\\kod\\cekirdek --verbose
```

6) CI tetikleme ve kontrol
- Değişiklikleri pushladıktan sonra GitHub Actions otomatik çalışır. Çalışmaları görmek için:
```powershell
gh run list -R Kerimtunc/bizgenciz-social --limit 10
gh run view <run-id> -R Kerimtunc/bizgenciz-social --log
```

7) Hata ayıklama ipuçları
- `Error: 'request' is defined but never used.` -> API route fonksiyon imzasındaki kullanılmayan parametreleri kaldırın (örneğin `GET(request: NextRequest)` yerine `GET()`).
- `Warning: Unexpected any.` -> `any` kullanımı lint kurallarını tetikler; gerekiyorsa daraltılmış tip alias'ları kullanın veya kodu küçük shimlerle sarın.
- CI hala eski commit'i görüyor gibi davranıyorsa yeni bir commit (ör. `git commit --allow-empty -m "ci: trigger"`) yapıp pushlayın, böylece yeni run tetiklenir.

8) Örnek: PowerShell ile mcp-server-git loglarını almak
```powershell
# Cursor çağrısı yerine manuel log almak isterseniz (proje içi logs dizinine yazılır):
uvx mcp-server-git -r C:\\kod\\cekirdek --verbose > C:\\kod\\cekirdek\\logs\\mcp-server-git\\mcp-server-git-$(Get-Date -Format yyyyMMdd-HHmmss).log 2>&1
Get-Content C:\\kod\\cekirdek\\logs\\mcp-server-git\\mcp-server-git-*.log -Tail 200 -Wait
```

Bu adımların sonunda Cursor, mcp.json üzerinden `mcp-server-git` servisini başlatıp repo bağlamında git/status/actions sorgularını yapabilir.

---

## Doğrulama — komutlar ve örnek çıktılar
Aşağıdaki kısa kontrolleri yaparak kurulumun ve entegrasyonun çalıştığını doğrulayabilirsiniz.

- Yerelde mcp-server-git loglarını listele (en yeni 5):
```powershell
Get-ChildItem -Path "${PWD}\\logs\\mcp-server-git" -File | Sort-Object LastWriteTime -Descending | Select-Object -First 5 | Format-Table FullName,LastWriteTime -AutoSize
```

- En yeni log'u tail'lemek (cihazınızda gerçek zamanlı izleme için):
```powershell
$f = Get-ChildItem -Path "${PWD}\\logs\\mcp-server-git" -File | Sort-Object LastWriteTime -Descending | Select-Object -First 1; if ($f) { Get-Content $f.FullName -Tail 200 -Wait } else { Write-Host 'No logs found' }
```

Örnek log satırı (başarıyla bağlandığını gösterir):
```
INFO:mcp_server_git.server:Using repository at C:\kod\cekirdek
```

- Git remote ve GitHub repo kontrolü:
```powershell
git remote -v
gh repo view Kerimtunc/bizgenciz-social --json name,url,visibility,primaryLanguage,viewerPermission
```

Örnek remote çıktısı:
```
origin  https://github.com/Kerimtunc/bizgenciz-social.git (fetch)
origin  https://github.com/Kerimtunc/bizgenciz-social.git (push)
```

Not: `gh repo view` ile sorgularken `defaultBranch` alanı yerine `defaultBranchRef.name` veya `primaryLanguage` gibi mevcut alanları kullanabilirsiniz. Örnek:
```powershell
gh repo view Kerimtunc/bizgenciz-social --json defaultBranchRef | ConvertTo-Json -Depth 5
```

Başarı kriterleri:
- `mcp-server-git` loglarında `Using repository at <repoPath>` görünüyor olmalı.
- `git remote -v` doğru `origin` URL'sini göstermeli.
- `gh repo view` çıktısı repo meta verisini döndürmeli.

Eğer bu üç koşul sağlanmışsa MCP+Cursor integrasyonu çalışır durumda demektir.

