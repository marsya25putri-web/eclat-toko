import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/toko-penjahit/app/',
  build: {
    outDir: '../app',
    emptyOutDir: true
  }
})