<template>
  <section id="inicio" class="hero-wrapper">
    <div class="sidebar-controls">
      <button @click="prevSlide" class="nav-btn" aria-label="Anterior">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </div>

    <div class="hero-main-area">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="carousel-slide"
          :style="{ backgroundImage: `url(${image})` }"
        >
          <div class="overlay"></div>
        </div>
      </div>

      <div class="hero-content">
        <slot></slot>
        <h1>Videojuegos y entretenimiento</h1>
        <p>
          Interblü es un estudio enfocado al desarrollo de videojuegos indie, prueba nuestro nuevo
          lanzamiento ahora en las distintas tiendas de videojuegos online, o descargalo
          directamente en esta misma web desde la pestaña de “proyectos”
        </p>
      </div>
    </div>

    <div class="sidebar-controls sidebar-controls-right">
      <button @click="nextSlide" class="nav-btn" aria-label="Siguiente">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// importa tus imágenes
import vg1 from '@/assets/Sources/pictures/Untitled82_20251124125033.png'
import vg2 from '@/assets/Sources/pictures/Untitled82_20251124125140.png'
import vg3 from '@/assets/Sources/pictures/Untitled82_20251124125351.png'

const currentIndex = ref(0)
const images = [vg1, vg2, vg3]

// <-- DECLARA interval AQUÍ
let interval = null

const nextSlide = () => {
  currentIndex.value = currentIndex.value < images.length - 1 ? currentIndex.value + 1 : 0
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : images.length - 1
}

// auto-slide cada 4 segundos
onMounted(() => {
  interval = setInterval(() => {
    nextSlide()
  }, 4000)
})

// limpiar al desmontar
onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>


<style scoped>
.header-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
}

.hero-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  background: #003249;
  overflow: hidden;
  margin-top: 80px;
  height: calc(100vh - 80px);
}

.sidebar-controls {
  width: 80px;
  background-color: #002638;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
  flex-shrink: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
}

/* --- ÁREA PRINCIPAL (CARRUSEL) --- */
.hero-main-area {
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* ------------------------------------------- */
/* II. ESTILOS DE BOTONES Y CARRUSEL         */
/* ------------------------------------------- */
.nav-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background-color: white;
  color: #003249;
  border-color: white;
}

/* --- CARRUSEL (FONDO) --- */
.carousel-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.6s ease-in-out;
  z-index: 0;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  background-size: 130%; /* Zoom suave */
  background-position: 110% center; /* Enfoca la izquierda */
  background-repeat: no-repeat;
  position: relative;
}
/* ------------------------------------------- */
/* III. CONTENIDO DE TEXTO (Frente)      */
/* ------------------------------------------- */
.hero-content {
  position: relative;
  z-index: 10;
  color: white;
  font-family: 'Marcellus', serif;
  text-align: end;
  margin-right: 2.5rem;
  font-size: 4vw;
  margin-bottom: 1rem;
  max-width: 40%;
  text-shadow: black 0px 0px 30px;
}
  
:deep(.hero-content h1),
:deep(.hero-content h2) {
  font-family: 'Marcellus', serif;
  text-align: end;
  margin-right: 2rem;
  font-size: 4vw;
  margin-bottom: 1rem;
}

:deep(.hero-content p) {
  font-size: 1.6vw;
  text-align: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* ✅ CÓDIGO CLAVE: Degradado de transparente a negro (a la derecha) */
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 20%, #003249 70%);

  
  
}

@media (max-width: 912px) {

  /* CONTENEDOR GLOBAL */
  .hero-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 20vh; /* por tu header móvil */
    height: auto; /* el contenido define la altura */
  }

  /* OCULTAR BARRAS */
  .sidebar-controls {
    display: none;
  }

  /* CARRUSEL */
  .hero-main-area {
    position: relative;
    width: 100%;
    height: 80vh; 
    justify-content: center;
    align-items: center;
  }

  .carousel-track {
    height: 100%;
  }

  .carousel-slide {
    background-size: cover;
    background-position: center;
  }

  /* OVERLAY ADAPTADO */
  .overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.15) 40%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }

  /* TEXTO CENTRADO */
  .hero-content {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    margin: 0;
    max-width: 90%;
    
  }

  .hero-content h1 {
    font-size: 4.5vh;
    margin-bottom: 1rem;
    text-align: center;
  }

  .hero-content p {
    font-size: 2.4vh;

  }
}
</style>
