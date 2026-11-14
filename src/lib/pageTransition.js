// Coordina el scroll con la transición entre páginas: el router espera a que
// la página anterior termine de desvanecerse antes de subir al principio
// (o restaurar la posición guardada), así no se ve el salto.
let pending = null

export function waitForPageSwap() {
  pending?.()
  return new Promise((resolve) => {
    // Por si la transición no llega a ocurrir, no bloquear el scroll
    const timer = setTimeout(done, 1200)
    function done() {
      clearTimeout(timer)
      if (pending === done) pending = null
      resolve()
    }
    pending = done
  })
}

export function pageSwapped() {
  pending?.()
}
