import React from 'react'

export function UtilitiesGrid({ utilities }) {
  return (
    <section id="utilities" className="section utilities-section">
      <div className="section__intro section__intro--wide">
        <p className="eyebrow">Open source & utilities</p>
        <h2>Practical tools, agents, and automation scripts.</h2>
        <p>Production utilities, profiling tools, and open-source scripts built for real engineering needs.</p>
      </div>

      <div className="utilities-grid">
        {utilities.map(item => (
          <article className="utility-card" key={item.title}>
            <div className="utility-card__header">
              <span className="utility-card__eyebrow">{item.eyebrow}</span>
              <span className="utility-card__badge">{item.badge}</span>
            </div>
            <h3 className="utility-card__title">{item.title}</h3>
            <p className="utility-card__description">{item.description}</p>
            <div className="tech-pills">
              {item.tech.map(t => <span key={t}>{t}</span>)}
            </div>
            <div className="utility-card__footer">
              <a className="utility-link" href={item.repoUrl} target="_blank" rel="noopener noreferrer">
                <span>View Source</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              {item.liveUrl && (
                <a className="utility-link utility-link--live" href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                  <span>Live demo</span>
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
