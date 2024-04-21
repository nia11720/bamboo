import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

/** @type {import('vite').UserConfig} */
export default {
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue'],
          'vue-router': ['vue-router'],
        },
      },
    },
  },
}
