# Security posture

Bu portfolyo statik bir sitedir: giriş yok, veritabanı yok, kullanıcı girdisi yok, üçüncü parti script yok.
Repoda gizli anahtar, token veya kimlik bilgisi bulunmaz.

## Aktif korumalar

| Katman | Uygulama |
|---|---|
| İçerik | Seçim, kopyalama, kesme, sürükleme, sağ tık, yazdırma ve klavye kısayolları engellenir; yerel uyarı gösterilir. |
| Konsol | Üretimde tüm `console.*` metotları non-writable/non-configurable no-op’a çevrilir ve `console` dondurulur; 250 ms’de bir yeniden uygulanır. |
| DevTools | Pencere geometrisi, debugger zamanlaması ve odak kaybı (ayrı pencere DevTools) algılanır; sayfa kalkanla bulanıklaşır. |
| Kalkan | DOM’dan silinse de `MutationObserver` geri ekler; sınıf değişimi geri alınır. |
| Kanarya | Deneme sayıları yalnızca `localStorage`’da tutulur; kimlik, ağ isteği veya kişisel veri yoktur. |
| CSP | Build sırasında meta CSP eklenir: `script-src 'self'`, `object-src 'none'`, `frame-src 'none'`, `upgrade-insecure-requests`. |
| Diğer | `referrer strict-origin-when-cross-origin`, `Permissions-Policy`, `robots.txt`, `sitemap.xml`, özel 404, `security.txt`. |

## Dürüst sınır

İstemci tarafındaki hiçbir kod, tarayıcıda görüntülenen içeriği **tamamen** koruyamaz:
DevTools menüden açılabilir, JavaScript kapatılabilir, Network sekmesinden dosyalar indirilebilir,
ekran görüntüsü alınabilir, sayfa kaydedilebilir. Yukarıdakiler **caydırıcı ve iz bırakmayan**
önlemlerdir; kriptografik güvenlik değildir.

Gerçek HTTP başlıkları (`HSTS`, `X-Frame-Options`, `COOP/CORP`, `frame-ancestors`) için GitHub Pages
desteklenmez. `cloudflare/` klasöründe hazır Worker ve `_headers` yapılandırması var; kurulum
adımları `cloudflare/README.md` içinde.

## Bildirim

Güvenlik açığı bildirimi:
https://github.com/burakbasal/burakbasal.github.io/security/advisories/new
