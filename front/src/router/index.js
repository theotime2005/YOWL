import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: () => import('@/views/Welcome.vue')
    },
    {
      path: '/register',
      name: 'Créer un compte',
      component: () => import('@/views/Register.vue')
    }
  ]
})

export default router
