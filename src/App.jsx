import React, { useEffect, useState, useCallback } from 'react'
import './App.css'
import profilePhoto from './assets/profile_photo.jpeg'
import gcpMlBadge from './assets/gcp-ml-badge.png'
import { GradientCanvas } from './components/GradientCanvas'
import { Navigation } from './components/Navigation'
import { SystemWorkflows } from './components/SystemWorkflows'
import { UtilitiesGrid } from './components/UtilitiesGrid'
import { TerminalDemo } from './components/TerminalDemo'
import { TouchSplash } from './components/TouchSplash'
import { GlassLens } from './components/GlassLens'
import { CommandPalette } from './components/CommandPalette'
import { ShortcutsModal } from './components/ShortcutsModal'
import { Toast } from './components/Toast'
import { useCardGlow } from './hooks/useCardGlow'
import { useTheme } from './hooks/useTheme'
import {
  profile,
  skillCategories,
  systemStories,
  flagshipProjects,
  utilities,
  credentials,
} from './data/portfolioData'

function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)')
    const update = () => setIsTouch(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isTouch
}

export default function App() {
  const glow = useCardGlow()
  const isTouch = useTouchDevice()
  const { theme, toggleTheme } = useTheme()

  const [copied, setCopied] = useState('')
  const [toast, setToast] = useState(null)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)

  const resumeUrl = `${import.meta.env.BASE_URL}Sriteja_Valaboju_Resume.pdf`

  const showToast = useCallback((message) => {
    setToast({ message, id: Date.now() })
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const t = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(t)
  }, [toast])

  useEffect(() => {
    if (!copied) return undefined
    const t = window.setTimeout(() => setCopied(''), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  const copyEmail = useCallback(async (key = 'hero') => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = profile.email
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(key)
    showToast('Email copied to clipboard')
  }, [showToast])

  const handleToggleTheme = useCallback(() => {
    toggleTheme()
    const next = theme === 'dark' ? 'Day Glass' : 'Obsidian Dark'
    showToast(`Switched to ${next} mode`)
  }, [theme, toggleTheme, showToast])

  const downloadResume = useCallback(() => {
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Sriteja_Valaboju_Resume.pdf'
    link.click()
    showToast('Downloading verified resume...')
  }, [resumeUrl, showToast])

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase()
      const isInputFocused =
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        document.activeElement?.isContentEditable

      // Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsPaletteOpen((prev) => !prev)
        return
      }

      // If user is currently typing in an input or modal is open, skip single-key shortcuts
      if (isInputFocused || isPaletteOpen || isShortcutsOpen) return

      if (e.key === '/') {
        e.preventDefault()
        setIsPaletteOpen(true)
      } else if (e.key === '?') {
        e.preventDefault()
        setIsShortcutsOpen((prev) => !prev)
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        handleToggleTheme()
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault()
        copyEmail('shortcut')
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        downloadResume()
      } else if (e.key === '1') {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '2') {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '3') {
        document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '4') {
        document.getElementById('utilities')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '5') {
        document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isPaletteOpen,
    isShortcutsOpen,
    handleToggleTheme,
    copyEmail,
    downloadResume,
  ])

  return (
    <div className="page-shell">
      <GradientCanvas />
      <TouchSplash />
      <GlassLens />
      <Toast toast={toast} />

      <Navigation
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onCopyEmail={copyEmail}
        resumeUrl={resumeUrl}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <main>
        {/* Hero */}
        <section id="top" className="hero section" aria-label="Introduction">
          <div className="hero__topline">
            <span className="status-pill">
              <span className="status-dot" />
              Available for GenAI & Platform Engineering roles
            </span>
            <span className="location-tag">Bengaluru, India</span>
          </div>

          <div className="profile-lockup">
            <div className="profile-image-frame">
              <img src={profilePhoto} alt="Sriteja Valaboju" />
              <span className="verified-badge" title="Google Cloud Certified">✓</span>
            </div>
            <div>
              <p className="eyebrow">Software Engineer / GenAI Platforms</p>
              <h1 className="hero__title">{profile.name}</h1>
            </div>
          </div>

          <a
            className="cert-pill"
            href="https://cloud.google.com/learn/certification/machine-learning-engineer"
            target="_blank"
            rel="noopener noreferrer"
            title="Google Cloud Certified Professional Machine Learning Engineer"
          >
            <img className="cert-badge" src={gcpMlBadge} alt="" />
            <span>{profile.certification}</span>
          </a>

          <p className="hero__copy">{profile.summary}</p>

          <div className="hero__actions">
            <a className="button button--primary" href={resumeUrl} download onClick={() => showToast('Downloading verified resume...')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download resume
            </a>
            {isTouch ? (
              <a
                className="button button--secondary"
                href={`mailto:${profile.email}?subject=Let%27s%20connect%20about%20AI%20systems&body=Hi%20Sriteja%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out%20about...`}
              >
                Start a conversation
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            ) : (
              <button type="button" className="button button--secondary" onClick={() => copyEmail('hero')}>
                {copied === 'hero' ? 'Email copied' : 'Email'}
              </button>
            )}
            <a className="button button--ghost" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section">
          <div className="section__intro">
            <p className="eyebrow">Skills</p>
            <h2>The engineering layer behind the systems.</h2>
            <p className="section__subtitle">Tools and infrastructure I use daily to build, evaluate, and scale software.</p>
          </div>
          <div className="stack-columns">
            {skillCategories.map((group) => (
              <div className="stack-column" key={group.title} {...glow}>
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

        {/* Work */}
        <section id="work" className="section">
          <div className="section__intro">
            <p className="eyebrow">Selected platforms</p>
            <h2>AI products with engineering depth.</h2>
            <p className="section__subtitle">Production systems designed for enterprise reliability, scale, and clear interfaces.</p>
          </div>
          <div className="project-grid">
            {flagshipProjects.map((project) => (
              <article className="project-card" key={project.title} {...glow}>
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

        {/* Systems */}
        <SystemWorkflows stories={systemStories} />

        {/* Open Source */}
        <UtilitiesGrid utilities={utilities} />

        {/* Terminal */}
        <TerminalDemo />

        {/* Credentials */}
        <section id="credentials" className="section" aria-label="Certifications">
          <div className="section__intro">
            <p className="eyebrow">Credentials</p>
            <h2>Cloud-certified, production-minded.</h2>
          </div>
          <div className="credential-grid">
            {credentials.map((item) => (
              <article className="credential-card" key={item.title} {...glow}>
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

        {/* Footer */}
        <footer id="contact" className="footer section">
          <div className="footer__content">
            <div>
              <p className="eyebrow">Let's build together</p>
              <h2>Have a platform or AI challenge to solve?</h2>
              <div className="footer__meta">
                <span>Bengaluru, India</span>
                <span className="footer__sep">/</span>
                <span>{profile.phone}</span>
                <span className="footer__sep">/</span>
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                <span className="footer__sep">/</span>
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <div className="footer__actions">
              {isTouch ? (
                <a className="button button--primary" href={`mailto:${profile.email}`}>
                  {profile.email}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              ) : (
                <button type="button" className="button button--primary" onClick={() => copyEmail('footer')}>
                  {copied === 'footer' ? 'Copied' : `${profile.email}`}
                </button>
              )}
              <a className="button button--ghost" href={resumeUrl} download onClick={() => showToast('Downloading verified resume...')}>
                Download resume
              </a>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Sriteja Valaboju</span>
            <div className="footer__bottom-links">
              <a href={profile.portfolioRepoUrl} target="_blank" rel="noopener noreferrer">Source</a>
              <button
                type="button"
                className="footer__shortcut-trigger"
                onClick={() => setIsShortcutsOpen(true)}
              >
                Press <kbd className="cmd-kbd">?</kbd> for shortcuts
              </button>
              <a href="#top">Top ↑</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
