import type { Directive } from 'vue'

declare module 'vue' {
  export interface GlobalDirectives {
    vReveal: Directive<HTMLElement, number | undefined>
  }
}

export {}
