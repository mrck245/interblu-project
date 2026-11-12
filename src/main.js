import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Fuente del cuerpo de texto (Inter, incluida en el proyecto). Solo se descarga el
// subconjunto de caracteres que usa cada idioma.
import '@fontsource-variable/inter'
import './assets/main.css'

createApp(App).use(router).mount('#app')
