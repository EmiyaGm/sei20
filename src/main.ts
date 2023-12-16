import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'amfe-flexible/index.js'
import VueGtag from 'vue-gtag'

import store from './store'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)

app.use(VueGtag, {
    config: { id: 'G-0DMXH63L5D' }
  }, router)

app.mount('#app')
