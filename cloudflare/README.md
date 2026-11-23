# Gerçek HTTP güvenlik başlıkları

GitHub Pages özel response header desteklemez. `index.html` içindeki meta CSP çalışır ama
`frame-ancestors`, `HSTS`, `X-Frame-Options`, `COOP/CORP` gibi başlıkların **meta karşılığı yoktur**.
Bunları etkinleştirmek için Cloudflare ücretsiz katmanını sitenin önüne koyman gerekir.

Bu klasördeki Worker yalnızca header eklemez: her HTML yanıtındaki statik nonce’u **istek başına
üretilen rastgele nonce** ile değiştirir. Böylece CSP’deki nonce gerçek anlamda tek kullanımlık olur.
Ayrıca `GPTBot`, `CCBot`, `ClaudeBot`, `Google-Extended`, `Bytespider`, `PerplexityBot` ve benzeri
AI eğitim botlarını user-agent üzerinden **HTTP 403 ile reddeder**, `X-Robots-Tag: noai, noimageai`
gönderir ve `no-referrer` + genişletilmiş `Permissions-Policy` + COOP/COEP/CORP başlıklarını ekler.
Googlebot ve Bingbot bilinçli olarak engellenmez; arama sıralaması korunur.

## Kurulum

1. Cloudflare’a `burakbasal.github.io` zone’unu ekle, nameserver’ları Cloudflare’a çevir.
2. Repository **Settings → Secrets and variables → Actions** altına iki secret ekle:
   - `CLOUDFLARE_API_TOKEN` (Zone: Edit yetkisi)
   - `CLOUDFLARE_ACCOUNT_ID`
3. **Actions → Deploy Cloudflare security Worker → Run workflow** ile Worker’ı yayınla.
4. Worker_route’u ekle (bir kez):

```bash
cd cloudflare
npx wrangler route add "burakbasal.github.io/*" burakbasal-security-headers
```

5. Doğrula:

```bash
curl -sI https://burakbasal.github.io/ | grep -Ei 'content-security|strict-transport|x-frame|x-content|permissions|cross-origin|x-robots|referrer'
curl -sI -A 'GPTBot' https://burakbasal.github.io/ | head -n 1
curl -s https://burakbasal.github.io/ | grep -o "nonce-[A-Za-z0-9_-]*" | sort -u
```

İkinci komut **tek bir benzersiz nonce** göstermelidir: JSON-LD attribute’u ve meta CSP aynı değeri kullanır.
`bb-portfolio-2026` görürsen statik fallback kalmış demektir. Komutu iki kez çalıştırınca nonce değişmelidir.

Worker ayrıca CSP ihlallerini `/_csp-report` adresinde toplar. `Reporting-Endpoints` başlığı ve CSP içindeki
`report-to csp` / `report-uri /_csp-report` yönergeleri tarayıcının rapor göndermesini sağlar; raporlar
`wrangler tail` çıktısında `CSP_REPORT` olarak görünür. DNS taşındıktan sonra Cloudflare dashboard’unda
DNSSEC’i aç ve CAA kaydı ekle (`issue "letsencrypt.org"`).

## Alternatif — Cloudflare Pages’e taşı

`public/_headers` dosyası Cloudflare Pages formatında hazır. Build: `npm run build`, output: `dist`.
Bu yolda nonce hâlâ statiktir; dinamik nonce için Worker gerekir.

## Not

GitHub Pages bu dosyaları okumaz; canlı `curl -I` çıktısında yalnızca GitHub’ın HSTS başlığı vardır.
Meta CSP aktif yedektir. DNS değişikliği senin Cloudflare hesabını gerektirir; kod tarafı hazır.
