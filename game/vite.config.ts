/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';

// Static, self-contained browser build. Base './' keeps it portable
// (works from a sub-path or a static host). No server-side code.
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsInlineLimit: 4096,
    sourcemap: false,
  },
  server: {
    port: 5173,
    host: '127.0.0.1',
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
