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
      component: () => import('@/views/user/Register.vue')
    },
    {
      path: '/login',
      name: 'Connexion',
      component: () => import('@/views/user/Login.vue')
    },
    {
      path: '/forgotpassword',
      name: 'Mot de passe oublié',
      component: () => import('@/views/user/forgotPassword.vue')
    },
    {
      path: '/home',
      name: 'Accueil',
      component: () => import('@/views/Home.vue')
    }
  ]
})

export default router
