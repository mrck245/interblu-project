<script setup>
import { t, localePath } from '@/i18n'

defineProps({
  post: { type: Object, required: true },
  // Nivel del título según la página, para no saltar niveles (h1 → h3)
  headingLevel: { type: Number, default: 3 },
})
</script>

<template>
  <RouterLink :to="localePath(`/devlog/${post.slug}`)" class="post-card">
    <time v-if="post.date" :datetime="post.date.toISOString().slice(0, 10)">
      {{ post.dateLabel }}
    </time>
    <component :is="`h${headingLevel}`" class="post-card__title">{{ post.title }}</component>
    <p v-if="post.summary">{{ post.summary }}</p>
    <span class="post-card__more" aria-hidden="true"
      >{{ t('common.readMore') }} <span class="arrow">→</span></span
    >
  </RouterLink>
</template>

<style scoped>
.post-card {
  display: block;
  padding: 1.5rem 1.6rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition:
    border-color var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}
.post-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

time {
  font-size: var(--fs-small);
  color: var(--text);
  font-weight: 600;
}
.post-card__title {
  font-size: var(--fs-h3);
  margin: 0.4rem 0;
}
p {
  margin: 0 0 0.75rem;
  color: var(--text-muted);
}
.post-card__more {
  font-weight: 600;
  color: var(--heading);
}
</style>
