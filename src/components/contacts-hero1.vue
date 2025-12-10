<template>
  <main>
    <section class="contacts page-wrapper">

      <h1 class="title">¡Contáctanos!</h1>

      <div class="contact-list">

        <div class="contact-item">
          <img src="@/assets/Sources/youtube_white.png" alt="YouTube">
          <a href="https://youtube.com/@mrck224" target="_blank">
          <span>@interblustd</span>
          </a>
        </div>

        <div class="contact-item">
          <img src="@/assets/Sources/instagram_white 1.png" alt="Instagram">
          <a href="https://instagram.com/montm24" target="_blank">
          <span>@interblustd</span>
          </a>
        </div>

        <div class="contact-item">
          <img src="@/assets/Sources/X_logo_2023_(white).png" alt="X">
          <a href="https://x.com/mrck245" target="_blank">
          <span>@interblustd</span>
          </a>
        </div>

        <div class="contact-item">
          <img src="@/assets/Sources/facebook_logo_white.png" alt="Facebook">
          <a href="https://www.facebook.com/profile.php?id=61571496374271" target="_blank">
          <span>Interblü Studio</span>
          </a>
        </div>

        <div class="contact-item">
          <img src="@/assets/Sources/git_hub_white.png" alt="GitHub">
          <a href="https://github.com/mrck245" target="_blank">
          <span>mrck245</span>
          </a>
        </div>

        <div class="contact-item">
          <img src="@/assets/Sources/6ak2vv6kr512hip8ndktntij5p.png" alt="Email">
          <span>contact.interblu@gmail.com</span>
        </div>

      </div>

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

.contacts {
  font-family: "Marcellus", sans-serif;
  font-size: 1.3rem;
  background: linear-gradient(to bottom, #007EA7, #003249);
  min-height: 100vh;
  padding: 4rem 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Título */
.title {
  font-size: 3rem;
  margin-bottom: 3rem;
}

/* Lista de contactos */
.contact-list {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Cada red */
.contact-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Iconos */
.contact-item img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.footer {
  background: #003249;
  text-align: center;
  color: white;
  padding-top: 5vh;
}

.contact-item a {
  color: white;              /* Mantiene el color blanco */
  text-decoration: none;     /* Quita el subrayado */
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
}

/* Hover elegante */
.contact-item a:hover {
  color: #7fdcff;            /* Azul clarito bonito */
  transform: translateX(6px);
}

/* Evita que cambie a morado después de visitar */
.contact-item a:visited:hover {
  color: #003249;
}

/* Cursor de enlace */
.contact-item a {
  cursor: pointer;
}

/* Responsive */
@media (max-width: 912px) {
  .contacts {
    font-size: 1.2rem;
  }

  .title {
    font-size: 2.2rem;
  }

  .page-wrapper {
    margin-top: 16vh;
  }
}

@media (min-width: 913px) and (max-width: 1024px) {
  .page-wrapper {
    margin-top: 20vh;
  }
}
</style>
