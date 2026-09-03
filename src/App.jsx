import React from 'react'
import './App.css'
import profilePhoto from './assets/profile_photo.jpeg'
import { Navigation } from './components/Navigation'
import { SystemWorkflows } from './components/SystemWorkflows'
import { UtilitiesGrid } from './components/UtilitiesGrid'
import { TerminalDemo } from './components/TerminalDemo'
import {
  profile,
  skillCategories,
  systemStories,
  flagshipProjects,
  utilities,
  credentials,
} from './data/portfolioData'

export default function App() {
  const resumeUrl = `${import.meta.env.BASE_URL}Sriteja_Valaboju_Resume.pdf`

  return (
    <div className="page-shell">
      <Navigation resumeUrl={resumeUrl} />

      <main>
        {/* Hero Section */}
        <section id="top" className="hero" aria-label="Introduction">
          <img
            className="hero__visual"
            src={`${import.meta.env.BASE_URL}hero-agent-systems.png`}
            alt="Abstract AI agent network and cloud infrastructure visualization"
          />
          <div className="hero__motion hero__motion--one" aria-hidden="true" />
          <div className="hero__motion hero__motion--two" aria-hidden="true" />
          <div className="hero__shade" />

          <div className="hero__content">
            <div className="hero__topline">
              <span className="live-status-pill">
                <span className="live-status-indicator" />
                Available for GenAI & Platform Engineering roles
              </span>
              <span className="location-tag">Bengaluru, India</span>
            </div>

            <div className="profile-lockup">
              <div className="profile-image-frame">
                <img src={profilePhoto} alt="Sriteja Valaboju" />
                <span className="profile-verified-badge" title="Google Cloud Certified">✓</span>
              </div>
              <div>
                <p className="eyebrow">Software Engineer / GenAI Platforms</p>
                <h1 className="hero__title">{profile.name}</h1>
              </div>
            </div>

            <p className="certification-pill">
              <span className="cert-star" aria-hidden="true">★</span>
              <span>{profile.certification}</span>
            </p>

            <p className="hero__copy">{profile.summary}</p>

            <div className="hero__actions" aria-label="Action links">
              <a className="button button--primary" href={resumeUrl} download>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Download resume</span>
              </a>
              <a
                className="button button--secondary"
                href={`mailto:${profile.email}?subject=Let%27s%20connect%20about%20AI%20systems&body=Hi%20Sriteja%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out%20about...`}
              >
                <span>Start a conversation</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a
                className="button button--ghost"
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                <span>GitHub @Sriteja11</span>
              </a>
            </div>
          </div>
        </section>

        {/* Shipped Systems Section */}
        <SystemWorkflows stories={systemStories} />

        {/* Flagship Production Projects */}
        <section id="work" className="section section--split">
          <div className="section__intro">
            <p className="eyebrow">Selected platforms</p>
            <h2>AI products with engineering depth.</h2>
            <p>Production systems designed for enterprise reliability, scale, and clear interfaces.</p>
          </div>
          <div className="project-grid">
            {flagshipProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-card__header">
                  <span className="project-card__eyebrow">{project.eyebrow}</span>
                  <span className="project-card__badge">{project.highlight}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <div className="stat-row">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Open Source & Utilities Section (New from GitHub analysis) */}
        <UtilitiesGrid utilities={utilities} />

        {/* Terminal Execution Inspector */}
        <TerminalDemo />

        {/* Credentials & Certifications */}
        <section id="credentials" className="section credentials" aria-label="Certifications and qualifications">
          <div className="section__intro section__intro--wide">
            <p className="eyebrow">Credentials & validation</p>
            <h2>Cloud-certified, production-minded.</h2>
          </div>
          <div className="credential-grid">
            {credentials.map((item) => (
              <article className="credential-card" key={item.title}>
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

        {/* Technical Stack Categorized */}
        <section id="stack" className="section skills-section">
          <div className="section__intro section__intro--wide">
            <p className="eyebrow">Technical stack</p>
            <h2>The engineering layer behind the systems.</h2>
            <p>Tools and infrastructure I use daily to build, evaluate, and scale software.</p>
          </div>

          <div className="stack-columns">
            {skillCategories.map((group) => (
              <div className="stack-column" key={group.title}>
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

        {/* Sleek Minimalist Footer */}
        <footer id="contact" className="footer">
          <div className="footer__content">
            <div>
              <p className="eyebrow">Let's build together</p>
              <h2>Have a platform or AI challenge to solve?</h2>
              <p className="footer__meta">
                <span>Bengaluru, Karnataka, India</span>
                <span className="footer__sep">/</span>
                <span>{profile.phone}</span>
                <span className="footer__sep">/</span>
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">github.com/Sriteja11</a>
              </p>
            </div>
            <div className="footer__actions">
              <a className="button button--primary" href={`mailto:${profile.email}`}>
                <span>{profile.email}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a className="button button--ghost" href={resumeUrl} download>
                <span>Download resume</span>
              </a>
            </div>
          </div>

          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Sriteja Valaboju. Built with React + Vite, Python MCP, and modern web standards.</span>
            <div className="footer__bottom-links">
              <a href={profile.portfolioRepoUrl} target="_blank" rel="noopener noreferrer">Portfolio source</a>
              <a href="#top">Back to top ↑</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
