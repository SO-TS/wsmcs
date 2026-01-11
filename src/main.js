import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router, i18n } from './router'
import vEdgeGlow from './directives/v-edge-glow'
import vScrollFade from './directives/v-scroll-fade'
import AOS from 'aos'
import 'aos/dist/aos.css'

// 在應用初始化時根據路徑設置語言
const path = window.location.pathname;
// 从路由文件中导入支持的语言，确保一致性
const pathParts = path.split('/').filter(part => part !== '');
let detectedLocale = null;

// 优先尝试从路径中检测语言
if (pathParts.length > 0) {
  // 检查路径的第一部分是否是支持的语言
  if (pathParts[0] === 'zh_CN' || pathParts[0] === 'en') {
    detectedLocale = pathParts[0];
  }
}

if (detectedLocale) {
  i18n.global.locale.value = detectedLocale;
  localStorage.setItem('locale', detectedLocale);
} else {
  const savedLocale = localStorage.getItem('locale') || 'zh_CN';
  i18n.global.locale.value = savedLocale;
}

const app = createApp(App)
app.use(i18n)
app.use(router)

// Register directives
app.directive('edge-glow', vEdgeGlow)
app.directive('scroll-fade', vScrollFade)

// Optimize app config for production
if (process.env.NODE_ENV === 'production') {
  app.config.productionTip = false
  app.config.devtools = false
  // Disable performance measurements in production
  app.config.performance = false
}

app.mount('#app')

// Initialize AOS after app is mounted
setTimeout(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 120,
    disable: false
  })
}, 100)
