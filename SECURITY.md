# Security posture

Bu portfolyo statik bir sitedir: giriş yok, veritabanı yok, kullanıcı girdisi yok, üçüncü parti script yok.
Repoda gizli anahtar, token veya kimlik bilgisi bulunmaz.

## Aktif korumalar

| Katman | Uygulama |
|---|---|
| İçerik | Seçim, kopyalama, kesme, sürükleme/bırakma, sağ tık, yazdırma, Ctrl+F ve klavye kısayolları engellenir; `selectionchange` her seçimi anında sıfırlar; yerel uyarı gösterilir. |
| Konsol | Üretimde tüm `console.*` metotları non-writable/non-configurable no-op’a çevrilir ve `console` dondurulur; 250 ms’de bir yeniden uygulanır. |
| DevTools | Yükleme anındaki tarayıcı çerçevesi ölçüsü referans alınır; docked konsol bu referansı ~300 px değiştirir ve **tek başına** kalkanı tetikler. Undocked konsol için debugger zamanlaması + odak kaybı birlikte aranır. Görev çubuğu/ölçekleme referansa dahil olduğu için yanlış pozitif oluşmaz; kilit 10 saniye yapışkan. |
| Kalkan | DOM’dan silinse de `MutationObserver` geri ekler; sınıf değişimi geri alınır. |
| Kanarya | Deneme sayıları yalnızca `localStorage`’da tutulur; kimlik, ağ isteği veya kişisel veri yoktur. |
| CSP | Build sırasında meta CSP eklenir: `script-src 'self'`, `object-src 'none'`, `frame-src 'none'`, `upgrade-insecure-requests`. |
| Botlar | `robots.txt` **varsayılan reddeder**, yalnızca adlandırılmış arama/önizleme botlarına izin verir; AI botları açıkça disallow edilir. `main.ts` bu user-agent’lar için içeriği render etmez; Worker 403 uygular. Gizli `BB-NOAI-2026-11-24` canary’si ve `/noai-honeypot.txt` tuzak bağlantısı izinsiz kazımayı tespit eder. |
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
