import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 自定义缓存策略插件
function cacheHeaderPlugin() {
  return {
    name: 'cache-headers',
    configResolved(config) {
      this.config = config
    },
    apply: 'serve',
    middleware: (req, res, next) => {
      // 图片缓存 14 天 (1209600 秒)
      if (/\.(png|jpg|jpeg|gif|svg|webp|avif)$/i.test(req.url)) {
        res.setHeader('Cache-Control', 'public, max-age=1209600, immutable')
      }
      // 字体缓存 30 天
      else if (/\.(woff|woff2|ttf|otf|eot)$/i.test(req.url)) {
        res.setHeader('Cache-Control', 'public, max-age=2592000, immutable')
      }
      // CSS 和 JS（带 hash）缓存 1 年
      else if (/\.(js|css)$/.test(req.url) && req.url.includes('[hash')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      }
      // HTML 缓存 1 小时
      else if (/\.html$/i.test(req.url)) {
        res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate')
      }
      next()
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    cacheHeaderPlugin(),
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
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    // Aggressive code splitting for better caching and parallel loading
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('vue-i18n')) {
              return 'vue-i18n'
            }
            if (id.includes('vue-toastification')) {
              return 'vue-toast'
            }
            return 'vendor'
          }
        },
        // Optimize chunk names for better caching
        chunkFileNames: 'js/[name].[hash:8].js',
        entryFileNames: 'js/[name].[hash:8].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return 'images/[name].[hash:8][extname]'
          } else if (/woff|woff2|ttf|otf|eot/.test(ext)) {
            return 'fonts/[name].[hash:8][extname]'
          } else if (ext === 'css') {
            return 'css/[name].[hash:8][extname]'
          }
          return '[name].[hash:8][extname]'
        },
      },
    },
    // Report compressed size
    reportCompressedSize: false,
    // Target modern browsers for smaller output
    target: ['es2020'],
    // CSS code split
    cssCodeSplit: true,
    // Disable source maps in production for smaller bundle size
    sourcemap: false,
    // Increase chunk size warning threshold
    chunkSizeWarningLimit: 500,
  },
})
