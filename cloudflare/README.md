# Gerçek HTTP güvenlik başlıkları

GitHub Pages özel response header desteklemez. `index.html` içindeki meta CSP çalışır ama
`frame-ancestors`, `HSTS`, `X-Frame-Options`, `COOP/CORP` gibi başlıkların **meta karşılığı yoktur**.
Bunları etkinleştirmek için Cloudflare ücretsiz katmanını sitenin önüne koyman gerekir.

Bu klasördeki Worker yalnızca header eklemez: her HTML yanıtındaki statik nonce’u **istek başına
üretilen rastgele nonce** ile değiştirir. Böylece CSP’deki nonce gerçek anlamda tek kullanımlık olur.

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
curl -sI https://burakbasal.github.io/ | grep -Ei 'content-security|strict-transport|x-frame|x-content|permissions|cross-origin'
curl -s https://burakbasal.github.io/ | grep -o "nonce-[A-Za-z0-9_-]*" | sort -u
```

İkinci komut **tek bir benzersiz nonce** göstermelidir: JSON-LD attribute’u ve meta CSP aynı değeri kullanır.
`bb-portfolio-2026` görürsen statik fallback kalmış demektir. Komutu iki kez çalıştırınca nonce değişmelidir.

## Alternatif — Cloudflare Pages’e taşı

`public/_headers` dosyası Cloudflare Pages formatında hazır. Build: `npm run build`, output: `dist`.
Bu yolda nonce hâlâ statiktir; dinamik nonce için Worker gerekir.

## Not

GitHub Pages bu dosyaları okumaz; canlı `curl -I` çıktısında yalnızca GitHub’ın HSTS başlığı vardır.
Meta CSP aktif yedektir. DNS değişikliği senin Cloudflare hesabını gerektirir; kod tarafı hazır.
