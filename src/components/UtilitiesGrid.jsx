import React, { useState } from 'react'
import { useCardGlow } from '../hooks/useCardGlow'

export function UtilitiesGrid({ utilities }) {
  const glow = useCardGlow()
  const [copiedCmd, setCopiedCmd] = useState('')

  const copyCommand = async (cmd) => {
    try {
      await navigator.clipboard.writeText(cmd)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = cmd
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopiedCmd(cmd)
    window.setTimeout(() => setCopiedCmd(''), 2000)
  }

  return (
    <section id="utilities" className="section">
      <div className="section__intro">
        <p className="eyebrow">Open source</p>
        <h2>Practical tools, agents, and scripts.</h2>
        <p className="section__subtitle">Production utilities and automation built for real engineering needs.</p>
      </div>

      <div className="utilities-grid">
        {utilities.map(item => (
          <article className="utility-card" key={item.title} {...glow}>
            <div className="utility-card__header">
              <span className="utility-card__eyebrow">{item.eyebrow}</span>
              <span className="utility-card__badge">{item.badge}</span>
            </div>
            <h3 className="utility-card__title">{item.title}</h3>
            <p className="utility-card__description">{item.description}</p>

            {item.command && (
              <div className="utility-card__command-box">
                <span className="utility-card__command-prompt">$</span>
                <code className="utility-card__command-text">{item.command}</code>
                <button
                  type="button"
                  className="utility-card__command-copy"
                  onClick={() => copyCommand(item.command)}
                  title="Copy command"
                  aria-label={`Copy command ${item.command}`}
                >
                  {copiedCmd === item.command ? (
                    <span className="utility-card__copied-badge">Copied</span>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            )}

            <div className="pill-row">
              {item.tech.map(t => <span key={t} className="pill">{t}</span>)}
            </div>
            <div className="utility-card__footer">
              <a className="link-arrow" href={item.repoUrl} target="_blank" rel="noopener noreferrer">
                View Source
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              {item.liveUrl && (
                <a className="link-arrow link-arrow--accent" href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live demo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
