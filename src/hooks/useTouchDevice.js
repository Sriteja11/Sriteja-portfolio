import { useState, useEffect } from 'react'

/**
 * Hook to detect whether the user is on a touch or coarse pointer device.
 *
 * @returns {boolean}
 */
export function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isCoarse = window.matchMedia?.('(pointer: coarse)')?.matches ?? false
    const isFine = window.matchMedia?.('(pointer: fine)')?.matches ?? false
    const hasTouchOnly = ('ontouchstart' in window || (navigator.maxTouchPoints > 0)) && !isFine
    setIsTouch(Boolean(isCoarse || hasTouchOnly))
  }, [])

  return isTouch
}
