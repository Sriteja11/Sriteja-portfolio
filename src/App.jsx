import { motion, useReducedMotion } from 'framer-motion'
import './App.css'
import profilePhoto from './assets/profile_photo.jpeg'

const MotionDiv = motion.div

const skills = [
  'Python', 'FastAPI', 'SQL', 'React', 'Vue', 'TypeScript', 'Google ADK',
  'Vertex AI', 'LangChain', 'LangGraph', 'RAG', 'RAGAS', 'LangSmith', 'MCP',
  'LLMOps', 'MLOps', 'PyTorch', 'TensorFlow', 'pgvector', 'GCP', 'Cloud Run',
  'Cloud Functions', 'Pub/Sub', 'Cloud SQL', 'Terraform', 'Docker', 'SageMaker',
]

const projects = [
  {
    title: 'Augmented BMS',
    eyebrow: 'Enterprise GenAI Assistant',
    text: 'A conversational and advanced search experience that combines semantic retrieval, multi-agent workflows, link analysis, and production-grade GCP services.',
    stats: ['Google ADK', 'Vertex AI', 'RAGAS evaluation'],
  },
  {
    title: 'AI Portfolio',
    eyebrow: 'AI Project Intelligence',
    text: 'A central platform for tracking AI initiatives, surfacing meaningful synergies, and automating project updates through governed role-based workflows.',
    stats: ['FastAPI + React', 'Cloud Run', 'RBAC'],
  },
  {
    title: 'ModelOps Platform',
    eyebrow: 'ML Platform Frontend',
    text: 'A platform experience for model creation, deployment, monitoring, drift detection, and cost observability, supported by a reusable design system.',
    stats: ['SageMaker', 'Monitoring', 'Jenkins CI/CD'],
  },
]

const credentials = [
  {
    issuer: 'Google Cloud',
    title: 'Professional Machine Learning Engineer',
    detail: 'Certified in designing, building, and productionizing ML models that solve real business challenges on Google Cloud.',
    accent: 'GCP',
  },
  {
    issuer: 'Google Cloud',
    title: 'Advanced Generative AI: Deep Dive',
    detail: 'Hands-on training in building, tuning, and deploying generative AI models with Vertex AI.',
    accent: 'GenAI',
  },
]

const systemStories = [
  {
    id: 'agents',
    eyebrow: '01 / Agent orchestration',
    title: 'Long-running research, routed with intent.',
    text: 'Advanced Search pairs a fast semantic path with a deeper, multi-agent route. Routing, tool calls, link analysis, and human checkpoints are designed as one observable workflow.',
    proof: ['Google ADK', 'Semantic retrieval', 'Human-in-the-loop'],
    nodes: ['Question', 'Route', 'Research agents', 'Review', 'Grounded answer'],
  },
  {
    id: 'evaluation',
    eyebrow: '02 / Evaluation & grounding',
    title: 'Answers that can earn trust.',
    text: 'Evaluation suites, curated challenge sets, and response grounding make it possible to identify unsupported claims, trace evidence, and improve behavior without guessing.',
    proof: ['Evaluation suites', 'Golden datasets', 'Citation grounding'],
    nodes: ['Golden set', 'Retrieve', 'Generate', 'Evaluate', 'Improve'],
  },
  {
    id: 'automation',
    eyebrow: '03 / Governed automation',
    title: 'AI workflows that move work forward.',
    text: 'Project intelligence workflows consolidate updates, surface synergies, and retain the permissions, approvals, and auditability enterprise AI needs.',
    proof: ['RBAC', 'Cloud Run', 'Event-driven GCP'],
    nodes: ['Intake', 'Classify', 'Enrich', 'Approve', 'Publish'],
  },
]

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
    <div className="grounding-diagram" aria-label="Documents are scanned, chunked, retrieved from a database, and formed into a grounded answer">
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
        <b>Sources attached</b>
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
      <div className="approval-gate" aria-label="Human approval required"><span>Human approval</span><b>||</b></div>
      <MotionDiv className="approval-pulse" aria-hidden="true" animate={shouldReduceMotion ? { opacity: 0 } : { left: ['5%', '60%', '60%', '60%', '103%'], opacity: [0, 1, 1, 1, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: 'linear', times: [0, .48, .62, .72, 1] }} />
    </div>
  )
}

