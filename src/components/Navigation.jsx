import React from 'react'
import { profile } from '../data/portfolioData'

export function Navigation({ resumeUrl }) {
  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Primary navigation">
        <a className="nav__brand" href="#top" aria-label="Sriteja Valaboju home">
          <span className="nav__brand-mark">SV</span>
          <span className="nav__brand-label">Sriteja</span>
        </a>
        <div className="nav__links">
          <a href="#systems">Systems</a>
          <a href="#work">Work</a>
          <a href="#utilities">Open Source</a>
          <a href="#terminal">Console</a>
          <a href="#stack">Stack</a>
        </div>
        <div className="nav__actions">
          <a
            className="button button--ghost button--compact"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span>LinkedIn</span>
          </a>
          <a
            className="button button--ghost button--compact"
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            <span>GitHub</span>
          </a>
          <a className="button button--primary button--compact" href={resumeUrl} download>
            <span>Resume</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
