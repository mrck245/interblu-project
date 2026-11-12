<script setup>
import flower from '@/assets/brand/flower-white.webp'
import { socials, contactEmail } from '@/data/socials'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getGame } from '@/data/games'
import { t, localePath } from '@/i18n'

const year = new Date().getFullYear()

// En la ficha de un juego con tema propio (p. ej. TULIPS), el footer adopta ese tema
const route = useRoute()
const theme = computed(() =>
  route.name === 'game' ? (getGame(route.params.slug)?.theme ?? null) : null,
)
</script>

<template>
  <footer class="footer" :class="theme && `theme-${theme}`">
    <div class="container footer__inner">
      <div class="footer__brand">
        <RouterLink :to="localePath('/')" :aria-label="t('nav.homeLink')">
          <img :src="flower" alt="" class="footer__flower" width="240" height="180" />
        </RouterLink>
        <p>{{ t('footer.tagline') }}<br />{{ t('footer.location') }}</p>
      </div>

      <div class="footer__social">
        <a
          v-for="s in socials"
          :key="s.name"
          :href="s.url"
          target="_blank"
          rel="noopener"
          :aria-label="s.name"
        >
          <img :src="s.icon" alt="" width="24" height="24" />
        </a>
      </div>
    </div>

    <div class="container footer__bottom">
      <span>© {{ year }} {{ t('brand') }}. {{ t('footer.rights') }}</span>
      <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--navy);
  color: rgb(255 255 255 / 0.85);
  padding: 56px 0 28px;
  margin-top: auto;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  max-width: 420px;
}
.footer__brand p {
  margin: 0;
}

.footer__flower {
  width: 72px;
  height: auto;
  transition: transform var(--dur) var(--ease-out);
}
.footer__flower:hover {
  transform: rotate(20deg);
}

.footer__social {
  display: flex;
  gap: 0.5rem;
  margin-inline: -10px;
}
/* El icono mide 24px, pero el área clicable llega a 44×44 */
.footer__social a {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
}
.footer__social img {
  height: 24px;
  width: auto;
  opacity: 0.85;
  transition:
    opacity var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}
.footer__social a:hover img {
  opacity: 1;
  transform: translateY(-3px);
}

.footer__bottom {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgb(255 255 255 / 0.15);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: var(--fs-small);
}
.footer__bottom a {
  color: var(--teal-soft);
}

/* Footer con el tema de TULIPS (solo en su ficha): negro, texto blanco, hover morado.
   El icono blanco sobre morado da 3.3:1, suficiente para iconos (mínimo 3:1). */
.footer.theme-tulips {
  background: var(--tulips-black);
  color: var(--white);
  border-top: 1px solid rgb(255 255 255 / 0.12);
}
.footer.theme-tulips .footer__social a {
  transition: background-color var(--dur) var(--ease-out);
}
.footer.theme-tulips .footer__social a:hover {
  background: var(--tulips-purple);
}
.footer.theme-tulips .footer__bottom a {
  color: var(--white);
  transition: color var(--dur) var(--ease-out);
}
.footer.theme-tulips .footer__bottom a:hover {
  color: var(--tulips-purple);
}

/* Móvil: todo el pie centrado (flor, texto, redes y copyright) */
@media (max-width: 640px) {
  .footer__inner {
    flex-direction: column;
    text-align: center;
  }
  .footer__brand {
    flex-direction: column;
    gap: 0.75rem;
  }
  .footer__social {
    justify-content: center;
    margin-inline: 0;
  }
  .footer__bottom {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
