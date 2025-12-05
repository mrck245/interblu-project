<template>
  <main class="home">
    <HeroSaas />
    <Hero2Saas />
    <Footer />
  </main>
</template>

<script setup>
import HeroSaas from '@/components/hero-saas.vue'
import Hero2Saas from '@/components/hero1-saas.vue'
import Footer from '@/components/footer-saas.vue'
</script>

<style scoped>
.home {
  padding-top: calc(13vh + 3.2vh);
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

/* quita el espacio visible entre secciones */
.home > * + * {
  margin-top: 0;
}

/* si usas un header fijo, este padding evita que el hero se tape */
.hero {
  padding-top: 15vh;
  text-align: center;
  color: #003249;
}

/* asegúrate de usar unidades en el padding */
.hero1 {
  background: #003249;
  padding-top: 15vh;
  text-align: center;
  color: white;
}
.footer {
  background: #00141e;
  padding-top: 10vh;
  text-align: center;
  color: white;
}
</style>
