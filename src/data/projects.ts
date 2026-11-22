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
 * Every project links to a verified public URL. Screenshots come from the live
 * pages or from owner-supplied captures. Private repositories expose only the
 * public demo — never source, configuration or internal links.
 */
export const projects: Project[] = [
  {
    index: '01',
    title: 'Roamcroft',
    kind: { en: 'Browser game · Public', tr: 'Tarayıcı oyunu · Açık kaynak' },
    description: {
      en: 'An isometric, real-time 3D farming and exploration world with cooperative village building. Live at roamcroft.com.',
      tr: 'İzometrik, gerçek zamanlı 3D çiftlik ve keşif dünyası; co-op köy kurma. Yayında: roamcroft.com.',
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
      en: 'A second-hand marketplace built with Next.js and a PostgreSQL data layer. Live at satkolay.com.',
      tr: 'Next.js ve PostgreSQL veri katmanıyla geliştirilmiş ikinci el pazar yeri. Yayında: satkolay.com.',
    },
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    image: '/images/satkolay.jpg',
    links: [
      { label: 'live', href: 'https://satkolay.com/' },
      { label: 'source', href: 'https://github.com/burakbasal/satkolay' },
    ],
    note: {
      en: 'The public site is currently in maintenance mode.',
      tr: 'Canlı site şu anda bakım modunda.',
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
    index: '05',
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
  {
    index: '06',
    title: 'Global Bilgi · CallSim',
    kind: { en: 'Voice simulation · Live demo', tr: 'Ses simülasyonu · Canlı demo' },
    description: {
      en: 'A Turkish call-centre simulation and candidate assessment platform with voice interaction and scenario-based evaluation. Live at aksa.pages.dev.',
      tr: 'Sesli etkileşim ve senaryo tabanlı değerlendirme içeren Türkçe çağrı merkezi simülasyonu ve aday değerlendirme platformu. Yayında: aksa.pages.dev.',
    },
    tags: ['Python', 'TypeScript', 'PostgreSQL'],
    image: '/images/callsim.jpg',
    links: [{ label: 'live', href: 'https://aksa.pages.dev/' }],
    note: {
      en: 'The demo runs against a local origin, so it can be offline.',
      tr: 'Demo yerel origin üzerinden çalışır; kapalıyken erişilemeyebilir.',
    },
    privateRepo: true,
  },
]
