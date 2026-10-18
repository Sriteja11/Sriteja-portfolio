import React from 'react'

export function HeroSection({
  profile,
  profilePhoto,
  gcpMlBadge,
  resumeUrl,
  isTouch,
  copied,
  onCopyEmail,
  onDownloadResume,
}) {
  return (
    <section id="top" className="hero section" aria-label="Introduction">
      <div className="hero__topline">
        <span className="status-pill">
          <span className="status-dot" />
          Available for GenAI & Platform Engineering roles
        </span>
        <span className="location-tag">{profile.location}</span>
      </div>

      <div className="profile-lockup">
        <div className="profile-image-frame">
          <img src={profilePhoto} alt={profile.name} />
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
        <a
          className="button button--primary"
          href={resumeUrl}
          download
          onClick={onDownloadResume}
        >
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        ) : (
          <button
            type="button"
            className="button button--secondary"
            onClick={() => onCopyEmail('hero')}
          >
            {copied === 'hero' ? 'Email copied' : 'Email'}
          </button>
        )}

        <a
          className="button button--ghost"
          href={profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </section>
  )
}
