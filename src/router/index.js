import { createRouter, createWebHistory } from 'vue-router'
import InServices from '@/views/In-services.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Página principal
      name: 'Home',
      component: () => import('@/views/HomeView.vue'), // si no existe, luego lo creas
    },
    {
      path: '/services',
      name: 'Services',
      component: InServices, // Tu página de proyectos
    },
  ],
})

export default router
