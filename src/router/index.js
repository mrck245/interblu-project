import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { PREFIXED_CODES, DEFAULT_LOCALE, loadLocale, activateLocale, t } from '@/i18n'
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

// Antes de mostrar una página, descargar los textos y las entradas del devlog de su idioma.
// El idioma no se ACTIVA aquí: si se activara ya, la página que se va cambiaría de
// idioma antes de desvanecerse. Lo activa PageTransition justo cuando la página
// vieja termina de salir (o aquí mismo en la primera carga, que no tiene transición).
router.beforeEach(async (to, from) => {
  const code = localeOf(to)
  await Promise.all([loadLocale(code), loadPosts(code)])
  if (!from.matched.length) applyRoute(to)
})

const localeOf = (route) => route.params.locale || DEFAULT_LOCALE

/** Activa el idioma de la ruta y pone el título de la pestaña. */
export function applyRoute(route) {
  activateLocale(localeOf(route))
  if (route.meta.titleKey) document.title = `${t(route.meta.titleKey)} · ${t('brand')}`
}

// Tras la primera carga, descargar en segundo plano el resto de páginas para que
// la navegación no tenga que esperar a la red.
router.isReady().then(() => {
  const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 1500))
  idle(() => {
    for (const page of pages) {
      if (typeof page.component === 'function') page.component().catch(() => {})
    }
  })
})

export default router
