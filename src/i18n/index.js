// Traducciones del sitio, sin librerías externas.
//
// - Los textos de cada idioma están en ./locales/<código>.js (misma estructura que es.js).
// - El español se carga siempre (es el idioma por defecto y el de respaldo).
//   Los demás se descargan solo cuando alguien elige ese idioma.
// - URLs: el español va en la raíz (/juegos) y el resto con prefijo (/en/juegos, /ar/juegos...).
import { ref } from 'vue'
import es from './locales/es.js'
import { loadLocaleFonts } from './fonts.js'

export const DEFAULT_LOCALE = 'es'

// Orden en el selector. `name` va en el propio idioma. `htmlLang` es el código BCP 47
// para <html lang> y para formatear fechas.
export const LOCALES = [
  { code: 'es', name: 'Español', htmlLang: 'es', dir: 'ltr' },
  { code: 'en', name: 'English', htmlLang: 'en', dir: 'ltr' },
  { code: 'fr', name: 'Français', htmlLang: 'fr', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', htmlLang: 'de', dir: 'ltr' },
  { code: 'pt', name: 'Português', htmlLang: 'pt', dir: 'ltr' },
  { code: 'ja', name: '日本語', htmlLang: 'ja', dir: 'ltr' },
  { code: 'zh', name: '简体中文', htmlLang: 'zh-Hans', dir: 'ltr' },
  { code: 'ko', name: '한국어', htmlLang: 'ko', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', htmlLang: 'hi', dir: 'ltr' },
  { code: 'ar', name: 'العربية', htmlLang: 'ar', dir: 'rtl' },
]

export const LOCALE_CODES = LOCALES.map((l) => l.code)
export const PREFIXED_CODES = LOCALE_CODES.filter((c) => c !== DEFAULT_LOCALE)
export const localeInfo = (code) => LOCALES.find((l) => l.code === code) ?? LOCALES[0]

const loaders = import.meta.glob(['./locales/*.js', '!./locales/es.js'])
const messages = { es }

/** Idioma activo (reactivo). Lo cambia el router al navegar. */
export const locale = ref(DEFAULT_LOCALE)

/** Carga (si hace falta) y activa un idioma. También actualiza <html lang/dir>. */
export async function setLocale(code) {
  if (!LOCALE_CODES.includes(code)) code = DEFAULT_LOCALE
  if (!messages[code]) {
    messages[code] = (await loaders[`./locales/${code}.js`]()).default
  }
  locale.value = code
  const info = localeInfo(code)
  document.documentElement.lang = info.htmlLang
  document.documentElement.dir = info.dir
  loadLocaleFonts(code)
  const description = document.querySelector('meta[name="description"]')
  if (description) description.setAttribute('content', t('meta.description'))
}

function lookup(obj, key) {
  return key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
}

/**
 * Texto traducido. Si falta en el idioma activo, usa el español.
 * Admite variables: t('home.viewSheet', { title: 'TULIPS' }) con "Ver ficha de {title}".
 * Si el valor es una lista u objeto (p. ej. párrafos), lo devuelve tal cual.
 */
export function t(key, params) {
  let value = lookup(messages[locale.value], key)
  if (value === undefined) value = lookup(messages[DEFAULT_LOCALE], key)
  if (value === undefined) return key
  if (typeof value === 'string' && params) {
    value = value.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? '')
  }
  return value
}

/** Ruta con el prefijo del idioma: localePath('/juegos') → '/en/juegos' en inglés. */
export function localePath(path, code = locale.value) {
  if (code === DEFAULT_LOCALE) return path
  return path === '/' ? `/${code}` : `/${code}${path}`
}

/** Quita el prefijo de idioma de una ruta: '/en/juegos' → '/juegos'. */
export function stripLocale(path) {
  const match = path.match(/^\/([a-z]{2})(?=\/|$)(.*)$/)
  if (match && PREFIXED_CODES.includes(match[1])) return match[2] || '/'
  return path
}

/** Idioma que indica una ruta: '/ar/devlog' → 'ar'; '/devlog' → 'es'. */
export function localeFromPath(path) {
  const match = path.match(/^\/([a-z]{2})(?=\/|$)/)
  return match && PREFIXED_CODES.includes(match[1]) ? match[1] : DEFAULT_LOCALE
}

/** Formato de fecha largo según el idioma activo. */
export function formatDate(date) {
  return new Intl.DateTimeFormat(localeInfo(locale.value).htmlLang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
