export type ArtKind = 'world' | 'market' | 'signal' | 'grid'

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  index: string
  title: string
  kind: string
  description: string
  tags: string[]
  art: ArtKind
  span: 'wide' | 'narrow'
  private?: boolean
  note?: string
  links?: ProjectLink[]
}

/**
 * Content is limited to what could be verified from the public GitHub profile,
 * public repository metadata and live sites. Private projects appear only as
 * high-level descriptions from their repository descriptions — no source,
 * configuration or internal links are reproduced.
 */
export const projects: Project[] = [
  {
    index: '01',
    title: 'Roamcroft',
    kind: 'Browser game · Public',
    description:
      'An isometric farming and exploration world with cooperative village building. A living valley, real-time 3D and saves that respect your time.',
    tags: ['TypeScript', 'React', 'Three.js', 'Cloudflare'],
    art: 'world',
    span: 'wide',
    links: [
      { label: 'Live site', href: 'https://roamcroft.com/' },
      { label: 'Source', href: 'https://github.com/burakbasal/Roamcroft' },
    ],
  },
  {
    index: '02',
    title: 'satkolay',
    kind: 'Marketplace · Public',
    description:
      'A second-hand marketplace built as a focused Next.js application with a PostgreSQL-backed data layer.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    art: 'market',
    span: 'narrow',
    note: 'The live demo currently redirects to a maintenance page.',
    links: [{ label: 'Source', href: 'https://github.com/burakbasal/satkolay' }],
  },
  {
    index: '03',
    title: 'void',
    kind: 'Messaging · Private',
    description:
      'A quiet, real-time messaging platform. Built with Next.js, TypeScript and Supabase.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    art: 'signal',
    span: 'narrow',
    private: true,
  },
  {
    index: '04',
    title: 'wall-race',
    kind: 'Strategy game · Private',
    description:
      'A minimal board game with drag-and-drop walls, local multiplayer and a time-bounded search AI.',
    tags: ['JavaScript', 'Game AI', 'Local multiplayer'],
    art: 'grid',
    span: 'wide',
    private: true,
  },
]
