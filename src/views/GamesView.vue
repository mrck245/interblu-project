<script setup>
import { computed } from 'vue'
import GameCard from '@/components/GameCard.vue'
import { games, localizeGame } from '@/data/games'
import { t } from '@/i18n'

const localized = computed(() => games.map(localizeGame))
</script>

<template>
  <div class="container">
    <header class="page-header">
      <p class="eyebrow">{{ t('games.eyebrow') }}</p>
      <h1>{{ t('games.title') }}</h1>
      <p class="lead">{{ t('games.lead') }}</p>
    </header>

    <div class="grid">
      <GameCard v-for="game in localized" :key="game.slug" :game="game" :heading-level="2" />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding-bottom: 96px;
}
</style>
