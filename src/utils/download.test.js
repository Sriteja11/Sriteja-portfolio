import { describe, it, expect, vi, afterEach } from 'vitest'
import { triggerDownload } from './download'

describe('triggerDownload utility', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates and clicks an anchor element with download attribute', () => {
    const origCreateElement = document.createElement.bind(document)
    const clickMock = vi.fn()

    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      const el = origCreateElement(tagName)
      if (tagName === 'a') {
        el.click = clickMock
      }
      return el
    })

    triggerDownload('/path/to/file.pdf', 'file.pdf')

    expect(clickMock).toHaveBeenCalled()
  })
})
