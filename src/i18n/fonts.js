// Fuentes de los idiomas con escrituras no latinas.
//
// Cada idioma usa dos fuentes libres (licencia OFL), incluidas en el proyecto:
// - Títulos: una serif clásica con el carácter de Marcellus (que solo tiene letras latinas).
// - Cuerpo: Noto Sans de esa escritura, pensada para combinar con Inter.
//
// Se descargan SOLO cuando alguien elige ese idioma (no afectan al resto de visitantes).
// Los nombres de las familias se usan en src/assets/main.css (bloque "Idiomas con escrituras no latinas").
const loaders = {
  ja: () =>
    Promise.all([
      import('@fontsource/shippori-mincho/400.css'),
      import('@fontsource-variable/noto-sans-jp'),
    ]),
  zh: () =>
    Promise.all([
      import('@fontsource/noto-serif-sc/400.css'),
      import('@fontsource-variable/noto-sans-sc'),
    ]),
  ko: () =>
    Promise.all([
      import('@fontsource/gowun-batang/400.css'),
      import('@fontsource-variable/noto-sans-kr'),
    ]),
  hi: () =>
    Promise.all([
      import('@fontsource/tiro-devanagari-hindi/400.css'),
      import('@fontsource-variable/noto-sans-devanagari'),
    ]),
  ar: () =>
    Promise.all([
      import('@fontsource/amiri/400.css'),
      import('@fontsource-variable/noto-sans-arabic'),
    ]),
}

const loaded = new Set()

/** Carga las fuentes de un idioma (si las necesita y no están cargadas ya). */
export function loadLocaleFonts(code) {
  if (!loaders[code] || loaded.has(code)) return
  loaded.add(code)
  // No se espera a que terminen: el texto se muestra de inmediato con la fuente
  // del sistema y cambia a la definitiva en cuanto llega (font-display: swap).
  loaders[code]().catch(() => loaded.delete(code))
}
