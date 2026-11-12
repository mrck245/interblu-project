// Entradas del devlog, una carpeta por idioma: src/content/devlog/<idioma>/<slug>.md
//
// Cada archivo empieza con un bloque de metadatos entre líneas "---":
//
// ---
// title: Título de la entrada
// date: 2026-11-12
// summary: Una frase que aparece en la lista.
// game: tulips            (opcional, enlaza la entrada con un juego)
// ---
//
// - El slug (la URL) es el nombre del archivo sin ".md" y debe ser igual en todos los idiomas.
// - El español (es/) es la referencia: si una entrada no existe en otro idioma,
//   se muestra la versión en español con un aviso.
// - Los demás idiomas se descargan solo cuando alguien los elige.
import { computed, reactive } from 'vue'
import { marked } from 'marked'
import { locale, formatDate, DEFAULT_LOCALE } from '@/i18n'

const spanishFiles = import.meta.glob('../content/devlog/es/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const otherFiles = import.meta.glob(['../content/devlog/*/*.md', '!../content/devlog/es/*.md'], {
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw }

  const meta = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    const value = line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, '')
    if (key) meta[key] = value
  }
  return { meta, body: match[2] }
}

function parsePost(path, raw, code) {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  const { meta, body } = parseFrontmatter(raw)
  return {
    slug,
    locale: code,
    title: meta.title ?? slug,
    summary: meta.summary ?? '',
    game: meta.game ?? null,
    date: meta.date ? new Date(`${meta.date}T12:00:00`) : null,
    html: marked.parse(body),
  }
}

function parseFolder(files, code) {
  const result = {}
  for (const [path, raw] of Object.entries(files)) {
    const post = parsePost(path, raw, code)
    result[post.slug] = post
  }
  return result
}

// Entradas por idioma: { es: { slug: post }, en: {...}, ... }
const byLocale = reactive({ [DEFAULT_LOCALE]: parseFolder(spanishFiles, DEFAULT_LOCALE) })

/** Descarga las entradas de un idioma (si no se han cargado ya). */
export async function loadPosts(code) {
  if (byLocale[code]) return
  const prefix = `../content/devlog/${code}/`
  const entries = Object.entries(otherFiles).filter(([path]) => path.startsWith(prefix))
  const loaded = await Promise.all(entries.map(async ([path, load]) => [path, await load()]))
  byLocale[code] = parseFolder(Object.fromEntries(loaded), code)
}

/** Entradas en el idioma activo (con respaldo en español), de la más reciente a la más antigua. */
export const posts = computed(() => {
  const current = byLocale[locale.value] ?? {}
  const merged = { ...byLocale[DEFAULT_LOCALE], ...current }
  return Object.values(merged)
    .map((post) => ({
      ...post,
      isFallback: post.locale !== locale.value,
      dateLabel: post.date ? formatDate(post.date) : '',
    }))
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))
})

export const getPost = (slug) => posts.value.find((p) => p.slug === slug)
