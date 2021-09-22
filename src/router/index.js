import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/Record.vue')
  },
  {
    path: '/record202',
    name: 'Record202',
    component: () => import('../views/Record202.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
