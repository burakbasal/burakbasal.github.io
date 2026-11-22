# Gerçek HTTP güvenlik başlıkları

GitHub Pages özel response header desteklemez. `index.html` içindeki meta CSP çalışır ama
`frame-ancestors`, `HSTS`, `X-Frame-Options`, `COOP/CORP` gibi başlıkların **meta karşılığı yoktur**.
 Bunları etkinleştirmek için Cloudflare ücretsiz katmanını sitenin önüne koyman gerekir.

## Seçenek A — Cloudflare Worker (mevcut GitHub Pages adresi korunur)

1. Cloudflare’a `burakbasal.github.io` için bir zone ekle, Nameserver’ları Cloudflare’a çevir.
2. Workers & Pages → **Create Worker** → `worker.js` içeriğini yapıştır → Deploy.
3. Worker’ın **Routes** kısmına `burakbasal.github.io/*` ekle.
4. Doğrula:

```bash
curl -sI https://burakbasal.github.io/ | grep -Ei 'content-security|strict-transport|x-frame|x-content|permissions|cross-origin'
```

## Seçenek B — Cloudflare Pages’e taşı

`public/_headers` dosyası zaten Cloudflare Pages formatında hazır. Repoyu Cloudflare Pages’e
bağladığında otomatik okunur. `build` komutu `npm run build`, output dizini `dist`.

## Notlar

- CSP içindeki nonce sabittir; sayfada kullanıcı girdisi/HTML enjeksiyonu olmadığı için pratik risk yoktur.
  Daha sıkı olması istenirse her istekte Worker ile rastgele nonce üretip HTML’i yeniden yazmak gerekir.
- Bu dosyalar repo’da durur; DNS/Cloudflare tarafında değişiklik yapmak hesabını gerektirir, bu yüzden
  mevcut canlı sitede hâlâ meta CSP aktiftir.
