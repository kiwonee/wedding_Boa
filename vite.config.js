import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  base: '/wedding_Boa/',
  plugins: [
    react(),
    imagetools(),
  ],
  assetsInclude: ['**/*.mp3', '**/*.weba'],
})
