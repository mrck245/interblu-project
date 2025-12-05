<template>
  <section id="inicio" class="hero-wrapper">

    <!-- Control izquierdo -->
    <div class="sidebar-controls">
      <button @click="prevSlide" class="nav-btn" aria-label="Anterior">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </div>

    <!-- Zona central -->
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
        <h1>Micro-SaaS para tus proyectos</h1>
        <p>
          En interblü desarrollamos Software simple, práctico y eficiente para tus videojuegos,
          explora nuestros servicios y duplica tu rendimiento.
        </p>
      </div>
    </div>

    <!-- Control derecho -->
    <div class="sidebar-controls sidebar-controls-right">
      <button @click="nextSlide" class="nav-btn" aria-label="Siguiente">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>

  </section>
</template>


<script setup>
import { ref } from 'vue'

// Asegúrate de que estas rutas de importación sean correctas en tu proyecto
import ms1 from '@/assets/Sources/pictures/sheeptunelogo.png'
import ms2 from '@/assets/Sources/pictures/asperlogo.png'
import ms3 from '@/assets/Sources/pictures/juralogo.png'

const currentIndex = ref(0)
const images = [ms1, ms2, ms3]

const nextSlide = () => {
  currentIndex.value = currentIndex.value < images.length - 1 ? currentIndex.value + 1 : 0
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : images.length - 1
}
</script>

<style scoped>
/* NOTA: Esta clase (.header-navbar) debe estar en el CSS de tu Header. */
.header-navbar {
  position: fixed; /* O position: sticky */
  top: 0;
  width: 100%;

  /* 🛑 CLAVE DE LA SOLUCIÓN: El índice Z más alto */
  z-index: 1000; /* Asegura que esté por encima de cualquier otro contenido */

  /* Puedes usar el color de fondo de tu menú (azul claro) aquí: */
  background-color: #a3d8ff; /* (Estimado basado en tu imagen) */
}
/* ------------------------------------------- */
/* I. ESTRUCTURA GLOBAL (Ajuste de Altura para el Header) */
/* ------------------------------------------- */
.hero-wrapper {
  display: flex;
  width: 100%;
  background: white; /* 🛑 CLAVE: Fondo Blanco */
  overflow: hidden;

  margin-top: 17vh;
  height: calc(100vh - 80px);
}

/* --- AMBAS BARRAS LATERALES --- */
.sidebar-controls {
  width: 80px;
  background-color: #002638; /* Color de barra lateral oscuro (se mantiene) */
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
  /* 🛑 CORRECCIÓN 1: Alinea el contenido (el .hero-content) a la izquierda */
  justify-content: flex-start;
}

/* ------------------------------------------- */
/* II. ESTILOS DE BOTONES Y CARRUSEL         */
/* ------------------------------------------- */
.nav-btn {
  /* Ajuste para fondo blanco: Contraste oscuro/claro */
  background: #003249; /* Fondo azul oscuro */
  border: 1px solid white;
  color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);

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
  border-color: #003249;
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
  background-size: 50%; /* Zoom suave */
  background-position: 90vh; /* Enfoca la izquierda */
  background-repeat: no-repeat;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Degradado Sutil de Transparente a Blanco si lo necesitas para asegurar la legibilidad del texto aqua */
  background: linear-gradient(
    to right,
    #81c4da 20%, #fff 70%
  );
  /* Si prefieres no tener ningún oscurecimiento en la imagen, usa: background: none; */
}

/* ------------------------------------------- */
/* III. CONTENIDO DE TEXTO (Frente)      */
/* ------------------------------------------- */
.hero-content {
  position: relative;
  z-index: 0;

  color: #003249; /* Texto en color aqua/cian oscuro */

  font-family: 'Marcellus', serif;
  /* 🛑 CORRECCIÓN 2: Alinea el texto a la izquierda (inicio) */
  text-align: start;
  /* 🛑 CORRECCIÓN 3: Usa margin-left para crear espacio con la barra lateral */
  margin-left: 2.5rem;
  /* Eliminar margin-right si existiera */

  font-size: 4vw;
  margin-bottom: 1rem;
  max-width: 40%;
}

.hero-content h1,
.hero-content h2 {
  font-family: 'Marcellus', serif;
  /* 🛑 CORRECCIÓN 4: Alineación de títulos a la izquierda */
  text-align: start;
  /* Usamos margin-left en lugar de margin-right para indentación */
  margin-left: 2rem;
  margin-right: 0; /* Aseguramos que no haya margin-right */
  font-size: 4vw;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.6vw;
  /* 🛑 CORRECCIÓN 5: Alineación de párrafo a la izquierda */
  text-align: start;
  /* Usamos margin-left si quieres indentar el párrafo */
  margin-left: 2rem;
  margin-right: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to left,
   rgba(255, 255, 255, 0) 10%, #fff 60% 
  );

  
}
</style>
