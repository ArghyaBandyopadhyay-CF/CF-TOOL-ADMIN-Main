// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],

  define: {
    // Keeps old CRA-style `process.env.*` references from crashing.
    // Prefer using import.meta.env.VITE_* going forward.
    'process.env': {}
  },

  server: {
    port: 3000,
    open: true
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    // Avoid noisy "chunk is larger than 500kb" warnings
    chunkSizeWarningLimit: 3000
  }
})
