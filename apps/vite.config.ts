import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
import type { Plugin } from 'vite'

function excludeMockServiceWorker(): Plugin {
  return {
    name: 'exclude-mock-service-worker',
    closeBundle() {
      const file = path.resolve(__dirname, 'dist/mockServiceWorker.js')
      if (fs.existsSync(file)) fs.unlinkSync(file)
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    cssInjectedByJs(),
    ...(command === 'build' ? [excludeMockServiceWorker()] : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, '../api/src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'apps.js',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
}))
