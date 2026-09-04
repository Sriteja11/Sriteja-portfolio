import { useEffect, useRef } from 'react'

const CARD_SELECTOR = '.story-card, .project-card, .utility-card, .credential-card, .stack-column'

const PALETTES = [
  ['rgba(124, 58, 237, 0.20)', 'rgba(59, 130, 246, 0.10)'],
  ['rgba(236, 72, 153, 0.18)', 'rgba(124, 58, 237, 0.10)'],
  ['rgba(16, 185, 129, 0.18)', 'rgba(59, 130, 246, 0.10)'],
  ['rgba(245, 158, 11, 0.20)', 'rgba(236, 72, 153, 0.10)'],
  ['rgba(59, 130, 246, 0.20)', 'rgba(16, 185, 129, 0.10)'],
]

export function TouchSplash() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let paletteIndex = Math.floor(Math.random() * PALETTES.length)

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse') return
      if (event.target instanceof Element && event.target.closest(CARD_SELECTOR)) return
      const [inner, outer] = PALETTES[paletteIndex % PALETTES.length]
      paletteIndex += 1

      const drop = document.createElement('div')
      drop.className = 'app-splash'
      drop.style.left = `${event.clientX}px`
      drop.style.top = `${event.clientY}px`
      drop.style.setProperty('--splash-inner', inner)
      drop.style.setProperty('--splash-outer', outer)
      layer.appendChild(drop)
      window.setTimeout(() => drop.remove(), 1000)
    }

    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return <div ref={layerRef} className="app-splash-layer" aria-hidden="true" />
}
