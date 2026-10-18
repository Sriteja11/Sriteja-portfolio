import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PeerFeedback } from './PeerFeedback'

describe('PeerFeedback component', () => {
  const mockEndorsements = [
    {
      quote: 'Great technical leadership in AI solutions.',
      author: 'Jean-Baptiste Pansart',
      authorRole: 'Engineering Lead, Airbus',
      sritejaRole: 'Software Engineer - AI',
      year: '2026',
      team: 'Airbus 360 Review',
      highlight: 'AI Team Leadership',
      featured: true,
    },
    {
      quote: 'Solid pillar for frontend requirements.',
      author: 'Dharmateja Kondreddigari',
      authorRole: 'Technical Lead, Airbus',
      sritejaRole: 'Associate Software Engineer',
      year: '2024',
      team: 'Airbus 360 Review',
      highlight: 'Proactive Ownership',
      featured: false,
    },
  ]

  it('renders endorsements with role tags, years, and authors', () => {
    render(<PeerFeedback endorsements={mockEndorsements} />)

    expect(screen.getByText('What engineering leads say about working with me.')).toBeInTheDocument()
    expect(screen.getByText('Jean-Baptiste Pansart')).toBeInTheDocument()
    expect(screen.getByText('Dharmateja Kondreddigari')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer - AI · 2026')).toBeInTheDocument()
    expect(screen.getByText('Associate Software Engineer · 2024')).toBeInTheDocument()
  })

  it('adds featured styling to featured review card', () => {
    const { container } = render(<PeerFeedback endorsements={mockEndorsements} />)
    const featuredCard = container.querySelector('.feedback-card--featured')
    expect(featuredCard).toBeInTheDocument()
    expect(featuredCard).toHaveTextContent('Jean-Baptiste Pansart')
  })
})
