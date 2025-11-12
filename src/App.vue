<template>
  <AppHeader />
  <router-view />
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  background-color: #ffffff;
}

main {
  background-color: white;
  min-height: 100vh;
}

.hero,
.hero2 {
  width: 100vw;
  margin: 0;
  padding: 0;
}
</style>
