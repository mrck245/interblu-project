import { createRouter, createWebHistory } from 'vue-router'
import InServices from '@/views/In-services.vue'
import InProducts from '@/views/In-products.vue'
import InAbout from '@/views/In-about.vue'
import InContacts from '@/views/In-contacts.vue'
import InLogin from '@/views/In-login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/services',
      name: 'Services',
      component: InServices,
    },
    {
      path: '/products',
      name: 'Products',
      component: InProducts,
    },
    {
      path: '/about',
      name: 'About',
      component: InAbout,
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: InContacts,
    },
    {
      path: '/login',
      name: 'LOgin',
      component: InLogin,
    },
  ],
})

export default router
