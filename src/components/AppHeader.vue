<template>
  <header class="encabezado">
    <img :src="logo" alt="Interblü logo" class="logo" />

    <!-- Botón hamburguesa -->
    <button class="hamburger" @click="isOpen = !isOpen">
      ☰
    </button>

    <!-- NAV normal + responsive -->
    <nav :class="['navbar', { active: isOpen }]">
      <ul>
        <li><button @click="goHome">Inicio</button></li>
        <li><button @click="goServices">Servicios</button></li>
        <li><button @click="goProducts">Productos</button></li>
        <li><button @click="goAbout">Acerca De</button></li>
        <li><button @click="goContacts">Contactos</button></li>
        <li><button @click="goLogin">Iniciar Sesión</button></li>
      </ul>
    </nav>
  </header>
</template>


<script setup>
import { ref } from 'vue'
import logo from '@/assets/Sources/interblu-logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

function goHome() {
  router.push('/')
  isOpen.value = false
}

function goServices() {
  router.push('/services')
  isOpen.value = false
}

function goProducts() {
  router.push('/products')
  isOpen.value = false
}

function goAbout() {
  router.push('/about')
  isOpen.value = false
}

function goContacts() {
  router.push('/contacts')
  isOpen.value = false
}

function goLogin() {
  router.push('/login')
  isOpen.value = false
}
</script>


<style scoped>
@font-face {
  font-family: 'Marcellus';
  src: url('@/assets/Sources/Marcellus/Marcellus-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.encabezado {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 13vh;
  background: #003249;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 2vh;
}

.logo {
  height: 80%; /* Ajusta según el tamaño que quieras */
  margin-left: 3vh;
  margin-top: 1vh;
}

.navbar {
  position: absolute;
  top: 13vh;
  left: 0;
  width: 100%;
  z-index: 999;
}

.navbar ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar li {
  flex: 1;
}

.navbar button {
  font-family: 'Marcellus', serif;
  font-size: 2.2vh;
  width: 100%;
  height: 5vh;
  background-color: #81c4da;
  color: #003249;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
}

.navbar button:hover {
  background-color: #c9eefa;
  color: #013f5c;
}

.hamburger {
  display: none;
  font-size: 4vh;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: auto;
}

@media (max-width: 912px) {
  .logo {
    display: block;
    margin: 0 auto;
    margin-left: 21vw;
    margin-top: 1.5vh;
}
  .hamburger {
    display: block;
    position: absolute;
    right: 6vh;
    top: 3vh;
  }

  .navbar {
    display: none;
    position: absolute;
    top: 13vh;
    left: 0;
    width: 100%;
    background: #003f5c;
    padding: 2vh 0;
  }

   .navbar.active {
    display: flex;
    flex-direction: column;
    align-items: center;      /* ← Centra horizontalmente */
    justify-content: flex-start;
    width: 100%;
    padding: 0;
  }

  /* Vertical */
  .navbar ul {
    display:list-item;
    flex-direction: column;
    align-items: stretch;      /* ← Centrar botones */
    justify-content: center;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .navbar button {
   width: 100%;
   height: 12vh;
    font-size: 3vh;
    border-radius: 0; /* opcional: hace que parezcan menú real */
  }

  .navbar button:hover {
     background-color: #c9eefa;
      color: #013f5c;
  }

  /* Header más alto por mobile */
  .encabezado {
    height: 20vh;
  }
  }

</style>
