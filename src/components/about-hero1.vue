<template>
  <main>
   <section class="about page-wrapper">
    <p>
      Interblü Studios es un proyecto iniciado en Octubre de 2025 en Bugaba, Panamá por mrck245.
      El proyecto consiste en una marca única bajo la cual publicamos nuestros distintos proyectos de Software y desarrollo de videojuegos. La misión es ofrecer software de calidad que pueda mejorar la eficiencia de desarrolladores de videojuegos y/o software, y a su vez, aportar a la industria a través de videojuegos con una fuerte identidad artística con la cual tanto usuarios como gamers puedan conectar.
      Muchas gracias por echar un vistazo a Interblü. :)
    </p>

   </section>

  
   <Footer />
 </main>
</template>

<script setup>
import Footer from '@/components/footer-saas.vue'
</script>

<style scoped>
.page-wrapper {
  margin-top: 17vh;
}

.about {
  font-family: "Marcellus", sans-serif;
  font-size: 2rem;
  background: #DDF8FF;
  min-height: 100vh;
  padding: 4rem 2rem;
}

/* Texto principal */
.about p {
  max-width: 60rem;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 1rem;
  color: #003249;
  line-height: 1.6;
}

.footer {
    background: #afd8e2;
    text-align: center;
    color: rgb(255, 255, 255);
    padding-top: 5vh
}

@media (max-width: 768px) {
  .page-wrapper {
  margin-top: 11vh;
}
}

</style>
