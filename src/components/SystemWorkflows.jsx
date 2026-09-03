import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const MotionDiv = motion.div

function AgentWorkflow({ nodes }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="workflow workflow--agents" aria-label="Multi-agent orchestration workflow diagram">
      <div className="workflow__grid" aria-hidden="true" />
      <div className="workflow__line workflow__line--one" aria-hidden="true">
        <MotionDiv
          className="workflow__pulse"
          animate={shouldReduceMotion ? { opacity: 0 } : { left: ['-4%', '104%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
        />
      </div>
      <div className="workflow__line workflow__line--two" aria-hidden="true" />
      <div className="workflow__nodes">
        {nodes.map((node, index) => (
          <MotionDiv
            className={`workflow__node workflow__node--${index + 1}`}
            key={node}
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.42, delay: index * 0.12 }}
          >
            <span className="workflow__node-index">0{index + 1}</span>
            <span>{node}</span>
          </MotionDiv>
        ))}
      </div>
      <MotionDiv
        className="workflow__orb"
        aria-hidden="true"
        animate={shouldReduceMotion ? { opacity: 0.45 } : { y: [-8, 8, -8], x: [0, 9, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function GroundingDiagram() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="grounding-diagram" aria-label="Evidence retrieval, citation validation, and grounded answer synthesis">
      <div className="workflow__grid" aria-hidden="true" />
      <MotionDiv className="scanner-beam" aria-hidden="true" animate={shouldReduceMotion ? { opacity: 0 } : { top: ['22%', '73%', '22%'] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="grounding-db"><span className="grounding-icon">DB</span><span>Evidence store</span></div>
      <div className="document-stack" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="grounding-label grounding-label--scan">Scan docs</div>
      <div className="chunk-stream" aria-label="Retrieved document chunks">
        {['Chunk 01', 'Chunk 02', 'Chunk 03'].map((chunk, index) => (
          <MotionDiv key={chunk} className="chunk" animate={shouldReduceMotion ? { opacity: 1 } : { x: [0, 8, 0], opacity: [.75, 1, .75] }} transition={{ duration: 2.8, delay: index * .34, repeat: Infinity, ease: 'easeInOut' }}>{chunk}</MotionDiv>
        ))}
      </div>
      <div className="answer-skeleton">
        <span className="answer-skeleton__eyebrow">Grounded response</span>
        <span /><span /><span className="answer-skeleton__short" />
        <b>Sources verified</b>
      </div>
      <div className="grounding-connection grounding-connection--one" aria-hidden="true" />
      <div className="grounding-connection grounding-connection--two" aria-hidden="true" />
    </div>
  )
}

function ApprovalWorkflow({ nodes }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="workflow workflow--automation" aria-label="Workflow automation pauses at an approval gate before publishing">
      <div className="workflow__grid" aria-hidden="true" />
      <div className="synth-grid" aria-hidden="true" />
      <div className="workflow__line workflow__line--one" aria-hidden="true" />
      <div className="workflow__nodes">
        {nodes.map((node, index) => (
          <MotionDiv className={`workflow__node workflow__node--${index + 1}`} key={node} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .55 }} transition={{ duration: .42, delay: index * .12 }}>
            <span className="workflow__node-index">0{index + 1}</span><span>{node}</span>
          </MotionDiv>
        ))}
      </div>
      <div className="approval-gate" aria-label="Human approval required"><span>Human gate</span><b>||</b></div>
      <MotionDiv className="approval-pulse" aria-hidden="true" animate={shouldReduceMotion ? { opacity: 0 } : { left: ['5%', '60%', '60%', '60%', '103%'], opacity: [0, 1, 1, 1, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: 'linear', times: [0, .48, .62, .72, 1] }} />
    </div>
  )
}

export function SystemWorkflows({ stories }) {
  return (
    <section id="systems" className="systems section" aria-label="AI system capabilities">
      <div className="systems__intro">
        <p className="eyebrow">How I build AI systems</p>
        <h2>Beyond a demo: systems with evidence, control, and a path to action.</h2>
        <p>Each workflow below is grounded in work shipped at Airbus, showing the engineering choices behind reliable AI products.</p>
      </div>

      <div className="system-stories">
        {stories.map((story) => (
          <article className={`system-story system-story--${story.id}`} key={story.id}>
            <div className="system-story__copy">
              <div className="system-story__header">
                <span className="system-story__index">{story.index}</span>
                <p className="eyebrow">{story.eyebrow}</p>
              </div>
              <h3>{story.title}</h3>
              <p>{story.text}</p>
              <div className="proof-row" aria-label={`${story.title} tech`}>
                {story.proof.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            {story.id === 'evaluation' ? (
              <GroundingDiagram />
            ) : story.id === 'automation' ? (
              <ApprovalWorkflow nodes={story.nodes} />
            ) : (
              <AgentWorkflow nodes={story.nodes} />
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
