import React from 'react'

export function Navigation({ resumeUrl }) {
  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Primary navigation">
        <a className="nav__brand" href="#top" aria-label="Sriteja Valaboju home">
          <span className="nav__brand-mark">SV</span>
          <span className="nav__brand-label">Sriteja.ai</span>
        </a>
        <div className="nav__links">
          <a href="#systems">Systems</a>
          <a href="#work">Work</a>
          <a href="#utilities">Open Source</a>
          <a href="#terminal">Console</a>
          <a href="#credentials">Credentials</a>
          <a href="#stack">Stack</a>
        </div>
        <div className="nav__actions">
          <a className="button button--ghost button--compact" href="https://github.com/Sriteja11" target="_blank" rel="noopener noreferrer">
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
