import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@authentication': path.resolve(__dirname, './src/features/authentication'),
      '@transactions': path.resolve(__dirname, './src/features/transactions'),
      '@categories': path.resolve(__dirname, './src/features/categories'),
    },
  }
});
