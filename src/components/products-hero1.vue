<template>
  <main>
   <section class="about page-wrapper">
    <div class="products-grid">

      <div class="products-card" v-for="item in products" :key="item.title">
        <img :src="item.img" alt="logo" class="products-img" />
        <div class="products-text">
          <h2>{{ item.title }}</h2>
          <p>{{ item.text }}</p>
        </div>
      </div>

    </div>
    </section>


  <Footer />
  </main>
</template>


<script setup>
import Footer from '@/components/footer-saas.vue'
import vg1 from '@/assets/Sources/pictures/Untitled82_20251124125033.png'

const products = [
  {
    title: "Foreign Waltz",
    text: "Loreps Ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: vg1
  }
]
</script>


<style scoped>
.page-wrapper {
  margin-top: 17vh;
}
/* ✨ Evita que el contenido quede detrás del header */

/* GRILLA */
.products-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* <-- Corregido */
  gap: 3rem;
  padding: 4rem;
  background: linear-gradient(to bottom, #003249, #000);
  min-height: 100vh;
}

/* TARJETA PRINCIPAL */
.products-card {
  background: rgba(0, 0, 0, 0.55);
  padding: 2rem;
  border-radius: 1rem;
  color: #fff;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 18px rgba(0,0,0,0.4);

  display: flex;
  align-items: center;
  gap: 2rem;
  

  font-family: 'Marcellus', serif;
}

/* IMAGEN */
.products-img {
  width: 160px;
  height: auto;
  border-radius: 10px;
  flex-shrink: 0;
}

/* TEXTO */
.products-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.products-card h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.products-card p {
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
}

.footer {
    background: #000000;
    text-align: center;
    color: rgb(255, 255, 255);
    padding-top: 2vh;
}

/* 🔥 RESPONSIVE */
@media (max-width: 900px) {

  .page-wrapper {
  margin-top: 17vh;
}

  .products-card {
    flex-direction: column;
    text-align: center;
  }

  .products-img {
    margin-bottom: 1rem;
  }
}

</style>
