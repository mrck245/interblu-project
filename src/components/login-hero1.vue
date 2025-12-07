<template>
  <section class="login-hero1">
    <h1>Iniciar Sesión</h1>
    <p>Bienvenido a la sección de inicio de sesión</p>
  </section>
</template>

<script setup>
</script>

<style scoped>
.login-hero1 {
  width: 100%;
  height: 60vh;
  background: #81c4da;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 3vh;
  color: #003249;
}

@media (min-width: 913px) and (max-width: 1024px) {
.login-hero1{
    margin-top: 20vh; /* <-- ¡ESTE ES EL MARGEN CLAVE! */
  }
}
</style>
