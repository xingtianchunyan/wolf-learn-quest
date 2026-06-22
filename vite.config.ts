import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('@radix-ui')) return 'radix-ui';
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('recharts')) return 'charts';
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('lucide-react')) return 'icons';
          if (
            id.includes('react') ||
            id.includes('react-dom') ||
            id.includes('react-router-dom')
          ) {
            return 'react-vendor';
          }

          return 'vendor';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/__tests__/'],
    },
  },
});
