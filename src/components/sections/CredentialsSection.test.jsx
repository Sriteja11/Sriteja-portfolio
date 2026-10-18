import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CredentialsSection } from './CredentialsSection'

describe('CredentialsSection component', () => {
  const mockCredentials = [
    {
      issuer: 'Google Cloud',
      title: 'Professional Machine Learning Engineer',
      detail: 'Certified in production ML on GCP.',
      accent: 'GCP Certified',
    },
  ]

  it('renders issuer, title, and detail', () => {
    render(<CredentialsSection credentials={mockCredentials} glowProps={{}} />)

    expect(screen.getByText('Google Cloud')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Professional Machine Learning Engineer' })).toBeInTheDocument()
    expect(screen.getByText('Certified in production ML on GCP.')).toBeInTheDocument()
    expect(screen.getByText('GCP Certified')).toBeInTheDocument()
  })
})
