import { ref, watch } from 'vue'

export type Locale = 'tr' | 'en'

const KEY = 'bb-locale'
const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(KEY) : null

export const locale = ref<Locale>(stored === 'en' || stored === 'tr' ? stored : 'tr')

const messages = {
  en: {
    'meta.title': 'Burak Basal — Developer',
    'meta.description': 'Burak Basal is a developer working across software, interfaces, real-time systems and browser games. Explore selected work and get in touch.',
    'name.last': 'Basal',
    'skip': 'Skip to content',
    'brand.meta': 'PORTFOLIO / 26',
    'brand.label': 'BB. PORTFOLIO / 26 — back to top',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.expertise': 'Expertise',
    'nav.contact': 'Contact',
    'nav.cta': "Let's talk",
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'hero.index': '01 / 05',
    'hero.eyebrow': 'Developer · Interfaces · Games',
    'hero.role': 'Interfaces, interactions and games for the web.',
    'hero.descA': 'I build software with attention to the part people feel — pace, weight and detail. Fast, accessible,',
    'hero.descB': 'quietly distinct.',
    'hero.ctaWork': 'Selected work',
    'hero.ctaContact': 'Get in touch',
    'hero.scroll': 'Scroll',
    'stats.projects': 'Projects',
    'stats.live': 'Live demos',
    'stats.areas': 'Expertise areas',
    'stats.profiles': 'Profiles',
    'work.eyebrow': '02 / Selected work',
    'work.lead': 'Selected',
    'work.accent': 'work.',
    'work.aside': "Live interfaces, browser worlds and small utilities — each with a working link and a real screenshot.",
    'project.live': 'Live site',
    'project.source': 'Source',
    'project.private': 'Private repo',
    'project.privateNote': 'Source is private — the live demo is public.',
    'a11y.newTab': 'opens in a new tab',
    'guard.title': 'What would you do with this information?',
    'guard.body': 'This content is not available for copying. You can reach me through the contact links below.',
    'guard.close': 'Got it',
    'shield.title': 'Developer tools detected',
    'shield.body': 'This page is protected. Close developer tools to continue.',
    'about.eyebrow': '03 / About',
    'about.leadA': 'Software that feels',
    'about.leadB': 'considered.',
    'about.leadC': 'Engineering quiet enough that the details do the talking.',
    'about.p1': "I'm Burak, a developer working across software, interfaces and browser games. I care about typography, pacing and the small decisions that make an interface feel inevitable.",
    'about.p2': 'My work ranges from production web apps to an isometric farming world with real-time co-op. I like the whole arc: shaping an idea, building the system behind it, then tuning the last five percent in the browser.',
    'about.focus': 'Focus',
    'about.focusValue': 'Software engineering across the stack',
    'about.also': 'Also',
    'about.alsoValue': 'Browser games & real-time systems',
    'about.standard': 'Standard',
    'about.standardValue': 'Fast, accessible, built with care',
    'about.eduLabel': 'Education',
    'about.eduValue': 'Vocational & Technical Anatolian High School — Information Technologies, Software Development',
    'about.soloLabel': 'How I work',
    'about.soloValue': 'Every project on this site was designed and built solo — no team, no borrowed credit.',
    'about.certLabel': 'Certificates',
    'about.cert1': 'CCNA: Introduction to Networks',
    'about.cert2': 'CyberOps Associate',
    'about.cert3': 'Ethical Hacker',
    'expertise.eyebrow': '04 / Expertise',
    'expertise.lead': 'What I',
    'expertise.accent': 'work with.',
    'expertise.aside': 'A practical mix of interface craft and engineering — verified by the public work above.',
    'expertise.skills': 'Skills in',
    'contact.eyebrow': '05 / Contact',
    'contact.lead': "Let's build something",
    'contact.accent': 'worth keeping.',
    'contact.foot': 'For work, collaborations or a good conversation about interfaces, these are the best ways to reach me.',
    'contact.profile': 'profile',
    'footer.rights': '© 2026 Burak Basal',
    'footer.top': 'Back to top',
    'controls.theme': 'Switch to light theme',
    'controls.themeDark': 'Switch to dark theme',
  },
  tr: {
    'meta.title': 'Burak Başal — Developer',
    'meta.description': 'Burak Başal; yazılım, arayüzler, gerçek zamanlı sistemler ve tarayıcı oyunları alanlarında çalışan bir developer. Seçili çalışmaları inceleyin ve iletişime geçin.',
    'name.last': 'Başal',
    'skip': 'İçeriğe geç',
    'brand.meta': 'PORTFOLYO / 26',
    'brand.label': 'BB. PORTFOLYO / 26 — başa dön',
    'nav.work': 'Çalışmalar',
    'nav.about': 'Hakkımda',
    'nav.expertise': 'Uzmanlık',
    'nav.contact': 'İletişim',
    'nav.cta': 'Konuşalım',
    'menu.open': 'Menüyü aç',
    'menu.close': 'Menüyü kapat',
    'hero.index': '01 / 05',
    'hero.eyebrow': 'Geliştirici · Arayüzler · Oyunlar',
    'hero.role': 'Web için arayüzler, etkileşimler ve oyunlar.',
    'hero.descA': 'Yazılımı, insanların hissettiği kısma dikkat ederek yazıyorum — tempo, ağırlık ve detay. Hızlı, erişilebilir,',
    'hero.descB': 'sessizce farklı.',
    'hero.ctaWork': 'Seçili çalışmalar',
    'hero.ctaContact': 'İletişime geç',
    'hero.scroll': 'Kaydır',
    'stats.projects': 'Proje',
    'stats.live': 'Canlı demo',
    'stats.areas': 'Uzmanlık alanı',
    'stats.profiles': 'Profil',
    'work.eyebrow': '02 / Seçili çalışmalar',
    'work.lead': 'Seçili',
    'work.accent': 'çalışmalar.',
    'work.aside': 'Canlı arayüzler, tarayıcı dünyaları ve küçük araçlar — her biri çalışan bağlantı ve gerçek ekran görüntüsüyle.',
    'project.live': 'Canlı site',
    'project.source': 'Kaynak',
    'project.private': 'Özel repo',
    'project.privateNote': 'Kaynak kodu özel — canlı demo herkese açık.',
    'a11y.newTab': 'yeni sekmede açılır',
    'guard.title': 'Bu bilgileri ne yapacaksın?',
    'guard.body': 'Bu içerik kopyalanamaz. Bana ulaşmak için aşağıdaki iletişim bağlantılarını kullanabilirsin.',
    'guard.close': 'Tamam',
    'shield.title': 'Geliştirici araçları algılandı',
    'shield.body': 'Bu sayfa korumalı. Devam etmek için geliştirici araçlarını kapat.',
    'about.eyebrow': '03 / Hakkımda',
    'about.leadA': 'Hissedilen yazılım',
    'about.leadB': 'özenli.',
    'about.leadC': 'Detayların konuştuğu, sessiz bir mühendislik.',
    'about.p1': 'Ben Burak. Yazılım, arayüzler ve tarayıcı oyunları alanlarında çalışan bir geliştiriciyim. Tipografiye, ritme ve bir arayüzü kaçınılmaz hissettiren küçük kararlara önem veriyorum.',
    'about.p2': 'İşim, üretim web uygulamalarından gerçek zamanlı co-op destekli izometrik bir çiftlik dünyasına uzanıyor. Fikri şekillendirmek, arkasındaki sistemi kurmak ve son yüzde beşi tarayıcıda ayarlamak — tüm süreci seviyorum.',
    'about.focus': 'Odak',
    'about.focusValue': 'Geniş yelpazede yazılım geliştirme',
    'about.also': 'Ayrıca',
    'about.alsoValue': 'Tarayıcı oyunları & gerçek zamanlı sistemler',
    'about.standard': 'Standart',
    'about.standardValue': 'Hızlı, erişilebilir, özenle yapılmış',
    'about.eduLabel': 'Eğitim',
    'about.eduValue': 'Mesleki ve Teknik Anadolu Lisesi — Bilişim Teknolojileri, Yazılım Geliştirme',
    'about.soloLabel': 'Çalışma biçimi',
    'about.soloValue': 'Bu sitedeki her proje tek başıma tasarlandı ve geliştirildi — ekip yok, paylaşılan kredi yok.',
    'about.certLabel': 'Sertifikalar',
    'about.cert1': 'CCNA: Introduction to Networks',
    'about.cert2': 'CyberOps Associate',
    'about.cert3': 'Ethical Hacker',
    'expertise.eyebrow': '04 / Uzmanlık',
    'expertise.lead': 'Nelerle',
    'expertise.accent': 'çalışıyorum.',
    'expertise.aside': 'Arayüz zanaatı ile mühendisliğin pratik bir karışımı — yukarıdaki açık çalışmalarla doğrulanmış.',
    'expertise.skills': 'Alanındaki beceriler',
    'contact.eyebrow': '05 / İletişim',
    'contact.lead': 'Birlikte kalıcı bir şey',
    'contact.accent': 'üretelim.',
    'contact.foot': 'İş, iş birliği ya da arayüzler hakkında iyi bir sohbet için bana ulaşmanın en iyi yolları bunlar.',
    'contact.profile': 'profili',
    'footer.rights': '© 2026 Burak Başal',
    'footer.top': 'Başa dön',
    'controls.theme': 'Açık temaya geç',
    'controls.themeDark': 'Koyu temaya geç',
  },
} as const

export type MessageKey = keyof typeof messages.en

export function t(key: MessageKey): string {
  return messages[locale.value][key]
}

watch(
  locale,
  (next) => {
    const dict = messages[next]
    document.documentElement.lang = next
    document.title = dict['meta.title']
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict['meta.description'])
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', dict['meta.title'])
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', dict['meta.description'])
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', next === 'tr' ? 'tr_TR' : 'en_US')
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', dict['meta.title'])
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', dict['meta.description'])
    localStorage.setItem(KEY, next)
  },
  { immediate: true },
)

export function setLocale(next: Locale) {
  locale.value = next
}
