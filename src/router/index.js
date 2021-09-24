import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/record/:gameSno/:kindCode/:year',
    name: 'Record',
    component: () => import('../views/Record.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
