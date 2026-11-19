<script setup>
import PostCard from '@/components/PostCard.vue'
import { posts } from '@/lib/devlog'
import { t } from '@/i18n'
</script>

<template>
  <!-- Tono claro de "Últimas actualizaciones" del inicio (ver MASTER.md, Superficies) -->
  <div class="tone-updates tono-pagina">
    <div class="container">
      <header class="page-header">
        <p class="eyebrow">{{ t('devlog.eyebrow') }}</p>
        <h1>{{ t('devlog.title') }}</h1>
        <p class="lead">{{ t('devlog.lead') }}</p>
      </header>

      <div class="list">
        <PostCard v-for="post in posts" :key="post.slug" :post="post" :heading-level="2" />
        <p v-if="!posts.length">{{ t('devlog.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tono-pagina {
  flex: 1;
}
.list {
  display: grid;
  gap: 1.25rem;
  max-width: 760px;
  padding-bottom: 96px;
}
</style>
