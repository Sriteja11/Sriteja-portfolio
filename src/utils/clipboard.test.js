import { describe, it, expect, vi, beforeEach } from 'vitest'
import { copyToClipboard } from './clipboard'

describe('copyToClipboard utility', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns false for invalid or empty input', async () => {
    expect(await copyToClipboard('')).toBe(false)
    expect(await copyToClipboard(null)).toBe(false)
    expect(await copyToClipboard(undefined)).toBe(false)
  })

  it('uses navigator.clipboard.writeText when available', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    })

    const result = await copyToClipboard('test copy')
    expect(writeTextMock).toHaveBeenCalledWith('test copy')
    expect(result).toBe(true)
  })

  it('falls back to document.execCommand when navigator.clipboard fails', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error('Permission denied')),
      },
    })

    const execCommandMock = vi.fn().mockReturnValue(true)
    document.execCommand = execCommandMock

    const result = await copyToClipboard('fallback copy')
    expect(execCommandMock).toHaveBeenCalledWith('copy')
    expect(result).toBe(true)
  })
})
