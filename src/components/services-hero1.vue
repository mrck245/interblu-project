<template>
  <main>
     <section class="page-wrapper">
      <div class="services-grid">

        <div class="service-card" v-for="item in services" :key="item.title">
          <img :src="item.img" alt="logo" class="service-img" />
         <h2>{{ item.title }}</h2>
         <p>{{ item.text }}</p>
       </div>

       </div>
      </section>
    <Footer />
  </main>
</template>

<script setup>
import Footer from '@/components/footer-saas.vue'
import ms1 from '@/assets/Sources/pictures/juralogo.png'
import ms2 from '@/assets/Sources/pictures/sheeptunelogo.png'
import ms3 from '@/assets/Sources/pictures/asperlogo.png'

const services = [
  {
    title: "Project Jura",
    text: "Project Jura es una web app potenciada por un modelo AI entrenado para generar spritesheets mediante prompts o imágenes.",
    img: ms1
  },
  {
    title: "Sheeptune",
    text: "Motor de sonido experimental orientado a producir música mediante síntesis procedural.",
    img: ms2
  },
  {
    title: "Asper AI",
    text: "Modelo de IA pequeño para tareas internas de Interblü, optimizado para respuesta rápida.",
    img: ms3
  }
]
</script>

<style scoped>
/* ✨ Ajuste global para no meter contenido bajo el header */
.page-wrapper {
  padding-top: 18vh; /* MISMA ALTURA DEL HEADER */
}

/* GRILLA */
.services-grid {
  display: grid;
  grid-template-columns: repeat(1,1fr);
  gap: 3rem;
  padding: 4rem;
  background: linear-gradient(to bottom, #ffffff, #007EA7);
  min-height: 100vh;
}

/* TARJETAS */
.service-card {
  background: rgba(0, 0, 0, 0.55);
  padding: 2rem;
  border-radius: 1rem;
  color: #fff;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 18px rgba(0,0,0,0.4);

  /* 🟦 LO IMPORTANTE: LAYOUT EN FILA */
  font-family: 'Marcellus', serif;
  display: flex;
  align-items: center;
  gap: 2rem;

  text-align: left; /* texto hacia la derecha, correctamente alineado */
}

/* IMAGEN */
.service-img {
  width: 140px;
  height: auto;
  filter: brightness(0.9);
  flex-shrink: 0; /* evita que la imagen se deforme */
}

/* TITULOS */
/* Texto a la derecha */
.service-card h2 {
  font-family: 'Marcellus', serif;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.service-card p {
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
}

.footer {
  background: #007EA7;
  padding-top: 10vh;
  text-align: center;
  color: white;
}

@media (max-width: 900px) {
  .service-card {
    flex-direction: column;
    text-align: center;
  }

  .service-img {
    margin-bottom: 1rem;
  }
}
</style>
