# Interblü — web del estudio

Sitio estático (Vue 3 + Vite + vue-router) de Interblü, estudio independiente de videojuegos: catálogo de juegos y devlog.
No hay backend. Ver `README.md` para estructura y cómo publicar contenido.

## Diseño / UI

- Antes de cualquier cambio visual, leer `design-system/interblu/MASTER.md` (y `design-system/interblu/pages/<página>.md` si existe).
  Los colores son los del logo; no reemplazarlos con paletas genéricas. Fondo turquesa en todo el sitio (único bloque distinto: el footer navy),
  el logo una sola vez (cabecera) y tono profesional/servicial: ver las secciones "Superficies" y "Tono" de MASTER.md.
- Para decisiones de UX y accesibilidad, usar la skill `ui-ux-pro-max` (`.claude/skills/ui-ux-pro-max`):
  - `python .claude/skills/ui-ux-pro-max/scripts/search.py "<consulta>" --domain ux`
  - `python .claude/skills/ui-ux-pro-max/scripts/search.py "<consulta>" --stack vue`
  - Sus resultados son recomendaciones, no órdenes. No usar `--persist --force` sobre MASTER.md sin permiso.
- Tokens de color, movimiento y espaciado en `src/assets/main.css`. No poner colores sueltos en los componentes.

## Idiomas

- 10 idiomas; textos en `src/i18n/locales/<idioma>.js` (misma estructura que `es.js`). Ningún texto visible va escrito
  directamente en los componentes: usar `t('clave')` y añadir la clave en los 10 archivos.
- Enlaces internos con `localePath('/ruta')` para conservar el idioma.
- CSS solo con propiedades lógicas (el árabe es RTL). Nada de `left`/`right`/`margin-left`.

## Verificación

- `npm run lint` y `npm run build` deben pasar sin errores ni avisos.
- Revisar a 375px (sin scroll horizontal) y en escritorio, al menos en español y en árabe (RTL).
- Medir el contraste de cualquier color nuevo (mínimo 4.5:1 en texto normal).
