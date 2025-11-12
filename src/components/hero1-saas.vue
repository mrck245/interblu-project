<template>
  <section id="inicio" class="hero2">
    <div class="hero-content">
      <slot></slot>
      <h1>Videojuegos y entretenimiento</h1>
      <p>Foreign Waltz ya está disponible en todas nuestras tiendas online!</p>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero2 {
  background: #003249;
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  text-align: center;
  color: white;
}

.hero-content {
  font-family: 'Marcellus', serif;
  text-align: end;
  margin-right: 2.5rem;
  font-size: 4vw;
  margin-bottom: 1rem;
}

.hero-content h1,
.hero-content h2 {
  font-family: 'Marcellus', serif;
  text-align: end;
  margin-right: 2rem;
  font-size: 4vw;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.6vw;
  margin-right: 2rem;
  text-align: end;
}
</style>
