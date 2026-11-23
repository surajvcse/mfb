import fs from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { createContactApi } from './server/contact.mjs'

const contactApi: Plugin = {
  name: 'mfb-contact-api',
  configureServer(server) {
    server.middlewares.use(createContactApi())
  },
  configurePreviewServer(server) {
    server.middlewares.use(createContactApi())
  },
}

// Automatically create 404.html from index.html for SPA routing on GitHub Pages
const copy404Plugin: Plugin = {
  name: 'copy-404-for-github-pages',
  closeBundle() {
    const dist = fileURLToPath(new URL('dist', import.meta.url))
    const indexHtml = resolve(dist, 'index.html')
    const notFoundHtml = resolve(dist, '404.html')
    if (fs.existsSync(indexHtml)) {
      fs.copyFileSync(indexHtml, notFoundHtml)
    }
  },
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/mfb/' : '/',
  plugins: [react(), tailwindcss(), contactApi, copy404Plugin],
  server: {
    fs: {
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.contact-data/**', '**/contact-inquiries*.xlsx'],
    },
  },
})
