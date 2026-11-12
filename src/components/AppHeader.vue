<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogoMark from './LogoMark.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { t, localePath, stripLocale } from '@/i18n'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/juegos', key: 'nav.games' },
  { to: '/devlog', key: 'nav.devlog' },
  { to: '/nosotros', key: 'nav.about' },
  { to: '/contacto', key: 'nav.contact' },
]

const open = ref(false)
const route = useRoute()
watch(
  () => route.fullPath,
  () => (open.value = false),
)

// "Juegos" sigue marcado dentro de /juegos/tulips, "Devlog" dentro de cada entrada, etc.
// Se compara sin el prefijo de idioma (/en/juegos → /juegos).
function isActive(to) {
  const path = stripLocale(route.path)
  return to === '/' ? path === '/' : path === to || path.startsWith(`${to}/`)
}

// Escape cierra el menú móvil y devuelve el foco al botón que lo abrió
const toggle = ref(null)
function closeMenu() {
  if (!open.value) return
  open.value = false
  toggle.value?.focus()
}
</script>

<template>
  <header class="header" @keydown.esc="closeMenu">
    <div class="container header__inner">
      <RouterLink :to="localePath('/')" class="header__brand" :aria-label="t('nav.homeLink')">
        <LogoMark class="header__logo" />
      </RouterLink>

      <nav id="main-nav" class="nav" :class="{ 'nav--open': open }" :aria-label="t('nav.primary')">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="localePath(link.to)"
          class="nav__link"
          :class="{ 'is-active': isActive(link.to) }"
          :aria-current="isActive(link.to) ? 'page' : undefined"
        >
          {{ t(link.key) }}
        </RouterLink>
      </nav>

      <div class="header__tools">
        <LanguageSwitcher class="header__lang" />
        <button
          ref="toggle"
          class="header__toggle"
          :aria-expanded="open"
          aria-controls="main-nav"
          @click="open = !open"
        >
          <span class="sr-only">{{ t('nav.menu') }}</span>
          <span class="bar"></span><span class="bar"></span><span class="bar"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-h);
  background: rgb(10 127 166 / 0.95); /* --bg con transparencia para el desenfoque */
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}

.header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__brand {
  display: flex;
}

.header__logo {
  height: 92px;
}

.nav {
  display: flex;
  gap: 0.25rem;
  margin-inline-start: auto;
}

.header__tools {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav__link {
  padding: 0.55rem 1.05rem;
  border-radius: 999px;
  color: var(--text);
  text-decoration: none;
  font-family: var(--font-display);
  font-size: clamp(1.0625rem, 0.95rem + 0.3vw, 1.2rem); /* 17 → 19px */
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  transition: background var(--dur) var(--ease-out);
}
.nav__link:hover {
  background: var(--surface);
}
.nav__link.is-active {
  background: var(--navy);
  color: var(--white);
}

.header__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 8px;
  background: none;
  border: 0;
  cursor: pointer;
}
.bar {
  width: 26px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

/* Con 5 enlaces + selector de idioma, en algunos idiomas los textos son largos:
   el menú se pliega antes de que falte espacio. El selector de idioma se queda en la
   cabecera, junto al botón del menú (dentro del menú, su lista se salía de la pantalla). */
@media (max-width: 980px) {
  .header__logo {
    height: 60px;
  }
  .header__toggle {
    display: flex;
  }
  .header__tools {
    margin-inline-start: auto;
  }

  .nav {
    position: absolute;
    top: var(--header-h);
    inset-inline: 0;
    flex-direction: column;
    padding: 0.75rem var(--gutter) 1.25rem;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 12px 24px rgb(0 20 30 / 0.3);
    display: none;
  }
  .nav--open {
    display: flex;
  }
  .nav__link {
    padding: 0.8rem 1rem;
    font-size: var(--fs-lead);
  }
}
</style>
