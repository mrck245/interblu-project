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
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 13vh;
  background: #003249;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 0.4vh;
}

.logo {
  height: 80%; /* Ajusta según el tamaño que quieras */
  margin-top: 0vh;
  margin-left: 4vh;
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
  font-size: 3vh;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: auto;
}

@media (max-width: 912px) {



  .encabezado {

    height: 20vh;

    display: flex;

    flex-direction: column; /* Apila logo y nav (aunque nav está oculto) */

    align-items: center;    /* Centra el logo horizontalmente */

    justify-content: center; /* Centra el logo verticalmente */

  }



  .logo {

    height: 70%;

    margin-top: 0vh;

    margin-left: 0vh;

  }

  .hamburger {

    display: block;

    position: absolute;

    right: 2vh;

    top: 1vh;

  }



.navbar {
  position: fixed;
  top: 20vh;
  left: 0;
  width: 100%;
  background: #003f5c;
  opacity: 0;
  transform: translateY(-20px); /* se esconde hacia arriba */
  pointer-events: none;        /* impide clics mientras está oculto */
  transition: opacity 0.1s ease, transform 0.1s ease;
  padding: 0;
}



.navbar.active {
  opacity: 1;
  transform: translateY(0);   /* baja suavemente */
  pointer-events: auto;
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

    border-radius: 0px; /* opcional: hace que parezcan menú real */

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

@media (min-width: 913px) and (max-width: 1024px) {
  .logo {
    display: block;    /* ← agregar */
    height: 65%;
    margin-top: 0vh;
    margin-left: 3vh;
}
  
.navbar {
    /* 🛑 CAMBIO CLAVE: Quita la posición absoluta y el 'top' que lo desplaza */
    position: relative; /* O relative, para que siga el flujo */
    top: initial;
    left: initial;
    width: 100%;
    /* ... */
  }



  .navbar ul {
    /* Mantiene los botones horizontales pero se asegura de que el padre sea ancho */
    justify-content: center; 
  }


  .navbar button {

   width: 100%;
   height: 5vh;
    font-size: 1.6vh;
    font-display:fallback;
  }

  .navbar button:hover {
     background-color: #c9eefa;
      color: #013f5c;
  }

  /* Header más alto por mobile */
  .encabezado {
    height: 20vh; /* Se mantiene alto */
    flex-direction: column; /* Apila logo y nav */
    justify-content:center; /* Centra el bloque apilado */
  }

.hero-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  background: #003249;
  overflow: hidden;
  margin-top: 90px;
  height: calc(100vh - 80px);
}


}


</style>
