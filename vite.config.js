import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/languageContext/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    restoreMocks: true,
    setupFiles: './src/setupTests.js',
  },
});
