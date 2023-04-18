import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
// import { terser } from 'rollup-plugin-terser';
// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  optimizeDeps: {
    include: ['linked-dep'],
  },
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },

  },
  server: {
      host: 'localhost',
    port: 3000,
  },
  plugins: [
    react(),
    svgr(),
  ],
})

// "vite-plugin-svgr": "^2.4.0","cssnano": "^6.0.0",
//     "sass": "^1.62.0",
//     "vite-plugin-compression": "^0.5.1",
//     "vite-plugin-optimizer": "^1.4.2",
//     "vite-plugin-react-refresh": "^1.0.0"