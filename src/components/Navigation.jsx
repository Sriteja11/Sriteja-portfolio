import React, { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'systems', label: 'Systems' },
  { id: 'utilities', label: 'Open Source' },
  { id: 'terminal', label: 'Console' },
]

export function Navigation({
  theme,
  onToggleTheme,
  onOpenPalette,
  onOpenShortcuts,
}) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const targets = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)
    if (targets.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Primary navigation">
        <a className="nav__brand" href="#top" aria-label="Sriteja Valaboju home">
          <span className="nav__brand-mark">SV</span>
          <span className="nav__brand-text">
            <span className="nav__brand-label">Sriteja</span>
            <span className="nav__brand-role">GenAI Engineer</span>
          </span>
        </a>

        <div className="nav__links">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={activeSection === s.id ? 'is-active' : ''}
              aria-current={activeSection === s.id ? 'true' : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__cmd-trigger"
            onClick={onOpenPalette}
            title="Search actions (Cmd+K or Ctrl+K)"
            aria-label="Open command palette"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="nav__cmd-label">Search</span>
            <span className="nav__kbd">⌘K</span>
          </button>

          <button
            type="button"
            className="nav__icon-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Obsidian Dark'} mode (Press D)`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              // Sun icon for dark mode (to switch to light)
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Moon icon for light mode (to switch to dark)
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="nav__icon-btn nav__icon-btn--help"
            onClick={onOpenShortcuts}
            title="Keyboard shortcuts (Press ?)"
            aria-label="View keyboard shortcuts"
          >
            ?
          </button>
        </div>
      </nav>
    </header>
  )
}
