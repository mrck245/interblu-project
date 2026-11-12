<script setup>
import { localePath } from '@/i18n'

// `game` debe venir ya traducido con localizeGame() (src/data/games.js)
defineProps({
  game: { type: Object, required: true },
  // Nivel del título según la página, para no saltar niveles (h1 → h3)
  headingLevel: { type: Number, default: 3 },
})
</script>

<template>
  <RouterLink :to="localePath(`/juegos/${game.slug}`)" class="game-card">
    <div class="game-card__media">
      <img :src="game.cover" :alt="game.title" loading="lazy" width="1920" height="1080" />
    </div>
    <div class="game-card__body">
      <span class="badge">{{ game.status }}</span>
      <component :is="`h${headingLevel}`" class="game-card__title">{{ game.title }}</component>
      <p>{{ game.summary }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.game-card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition:
    transform var(--dur) var(--ease-out),
    box-shadow var(--dur) var(--ease-out);
}
.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgb(0 20 30 / 0.3);
}

.game-card__media {
  aspect-ratio: 16 / 9;
  background: #000;
}
.game-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-card__body {
  padding: 1.25rem 1.4rem 1.5rem;
}
.game-card__title {
  font-size: 1.4rem;
  margin: 0.6rem 0 0.4rem;
}
.game-card__body p {
  margin: 0;
  color: var(--text-muted);
}
</style>