function WorkflowDiagram({ id, nodes }) {
  if (id === 'evaluation') return <GroundingDiagram />
  if (id === 'automation') return <ApprovalWorkflow nodes={nodes} />
  return <AgentWorkflow nodes={nodes} />
}

function SystemStory({ story }) {
  return (
    <article className={`system-story system-story--${story.id}`}>
      <div className="system-story__copy">
        <p className="eyebrow">{story.eyebrow}</p>
        <h3>{story.title}</h3>
        <p>{story.text}</p>
        <div className="proof-row" aria-label={`${story.title} skills`}>
          {story.proof.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
      <WorkflowDiagram id={story.id} nodes={story.nodes} />
    </article>
  )
}

function App() {
  return (
    <main className="page-shell">
      <section className="hero" aria-label="Introduction">
        <img className="hero__visual" src={`${import.meta.env.BASE_URL}hero-agent-systems.png`} alt="Abstract AI agent systems and cloud infrastructure visual" />
        <div className="hero__motion hero__motion--one" aria-hidden="true" />
        <div className="hero__motion hero__motion--two" aria-hidden="true" />
        <div className="hero__shade" />

        <nav className="nav" aria-label="Primary navigation">
          <a className="nav__brand" href="#top" aria-label="Sriteja Valaboju home">SV</a>
          <div className="nav__links">
            <a href="#systems">Systems</a>
            <a href="#work">Work</a>
            <a href="#credentials">Credentials</a>
            <a href={`${import.meta.env.BASE_URL}Sriteja_Valaboju_Resume.pdf`} download>Resume</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div id="top" className="hero__content">
          <div className="profile-lockup">
            <img src={profilePhoto} alt="Sriteja Valaboju" />
            <div>
              <p className="eyebrow">Software Engineer / GenAI Platforms / Bengaluru</p>
              <h1>Sriteja Valaboju</h1>
            </div>
          </div>
          <p className="certification-pill"><span aria-hidden="true">*</span> Google Cloud Certified Professional Machine Learning Engineer</p>
          <p className="hero__copy">
            I engineer AI systems that can be trusted in production: grounded retrieval,
            evaluated LLM behavior, long-running multi-agent workflows, and the cloud
            platforms that make them useful to people.
          </p>
          <div className="hero__actions" aria-label="Contact links">
            <a className="button button--primary" href={`${import.meta.env.BASE_URL}Sriteja_Valaboju_Resume.pdf`} download>Download resume</a>
            <a className="button button--ghost" href="mailto:sritejavalaboju000@gmail.com">Start a conversation</a>
          </div>
        </div>
      </section>

      <section id="systems" className="systems section" aria-label="AI system capabilities">
        <div className="systems__intro">
          <p className="eyebrow">How I build AI systems</p>
          <h2>Beyond a demo: systems with evidence, control, and a path to action.</h2>
          <p>Each workflow below is grounded in work shipped at Airbus, showing the engineering choices behind reliable AI products.</p>
        </div>
        <div className="system-stories">
          {systemStories.map((story) => <SystemStory story={story} key={story.id} />)}
        </div>
      </section>

      <section id="work" className="section section--split">
        <div className="section__intro">
          <p className="eyebrow">Selected work</p>
          <h2>AI products with platform depth.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <p className="project-card__eyebrow">{project.eyebrow}</p>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <div className="stat-row">{project.stats.map((stat) => <span key={stat}>{stat}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="credentials" className="section credentials" aria-label="Certifications and training">
        <div className="section__intro section__intro--wide">
          <p className="eyebrow">Credentials</p>
          <h2>Cloud-certified, production-minded.</h2>
        </div>
        <div className="credential-grid">
          {credentials.map((credential) => (
            <article className="credential-card" key={credential.title}>
              <div className="credential-card__topline"><span>{credential.issuer}</span><span className="credential-card__accent">{credential.accent}</span></div>
              <h3>{credential.title}</h3>
              <p>{credential.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="section__intro section__intro--wide">
          <p className="eyebrow">Technical stack</p>
          <h2>The implementation layer behind the workflows.</h2>
        </div>
        <div className="skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      </section>

      <footer id="contact" className="footer">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build AI people can rely on.</h2>
          <p>Bengaluru, Karnataka, India / +91 934-649-3360</p>
        </div>
        <a className="button button--primary" href="mailto:sritejavalaboju000@gmail.com">sritejavalaboju000@gmail.com</a>
      </footer>
    </main>
  )
}

export default App
