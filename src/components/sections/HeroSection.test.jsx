import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HeroSection } from './HeroSection'

describe('HeroSection component', () => {
  const mockProfile = {
    name: 'Sriteja Valaboju',
    summary: 'Building AI systems',
    location: 'Bengaluru, India',
    certification: 'GCP Certified MLE',
    email: 'sriteja@example.com',
    linkedinUrl: 'https://linkedin.com/in/sriteja',
  }

  it('renders candidate name and status', () => {
    render(
      <HeroSection
        profile={mockProfile}
        profilePhoto="/photo.jpg"
        gcpMlBadge="/badge.png"
        resumeUrl="/resume.pdf"
        isTouch={false}
        copied={null}
        onCopyEmail={vi.fn()}
        onDownloadResume={vi.fn()}
      />
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Sriteja Valaboju' })).toBeInTheDocument()
    expect(screen.getByText('Available for GenAI & Platform Engineering roles')).toBeInTheDocument()
    expect(screen.getByText('Bengaluru, India')).toBeInTheDocument()
  })

  it('triggers onCopyEmail when email button is clicked on desktop', () => {
    const copySpy = vi.fn()
    render(
      <HeroSection
        profile={mockProfile}
        profilePhoto="/photo.jpg"
        gcpMlBadge="/badge.png"
        resumeUrl="/resume.pdf"
        isTouch={false}
        copied={null}
        onCopyEmail={copySpy}
        onDownloadResume={vi.fn()}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Email' }))
    expect(copySpy).toHaveBeenCalledWith('hero')
  })

  it('renders mailto link on touch devices', () => {
    render(
      <HeroSection
        profile={mockProfile}
        profilePhoto="/photo.jpg"
        gcpMlBadge="/badge.png"
        resumeUrl="/resume.pdf"
        isTouch={true}
        copied={null}
        onCopyEmail={vi.fn()}
        onDownloadResume={vi.fn()}
      />
    )

    const conversationLink = screen.getByRole('link', { name: /start a conversation/i })
    expect(conversationLink).toHaveAttribute('href', expect.stringContaining('mailto:sriteja@example.com'))
  })
})
