import React from 'react'

export function ProjectsSection({ projects, glowProps }) {
  return (
    <section id="work" className="section">
      <div className="section__intro">
        <p className="eyebrow">Selected platforms</p>
        <h2>AI products with engineering depth.</h2>
        <p className="section__subtitle">Production systems designed for enterprise reliability, scale, and clear interfaces.</p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title} {...glowProps}>
            <div className="project-card__header">
              <span className="project-card__eyebrow">{project.eyebrow}</span>
              <span className="project-card__badge">{project.highlight}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.text}</p>
            <div className="pill-row">
              {project.tech.map((tech) => (
                <span key={tech} className="pill">{tech}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
