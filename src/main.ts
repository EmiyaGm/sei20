import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'amfe-flexible/index.js'

import store from './store'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
