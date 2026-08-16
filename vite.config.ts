import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub project pages live at /<repo>/ — leave unset for local `npm run dev`.
  base: process.env.GITHUB_ACTIONS ? '/beijing-trip-2026-itinerary-viewer/' : '/',
  plugins: [react(), tailwindcss()],
})
