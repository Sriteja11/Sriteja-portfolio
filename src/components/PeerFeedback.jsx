import React from 'react'
import { motion } from 'framer-motion'
import { useCardGlow } from '../hooks/useCardGlow'

const MotionDiv = motion.div

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export function PeerFeedback({ endorsements }) {
  const glow = useCardGlow()

  return (
    <section id="feedback" className="section" aria-label="Peer and leadership feedback">
      <div className="section__intro">
        <p className="eyebrow">Verified feedback</p>
        <h2>What engineering leads say about working with me.</h2>
        <p className="section__subtitle">
          Direct quotes from Airbus 360 performance reviews across my progression from solo frontend ownership to AI engineering.
        </p>
      </div>

      <div className="feedback-grid">
        {endorsements.map((item, idx) => (
          <MotionDiv
            key={item.author}
            className={`feedback-card ${item.featured ? 'feedback-card--featured' : ''}`}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            {...glow}
          >
            <div className="feedback-card__header">
              <div className="feedback-card__badges">
                <span className="feedback-card__team">{item.team}</span>
                <span className={`feedback-card__role-tag ${item.sritejaRole.includes('AI') ? 'feedback-card__role-tag--ai' : ''}`}>
                  {item.sritejaRole} · {item.year || item.date}
                </span>
              </div>
              <span className="feedback-card__highlight">{item.highlight}</span>
            </div>

            <blockquote className="feedback-card__quote">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <div className="feedback-card__footer">
              <div className="feedback-card__author-info">
                <div className="feedback-card__author-row">
                  <span className="feedback-card__author">{item.author}</span>
                  {item.authorLinkedin && (
                    <a
                      href={item.authorLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="feedback-card__linkedin"
                      title={`${item.author} on LinkedIn`}
                      aria-label={`${item.author} on LinkedIn`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                </div>
                <span className="feedback-card__author-role">{item.authorRole}</span>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  )
}
