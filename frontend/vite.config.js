import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  optimizeDeps: {
    include: ['linked-dep']
  },
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/]
    }
  },
  server: {
    host: 'localhost',
    port: 3000
  },
  plugins: [viteCompression(), react(), svgr()]
})
