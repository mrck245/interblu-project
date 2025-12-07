<template>
  <footer class="footer">
    <div class="footer-divider"></div>

    <div class="footer-content">
      <div class="footer-left">
        <div class="social-icons">
          <a href="https://instagram.com/montm24" target="_blank">
            <img src="@/assets/Sources/instagram_white 1.png" alt="Instagram" />
          </a>

          <a href="https://x.com/mrck245" target="_blank">
            <img src="@/assets/Sources/X_logo_2023_(white).png" alt="X Twitter" />
          </a>

          <a href="https://github.com/mrck245" target="_blank">
            <img src="@/assets/Sources/git_hub_white.png" alt="GitHub" />
          </a>

          <a href="https://youtube.com/@mrck224" target="_blank">
            <img src="@/assets/Sources/youtube_white.png" alt="YouTube" />
          </a>

          <a href="https://facebook.com/" target="_blank">
            <img src="@/assets/Sources/facebook_logo_white.png" alt="Facebook" />
          </a>
        </div>

        <p class="copyright">© 2025 Interblü Std. Todos los derechos reservados.</p>
      </div>

      <div class="footer-right">
        <img
          src="@/assets/Sources/white-favicom-interblu 1.png"
          alt="Interblü Logo"
          class="logo-flower"
        />
      </div>
    </div>
  </footer>
</template>

<script setup>
// No se necesita lógica adicional por ahora
</script>

<style scoped>
/* Contenedor principal del footer */
.footer {
  color: white;
  width: 100%;
  padding: 0 5% 3rem 5%; /* Padding: Arriba 0, Lados 5%, Abajo 3rem */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* Quitamos height: 5vh porque cortaría el contenido.
     Dejamos que la altura sea automática según el contenido */
  height: auto;
}

/* La línea blanca delgada */
.footer-divider {
  width: 100%;
  height: 1px;
  background-color: white;
  margin-bottom: 1rem; /* Espacio entre la línea y los iconos */
  opacity: 0.8;
}

/* Contenedor que alinea Izquierda y Derecha */
.footer-content {
  display: flex;
  justify-content: space-between; /* Clave: Manda uno a la izq y otro a la derecha */
  align-items: flex-end; /* Alinea los elementos abajo */
}

/* --- ESTILOS IZQUIERDA (Redes y Texto) --- */
.footer-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-icons {
  display: flex;
  align-items: center;
  gap: 1.5rem; /* Espacio entre cada icono */
}

/* Estilo para las imágenes de los iconos */
.social-icons img {
  height: 24px; /* Tamaño estándar para iconos */
  width: auto;
  transition:
    transform 0.2s,
    opacity 0.2s;
  cursor: pointer;
}

.social-icons img:hover {
  transform: translateY(-3px); /* Efecto de flotar al pasar el mouse */
  opacity: 0.8;
}

.copyright {
  font-family: 'Marcellus', serif;
  font-size: 0.85rem;
  opacity: 0.8;
  margin: 0;
  text-align: left;
}

/* --- ESTILOS DERECHA (Logo Flor) --- */
.logo-flower {
  height: 80px; /* Ajusta este tamaño según qué tan grande quieres la flor */
  width: auto;
  object-fit: contain;
}

/* --- RESPONSIVE (Móvil) --- */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column-reverse; /* En móvil, la flor arriba o abajo */
    align-items: center;
    gap: 2rem;
  }

  .footer-divider {
    margin-bottom: 2rem;
  }

  .footer-left {
    align-items: center;
    text-align: center;
  }
}
</style>
