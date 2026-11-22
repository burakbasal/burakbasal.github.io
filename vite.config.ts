import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    {
      // Production only: a meta CSP cannot be served as a real header on
      // GitHub Pages, and a strict policy would break Vite's dev HMR client.
      name: 'production-csp',
      apply: 'build',
      transformIndexHtml(html) {
        const policy = [
          "default-src 'self'",
          "script-src 'self' 'nonce-bb-portfolio-2026'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
          "frame-src 'none'",
          'upgrade-insecure-requests',
        ].join('; ')
        return html.replace('</head>', `    <meta http-equiv="Content-Security-Policy" content="${policy}" />\n  </head>`)
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
