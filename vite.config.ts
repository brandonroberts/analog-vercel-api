/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      nitro: {
        routeRules: {
          '/**': {
            headers: { 'X-Robots-Tag': 'all' }
          },
          '/**/*.(jpg|jpeg|gif|png)': {
            headers: { 'Cache-Control': 'public, max-age=31536000, immutable'}
          },
          '/index.html': {
            redirect: {
              to: '/',
              statusCode: 301
            }
          }
        },
        preset: 'vercel'
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
