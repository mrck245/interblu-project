// Después de `vite build`: crea un HTML propio para cada página e idioma, para los buscadores.
//
// GitHub Pages no tiene reescrituras: sin esto, /devlog o /en/juegos/tulips solo existían
// gracias a 404.html y le respondían a Google "404, no existe". Ahora cada ruta tiene su
// archivo (dist/<ruta>/index.html) con:
//   - <html lang/dir> del idioma, título y descripción de esa página,
//   - enlace canónico y hreflang a la misma página en los otros idiomas,
//   - vista previa al compartir (Open Graph / X) y datos estructurados (JSON-LD).
// También escribe sitemap.xml, robots.txt y 404.html (con noindex).
//
// La página sigue siendo la misma aplicación de Vue: esto solo cambia lo que va en <head>.
// Las URL llevan barra final (/devlog/): así las sirve GitHub Pages sin redirección.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import process from 'node:process'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')
const SITE = (process.env.SITE_URL || 'https://interblugames.com').replace(/\/$/, '')

// Mismo orden y datos que src/i18n/index.js
const LOCALES = [
  { code: 'es', htmlLang: 'es', og: 'es_ES', dir: 'ltr' },
  { code: 'en', htmlLang: 'en', og: 'en_US', dir: 'ltr' },
  { code: 'fr', htmlLang: 'fr', og: 'fr_FR', dir: 'ltr' },
  { code: 'de', htmlLang: 'de', og: 'de_DE', dir: 'ltr' },
  { code: 'pt', htmlLang: 'pt', og: 'pt_BR', dir: 'ltr' },
  { code: 'ja', htmlLang: 'ja', og: 'ja_JP', dir: 'ltr' },
  { code: 'zh', htmlLang: 'zh-Hans', og: 'zh_CN', dir: 'ltr' },
  { code: 'ko', htmlLang: 'ko', og: 'ko_KR', dir: 'ltr' },
  { code: 'hi', htmlLang: 'hi', og: 'hi_IN', dir: 'ltr' },
  { code: 'ar', htmlLang: 'ar', og: 'ar_AR', dir: 'rtl' },
]
const DEFAULT = 'es'

// Redes del estudio (las mismas de src/data/socials.js), para los datos estructurados
const SOCIALS = [
  'https://youtube.com/@InterblüGames',
  'https://instagram.com/interblustd',
  'https://x.com/interblu_games',
  'https://www.facebook.com/profile.php?id=61571496374271',
  'https://interblu.itch.io',
]

// ---------- datos ----------

const messages = {}
for (const { code } of LOCALES) {
  const file = pathToFileURL(path.join(ROOT, 'src/i18n/locales', `${code}.js`)).href
  messages[code] = (await import(file)).default
}
const lookup = (obj, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
const t = (code, key) => {
  const v = lookup(messages[code], key) ?? lookup(messages[DEFAULT], key)
  return typeof v === 'string' ? v : ''
}

// Juegos: solo hace falta el slug y el título (src/data/games.js importa imágenes, no se puede cargar en Node)
const gamesSrc = fs.readFileSync(path.join(ROOT, 'src/data/games.js'), 'utf8')
const games = [...gamesSrc.matchAll(/slug:\s*'([^']+)',\s*title:\s*'([^']+)'/g)].map((m) => ({
  slug: m[1],
  title: m[2],
}))

function frontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const meta = {}
  if (!m) return meta
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
  }
  return meta
}

// Entradas del devlog por idioma: { es: { slug: meta }, en: {...} }
const posts = {}
for (const { code } of LOCALES) {
  const dir = path.join(ROOT, 'src/content/devlog', code)
  posts[code] = {}
  if (!fs.existsSync(dir)) continue
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    posts[code][f.replace(/\.md$/, '')] = frontmatter(fs.readFileSync(path.join(dir, f), 'utf8'))
  }
}

// Imagen para compartir: la captura principal de cada juego (y la de TULIPS para el resto)
const assets = fs.readdirSync(path.join(DIST, 'assets'))
const asset = (prefix) => {
  const f = assets.find((a) => a.startsWith(prefix + '-') && /\.(webp|png|jpe?g)$/.test(a))
  return f ? `${SITE}/assets/${f}` : null
}
const gameImage = { tulips: asset('meadow'), 'foreign-waltz': asset('title') }
const defaultImage = gameImage.tulips

// ---------- rutas ----------

const prefix = (code) => (code === DEFAULT ? '' : `/${code}`)
const url = (code, p) => `${SITE}${prefix(code)}${p}`

