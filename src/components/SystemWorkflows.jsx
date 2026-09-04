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

function FlowSteps({ nodes }) {
  return (
    <div className="flow-steps">
      {nodes.map((node, i) => (
        <React.Fragment key={node}>
          <MotionDiv
            className="flow-step"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            <span className="flow-step__index">0{i + 1}</span>
            <span className="flow-step__label">{node}</span>
          </MotionDiv>
          {i < nodes.length - 1 && (
            <span className="flow-step__arrow" aria-hidden="true">→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export function SystemWorkflows({ stories }) {
  const glow = useCardGlow()

  return (
    <section id="systems" className="section" aria-label="AI system capabilities">
      <div className="section__intro">
        <p className="eyebrow">How I build AI systems</p>
        <h2>Systems with evidence, control, and a path to action.</h2>
        <p className="section__subtitle">Each workflow is grounded in work shipped at Airbus, showing the engineering choices behind reliable AI products.</p>
      </div>

      <div className="stories-grid">
        {stories.map((story, idx) => (
          <MotionDiv
            className="story-card"
            key={story.id}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            {...glow}
          >
            <div className="story-card__header">
              <span className="story-card__index">{story.index}</span>
              <span className="story-card__eyebrow">{story.eyebrow}</span>
            </div>
            <h3>{story.title}</h3>
            <p>{story.text}</p>
            <FlowSteps nodes={story.nodes} />
            <div className="pill-row">
              {story.proof.map((item) => <span key={item} className="pill">{item}</span>)}
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  )
}
