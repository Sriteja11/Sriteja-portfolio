import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTouchDevice } from './useTouchDevice'

describe('useTouchDevice hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('detects desktop fine pointer when fine pointer media query matches', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('fine'),
      media: query,
    }))

    const { result } = renderHook(() => useTouchDevice())
    expect(result.current).toBe(false)
  })

  it('detects touch pointer when matchMedia matches coarse pointer', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('coarse'),
      media: query,
    }))

    const { result } = renderHook(() => useTouchDevice())
    expect(result.current).toBe(true)
  })
})
