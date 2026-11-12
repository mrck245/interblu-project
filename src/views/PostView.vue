<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import NotFoundView from './NotFoundView.vue'
import { getPost } from '@/lib/devlog'
import { getGame } from '@/data/games'
import { t, localePath, localeInfo } from '@/i18n'

const route = useRoute()
const post = computed(() => getPost(route.params.slug))
const game = computed(() => (post.value?.game ? getGame(post.value.game) : null))

watchEffect(() => {
  if (post.value) document.title = `${post.value.title} · Interblü`
})
</script>

<template>
  <NotFoundView v-if="!post" />

  <article v-else class="container post">
    <RouterLink :to="localePath('/devlog')" class="back"
      ><span class="arrow" aria-hidden="true">←</span> {{ t('devlog.back') }}</RouterLink
    >
    <header class="post__header">
      <time v-if="post.date" :datetime="post.date.toISOString().slice(0, 10)">{{
        post.dateLabel
      }}</time>
      <h1 :lang="localeInfo(post.locale).htmlLang">{{ post.title }}</h1>
      <RouterLink v-if="game" :to="localePath(`/juegos/${game.slug}`)" class="badge">{{
        game.title
      }}</RouterLink>
      <p v-if="post.isFallback" class="fallback">{{ t('devlog.onlySpanish') }}</p>
    </header>

    <!-- El HTML viene de nuestros propios archivos Markdown en src/content/devlog -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="prose" :lang="localeInfo(post.locale).htmlLang" v-html="post.html"></div>
  </article>
</template>

<style scoped>
.post {
  padding-top: clamp(32px, 6vw, 64px);
  padding-bottom: 96px;
}
.back {
  text-decoration: none;
}
.post__header {
  margin: 1.5rem 0 2rem;
  max-width: 68ch;
}
.post__header time {
  color: var(--text);
  font-weight: 600;
}
.post__header h1 {
  margin: 0.4rem 0 0.8rem;
}
.fallback {
  margin: 1rem 0 0;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  font-size: var(--fs-small);
}
.post__header .badge {
  text-decoration: none;
}
</style>
