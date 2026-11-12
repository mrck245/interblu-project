<script setup>
import { t, localePath } from '@/i18n'
</script>

<template>
  <div class="container not-found">
    <p class="eyebrow">404</p>
    <h1>{{ t('notFound.title') }}</h1>
    <p class="lead">{{ t('notFound.lead') }}</p>
    <RouterLink :to="localePath('/')" class="btn">{{ t('notFound.cta') }}</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  padding-top: 96px;
  padding-bottom: 120px;
}
.lead {
  margin-bottom: 2rem;
}
</style>
