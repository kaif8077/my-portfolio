import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  // Yeh add karein:
  assetsInclude: ['**/*.pdf'],
  
  // Server configuration
  server: {
    hmr: {
      overlay: false  // Error overlay disable karne ke liye
    }
  }
})