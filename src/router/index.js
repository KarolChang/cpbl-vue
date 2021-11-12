import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('../views/Schedule.vue')
  },
  {
    path: '/record/:gameSno/:kindCode/:year',
    name: 'Record',
    component: () => import('../views/Record.vue')
  },
  {
    path: '/standings',
    name: 'Standings',
    component: () => import('../views/Standings.vue')
  },
  {
    path: '/single',
    name: 'SingleData',
    component: () => import('../views/SingleData.vue')
  },
  {
    path: '/jianmiau',
    name: 'JianMiau',
    component: () => import('../views/JianMiau.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
