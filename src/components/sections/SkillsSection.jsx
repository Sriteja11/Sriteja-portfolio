import React from 'react'

export function SkillsSection({ categories, glowProps }) {
  return (
    <section id="skills" className="section">
      <div className="section__intro">
        <p className="eyebrow">Skills</p>
        <h2>The engineering layer behind the systems.</h2>
        <p className="section__subtitle">Tools and infrastructure I use daily to build, evaluate, and scale software.</p>
      </div>
      <div className="stack-columns">
        {categories.map((group) => (
          <div className="stack-column" key={group.title} {...glowProps}>
            <h3 className="stack-column__title">{group.title}</h3>
            <div className="skill-cloud">
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
