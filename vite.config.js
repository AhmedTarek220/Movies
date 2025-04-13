// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from 'vite-plugin-compression'; // تم تصحيح الخطأ هنا

export default defineConfig({
  plugins: [
    react(),
    viteCompression(), // تأكد من أن الحزمة مفعلة هنا
  ],
  build: {
    minify: "terser",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-dom/client', 'react/jsx-dev-runtime'],
          'router': ['react-router-dom'],
          'swiper': ['swiper/react', 'swiper'],
          'image': ['react-lazy-load-image-component'],
          'utils': ['axios'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
