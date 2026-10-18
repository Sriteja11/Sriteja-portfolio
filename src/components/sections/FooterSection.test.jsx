import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FooterSection } from './FooterSection'

describe('FooterSection component', () => {
  const mockProfile = {
    name: 'Sriteja Valaboju',
    email: 'sriteja@example.com',
    location: 'Bengaluru, India',
    phone: '+91 934-649-3360',
    githubUrl: 'https://github.com/Sriteja11',
    linkedinUrl: 'https://linkedin.com/in/sriteja',
    portfolioRepoUrl: 'https://github.com/Sriteja11/Sriteja-portfolio',
  }

  const mockProtocol = {
    endpoint: 'https://formsubmit.co/ajax/test@example.com',
    method: 'POST',
    curlExample: 'curl -X POST https://formsubmit.co/ajax/test@example.com',
  }

  it('renders footer metadata, contact links, and Agent Protocol', () => {
    render(
      <FooterSection
        profile={mockProfile}
        agentProtocol={mockProtocol}
        resumeUrl="/resume.pdf"
        isTouch={false}
        copied={null}
        onCopyEmail={vi.fn()}
        onDownloadResume={vi.fn()}
        onOpenShortcuts={vi.fn()}
        onCopyFeedback={vi.fn()}
      />
    )

    expect(screen.getByText('Have a platform or AI challenge to solve?')).toBeInTheDocument()
    expect(screen.getByText('Agent-to-engineer protocol')).toBeInTheDocument()
    expect(screen.getByText('+91 934-649-3360')).toBeInTheDocument()
  })

  it('triggers onCopyEmail when desktop button is clicked', () => {
    const copySpy = vi.fn()
    render(
      <FooterSection
        profile={mockProfile}
        agentProtocol={mockProtocol}
        resumeUrl="/resume.pdf"
        isTouch={false}
        copied={null}
        onCopyEmail={copySpy}
        onDownloadResume={vi.fn()}
        onOpenShortcuts={vi.fn()}
        onCopyFeedback={vi.fn()}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'sriteja@example.com' }))
    expect(copySpy).toHaveBeenCalledWith('footer')
  })
})
