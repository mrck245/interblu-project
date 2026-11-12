<script setup>
import { t } from '@/i18n'

const team = [
  { handle: 'q4verrr', roleKey: 'about.roles.programming' },
  { handle: 'xmoonshell', roleKey: 'about.roles.art' },
]
</script>

<template>
  <div class="container">
    <header class="page-header">
      <p class="eyebrow">{{ t('about.eyebrow') }}</p>
      <h1>{{ t('about.title') }}</h1>
    </header>

    <div class="about">
      <p v-for="(paragraph, i) in t('about.paragraphs')" :key="i">{{ paragraph }}</p>

      <h2>{{ t('about.teamTitle') }}</h2>
      <ul class="team">
        <li v-for="person in team" :key="person.handle">
          <strong>{{ person.handle }}</strong>
          <span>{{ t(person.roleKey) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 68ch;
  font-size: var(--fs-lead);
  padding-bottom: 96px;
}
.about h2 {
  margin-top: 2.5rem;
}

.team {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}
.team li {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.team strong {
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  font-weight: 400;
  color: var(--heading);
}
.team span {
  color: var(--text-muted);
}
</style>
