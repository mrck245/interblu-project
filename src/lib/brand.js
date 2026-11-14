// Logos de la marca. Los idiomas con otra escritura (ar, hi, ja, ko, zh) tienen su
// propia adaptación en assets/brand/logo-<código>.webp; el resto usa el original.
import logo from '@/assets/brand/logo.webp'

const localized = import.meta.glob('@/assets/brand/logo-*.webp', {
  eager: true,
  import: 'default',
})
const byCode = Object.fromEntries(
  Object.entries(localized).map(([path, url]) => [path.match(/logo-(\w+)\.webp$/)[1], url]),
)

export const logoFor = (code) => byCode[code] ?? logo

/** Descarga y decodifica una imagen para que aparezca sin parpadeo. */
export function preloadImage(src) {
  const img = new Image()
  img.src = src
  return img.decode().catch(() => {})
}
