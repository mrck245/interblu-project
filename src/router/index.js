import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { PREFIXED_CODES, DEFAULT_LOCALE, setLocale, t } from '@/i18n'
import { loadPosts } from '@/lib/devlog'
import { waitForPageSwap } from '@/lib/pageTransition'
import PageTransition from '@/components/PageTransition.vue'

// Las mismas páginas para todos los idiomas. El español no lleva prefijo (/juegos)
// y los demás sí (/en/juegos, /ar/juegos...).
const pages = [
  { path: '', name: 'home', component: HomeView, meta: { titleKey: 'meta.home' } },
  {
    path: 'juegos',
    name: 'games',
    component: () => import('@/views/GamesView.vue'),
    meta: { titleKey: 'meta.games' },
  },
  { path: 'juegos/:slug', name: 'game', component: () => import('@/views/GameView.vue') },
  {
    path: 'devlog',
    name: 'devlog',
    component: () => import('@/views/DevlogView.vue'),
    meta: { titleKey: 'meta.devlog' },
  },
  { path: 'devlog/:slug', name: 'post', component: () => import('@/views/PostView.vue') },
  {
    path: 'nosotros',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { titleKey: 'meta.about' },
  },
  {
    path: 'contacto',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { titleKey: 'meta.contact' },
  },
  {
    path: ':pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { titleKey: 'meta.notFound' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/:locale(${PREFIXED_CODES.join('|')})?`,
      component: PageTransition,
      children: pages,
    },
  ],
  async scrollBehavior(to, from, saved) {
    // Al cambiar de página, esperar a que termine el fundido de salida
    if (from.matched.length && to.path !== from.path) await waitForPageSwap()
    return saved ?? { top: 0 }
  },
})

// Antes de mostrar una página, cargar los textos y las entradas del devlog de su idioma
router.beforeEach(async (to) => {
  const code = to.params.locale || DEFAULT_LOCALE
  await Promise.all([setLocale(code), loadPosts(code)])
})

router.afterEach((to) => {
  if (to.meta.titleKey) document.title = `${t(to.meta.titleKey)} · ${t('brand')}`
})

export default router
