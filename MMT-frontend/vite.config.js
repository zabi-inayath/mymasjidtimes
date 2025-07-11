import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'myMasjidTimes',
      short_name: 'MasjidTimes',
      description: 'myMasjidTimes is a non-profit web app for accurate salah times, iqamah schedules, and masjid updates.',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#fef9ef',
      icons: [
        {
          src: '/myMasjidTimes_Logo.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/myMasjidTimes_Logo.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
})
