import { useCallback } from 'react'

const splashTimers = new WeakMap()

function setGlowPoint(event) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--glow-x', `${event.clientX - rect.left}px`)
  el.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
}

export function useCardGlow() {
  const onPointerMove = useCallback((event) => {
    if (event.pointerType === 'touch') return
    setGlowPoint(event)
  }, [])

  const onPointerDown = useCallback((event) => {
    if (event.pointerType !== 'touch') return
    const el = event.currentTarget
    setGlowPoint(event)
    el.classList.remove('is-splashing')
    void el.offsetWidth
    el.classList.add('is-splashing')
    window.clearTimeout(splashTimers.get(el))
    splashTimers.set(el, window.setTimeout(() => el.classList.remove('is-splashing'), 750))
  }, [])

  return { onPointerMove, onPointerDown }
}
