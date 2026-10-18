import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { AgentProtocol } from './AgentProtocol'

describe('AgentProtocol component', () => {
  const mockProtocol = {
    endpoint: 'https://formsubmit.co/ajax/test@example.com',
    method: 'POST',
    curlExample: 'curl -X POST https://formsubmit.co/ajax/test@example.com -d "{}"',
  }

  beforeEach(() => {
    vi.restoreAllMocks()
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('renders endpoint and code box', () => {
    render(<AgentProtocol protocol={mockProtocol} onCopyFeedback={vi.fn()} />)

    expect(screen.getByText('Agent-to-engineer protocol')).toBeInTheDocument()
    expect(screen.getByText(/curl -X POST/)).toBeInTheDocument()
  })

  it('triggers copy feedback when copy button is clicked', async () => {
    const feedbackSpy = vi.fn()
    render(<AgentProtocol protocol={mockProtocol} onCopyFeedback={feedbackSpy} />)

    const copyBtn = screen.getByRole('button', { name: /copy agent curl call/i })
    await act(async () => {
      fireEvent.click(copyBtn)
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockProtocol.curlExample)
  })
})
