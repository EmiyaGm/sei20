import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import MintView from '../views/MintView.vue'
import HomeViewVue from '@/views/HomeView.vue'
import ExplorerViewVue from '@/views/ExplorerView.vue'
import TokenViewVue from '@/views/TokenView.vue'
import MyVue from '@/views/My.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewVue
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: ExplorerViewVue
    },
    {
      path: '/mint',
      name: 'mint',
      component: MintView
    },
    {
      path: '/token',
      name: 'token',
      component: TokenViewVue
    },
    {
      path: '/my',
      name: 'my',
      component: MyVue
    }
  ]
})

export default router
