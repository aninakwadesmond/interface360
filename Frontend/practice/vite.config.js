import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    // This should be the default - don't override unless necessary
    preprocessorOptions: {
      scss: {
        // No special configuration needed
      },
    },
  },
});
// vite.config.js
