import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    environment: 'jsdom',
    exclude: ['src/app/app.spec.ts', 'node_modules/**'],
  },
});