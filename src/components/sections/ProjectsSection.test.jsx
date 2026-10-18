import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectsSection } from './ProjectsSection'

describe('ProjectsSection component', () => {
  const mockProjects = [
    {
      title: 'Augmented BMS',
      eyebrow: 'Enterprise GenAI',
      highlight: 'Production',
      text: 'Enterprise conversational agent platform.',
      tech: ['React', 'Google ADK', 'Vertex AI'],
    },
  ]

  it('renders project title, highlight badge, and tech pills', () => {
    render(<ProjectsSection projects={mockProjects} glowProps={{}} />)

    expect(screen.getByRole('heading', { level: 3, name: 'Augmented BMS' })).toBeInTheDocument()
    expect(screen.getByText('Production')).toBeInTheDocument()
    expect(screen.getByText('Enterprise conversational agent platform.')).toBeInTheDocument()
    expect(screen.getByText('Google ADK')).toBeInTheDocument()
  })
})
