import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served from https://nandiraju.github.io/CSS_CUBE/ — asset URLs need this prefix
  base: '/CSS_CUBE/',
})
