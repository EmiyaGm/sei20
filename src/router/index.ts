import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import MintView from '../views/MintView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/mint'
    },
    {
      path: '/mint',
      name: 'mint',
      component: MintView
    }
  ]
})

export default router
