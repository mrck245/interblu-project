# Interblü — web del estudio

Sitio de Interblü, estudio independiente de videojuegos: catálogo de juegos y registro de desarrollo (devlog).

Hecho con Vue 3, Vite y vue-router. No necesita backend: todo el contenido vive en el repositorio.

Disponible en 10 idiomas: español (por defecto), inglés, francés, alemán, portugués, japonés,
chino simplificado, coreano, hindi y árabe (de derecha a izquierda).

## Desarrollo

```sh
npm install
npm run dev      # servidor local con recarga en caliente
npm run build    # genera la versión de producción en dist/
npm run lint     # revisa el código con ESLint
```

## Cómo publicar contenido

### Nueva entrada del devlog

Crea un archivo `.md` en `src/content/devlog/es/` (español, obligatorio) y, si quieres, su traducción
con **el mismo nombre de archivo** en la carpeta de cada idioma (`en/`, `fr/`, `ar/`...).
El nombre del archivo será la URL (por ejemplo, `2026-12-01-nuevos-sprites.md` →
`/devlog/2026-12-01-nuevos-sprites` en español y `/en/devlog/2026-12-01-nuevos-sprites` en inglés).
Si una entrada no está traducida a un idioma, se muestra en español con un aviso.

```md
---
title: Nuevos sprites para TULIPS
date: 2026-12-01
summary: Una frase que aparece en la lista de entradas.
game: tulips
---

Aquí va el texto en **Markdown**.
```

`game` es opcional: si coincide con el `slug` de un juego, la entrada aparece en la página de ese juego.
Las imágenes para las entradas van en `public/devlog/` y se usan como `![descripción](/devlog/imagen.png)`.

### Nuevo juego o cambios en uno existente

- Datos fijos (imágenes, estado, enlaces): `src/data/games.js`. Las imágenes van en `src/assets/games/<slug>/`.
- Textos (resumen, descripción, características, fecha de lanzamiento, descripción de las capturas):
  en `src/i18n/locales/<idioma>.js`, dentro de `gamesData.<slug>`. Hay que cambiarlos en los 10 idiomas.
- Cuando un juego tenga descarga (por ejemplo en itch.io), añade el enlace en `links`.

### Textos del sitio y traducciones

Todos los textos de la interfaz están en `src/i18n/locales/`, un archivo por idioma, con la misma estructura
que `es.js`. Si a un idioma le falta un texto, se muestra el español.

- URLs: el español va en la raíz (`/juegos`) y los demás con prefijo (`/en/juegos`, `/ar/juegos`).
- Cada idioma se descarga solo cuando alguien lo elige en el selector de la cabecera.
- Para añadir un idioma: crea `src/i18n/locales/<código>.js` copiando `es.js`, añádelo a `LOCALES`
  en `src/i18n/index.js` y crea su carpeta en `src/content/devlog/`.
- Árabe: el sitio usa propiedades CSS lógicas (`inset-inline-start`, `padding-inline`...) para invertirse solo.
  Al escribir CSS nuevo, no uses `left`/`right` ni `margin-left`/`margin-right`.

## Estructura

```
src/
  assets/        estilos globales (main.css), logo, fuentes, iconos e imágenes de juegos
  components/    cabecera, pie, logo, selector de idioma y tarjetas
  content/devlog entradas del devlog en Markdown, una carpeta por idioma
  i18n/          idiomas: lógica (index.js) y textos (locales/<idioma>.js)
  data/          juegos y redes sociales
  lib/devlog.js  carga y convierte las entradas de Markdown
  router/        rutas
  views/         páginas
```

## Despliegue

Es un sitio estático: sube la carpeta `dist/` a Netlify, Vercel, Cloudflare Pages o similar.
Como usa rutas sin `#`, el servidor debe responder `index.html` a cualquier ruta.
`public/_redirects` ya lo configura para Netlify y Cloudflare Pages.
