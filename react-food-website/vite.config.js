import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 把大套件拆出來獨立打包
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'react-icons'],
          'vendor-map': ['react-leaflet', 'leaflet'], // 地圖特別大，一定要拆
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/database']
        }
      }
    }
  }
})