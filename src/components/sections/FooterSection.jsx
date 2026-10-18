import React from 'react'
import { AgentProtocol } from '../AgentProtocol'

export function FooterSection({
  profile,
  agentProtocol,
  resumeUrl,
  isTouch,
  copied,
  onCopyEmail,
  onDownloadResume,
  onOpenShortcuts,
  onCopyFeedback,
}) {
  return (
    <footer id="contact" className="footer section">
      {/* Machine-readable Agent Protocol Card */}
      <AgentProtocol protocol={agentProtocol} onCopyFeedback={onCopyFeedback} />

      <div className="footer__content">
        <div>
          <p className="eyebrow">Let's build together</p>
          <h2>Have a platform or AI challenge to solve?</h2>
          <div className="footer__meta">
            <span>{profile.location}</span>
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ) : (
            <button
              type="button"
              className="button button--primary"
              onClick={() => onCopyEmail('footer')}
            >
              {copied === 'footer' ? 'Copied' : profile.email}
            </button>
          )}
          <a
            className="button button--ghost"
            href={resumeUrl}
            download
            onClick={onDownloadResume}
          >
            Download resume
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <div className="footer__bottom-links">
          <a href={profile.portfolioRepoUrl} target="_blank" rel="noopener noreferrer">Source</a>
          <button
            type="button"
            className="footer__shortcut-trigger hide-on-mobile"
            onClick={onOpenShortcuts}
          >
            Press <kbd className="cmd-kbd">?</kbd> for shortcuts
          </button>
          <a href="#top">Top ↑</a>
        </div>
      </div>
    </footer>
  )
}
