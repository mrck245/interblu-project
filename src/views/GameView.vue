<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '@/components/PostCard.vue'
import NotFoundView from './NotFoundView.vue'
import { getGame, localizeGame } from '@/data/games'
import { posts } from '@/lib/devlog'
import { t, localePath } from '@/i18n'

const route = useRoute()
const game = computed(() => localizeGame(getGame(route.params.slug)))
const relatedPosts = computed(() => posts.value.filter((p) => p.game === route.params.slug))

watchEffect(() => {
  if (game.value) document.title = `${game.value.title} · Interblü`
})
</script>

<template>
  <NotFoundView v-if="!game" />

  <article v-else>
    <header class="container page-header">
      <RouterLink :to="localePath('/juegos')" class="back"
        ><span class="arrow" aria-hidden="true">←</span> {{ t('game.back') }}</RouterLink
      >
      <h1>{{ game.title }}</h1>
      <p v-if="game.tagline" class="tagline">{{ game.tagline }}</p>
      <dl class="facts">
        <div>
          <dt>{{ t('common.status') }}</dt>
          <dd>{{ game.status }}</dd>
        </div>
        <div v-if="game.release">
          <dt>{{ t('common.release') }}</dt>
          <dd>{{ game.release }}</dd>
        </div>
      </dl>
    </header>

    <div class="section">
      <div class="container">
        <div class="layout">
          <div class="about">
            <p v-for="(paragraph, i) in game.description" :key="i">{{ paragraph }}</p>

            <ul v-if="game.features.length" class="features">
              <li v-for="f in game.features" :key="f">{{ f }}</li>
            </ul>

            <div class="links">
              <a
                v-for="link in game.links"
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener"
                class="btn"
              >
                {{ link.label }}
              </a>
              <p v-if="!game.links.length" class="soon">
                {{ t('game.unavailableBefore') }}
                <RouterLink :to="localePath('/devlog')">{{ t('game.unavailableLink') }}</RouterLink
                >{{ t('game.unavailableAfter') }}
              </p>
            </div>
          </div>

          <div class="gallery">
            <a
              v-for="shot in game.screenshots"
              :key="shot.src"
              :href="shot.src"
              target="_blank"
              rel="noopener"
            >
              <img :src="shot.src" :alt="shot.alt" loading="lazy" width="1920" height="1080" />
            </a>
          </div>
        </div>

        <section v-if="relatedPosts.length" class="related">
          <h2>{{ t('game.updates') }}</h2>
          <div class="related__grid">
            <PostCard v-for="post in relatedPosts" :key="post.slug" :post="post" />
          </div>
        </section>
      </div>
    </div>
  </article>
</template>

<style scoped>
.page-header h1 {
  font-size: var(--fs-display);
  margin: 1rem 0 0.25rem;
}
.back {
  text-decoration: none;
  font-weight: 600;
}
.back:hover {
  text-decoration: underline;
}
.tagline {
  font-size: var(--fs-lead);
  color: var(--text);
  margin: 0;
}

.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2.5rem;
  margin: 1.5rem 0 0;
}
.facts dt {
  font-size: var(--fs-label);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
}
.facts dd {
  margin: 0.15rem 0 0;
  font-size: var(--fs-body);
  color: var(--heading);
  font-weight: 600;
}

.section {
  border-top: 1px solid var(--border);
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: clamp(24px, 5vw, 56px);
  align-items: start;
}

.features {
  padding-inline-start: 1.2rem;
}
.features li {
  margin: 0.3rem 0;
}

.links {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.soon {
  margin: 0;
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
}

.gallery {
  display: grid;
  gap: 1rem;
}
.gallery img {
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: #000;
}

.related {
  margin-top: 4rem;
}
.related__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

@media (max-width: 820px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
