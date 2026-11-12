<script setup>
import { computed } from 'vue'
import GameCard from '@/components/GameCard.vue'
import PostCard from '@/components/PostCard.vue'
import { games, featuredGame, localizeGame } from '@/data/games'
import { posts } from '@/lib/devlog'
import { t, localePath } from '@/i18n'

const featured = computed(() => localizeGame(featuredGame))
const latestPosts = computed(() => posts.value.slice(0, 3))
const otherGames = computed(() =>
  games.filter((g) => g.slug !== featuredGame.slug).map(localizeGame),
)
</script>

<template>
  <section class="hero">
    <div class="container">
      <p class="eyebrow">{{ t('home.eyebrow') }}</p>
      <h1>{{ t('home.title') }}</h1>
      <p class="lead">{{ t('home.lead') }}</p>
      <div class="hero__actions">
        <RouterLink :to="localePath('/juegos')" class="btn">{{ t('home.ctaProjects') }}</RouterLink>
        <RouterLink :to="localePath('/devlog')" class="btn btn--ghost">{{
          t('home.ctaDevlog')
        }}</RouterLink>
      </div>
    </div>
  </section>

  <section class="section tone-featured">
    <div class="container featured">
      <div class="featured__media">
        <img
          :src="featured.screenshots[0].src"
          :alt="featured.screenshots[0].alt"
          width="1920"
          height="1080"
        />
      </div>
      <div>
        <p class="eyebrow">{{ t('home.featuredEyebrow') }}</p>
        <h2>{{ featured.title }}</h2>
        <div class="meta">
          <span class="badge">{{ featured.status }}</span>
          <span v-if="featured.release" class="meta__release">
            {{ t('common.release') }}: {{ featured.release }}
          </span>
        </div>
        <p class="featured__summary">{{ featured.summary }}</p>
        <RouterLink :to="localePath(`/juegos/${featured.slug}`)" class="btn btn--ghost">
          {{ t('home.viewSheet', { title: featured.title }) }}
        </RouterLink>
      </div>
    </div>
  </section>

  <section v-if="latestPosts.length" class="section tone-updates">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="eyebrow">{{ t('home.updatesEyebrow') }}</p>
          <h2>{{ t('home.updatesTitle') }}</h2>
        </div>
        <RouterLink :to="localePath('/devlog')" class="link-more"
          >{{ t('home.viewAll') }} <span class="arrow" aria-hidden="true">→</span></RouterLink
        >
      </div>
      <div class="grid">
        <PostCard v-for="post in latestPosts" :key="post.slug" :post="post" />
      </div>
    </div>
  </section>

  <section v-if="otherGames.length" class="section tone-projects">
    <div class="container">
      <p class="eyebrow">{{ t('home.catalogEyebrow') }}</p>
      <h2>{{ t('home.otherTitle') }}</h2>
      <div class="grid">
        <GameCard v-for="game in otherGames" :key="game.slug" :game="game" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: clamp(56px, 9vw, 112px) 0 clamp(40px, 6vw, 72px);
}
.hero h1 {
  max-width: 18ch;
  font-size: clamp(2.4rem, 5.5vw, 3.8rem);
}
.hero .lead {
  margin: 0;
}
.hero__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

/* En pantallas altas, la última sección llega hasta el footer (sin franja del fondo general) */
.section:last-child {
  flex-grow: 1;
}

.featured {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: clamp(24px, 5vw, 56px);
  align-items: center;
}
.featured__media img {
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: #000;
}
.featured h2 {
  font-size: clamp(2.2rem, 4.5vw, 3rem);
  margin-bottom: 0.75rem;
}
.meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
}
.meta__release {
  font-size: 0.95rem;
  color: var(--text);
}
.featured__summary {
  font-size: 1.1rem;
  color: var(--text);
  margin: 1.25rem 0 1.75rem;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
}
.link-more {
  font-weight: 600;
  text-decoration: none;
  padding: 0.6rem 0;
  white-space: nowrap;
}
.link-more:hover {
  text-decoration: underline;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
}

@media (max-width: 820px) {
  .featured {
    grid-template-columns: 1fr;
  }
}
</style>
