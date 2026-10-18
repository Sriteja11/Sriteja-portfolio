import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useKeyboardShortcuts } from './useKeyboardShortcuts'

describe('useKeyboardShortcuts hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('triggers onDownloadResume when r is pressed alone', () => {
    const downloadSpy = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        isTouch: false,
        isPaletteOpen: false,
        isShortcutsOpen: false,
        onDownloadResume: downloadSpy,
      })
    )

    const event = new KeyboardEvent('keydown', { key: 'r' })
    window.dispatchEvent(event)

    expect(downloadSpy).toHaveBeenCalled()
  })

  it('does NOT trigger onDownloadResume when Ctrl+R or Cmd+R is pressed (browser reload)', () => {
    const downloadSpy = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        isTouch: false,
        isPaletteOpen: false,
        isShortcutsOpen: false,
        onDownloadResume: downloadSpy,
      })
    )

    // Simulate Ctrl+R
    const ctrlREvent = new KeyboardEvent('keydown', { key: 'r', ctrlKey: true })
    window.dispatchEvent(ctrlREvent)
    expect(downloadSpy).not.toHaveBeenCalled()

    // Simulate Cmd+R
    const cmdREvent = new KeyboardEvent('keydown', { key: 'r', metaKey: true })
    window.dispatchEvent(cmdREvent)
    expect(downloadSpy).not.toHaveBeenCalled()
  })
})
