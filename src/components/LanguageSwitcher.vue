<script setup>
// Selector de idioma propio (botón + lista), para que se vea igual en todos los navegadores
// (el <select> nativo dibuja su lista con el estilo del sistema y no se puede controlar).
//
// Accesibilidad (patrón "listbox" de WAI-ARIA):
// - Botón: Enter, Espacio o flechas abren la lista.
// - Lista: flechas, Inicio y Fin mueven; Enter o Espacio eligen; Escape cierra y
//   devuelve el foco al botón; Tab o clic fuera cierran.
// Al elegir, lleva a la MISMA página en el idioma elegido.
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LOCALES, locale, localePath, stripLocale, t } from '@/i18n'

// Si hubiera más de un selector en la página, cada uno necesita su propio id
const props = defineProps({
  id: { type: String, default: 'lang-select' },
})

const route = useRoute()
const router = useRouter()

const open = ref(false)
const active = ref(0) // opción resaltada mientras la lista está abierta
const root = ref(null)
const button = ref(null)
const list = ref(null)

const currentIndex = computed(() =>
  Math.max(
    0,
    LOCALES.findIndex((l) => l.code === locale.value),
  ),
)
const current = computed(() => LOCALES[currentIndex.value])
const listId = computed(() => `${props.id}-list`)

function focusOption(i) {
  active.value = i
  list.value?.children[i]?.focus()
}

function openList() {
  open.value = true
  nextTick(() => focusOption(currentIndex.value))
}

function close(returnFocus = true) {
  open.value = false
  if (returnFocus) button.value?.focus()
}

function choose(code) {
  close()
  if (code !== locale.value) router.push(localePath(stripLocale(route.fullPath), code))
}

function onButtonKeydown(e) {
  if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
    e.preventDefault()
    openList()
  }
}

function onListKeydown(e) {
  const last = LOCALES.length - 1
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      focusOption(active.value === last ? 0 : active.value + 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      focusOption(active.value === 0 ? last : active.value - 1)
      break
    case 'Home':
      e.preventDefault()
      focusOption(0)
      break
    case 'End':
      e.preventDefault()
      focusOption(last)
      break
    case 'Enter':
    case ' ':
      e.preventDefault()
      choose(LOCALES[active.value].code)
      break
    case 'Escape':
      e.preventDefault()
      e.stopPropagation() // que no cierre también el menú móvil
      close()
      break
    case 'Tab':
      close(false)
      break
  }
}

function onDocumentClick(e) {
  if (open.value && root.value && !root.value.contains(e.target)) close(false)
}
onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div ref="root" class="lang">
    <button
      :id="props.id"
      ref="button"
      type="button"
      class="lang__button"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-controls="listId"
      :aria-label="`${t('nav.language')}: ${current.name}`"
      @click="open ? close() : openList()"
      @keydown="onButtonKeydown"
    >
      <svg class="lang__icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6" />
        <path
          d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
        />
      </svg>
      <span class="lang__name" :lang="current.htmlLang">{{ current.name }}</span>
      <span class="lang__chevron" :class="{ 'is-open': open }" aria-hidden="true"></span>
    </button>

    <ul
      v-show="open"
      :id="listId"
      ref="list"
      class="lang__list"
      role="listbox"
      :aria-label="t('nav.language')"
      @keydown="onListKeydown"
    >
      <li
        v-for="(l, i) in LOCALES"
        :key="l.code"
        role="option"
        tabindex="-1"
        class="lang__option"
        :class="{ 'is-active': i === active }"
        :aria-selected="l.code === locale"
        :lang="l.htmlLang"
        @click="choose(l.code)"
        @mousemove="active = i"
      >
        {{ l.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.lang {
  position: relative;
  display: inline-flex;
  color: var(--text);
}

.lang__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 46px;
  padding-block: 0.4rem;
  padding-inline: 12px 14px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: var(--fs-body);
  cursor: pointer;
  transition: background-color var(--dur) var(--ease-out);
}
.lang__button:hover,
.lang__button[aria-expanded='true'] {
  background-color: var(--surface);
}

.lang__chevron {
  width: 0;
  height: 0;
  margin-inline-start: 0.35rem;
  border-inline: 4.5px solid transparent;
  border-top: 5px solid currentColor;
  transition: transform var(--dur) var(--ease-out);
}
.lang__chevron.is-open {
  transform: rotate(180deg);
}

/* Lista: rectangular, opciones pegadas, sin radios.
   Alineada al borde final del botón (el selector está al final de la cabecera),
   y con scroll solo si la pantalla es tan baja que no cabe (móvil en horizontal). */
.lang__list {
  position: absolute;
  top: calc(100% + 6px);
  inset-inline-end: 0;
  max-height: calc(100dvh - var(--header-h) - 16px);
  overflow-y: auto;
  z-index: 50;
  min-width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--border-strong);
  border-radius: 0;
  background: var(--navy);
  box-shadow: 0 12px 24px rgb(0 20 30 / 0.35);
}

.lang__option {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0.55rem 1rem;
  border-radius: 0;
  color: var(--white);
  font-size: var(--fs-small);
  white-space: nowrap;
  cursor: pointer;
  transition: background-color var(--dur-fast) var(--ease-out);
}
.lang__option:focus {
  outline: none; /* el resaltado (.is-active) ya indica la opción con foco */
}
.lang__option.is-active {
  background: var(--teal);
}
.lang__option[aria-selected='true'] {
  background: var(--white);
  color: var(--navy);
  font-weight: 600;
}
.lang__option[aria-selected='true'].is-active {
  box-shadow: inset 4px 0 0 var(--teal);
}
[dir='rtl'] .lang__option[aria-selected='true'].is-active {
  box-shadow: inset -4px 0 0 var(--teal);
}

/* Pantallas muy estrechas: solo el globo (el nombre del idioma sigue en aria-label) */
@media (max-width: 359px) {
  .lang__name {
    display: none;
  }
  .lang__chevron {
    margin-inline-start: 0;
  }
}
</style>
