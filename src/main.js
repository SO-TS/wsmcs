import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import vEdgeGlow from './directives/v-edge-glow' // Import the directive

const app = createApp(App)
app.use(i18n)
app.directive('edge-glow', vEdgeGlow) // Register the directive globally
app.mount('#app')
