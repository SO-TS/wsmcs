import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0',
  },
  build: {
    // Optimize build output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
      },
    },
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-i18n', 'vue-toastification'],
        },
      },
    },
    // Report compressed size
    reportCompressedSize: true,
    // Target modern browsers for smaller output
    target: 'esnext',
    // CSS code split
    cssCodeSplit: true,
  },
})
