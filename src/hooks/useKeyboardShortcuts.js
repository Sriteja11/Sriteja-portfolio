import { useEffect } from 'react'

/**
 * Hook to manage global keyboard shortcuts with guards for touch devices,
 * input fields, and open modal dialogs.
 *
 * @param {Object} options
 * @param {boolean} options.isTouch
 * @param {boolean} options.isPaletteOpen
 * @param {boolean} options.isShortcutsOpen
 * @param {() => void} options.onTogglePalette
 * @param {() => void} options.onOpenPalette
 * @param {() => void} options.onToggleShortcuts
 * @param {() => void} options.onToggleTheme
 * @param {() => void} options.onCopyEmail
 * @param {() => void} options.onDownloadResume
 */
export function useKeyboardShortcuts({
  isTouch = false,
  isPaletteOpen = false,
  isShortcutsOpen = false,
  onTogglePalette,
  onOpenPalette,
  onToggleShortcuts,
  onToggleTheme,
  onCopyEmail,
  onDownloadResume,
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase()
      const isInputFocused =
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        document.activeElement?.isContentEditable

      // Cmd+K / Ctrl+K toggles palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onTogglePalette?.()
        return
      }

      // Never intercept browser combinations like Ctrl+R (reload), Ctrl+C (copy), Ctrl+D (bookmark)
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return
      }

      // If user is on a touch device, typing in an input, or modal is open, skip single-key shortcuts
      if (isTouch || isInputFocused || isPaletteOpen || isShortcutsOpen) {
        return
      }

      if (e.key === '/') {
        e.preventDefault()
        onOpenPalette?.()
      } else if (e.key === '?') {
        e.preventDefault()
        onToggleShortcuts?.()
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        onToggleTheme?.()
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault()
        onCopyEmail?.()
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        onDownloadResume?.()
      } else if (e.key === '1') {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '2') {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '3') {
        document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '4') {
        document.getElementById('utilities')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '5') {
        document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isTouch,
    isPaletteOpen,
    isShortcutsOpen,
    onTogglePalette,
    onOpenPalette,
    onToggleShortcuts,
    onToggleTheme,
    onCopyEmail,
    onDownloadResume,
  ])
}
