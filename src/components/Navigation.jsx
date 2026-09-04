import React, { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'systems', label: 'Systems' },
  { id: 'utilities', label: 'Open Source' },
  { id: 'terminal', label: 'Console' },
]

export function Navigation() {
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
      </nav>
    </header>
  )
}
