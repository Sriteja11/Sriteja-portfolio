import { useEffect, useRef } from 'react'

const CARD_SELECTOR = '.story-card, .project-card, .utility-card, .credential-card, .stack-column'

export function GlassLens() {
  const lensRef = useRef(null)

  useEffect(() => {
    const lens = lensRef.current
    if (!lens) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let raf = 0
    let started = false
    const pos = { x: -300, y: -300 }
    const target = { x: -300, y: -300 }

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22
      pos.y += (target.y - pos.y) * 0.22
      lens.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      if (!started) {
        pos.x = target.x
        pos.y = target.y
        started = true
      }
      const overCard = event.target instanceof Element && event.target.closest(CARD_SELECTOR)
      lens.classList.toggle('is-hidden', Boolean(overCard))
    }

    const onOut = (event) => {
      if (!event.relatedTarget) lens.classList.add('is-hidden')
    }

    const onDown = (event) => {
      if (event.pointerType !== 'mouse') return
      lens.classList.add('is-pressed')
    }
    const onUp = () => lens.classList.remove('is-pressed')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerout', onOut, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerout', onOut)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <div ref={lensRef} className="glass-lens is-hidden" aria-hidden="true">
      <div className="glass-lens__disc" />
    </div>
  )
}
