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
                  {item.sritejaRole} ({item.date})
                </span>
              </div>
              <span className="feedback-card__highlight">{item.highlight}</span>
            </div>

            <blockquote className="feedback-card__quote">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <div className="feedback-card__footer">
              <div className="feedback-card__author-info">
                <span className="feedback-card__author">{item.author}</span>
                <span className="feedback-card__author-role">{item.authorRole}</span>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  )
}
