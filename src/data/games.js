// Catálogo de juegos.
//
// Aquí van solo los datos que NO cambian con el idioma (imágenes, estado, enlaces).
// Los textos (resumen, descripción, características, fecha, textos alternativos de
// las capturas) están en src/i18n/locales/<idioma>.js, dentro de `gamesData.<slug>`.
//
// Para añadir un juego: agrega un objeto aquí, pon sus imágenes en
// src/assets/games/<slug>/ y sus textos en `gamesData.<slug>` de cada idioma.
import { t } from '@/i18n'
import tulipsTitle from '@/assets/games/tulips/title.webp'
import tulipsMeadow from '@/assets/games/tulips/meadow.webp'
import tulipsPale from '@/assets/games/tulips/pale-meadow.webp'
import fwTitle from '@/assets/games/foreign-waltz/title.webp'
import fwTown from '@/assets/games/foreign-waltz/town.webp'
import fwCrossroads from '@/assets/games/foreign-waltz/crossroads.webp'

export const games = [
  {
    slug: 'tulips',
    title: 'TULIPS',
    tagline: 'Dedicated to you..!', // texto del propio juego: no se traduce
    status: 'inDevelopment', // clave de common.statuses
    // Tema visual propio (clase .theme-<nombre> en src/assets/main.css). Opcional.
    theme: 'tulips',
    featured: true,
    cover: tulipsMeadow,
    screenshots: [tulipsTitle, tulipsMeadow, tulipsPale],
    // Demo jugable: exportación web de Godot copiada tal cual en public/demos/<slug>/. Opcional.
    demo: `${import.meta.env.BASE_URL}demos/tulips/Tulips.html`,
    // Enlaces para jugar/comprar. `labelKey` (texto del botón) y `noteKey` (aclaración
    // opcional debajo) son claves de i18n.
    links: [
      {
        labelKey: 'game.downloadDemo',
        noteKey: 'gamesData.tulips.demoNote',
        url: 'https://interblu.itch.io/tulips',
      },
    ],
  },
  {
    slug: 'foreign-waltz',
    title: 'Foreign Waltz',
    tagline: '',
    status: 'prototype',
    featured: false,
    cover: fwTitle,
    screenshots: [fwTitle, fwTown, fwCrossroads],
    links: [],
  },
]

/**
 * Devuelve el juego con sus textos en el idioma activo.
 * Úsalo dentro de un `computed` para que se actualice al cambiar de idioma.
 */
export function localizeGame(game) {
  if (!game) return null
  const text = (key) => t(`gamesData.${game.slug}.${key}`)
  const alts = text('screenshots')
  return {
    ...game,
    status: t(`common.statuses.${game.status}`),
    localTitle: text('localTitle'), // nombre en el idioma local (opcional)
    release: text('release'),
    summary: text('summary'),
    description: text('description'),
    features: text('features'),
    screenshots: game.screenshots.map((src, i) => ({
      src,
      alt: Array.isArray(alts) ? (alts[i] ?? game.title) : game.title,
    })),
    links: game.links.map((link) => ({
      url: link.url,
      label: t(link.labelKey),
      note: link.noteKey ? t(link.noteKey) : '',
    })),
  }
}

export const getGame = (slug) => games.find((g) => g.slug === slug)
export const featuredGame = games.find((g) => g.featured) ?? games[0]
