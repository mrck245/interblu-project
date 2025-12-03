<template>
  <section class="services-hero1">
    <h1>Project Jura</h1>
    <p>
      Project Jura es un proyecto que consiste en una web app potenciada por un modelo AI entrenado
      para generar spritesheets a través de prompts o imágenes que solicite el usuario. Fecha
      estimada de lanzamiento: Verano del 2026
    </p>
  </section>
</template>

<script setup></script>

<style scoped>
.services-hero1 {
  width: 100%;
  height: 200vh;
  background: linear-gradient(to top, #003249 20%, #000000 70%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  font-size: 3vh;
  color: #fff;
}

.services-hero1 h1 {
  font-family: 'Marcellus', serif;
  /* 🛑 CORRECCIÓN 4: Alineación de títulos a la izquierda */
  text-align: end;
  /* Usamos margin-left en lugar de margin-right para indentación */
  margin-left: 4rem;
  margin-right: 0; /* Aseguramos que no haya margin-right */
  font-size: 4vw;
  margin-bottom: 1rem;
}
</style>
