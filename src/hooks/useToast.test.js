import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast } from './useToast'

describe('useToast hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with null toast', () => {
    const { result } = renderHook(() => useToast())
    expect(result.current.toast).toBeNull()
  })

  it('sets toast and auto dismisses after duration', () => {
    const { result } = renderHook(() => useToast(2000))

    act(() => {
      result.current.showToast('Copied!')
    })

    expect(result.current.toast?.message).toBe('Copied!')

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.toast).toBeNull()
  })
})
