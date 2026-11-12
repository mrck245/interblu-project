<script setup>
// Selector de idioma: un <select> nativo (accesible con teclado y lector de pantalla).
// Al cambiar, lleva a la MISMA página en el idioma elegido.
import { useRoute, useRouter } from 'vue-router'
import { LOCALES, locale, localePath, stripLocale, t } from '@/i18n'

// Puede haber dos selectores (cabecera y menú móvil): cada uno necesita su propio id
const props = defineProps({
  id: { type: String, default: 'lang-select' },
})

const route = useRoute()
const router = useRouter()

function change(event) {
  const code = event.target.value
  router.push(localePath(stripLocale(route.fullPath), code))
}
</script>

<template>
  <div class="lang">
    <label :for="props.id" class="sr-only">{{ t('nav.language') }}</label>
    <svg class="lang__icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6" />
      <path
        d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
      />
    </svg>
    <select :id="props.id" class="lang__select" :value="locale" @change="change">
      <option v-for="l in LOCALES" :key="l.code" :value="l.code" :lang="l.htmlLang">
        {{ l.name }}
      </option>
    </select>
    <span class="lang__chevron" aria-hidden="true"></span>
  </div>
</template>

<style scoped>
.lang {
  position: relative;
  display: inline-flex;
  align-items: center;
  color: var(--text);
}
.lang__icon {
  position: absolute;
  inset-inline-start: 12px;
  pointer-events: none;
}
.lang__select {
  appearance: none;
  min-height: 44px;
  padding-block: 0.4rem;
  padding-inline: 38px 32px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  background-color: transparent;
  color: var(--text);
  font: inherit;
  font-size: var(--fs-small);
  cursor: pointer;
  transition: background-color var(--dur) var(--ease-out);
}
.lang__chevron {
  position: absolute;
  inset-inline-end: 14px;
  width: 0;
  height: 0;
  border-inline: 4.5px solid transparent;
  border-top: 5px solid currentColor;
  pointer-events: none;
}
.lang__select:hover {
  background-color: var(--surface);
}
/* Las opciones del desplegable usan colores del sistema; se fijan para que se lean */
.lang__select option {
  background: var(--navy);
  color: var(--white);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
