# Security posture

Bu portfolyo statik bir sitedir: giriş yok, veritabanı yok, kullanıcı girdisi yok, üçüncü parti script yok.
Repoda gizli anahtar, token veya kimlik bilgisi bulunmaz.

## Aktif korumalar

| Katman | Uygulama |
|---|---|
| İçerik | Seçim, kopyalama, kesme, sürükleme/bırakma, sağ tık, yazdırma, Ctrl+F ve klavye kısayolları engellenir; `selectionchange` her seçimi anında sıfırlar; yerel uyarı gösterilir. |
| Konsol | Üretimde tüm `console.*` metotları non-writable/non-configurable no-op’a çevrilir ve `console` dondurulur; 250 ms’de bir yeniden uygulanır. |
| DevTools | Pencere geometrisi (100 px eşik), `chrome.devtools`, debugger zamanlaması ve odak kaybı (ayrı pencere DevTools) algılanır; sayfa kalkanla bulanıklaşır, kilit 20 saniye yapışkan tutulur. |
| Kalkan | DOM’dan silinse de `MutationObserver` geri ekler; sınıf değişimi geri alınır. |
| Kanarya | Deneme sayıları yalnızca `localStorage`’da tutulur; kimlik, ağ isteği veya kişisel veri yoktur. |
| CSP | Build sırasında meta CSP eklenir: `script-src 'self'`, `object-src 'none'`, `frame-src 'none'`, `upgrade-insecure-requests`. |
| Botlar | `robots.txt` GPTBot, CCBot, ClaudeBot, Google-Extended, Applebot-Extended, Bytespider, PerplexityBot, Amazonbot ve Meta-ExternalAgent’ı engeller; Cloudflare Worker bu user-agent’ları 403 ile reddeder. |
| Başlıklar | `no-referrer`, genişletilmiş `Permissions-Policy`, `noai/noimageai` meta ve X-Robots-Tag, COOP/COEP/CORP. |
| Yasal | `LICENSE` (tüm hakları saklıdır), `humans.txt`, `legal.txt` (ToS + DMCA/FSEK ihbar süreci), footer’da © ve Yasal bağlantısı. |

## Dürüst sınır

İstemci tarafındaki hiçbir kod, tarayıcıda görüntülenen içeriği **tamamen** koruyamaz:
DevTools menüden açılabilir, JavaScript kapatılabilir, Network sekmesinden dosyalar indirilebilir,
ekran görüntüsü alınabilir, sayfa kaydedilebilir. Yukarıdakiler **caydırıcı ve iz bırakmayan**
önlemlerdir; kriptografik güvenlik değildir.

Gerçek HTTP başlıkları (`HSTS`, `X-Frame-Options`, `COOP/CORP`, `frame-ancestors`) için GitHub Pages
desteklenmez. Canlı `curl -I` çıktısında yalnızca GitHub’ın kendi HSTS başlığı görünür; `_headers`
dosyası burada okunmaz. `cloudflare/` klasöründe hazır Worker ve `_headers` yapılandırması var;
kurulum adımları `cloudflare/README.md` içinde.

## Bildirim

Güvenlik açığı bildirimi:
https://github.com/burakbasal/burakbasal.github.io/security/advisories/new
