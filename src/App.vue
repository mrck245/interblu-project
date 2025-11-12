<template>
  <AppHeader />
  <router-view />
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style>
/* 🔧 Reset global */
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  background-color: #ffffff; /* o el color de fondo base */
}

/* Asegura que el contenido principal use todo el ancho */
main {
  background-color: white;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* Tus secciones hero */
.hero,
.hero2 {
  display: block;
  width: 100vw;
  margin: 0;
  padding: 0;
  border: none;
}
</style>
