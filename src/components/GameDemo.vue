<script setup>
// Demo jugable (exportación web de Godot en public/demos/<juego>/) dentro de un iframe.
// Pesa unos 70 MB, así que NO se carga al abrir la ficha: primero se ve una portada con
// un botón, y el iframe se crea solo cuando la persona decide jugar.
import { nextTick, ref } from 'vue'
import { t } from '@/i18n'

const props = defineProps({
  src: { type: String, required: true }, // ruta al .html de la exportación
  poster: { type: String, required: true }, // imagen de portada (pixel art)
  title: { type: String, required: true }, // nombre del juego
})

const started = ref(false)
const frame = ref(null)

async function start() {
  started.value = true
  await nextTick()
  frame.value?.focus() // para que el teclado vaya directo al juego
}

function onLoad() {
  frame.value?.focus()
}

function fullscreen() {
  frame.value?.requestFullscreen?.()
}
</script>

<template>
  <div class="demo">
    <div class="demo__stage">
      <iframe
        v-if="started"
        ref="frame"
        class="demo__frame"
        :src="props.src"
        :title="t('game.demoFrame', { title: props.title })"
        allow="fullscreen; autoplay; gamepad"
        allowfullscreen
        @load="onLoad"
      ></iframe>

      <div v-else class="demo__cover">
        <img class="demo__poster" :src="props.poster" alt="" width="1920" height="1080" />
        <button type="button" class="btn demo__play" @click="start">
          <span class="demo__play-icon" aria-hidden="true"></span>
          {{ t('game.demoPlay') }}
        </button>
      </div>
    </div>

    <div class="demo__bar">
      <p v-if="!started" class="demo__note">{{ t('game.demoSize') }}</p>
      <button v-else type="button" class="btn btn--ghost demo__full" @click="fullscreen">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ t('game.demoFullscreen') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.demo__stage {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  overflow: hidden;
  background: var(--media-bg); /* el juego tiene fondo negro: evita un destello al cargar */
}

.demo__frame,
.demo__cover,
.demo__poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.demo__poster {
  object-fit: cover;
  image-rendering: pixelated;
  opacity: 0.55;
}

.demo__cover {
  display: grid;
  place-items: center;
}

.demo__play {
  position: relative; /* por encima de la portada */
  font-size: var(--fs-lead);
}

/* Triángulo de "play" (apunta hacia delante también en RTL) */
.demo__play-icon {
  width: 0;
  height: 0;
  border-block: 7px solid transparent;
  border-inline-start: 11px solid currentColor;
}

.demo__bar {
  display: flex;
  margin-top: 0.75rem;
}
.demo__full {
  margin-inline-start: auto;
}
.demo__note {
  margin: 0;
  color: var(--text-muted);
  font-size: var(--fs-label);
}
</style>
