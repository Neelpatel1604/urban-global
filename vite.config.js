import { defineConfig } from 'vite'; // Ensure this import is included
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'mapbox-gl': 'mapbox-gl',
    },
  },
  optimizeDeps: {
    include: ['mapbox-gl'],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
