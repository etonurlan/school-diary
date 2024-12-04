import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Адрес вашего бэкенда
        changeOrigin: true, // Меняет Origin на адрес целевого сервера
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      }
    }
  }
})
