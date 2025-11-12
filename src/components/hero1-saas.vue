<template>
  <section id="inicio" class="hero2">
    <div class="hero-content">
      <slot></slot>
      <h1>Micro-SaaS</h1>
      <h2>Para tus proyectos</h2>
      <p>Innovación y sostenibilidad en cada proyecto.</p>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero2 {
  background: #003249;
  height: 80vh;
  width: 100vw; /* asegúrate de cubrir toda la ventana */
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: white;
  box-sizing: border-box;
}

.hero-content {
  font-family: 'Marcellus', serif;
  text-align: end;
  margin-right: 3rem;
}

.hero-content h1,
.hero-content h2 {
  margin: 0 0 1rem 0;
  font-size: 4vw;
}

.hero-content p {
  font-size: 1.6vw;
  margin: 0;
}
</style>
