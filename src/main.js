import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import vEdgeGlow from './directives/v-edge-glow'
import vScrollFade from './directives/v-scroll-fade'
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)
app.use(i18n)

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
