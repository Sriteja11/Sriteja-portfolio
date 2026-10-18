import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkillsSection } from './SkillsSection'

describe('SkillsSection component', () => {
  const mockCategories = [
    {
      title: 'AI & Evaluation',
      skills: ['LangChain', 'LangGraph', 'Google ADK'],
    },
    {
      title: 'Cloud (GCP)',
      skills: ['Cloud Run', 'BigQuery'],
    },
  ]

  it('renders all categories and their skills', () => {
    render(<SkillsSection categories={mockCategories} glowProps={{}} />)

    expect(screen.getByRole('heading', { level: 3, name: 'AI & Evaluation' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Cloud (GCP)' })).toBeInTheDocument()
    expect(screen.getByText('Google ADK')).toBeInTheDocument()
    expect(screen.getByText('Cloud Run')).toBeInTheDocument()
  })
})
