<template>
  <AppHeader />
  <router-view />
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<style>
/* si quieres darle un color base al fondo */
main {
  background-color: white;
  min-height: 100vh;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

.hero,
.hero2,
.footer {
  display: block;
  width: 100vw;
  margin: 0;
  padding: 0;
  border: none;
}
</style>
