import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

describe('useTheme hook', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('supports both array and object destructuring', () => {
    const { result } = renderHook(() => useTheme())
    const [themeArray, toggleThemeArray] = result.current
    const { theme: themeObj, toggleTheme: toggleThemeObj } = result.current

    expect(themeArray).toBe(themeObj)
    expect(typeof toggleThemeArray).toBe('function')
    expect(typeof toggleThemeObj).toBe('function')
  })

  it('toggles theme and updates document attribute and localStorage', () => {
    const { result } = renderHook(() => useTheme())

    const initialTheme = result.current.theme

    act(() => {
      result.current.toggleTheme()
    })

    const newTheme = initialTheme === 'dark' ? 'light' : 'dark'
    expect(result.current.theme).toBe(newTheme)
    expect(document.documentElement.getAttribute('data-theme')).toBe(newTheme)
    expect(localStorage.getItem('portfolio-theme')).toBe(newTheme)
  })
})
