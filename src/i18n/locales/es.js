// Español: idioma por defecto y de respaldo.
// Los demás archivos de esta carpeta tienen exactamente la misma estructura.
// Si a un idioma le falta un texto, se muestra el de este archivo.
export default {
  // Nombre del estudio en este idioma (título de la pestaña, copyright, logo)
  brand: 'Interblü',
  meta: {
    description:
      'Interblü, estudio independiente de videojuegos en Chiriquí, Panamá. Proyectos y registro de desarrollo.',
    home: 'Inicio',
    games: 'Proyectos',
    devlog: 'Devlog',
    about: 'Nosotros',
    contact: 'Contacto',
    notFound: 'Página no encontrada',
  },
  nav: {
    home: 'Inicio',
    games: 'Juegos',
    devlog: 'Devlog',
    about: 'Nosotros',
    contact: 'Contacto',
    menu: 'Menú',
    primary: 'Principal',
    homeLink: 'Interblü, ir al inicio',
    skip: 'Saltar al contenido',
    language: 'Idioma',
  },
  footer: {
    tagline: 'Estudio independiente de videojuegos.',
    location: 'Chiriquí, Panamá.',
    rights: 'Todos los derechos reservados.',
  },
  common: {
    readMore: 'Leer más',
    release: 'Lanzamiento',
    status: 'Estado',
    statuses: {
      inDevelopment: 'En desarrollo',
      prototype: 'Prototipo',
    },
  },
  home: {
    eyebrow: 'Estudio independiente de videojuegos',
    title: 'Desarrollamos videojuegos con identidad propia.',
    lead: 'Interblü es un estudio independiente con sede en Chiriquí, Panamá. Aquí publicamos información sobre nuestros proyectos y el registro de su desarrollo.',
    ctaProjects: 'Ver proyectos',
    ctaDevlog: 'Ver devlog',
    scrollHint: 'Ir a la siguiente sección',
    featuredEyebrow: 'Proyecto principal',
    viewSheet: 'Ver ficha de {title}',
    updatesEyebrow: 'Devlog',
    updatesTitle: 'Últimas actualizaciones',
    viewAll: 'Ver todas',
    catalogEyebrow: 'Catálogo',
    otherTitle: 'Otros proyectos',
  },
  games: {
    eyebrow: 'Catálogo',
    title: 'Proyectos',
    lead: 'Juegos de Interblü, en desarrollo y en fase de prototipo.',
  },
  game: {
    back: 'Todos los proyectos',
    playBeta: 'Jugar la beta gratis en itch.io',
    unavailableBefore: 'Este juego aún no está disponible. Las novedades se publicarán en el',
    unavailableLink: 'devlog',
    unavailableAfter: '.',
    updates: 'Actualizaciones',
  },
  devlog: {
    eyebrow: 'Registro de desarrollo',
    title: 'Devlog',
    lead: 'Actualizaciones y notas sobre el desarrollo de nuestros proyectos.',
    empty: 'Aún no hay entradas publicadas.',
    back: 'Devlog',
    onlySpanish: 'Esta entrada solo está disponible en español.',
  },
  about: {
    eyebrow: 'Nosotros',
    title: 'Sobre Interblü',
    paragraphs: [
      'Interblü es un estudio independiente de videojuegos fundado en octubre de 2025 en Chiriquí, Panamá. Comenzó como una marca de desarrollo de software y desde 2026 se dedica exclusivamente a los videojuegos.',
      'Nuestro objetivo es crear juegos con una identidad artística clara y una experiencia cuidada. Documentamos el desarrollo de forma abierta en el devlog para que jugadores y colaboradores puedan seguir el avance de cada proyecto.',
    ],
    teamTitle: 'Equipo',
    roles: {
      programming: 'Programación y diseño de juego',
      art: 'Arte y diseño gráfico',
    },
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Canales de contacto',
    lead: 'Para consultas, propuestas de colaboración o comentarios sobre nuestros juegos, puede escribirnos por correo o a través de nuestras redes.',
    email: 'Correo electrónico',
    social: 'Redes',
  },
  notFound: {
    title: 'Página no encontrada',
    lead: 'La dirección no existe o la página fue trasladada.',
    cta: 'Ir al inicio',
  },
  // Textos de cada juego. La clave es el `slug` de src/data/games.js.
  gamesData: {
    tulips: {
      // Nombre del juego en este idioma, como subtítulo bajo TULIPS (vacío = no se muestra)
      localTitle: '',
      release: 'Enero de 2027 (estimado)',
      betaNote: 'La beta incluye 41 de los 60 idiomas.',
      summary:
        'Aventura en pixel art con vista cenital. Disponible en 60 idiomas, con lanzamiento estimado para enero de 2027.',
      description: [
        'TULIPS es el proyecto principal de Interblü, actualmente en desarrollo: una aventura en pixel art con vista cenital y escenarios dibujados a mano.',
        'El juego está disponible en 60 idiomas. Actualmente estamos evaluando la incorporación de nuevos modos de juego.',
      ],
      features: ['Pixel art hecho a mano', '60 idiomas', 'Modo Free-for-all'],
      screenshots: [
        'Pantalla de título de TULIPS',
        'Personaje en un sendero entre pasto y tulipanes morados',
        'El mismo sendero con una paleta pálida de tonos crema',
      ],
    },
    'foreign-waltz': {
      release: '',
      summary: 'Proyecto en fase de prototipo.',
      description: [
        'Foreign Waltz se encuentra en fase de prototipo. Publicaremos los avances en el devlog.',
      ],
      features: [],
      screenshots: [
        'Logo de Foreign Waltz',
        'Mapa de un pueblo con casas, árboles y una estación de policía',
        'Un cruce de caminos con una rotonda',
      ],
    },
  },
}