// Cada página: ruta sin idioma, y una función que da sus textos en un idioma (o null si no existe en él)
const pages = [
  { p: '/', info: (c) => ({ title: t(c, 'brand'), description: t(c, 'meta.description'), type: 'home' }) },
  { p: '/juegos/', info: (c) => ({ title: `${t(c, 'meta.games')} · ${t(c, 'brand')}`, description: t(c, 'meta.description') }) },
  { p: '/devlog/', info: (c) => ({ title: `${t(c, 'meta.devlog')} · ${t(c, 'brand')}`, description: t(c, 'meta.description') }) },
  { p: '/nosotros/', info: (c) => ({ title: `${t(c, 'meta.about')} · ${t(c, 'brand')}`, description: t(c, 'meta.description') }) },
  { p: '/contacto/', info: (c) => ({ title: `${t(c, 'meta.contact')} · ${t(c, 'brand')}`, description: t(c, 'meta.description') }) },
  ...games.map((g) => ({
    p: `/juegos/${g.slug}/`,
    info: (c) => ({
      title: `${g.title} · ${t(c, 'brand')}`,
      description: t(c, `gamesData.${g.slug}.summary`) || t(c, 'meta.description'),
      image: gameImage[g.slug],
      type: 'game',
      game: g,
    }),
  })),
  ...Object.keys(posts[DEFAULT]).map((slug) => ({
    p: `/devlog/${slug}/`,
    // Si la entrada no está traducida, esa página muestra el español: no se ofrece como versión propia
    info: (c) => {
      const meta = posts[c][slug]
      if (!meta) return null
      const game = games.find((g) => g.slug === meta.game)
      return {
        title: `${meta.title} · ${t(c, 'brand')}`,
        headline: meta.title,
        description: meta.summary || t(c, 'meta.description'),
        image: game ? gameImage[game.slug] : null,
        type: 'post',
        date: meta.date,
      }
    },
  })),
]

// ---------- HTML ----------

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const jsonld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

const organization = {
  '@type': 'Organization',
  '@id': `${SITE}/#org`,
  name: 'Interblü',
  alternateName: ['Interblu', 'Interblu Games', 'Interblü Games'],
  url: `${SITE}/`,
  logo: `${SITE}/icon-192.png`,
  sameAs: SOCIALS,
}

function structured(page, info, loc, canonical) {
  if (info.type === 'home') {
    return [
      { '@context': 'https://schema.org', ...organization },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Interblü', url: `${SITE}/`, inLanguage: loc.htmlLang, publisher: { '@id': `${SITE}/#org` } },
    ]
  }
  if (info.type === 'game') {
    return [{
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: info.game.title,
      url: canonical,
      description: info.description,
      image: info.image || undefined,
      inLanguage: loc.htmlLang,
      gamePlatform: ['PC', 'Windows', 'Linux', 'Android', 'Web browser'],
      applicationCategory: 'Game',
      author: { '@id': `${SITE}/#org` },
      publisher: organization,
    }]
  }
  if (info.type === 'post') {
    return [{
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: info.headline,
      description: info.description,
      datePublished: info.date || undefined,
      image: info.image || defaultImage || undefined,
      inLanguage: loc.htmlLang,
      mainEntityOfPage: canonical,
      author: organization,
      publisher: organization,
    }]
  }
  return []
}

function render(page, loc, info, alternates) {
  const canonical = url(loc.code, page.p)
  const image = info.image || defaultImage
  const head = [
    `<link rel="canonical" href="${esc(canonical)}" />`,
    ...alternates.map((a) => `<link rel="alternate" hreflang="${a.htmlLang}" href="${esc(url(a.code, page.p))}" />`),
    alternates.some((a) => a.code === DEFAULT)
      ? `<link rel="alternate" hreflang="x-default" href="${esc(url(DEFAULT, page.p))}" />`
      : '',
    `<meta property="og:site_name" content="Interblü" />`,
    `<meta property="og:type" content="${info.type === 'post' ? 'article' : 'website'}" />`,
    `<meta property="og:title" content="${esc(info.headline || info.title)}" />`,
    `<meta property="og:description" content="${esc(info.description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:locale" content="${loc.og}" />`,
    image ? `<meta property="og:image" content="${esc(image)}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@interblu_games" />`,
    ...structured(page, info, loc, canonical).map(jsonld),
  ].filter(Boolean)

  return template
    .replace(/<html[^>]*>/, `<html lang="${loc.htmlLang}" dir="${loc.dir}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(info.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(info.description)}$2`)
    .replace('</head>', `    ${head.join('\n    ')}\n  </head>`)
}

const sitemap = []
let count = 0
for (const page of pages) {
  const infos = Object.fromEntries(LOCALES.map((l) => [l.code, page.info(l.code)]))
  const alternates = LOCALES.filter((l) => infos[l.code])
  for (const loc of LOCALES) {
    let info = infos[loc.code]
    let indexable = true
    if (!info) {
      // Entrada sin traducir: la página existe (muestra el español), pero apunta a la versión en español
      info = infos[DEFAULT]
      indexable = false
    }
    let html = render(page, loc, info, alternates)
    if (!indexable) {
      html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${esc(url(DEFAULT, page.p))}"`)
    }
    const out = path.join(DIST, prefix(loc.code), page.p, 'index.html')
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, html)
    count++
    if (indexable) {
      sitemap.push(
        `  <url>\n    <loc>${esc(url(loc.code, page.p))}</loc>\n` +
          (info.date ? `    <lastmod>${info.date}</lastmod>\n` : '') +
          alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.htmlLang}" href="${esc(url(a.code, page.p))}" />`).join('\n') +
          `\n  </url>`,
      )
    }
  }
}

// 404: la misma aplicación (muestra "página no encontrada"), sin indexar
const notFound = template
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(t(DEFAULT, 'meta.notFound'))} · Interblü</title>`)
  .replace('</head>', `    <meta name="robots" content="noindex" />\n  </head>`)
fs.writeFileSync(path.join(DIST, '404.html'), notFound)

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemap.join('\n')}\n</urlset>\n`,
)
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)

console.log(`prerender: ${count} páginas, ${sitemap.length} en el sitemap (${SITE})`)
