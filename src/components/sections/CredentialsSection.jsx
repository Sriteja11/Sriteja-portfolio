import React from 'react'

export function CredentialsSection({ credentials, glowProps }) {
  return (
    <section id="credentials" className="section" aria-label="Certifications">
      <div className="section__intro">
        <p className="eyebrow">Credentials</p>
        <h2>Cloud-certified, production-minded.</h2>
      </div>
      <div className="credential-grid">
        {credentials.map((item) => (
          <article className="credential-card" key={item.title} {...glowProps}>
            <div className="credential-card__topline">
              <span>{item.issuer}</span>
              <span className="credential-card__accent">{item.accent}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
