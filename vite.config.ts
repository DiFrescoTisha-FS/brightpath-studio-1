import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Strip console.* and debugger statements from production bundles.
  // Lifts Best Practices score and removes a small perf cost from
  // leftover dev logging in service files.
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    // Emits .map files alongside the JS so Lighthouse's "Missing source
    // maps for large first-party JavaScript" audit passes. Sourcemaps are
    // separate files — they don't bloat the JS the user downloads.
    sourcemap: true,
    // Path-based chunking — keep React + ReactDOM in their own chunk so
    // router/animation libraries don't drag them into the main bundle.
    // Same pattern as the AweStruck site after we fixed its phantom-chunk
    // bug from the array-form manualChunks.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom/') || id.includes('node_modules/react/')) {
            return 'react-vendor';
          }
          if (
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/@remix-run/') ||
            id.includes('node_modules/history/')
          ) {
            return 'router';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'framer';
          }
          if (id.includes('node_modules/@radix-ui/')) {
            return 'radix';
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
