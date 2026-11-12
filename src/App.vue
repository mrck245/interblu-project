<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { t } from '@/i18n'

// Al cambiar de página, llevar el foco al contenido principal para que
// lectores de pantalla y teclado no se queden "perdidos" en el menú.
const main = ref(null)
const router = useRouter()
router.afterEach((to, from) => {
  if (!from.matched.length || to.path === from.path) return // carga inicial o mismo path
  nextTick(() => main.value?.focus({ preventScroll: true }))
})
</script>

<template>
  <div class="app">
    <a href="#main" class="skip-link">{{ t('nav.skip') }}</a>
    <AppHeader />
    <main id="main" ref="main" class="app__main" tabindex="-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
/* El contenido ocupa al menos una pantalla completa (sin contar la cabecera):
   así el footer nunca asoma en la primera vista, aunque la página sea corta. */
.app__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--header-h));
  min-height: calc(100dvh - var(--header-h));
}
.app__main:focus {
  outline: none;
}
</style>
