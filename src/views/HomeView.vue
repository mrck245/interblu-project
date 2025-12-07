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

@media (max-width: 912px) {
    
    /* 1. Ajustar el padding principal del contenedor .home */
    /* Lo haces si cambiaste la altura de tu Header en móvil */
    .home {
        /* Ejemplo: Si tu header móvil es de 20vh de alto, ajustas el padding: */
        padding-top: 22vh; 
    }

    /* 2. Ajustar el espaciado interno de cada Hero */
    /* (Asumiendo que .hero es el HeroSaas y .hero1 es el Hero2Saas) */
    
    .hero {
        /* Reduce el padding para que el contenido empiece más arriba */
        padding-top: 5vh; 
    }

    .hero1 {
        /* Reduce el padding de Hero2Saas */
        padding-top: 5vh;
    }
    
    /* 3. Estilos Directos a Componentes Hijos (con :deep) */
    /* ---------------------------------------------------- */
    /* Si necesitaras modificar un estilo INTERNO del HeroSaas (por ejemplo,
       el tamaño de un título que está DENTRO de HeroSaas), usarías :deep: */
    
    /* Ejemplo: Hacer el título del primer Hero más pequeño */
    :deep(.hero-wrapper h1) {
        font-size: 8vw;
    }
    
    /* Ejemplo: Cambiar la alineación de .hero-content en el segundo Hero */
    :deep(.hero1 .hero-content) {
        text-align: center;
        max-width: 90%;
    }
}
</style>
