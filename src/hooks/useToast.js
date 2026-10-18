import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Hook to manage transient toast notifications.
 *
 * @param {number} defaultDurationMs
 * @returns {{ toast: { message: string, key: number } | null, showToast: (msg: string, duration?: number) => void }}
 */
export function useToast(defaultDurationMs = 2800) {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const showToast = useCallback(
    (message, duration = defaultDurationMs) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      setToast({ message, key: Date.now() })
      timerRef.current = setTimeout(() => {
        setToast(null)
      }, duration)
    },
    [defaultDurationMs]
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return { toast, showToast }
}
