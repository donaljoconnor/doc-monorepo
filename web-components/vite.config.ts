import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cssInjectedByJs(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../apps/src'),
      '@api': path.resolve(__dirname, '../api/src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'web-components.js',
      },
    },
  },
})
