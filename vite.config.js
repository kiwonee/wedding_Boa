import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/wedding_Boa/',
  plugins: [react()],
  assetsInclude: ['**/*.mp3', '**/*.weba'],
})
