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
    text: 'RAGAS-based evaluation, golden datasets, and response grounding make it possible to identify unsupported claims, trace evidence, and improve behavior without guessing.',
    proof: ['RAGAS', 'Golden datasets', 'Citation grounding'],
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

function WorkflowDiagram({ id, nodes }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`workflow workflow--${id}`} aria-label={`${id} workflow diagram`}>
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
            <a className="button button--primary" href="#systems">Explore system design</a>
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
