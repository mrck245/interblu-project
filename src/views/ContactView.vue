<script setup>
import { socials, contactEmail } from '@/data/socials'
import { t } from '@/i18n'
</script>

<template>
  <div class="container">
    <header class="page-header">
      <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
      <h1>{{ t('contact.title') }}</h1>
      <p class="lead">{{ t('contact.lead') }}</p>
    </header>

    <div class="contact">
      <a :href="`mailto:${contactEmail}`" class="email">
        <span class="label">{{ t('contact.email') }}</span>
        <span class="email__address"
          ><bdi>{{ contactEmail }}</bdi></span
        >
      </a>

      <h2 class="social-title">{{ t('contact.social') }}</h2>
      <ul class="list">
        <li v-for="s in socials" :key="s.name">
          <a :href="s.url" target="_blank" rel="noopener">
            <span class="icon"><img :src="s.icon" alt="" width="22" height="22" /></span>
            <span class="name">{{ s.name }}</span>
            <span class="handle"
              ><bdi>{{ s.handle }}</bdi></span
            >
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.contact {
  max-width: 640px;
  padding-bottom: 96px;
}

.email {
  display: block;
  padding: 1.5rem 1.6rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  transition: border-color var(--dur) var(--ease-out);
}
.email:hover {
  border-color: var(--border-strong);
}
.label {
  display: block;
  font-size: var(--fs-label);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.email__address {
  display: block;
  margin-top: 0.3rem;
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  color: var(--heading);
  overflow-wrap: anywhere;
}

.social-title {
  font-size: var(--fs-h3);
  margin: 2.5rem 0 1rem;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
}
.list li + li {
  border-top: 1px solid var(--border);
}
.list a {
  display: grid;
  grid-template-columns: 36px 120px 1fr;
  align-items: center;
  gap: 1rem;
  min-height: 56px;
  padding: 0.6rem 1.25rem;
  color: var(--text);
  text-decoration: none;
  transition: background var(--dur) var(--ease-out);
}
.list a:hover {
  background: var(--surface-hover);
}

/* Los iconos son blancos: se muestran sobre una ficha azul marino */
.icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--navy);
}
.icon img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.name {
  font-weight: 600;
  color: var(--heading);
}
.handle {
  color: var(--text-muted);
  overflow-wrap: anywhere;
}

@media (max-width: 520px) {
  .list a {
    grid-template-columns: 36px 1fr;
    row-gap: 0;
  }
  .handle {
    grid-column: 2;
  }
}
</style>
