export interface Localized {
  en: string
  tr: string
}

export interface ProjectLink {
  label: 'live' | 'source'
  href: string
}

export interface Project {
  index: string
  title: string
  kind: Localized
  description: Localized
  tags: string[]
  image: string
  links: ProjectLink[]
  note?: Localized
  privateRepo?: boolean
}

/**
 * Every featured project has a verified public URL. Screenshots were captured
 * from those live pages. Private repositories are labelled and expose only the
 * public demo — no source, configuration or internal links.
 */
export const projects: Project[] = [
  {
    index: '07',
    title: 'Global Bilgi · CallSim',
    kind: { en: 'Voice simulation · Live demo', tr: 'Ses simülasyonu · Canlı demo' },
    description: {
      en: 'A local Turkish call-centre simulation and candidate assessment platform with voice interaction and scenario-based evaluation.',
      tr: 'Sesli etkileşim ve senaryo tabanlı değerlendirme içeren, yerel Türkçe çağrı merkezi simülasyonu ve aday değerlendirme platformu.',
    },
    tags: ['Python', 'TypeScript', 'PostgreSQL'],
    image: '/images/callsim.svg',
    links: [{ label: 'live', href: 'https://aksa.pages.dev/' }],
    note: {
      en: 'The published demo needs its local origin running; it may return 503 when offline.',
      tr: 'Yayındaki demo yerel origin açık olmasını gerektirir; kapalıyken 503 dönebilir.',
    },
    privateRepo: true,
  },
  {
    index: '01',
    title: 'Roamcroft',
    kind: { en: 'Browser game · Public', tr: 'Tarayıcı oyunu · Açık kaynak' },
    description: {
      en: 'An isometric farming and exploration world with cooperative village building, real-time 3D and saves that respect your time.',
      tr: 'İzometrik çiftlik ve keşif dünyası; co-op köy kurma, gerçek zamanlı 3D ve zamanınıza saygılı kayıtlar.',
    },
    tags: ['TypeScript', 'React', 'Three.js', 'Cloudflare'],
    image: '/images/roamcroft.jpg',
    links: [
      { label: 'live', href: 'https://roamcroft.com/' },
      { label: 'source', href: 'https://github.com/burakbasal/Roamcroft' },
    ],
  },
  {
    index: '02',
    title: 'satkolay',
    kind: { en: 'Marketplace · Public', tr: 'Pazar yeri · Açık kaynak' },
    description: {
      en: 'A second-hand marketplace built as a focused Next.js application with a PostgreSQL-backed data layer.',
      tr: 'Odaklı Next.js arayüzü ve PostgreSQL veri katmanıyla geliştirilmiş ikinci el pazar yeri.',
    },
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    image: '/images/satkolay.jpg',
    links: [
      { label: 'live', href: 'https://satkolay.com/' },
      { label: 'source', href: 'https://github.com/burakbasal/satkolay' },
    ],
    note: {
      en: 'Live site currently redirects to a maintenance page.',
      tr: 'Canlı site şu anda bakım sayfasına yönlendiriliyor.',
    },
  },
  {
    index: '03',
    title: 'endless-wordle',
    kind: { en: 'Word game · Live demo', tr: 'Kelime oyunu · Canlı demo' },
    description: {
      en: 'An unlimited Wordle-style guessing game with a fresh random word on every play.',
      tr: 'Her oyununda yeni bir rastgele kelime üreten, sınırsız Wordle benzeri tahmin oyunu.',
    },
    tags: ['JavaScript', 'Game logic', 'Responsive'],
    image: '/images/endless-wordle.jpg',
    links: [{ label: 'live', href: 'https://burakbasal.github.io/endless-wordle/' }],
    privateRepo: true,
  },
  {
    index: '04',
    title: 'neon-grid-smash',
    kind: { en: 'Puzzle · Live demo', tr: 'Bulmaca · Canlı demo' },
    description: {
      en: 'A mobile-friendly neon grid puzzle built with HTML, CSS and JavaScript.',
      tr: 'HTML, CSS ve JavaScript ile geliştirilmiş, mobil uyumlu neon ızgara bulmacası.',
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'Mobile'],
    image: '/images/neon-grid-smash.jpg',
    links: [{ label: 'live', href: 'https://burakbasal.github.io/neon-grid-smash/' }],
    privateRepo: true,
  },
  {
    index: '05',
    title: 'wall-race',
    kind: { en: 'Strategy game · Live demo', tr: 'Strateji oyunu · Canlı demo' },
    description: {
      en: 'A minimal board game with drag-and-drop walls, local multiplayer and a time-bounded search AI.',
      tr: 'Sürükle-bırak duvarlar, yerel çok oyunculu oyun ve zaman sınırlı arama yapay zekâsı içeren minimal strateji oyunu.',
    },
    tags: ['JavaScript', 'Game AI', 'Local multiplayer'],
    image: '/images/wall-race.jpg',
    links: [{ label: 'live', href: 'https://burakbasal.github.io/wall-race/' }],
    privateRepo: true,
  },
  {
    index: '06',
    title: 'rezonans',
    kind: { en: 'Interactive · Live demo', tr: 'Etkileşimli · Canlı demo' },
    description: {
      en: 'An interactive browser experience built with HTML and CSS.',
      tr: 'HTML ve CSS ile geliştirilmiş etkileşimli tarayıcı deneyimi.',
    },
    tags: ['HTML', 'CSS', 'Interactive'],
    image: '/images/rezonans.jpg',
    links: [{ label: 'live', href: 'https://burakbasal.github.io/rezonans/' }],
    privateRepo: true,
  },
]
