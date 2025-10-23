import { createRouter, createWebHistory } from 'vue-router'
import Panel1 from '@/views/Panel1.vue'
import Panel2 from '@/views/Panel2.vue'
import Panel3 from '@/views/Panel3.vue'
import Panel4 from '@/views/Panel4.vue'
import Panel5 from '@/views/Panel5.vue'

const routes = [
  {
    name: 'Panel1',
    path: '/gallery',
    component: Panel1,
  },
  {
    name: 'Panel2',
    path: '/design',
    component: Panel2,
  },
  {
    name: 'Panel3',
    path: '/recents',
    component: Panel3,
  },
  {
    name: 'Panel4',
    path: '/upload',
    component: Panel4,
  },
  {
    name: 'Panel5',
    path: '/profile',
    component: Panel5,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const cookieMatch = document.cookie.match(/authToken=([^;]+)/)

  if (!cookieMatch) {
    window.location.href = '/'
    return
  }

  next()
})

export default router
