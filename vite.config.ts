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

export default defineConfig({
  plugins: [react(), tailwindcss(), contactApi],
  server: {
    fs: {
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.contact-data/**', '**/contact-inquiries*.xlsx'],
    },
  },
})
