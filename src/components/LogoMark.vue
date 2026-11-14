<script setup>
// Logo de Interblü recoloreable: usa la imagen como máscara y lo pinta con `color`.
// Los idiomas con otra escritura (ar, hi, ja, ko, zh) tienen su propia adaptación.
// Al cambiar de idioma, el logo nuevo se descarga antes de mostrarse y entra con
// un fundido cruzado, sin dejar el hueco en blanco mientras carga.
import { computed, ref, watch } from 'vue'
import { locale, t } from '@/i18n'
import { logoFor, preloadImage } from '@/lib/brand'

const target = computed(() => logoFor(locale.value))
const shown = ref(target.value)

watch(target, async (src) => {
  await preloadImage(src)
  if (target.value === src) shown.value = src // ignorar si el idioma volvió a cambiar
})

defineProps({
  color: { type: String, default: 'var(--navy)' },
})
</script>

<template>
  <span class="logo-mark" role="img" :aria-label="t('brand')">
    <Transition name="logo">
      <span
        :key="shown"
        class="logo-mark__img"
        :style="{ backgroundColor: color, '--logo': `url(${shown})` }"
      ></span>
    </Transition>
  </span>
</template>

<style scoped>
.logo-mark {
  display: inline-grid;
  aspect-ratio: 2000 / 1500;
}
/* Las dos versiones se superponen en la misma celda durante el fundido */
.logo-mark__img {
  grid-area: 1 / 1;
  -webkit-mask: var(--logo) center / contain no-repeat;
  mask: var(--logo) center / contain no-repeat;
}

.logo-enter-active,
.logo-leave-active {
  transition: opacity var(--dur) var(--ease-out);
}
.logo-enter-from,
.logo-leave-to {
  opacity: 0;
}
</style>
