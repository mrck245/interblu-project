<script setup>
// Logo de Interblü recoloreable: usa la imagen como máscara y lo pinta con `color`.
import logo from '@/assets/brand/logo.webp'
import { t } from '@/i18n'

defineProps({
  color: { type: String, default: 'var(--navy)' },
})
</script>

<template>
  <span
    class="logo-mark"
    role="img"
    :aria-label="t('brand')"
    :style="{ backgroundColor: color, '--logo': `url(${logo})` }"
  ></span>
</template>

<style scoped>
.logo-mark {
  display: inline-block;
  aspect-ratio: 2000 / 1500;
  -webkit-mask: var(--logo) center / contain no-repeat;
  mask: var(--logo) center / contain no-repeat;
}
</style>
