# Interblü — Design System (MASTER)

Fuente de verdad visual del sitio. Los archivos en `pages/` sobrescriben estas reglas solo para esa página.
Los tokens viven en `src/assets/main.css`; este documento explica cómo usarlos.

> Nota: se consultó la skill `ui-ux-pro-max` (`--design-system "indie game studio devlog portfolio"`).
> Su recomendación (paleta negra genérica, estilo "Motion-Driven", fuentes Archivo/Space Grotesk) **no se adoptó**:
> la identidad viene del logo de la marca. Sí se adoptó el patrón de landing **"Content First"**
> (fondo tipo papel, foco en el texto), el estilo **"Minimalism & Swiss"** (pocas superficies, sin degradados,
> secciones separadas por espacio) y las reglas de UX/accesibilidad de `references/quick-reference.md`.

## Producto

- **Tipo:** web de estudio independiente de videojuegos: catálogo de juegos + devlog.
- **Stack:** Vue 3 + Vite + vue-router, sitio estático; contenido en Markdown (`src/content/devlog`) y `src/data/games.js`.
- **Patrón:** Content First. Hero de texto → juego destacado → últimas actualizaciones → otros proyectos (cada una con su tono, ver Superficies).

## Color

El sitio usa el mismo esquema que el arte del logo: **azul marino sobre turquesa**. El turquesa es el fondo de todo el sitio.

Tokens de marca:

| Token | Hex | Uso |
|---|---|---|
| `--teal` | `#0a7fa6` | Color principal: fondo de todo el sitio (vía `--bg`) |
| `--navy` | `#00324a` | Footer, botón activo del menú, badges, logo |
| `--teal-soft` | `#81c4da` | Enlace del correo en el footer |
| `--white` | `#ffffff` | Texto y botón primario |

Tokens semánticos (los componentes usan **solo estos**):

| Token | Valor | Uso | Contraste medido |
|---|---|---|---|
| `--bg` | `--teal` | Fondo general y cabecera | — |
| `--surface` | `#07688a` | Tarjetas (turquesa + 30 % azul marino) | — |
| `--surface-hover` | `#066081` | Hover de filas y tarjetas | — |
| `--text` / `--heading` | blanco | Todo el texto sobre `--bg` | 4.57:1 sobre `--bg` |
| `--text-muted` | blanco 85 % | Texto secundario **solo dentro de `--surface`** o en el footer | 4.99:1 sobre `--surface` |
| `--border` | blanco 22 % | Bordes y separadores | — |
| `--border-strong` | blanco 60 % | Borde en hover, citas | — |
| `--focus` | blanco | Anillo de foco | — |

Reglas:
- Sobre `--bg` el texto es **blanco sólido**. El blanco semitransparente baja a 4.0:1 y no cumple.
- El azul marino sobre turquesa da 2.96:1: no sirve para texto, ni siquiera para títulos grandes. Solo para el logo (exento) y para bloques.
- Botón primario: fondo blanco con texto azul marino (13.5:1). Secundario: contorno blanco.
- Badges: fondo azul marino con texto blanco.

## Superficies

Historial (2026-11-12): primero había franjas de colores distintos entre secciones (turquesa → azul marino → claro → celeste → casi negro),
que se veían inconsistentes. Luego se probó un fondo claro (`paper`), que no gustó: el turquesa es el color de la marca.

- **Una sola superficie principal:** `--bg` (turquesa) en todo el sitio, cabecera incluida.
- Las secciones se separan con espacio y una línea fina (`border-top: 1px solid var(--border)`), nunca con un bloque de otro color.
- Tarjetas: `--surface` con borde `--border`.
- Único bloque distinto: el footer en `--navy`.
- Sin degradados ni sombras grandes. Sin modo oscuro aparte: el sitio ya es oscuro.

### Excepción: tonos por sección en el inicio

Decisión del usuario (2026-11-12): en el inicio, cada sección tiene su propio tono de la familia turquesa.
Los valores están en `src/assets/main.css` (tokens `--tone-*`), y las clases `.tone-*` redefinen los tokens semánticos.

| Sección | Token | Color | Texto |
|---|---|---|---|
| Desarrollamos videojuegos | `--tone-hero` | `#0a7fa6` (fondo general) | blanco 4.57:1 |
| TULIPS (proyecto principal) | `--tone-featured` | = `--tone-updates` (`#78b9ce`) | **azul marino** 6.19:1 |
| Últimas actualizaciones | `--tone-updates` | `#78b9ce` (+45 % blanco) | **azul marino** 6.19:1 (el blanco no cumple) |
| Otros proyectos | `--tone-projects` | `#07688a` (+30 % azul marino) | blanco 6.26:1 |

El resto de páginas siguen con un único fondo turquesa.

## Tipografía

- **Títulos:** Marcellus (local, `font-display: swap`), con `text-wrap: balance`.
- **Cuerpo:** Inter (variable, incluida en el proyecto vía `@fontsource-variable/inter`, licencia OFL), interlineado 1.6. Combinación tomada de la skill (`Classic Elegant`: serif elegante para títulos + Inter para cuerpo). En ja/zh/ko/hi/ar se usa la fuente del sistema, porque Inter no incluye esas escrituras.
- **Medida:** el texto largo se limita a 60–68ch (`.prose`, `.lead`).
- **Escala única** (tokens `--fs-*` en `src/assets/main.css`), fluida entre móvil y escritorio: label 13px · small 14px · body 16→17px · lead 17→20px · h3 19→22px · h2 23→36px · h1 28→48px · display 31→58px. No usar tamaños sueltos en los componentes.
- En móvil (≤980px) el selector de idioma va dentro del menú desplegable y el logo mide 52px.

