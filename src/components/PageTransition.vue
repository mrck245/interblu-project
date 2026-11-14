<script setup>
// Fundido suave entre páginas: la anterior se desvanece y la nueva aparece
// subiendo unos píxeles. Para que no haya cortes:
// - El idioma nuevo se activa justo cuando la página vieja termina de salir
//   (así no se ve cambiar de idioma antes del fundido).
// - La página nueva espera (como mucho un instante) a que sus imágenes visibles
//   y sus fuentes estén listas, para entrar ya completa.
import { useRoute } from 'vue-router'
import { applyRoute } from '@/router'
import { pageSwapped } from '@/lib/pageTransition'

const route = useRoute()
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)' // = --ease-out
const MAX_WAIT = 400 // ms máximos esperando imágenes/fuentes

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Imágenes que se verán en la primera pantalla de la página nueva. */
function firstScreenImages(el) {
  const top = el.getBoundingClientRect().top
  return [...el.querySelectorAll('img')].filter(
    (img) => !img.complete && img.getBoundingClientRect().top - top < window.innerHeight,
  )
}

function contentReady(el) {
  const images = firstScreenImages(el).map((img) => {
    img.loading = 'eager' // las "lazy" no empezarían a bajar mientras la página es invisible
    return img.decode().catch(() => {})
  })
  return Promise.race([
    Promise.all([...images, document.fonts?.ready]),
    new Promise((resolve) => setTimeout(resolve, MAX_WAIT)),
  ])
}

function onLeave(el, done) {
  const finish = () => {
    applyRoute(route)
    done()
  }
  if (reducedMotion()) return finish()
  el.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 150,
    easing: 'ease',
    fill: 'forwards',
  }).finished.then(finish, finish)
}

function onBeforeEnter(el) {
  el.style.opacity = '0'
}

async function onEnter(el, done) {
  await contentReady(el)
  pageSwapped()
  el.style.opacity = ''
  if (reducedMotion()) return done()
  el.animate(
    [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'none' },
    ],
    { duration: 250, easing: EASE },
  ).finished.then(done, done)
}
</script>

<template>
  <RouterView v-slot="{ Component, route: r }">
    <Transition
      mode="out-in"
      :css="false"
      @leave="onLeave"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
    >
      <div :key="r.path" class="page">
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>
</template>

<style>
/* Se comporta igual que <main> para que las páginas mantengan su layout */
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
