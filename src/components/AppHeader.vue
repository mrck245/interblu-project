<template>
  <header class="encabezado">
    <img :src="logo" alt="Interblü logo" class="logo" />
    <p style="color: white; text-align: center; padding-top: 10px"></p>
    <nav class="navbar">
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
import logo from '@/assets/Sources/interblu-logo.png'
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
  router.push('/')
}

function goServices() {
  router.push('/services')
}

function goProducts() {
  router.push('/products')
}

function goAbout() {
  router.push('/about')
}

function goContacts() {
  router.push('/contacts')
}

function goLogin() {
  router.push('/login')
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
  z-index: 1000; /* el más alto */
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
  height: 3.2vh;
  z-index: 999; /* un poco menos que el header */
}

.navbar ul {
  list-style: none;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
}

.navbar li {
  flex: 1;
}

.navbar button {
  font-family: 'Marcellus', serif;
  font-size: 2.2vh;
  text-align: center;
  width: 100%;
  height: 5vh;
  background-color: #81c4da;
  color: 003249;
  border: none;
  padding: 8px 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.navbar button:hover {
  background-color: #c9eefa;
  color: #013f5c;
}
</style>