## Logo

- Componente `LogoMark` (la imagen se usa como máscara y se pinta con `color`).
- **El logo aparece una sola vez por página: en la cabecera.** No repetirlo en el hero ni en otras secciones
  (se probó y se veía redundante). La flor blanca del footer es un elemento de marca menor y sí se mantiene.
- Color: `--navy` sobre el fondo turquesa, igual que el arte original.
- No deformar las proporciones (4:3).

## Idiomas

10 idiomas: es (por defecto), en, fr, de, pt, ja, zh (simplificado), ko, hi, ar (RTL). Ver `README.md`.

- Selector: `<select>` nativo con etiqueta oculta para lectores de pantalla y nombres de idioma en su propia lengua.
- **RTL:** usar solo propiedades lógicas (`inset-inline-*`, `padding-inline-*`, `margin-inline-*`,
  `border-inline-*`). Las flechas de texto llevan la clase `.arrow`, que se invierte en árabe.
  Correos y nombres de usuario van dentro de `<bdi>` para no desordenarse en árabe.
- **Tipografía por escritura** (todas OFL, incluidas en el proyecto y cargadas solo al elegir el idioma desde `src/i18n/fonts.js`):
  | Idioma | Títulos (carácter de Marcellus) | Cuerpo |
  |---|---|---|
  | ja | Shippori Mincho | Noto Sans JP |
  | zh | Noto Serif SC | Noto Sans SC |
  | ko | Gowun Batang | Noto Sans KR |
  | hi | Tiro Devanagari Hindi | Noto Sans Devanagari |
  | ar | Amiri | Noto Sans Arabic |
  Las palabras latinas dentro de esos idiomas siguen en Marcellus (títulos) e Inter (cuerpo).
  En hi/ar el interlineado sube a 1.75 y en ar no se usa espaciado entre letras (rompe la unión de caracteres).
- **Nombre del estudio por idioma** (clave `brand` de cada archivo de idioma; el logo es imagen y no cambia): Interblü en es/en/fr/de/pt · 互花 (zh) · インターブルー (ja) · 인터블루 (ko) · इंटरब्लू (hi) · إنتربلو (ar). En el código, usar `t('brand')`, nunca el nombre escrito a mano.
- Fechas con `Intl.DateTimeFormat` del idioma activo (`formatDate` en `src/i18n`).
- El tono profesional/servicial aplica a todos los idiomas (trato formal: usted, vous, Sie, です/ます, 합니다, 您, आप).

## Temas de juegos

Cada juego puede tener una estética propia basada en su arte. Se activa con `theme` en `src/data/games.js` (clase `.theme-<nombre>` en `src/assets/main.css`) y se aplica a su sección destacada del inicio, su tarjeta del catálogo y su ficha.

- **TULIPS** (`theme-tulips`): imita la pantalla de título del juego. Fondo negro, texto blanco, títulos y hover en el morado del logo `#9878f8` (6.3:1 sobre negro). En hover el texto va en **negro sobre morado**: blanco sobre morado solo da 3.3:1.

## Tono de los textos

Profesional y servicial, no entusiasta. Amable sin exagerar.

- Sin signos de exclamación, emoticonos ni expresiones como "con mucho cariño" o "¡Pronto!".
- Frases informativas y concretas: qué es, en qué estado está, cuándo, dónde informarse.
- Si hay que dirigirse al lector, de usted ("puede escribirnos"). Si no hace falta, construcciones impersonales.
- Las fechas estimadas se presentan como estimadas y se indica dónde se anunciarán los cambios.
- No inventar datos de un juego (modos, número de idiomas, fechas): solo los que confirme el equipo.

## Imágenes

- Formato WebP (pixel art sin pérdida). La clase `.pixel` (`image-rendering: pixelated`) es solo para sprites pequeños que se amplían; las capturas grandes se reducen con el escalado normal.
- Siempre con `width`/`height` o `aspect-ratio`, para evitar saltos de layout.
- `loading="lazy"` para todo lo que esté por debajo del primer pantallazo.

## Movimiento

- Tokens: `--dur-fast` 150ms (al pulsar), `--dur` 250ms (hover y estados), easing `--ease-out`.
- Solo `transform` y `opacity`. Como máximo 1–2 elementos animados por vista.
- Se respeta `prefers-reduced-motion`.

## Interacción y accesibilidad (checklist)

- [ ] Contraste ≥ 4.5:1 en texto normal (medido, no estimado)
- [ ] Objetivos táctiles ≥ 44×44px (botones, enlaces del menú, iconos sociales, botón de menú)
- [ ] Foco visible; enlace "Saltar al contenido"; el foco pasa a `<main>` al cambiar de ruta
- [ ] Menú móvil: `aria-expanded`, se cierra con Escape y devuelve el foco al botón
- [ ] Navegación: `aria-current="page"` también en las subrutas (`/juegos/tulips` marca "Juegos")
- [ ] Encabezados sin saltos de nivel (prop `headingLevel` en `GameCard`/`PostCard`)
- [ ] Iconos decorativos junto a texto visible con `alt=""`; enlaces que solo tienen icono llevan `aria-label`
- [ ] Sin scroll horizontal a 375px; revisar a 375 / 768 / 1024 / 1440
