import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import vEdgeGlow from './directives/v-edge-glow'
import vScrollFade from './directives/v-scroll-fade'

const app = createApp(App)
app.use(i18n)
app.directive('edge-glow', vEdgeGlow)
app.directive('scroll-fade', vScrollFade)
app.mount('#app')
