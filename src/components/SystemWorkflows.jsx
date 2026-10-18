import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

function StoryCard({ story, idx, glow }) {
  const [activeStep, setActiveStep] = useState(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [copiedPayload, setCopiedPayload] = useState(false)

  const nodes = story.nodes
  const details = story.nodeDetails || []

  useEffect(() => {
    if (!isSimulating) return undefined
    let current = 0
    setActiveStep(0)
    const interval = window.setInterval(() => {
      current += 1
      if (current >= nodes.length) {
        setIsSimulating(false)
        clearInterval(interval)
      } else {
        setActiveStep(current)
      }
    }, 850)
    return () => clearInterval(interval)
  }, [isSimulating, nodes.length])

  const copyPayload = async (payload) => {
    const text = JSON.stringify(payload, null, 2)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopiedPayload(true)
    window.setTimeout(() => setCopiedPayload(false), 2000)
  }

  const selectedDetail = activeStep !== null ? details[activeStep] : null

  return (
    <MotionDiv
      className="story-card"
      custom={idx}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      {...glow}
    >
      <div className="story-card__header">
        <span className="story-card__index">{story.index}</span>
        <span className="story-card__eyebrow">{story.eyebrow}</span>
      </div>

      <h3>{story.title}</h3>
      <p>{story.text}</p>

      {/* Interactive Flow Steps */}
      <div className="flow-steps-header">
        <span className="flow-steps-title">System trace steps</span>
        <button
          type="button"
          className="flow-simulate-btn"
          onClick={() => setIsSimulating((prev) => !prev)}
        >
          {isSimulating ? (
            <>
              <span className="live-dot" />
              Running trace...
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Simulate trace
            </>
          )}
        </button>
      </div>

      <div className="flow-steps" role="tablist" aria-label="System pipeline steps">
        {nodes.map((node, i) => {
          const isActive = activeStep === i
          return (
            <React.Fragment key={node}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`flow-step ${isActive ? 'flow-step--active' : ''}`}
                onClick={() => setActiveStep(isActive ? null : i)}
                title={`Click to inspect step 0${i + 1}: ${node}`}
              >
                <span className="flow-step__index">0{i + 1}</span>
                <span className="flow-step__label">{node}</span>
                {isActive && <span className="flow-step__indicator" />}
              </button>
              {i < nodes.length - 1 && (
                <span className="flow-step__arrow" aria-hidden="true">→</span>
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Inline Inspector Drawer */}
      <AnimatePresence>
        {selectedDetail && (
          <motion.div
            className="flow-inspector"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flow-inspector__header">
              <div className="flow-inspector__tags">
                <span className="flow-inspector__step">
                  Step 0{activeStep + 1}: {selectedDetail.name}
                </span>
                <span className="flow-inspector__badge flow-inspector__badge--type">
                  {selectedDetail.type}
                </span>
                <span className="flow-inspector__badge flow-inspector__badge--latency">
                  {selectedDetail.latency}
                </span>
                <span className="flow-inspector__badge flow-inspector__badge--status">
                  {selectedDetail.status}
                </span>
              </div>
              <button
                type="button"
                className="flow-inspector__close"
                onClick={() => setActiveStep(null)}
                aria-label="Close inspector"
              >
                ✕
              </button>
            </div>

            <p className="flow-inspector__detail">{selectedDetail.detail}</p>

            {selectedDetail.payload && (
              <div className="flow-inspector__code-block">
                <div className="flow-inspector__code-top">
                  <span>payload_preview.json</span>
                  <button
                    type="button"
                    className="flow-inspector__copy-btn"
                    onClick={() => copyPayload(selectedDetail.payload)}
                  >
                    {copiedPayload ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre>
                  <code>{JSON.stringify(selectedDetail.payload, null, 2)}</code>
                </pre>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pill-row">
        {story.proof.map((item) => (
          <span key={item} className="pill">{item}</span>
        ))}
      </div>
    </MotionDiv>
  )
}

export function SystemWorkflows({ stories }) {
  const glow = useCardGlow()

  return (
    <section id="systems" className="section" aria-label="AI system capabilities">
      <div className="section__intro">
        <p className="eyebrow">How I build AI systems</p>
        <h2>Systems with evidence, control, and a path to action.</h2>
        <p className="section__subtitle">
          Each workflow is grounded in work shipped at Airbus. Click any step to inspect its execution payload, latency budget, and checkpoints.
        </p>
      </div>

      <div className="stories-grid">
        {stories.map((story, idx) => (
          <StoryCard key={story.id} story={story} idx={idx} glow={glow} />
        ))}
      </div>
    </section>
  )
}
