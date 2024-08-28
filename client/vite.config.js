import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Example of setting up aliases
      buffer: 'buffer/'
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
});
