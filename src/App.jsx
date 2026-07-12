import './App.css'
import profilePhoto from './assets/profile_photo.jpeg'

const skills = [
  'Python',
  'FastAPI',
  'React',
  'Vue',
  'TypeScript',
  'LangChain',
  'LangGraph',
  'Google ADK',
  'Vertex AI',
  'MCP',
  'RAG',
  'pgvector',
  'GCP',
  'AWS',
  'Terraform',
  'Docker',
]

const projects = [
  {
    title: 'Augmented BMS',
    eyebrow: 'Enterprise GenAI Assistant',
    text: 'GenAI chatbot and advanced search experience over thousands of business documents, combining semantic retrieval, multi-agent workflows, and production-grade GCP services.',
    stats: ['80K users', '5K+ MAU', '75% latency reduction'],
  },
  {
    title: 'AI Portfolio',
    eyebrow: 'AI Project Intelligence',
    text: 'Central platform for tracking AI initiatives, surfacing synergies, and automating project updates with React, FastAPI, Cloud SQL, Firestore, pgvector, and Cloud Run.',
    stats: ['RBAC', 'Cloud Build CI/CD', 'MVP to production'],
  },
  {
    title: 'ModelOps Platform',
    eyebrow: 'ML Platform Frontend',
    text: 'Led Vue.js platform work for model creation, SageMaker deployment, monitoring, drift detection, cost dashboards, and a reusable Airbus-aligned design system.',
    stats: ['50+ components', 'Storybook', 'Jenkins CI/CD'],
  },
]

const focusAreas = [
  'Problem solving',
  'Agentic systems',
  'Semantic search and RAG',
  'Cloud-native AI platforms',
  'Human-in-the-loop workflows',
]

const githubSignals = [
  {
    value: '9',
    label: 'public repositories',
  },
  {
    value: 'JS + TS',
    label: 'recent public work',
  },
  {
    value: '2021',
    label: 'GitHub since',
  },
]

function App() {
  return (
    <main className="page-shell">
      <section className="hero" aria-label="Introduction">
        <img
          className="hero__visual"
          src={`${import.meta.env.BASE_URL}hero-agent-systems.png`}
          alt="Abstract AI agent systems and cloud infrastructure visual"
        />
        <div className="hero__motion hero__motion--one" />
        <div className="hero__motion hero__motion--two" />
        <div className="hero__shade" />

        <nav className="nav" aria-label="Primary navigation">
          <a className="nav__brand" href="#top" aria-label="Sriteja Valaboju home">
            SV
          </a>
          <div className="nav__links">
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div id="top" className="hero__content">
          <div className="profile-lockup">
            <img src={profilePhoto} alt="Sriteja Valaboju" />
            <div>
              <p className="eyebrow">Software Engineer | GenAI Platforms | Bengaluru</p>
              <h1>Sriteja Valaboju</h1>
            </div>
          </div>
          <p className="hero__copy">
            I love solving problems and turning ambiguous ideas into production GenAI
            systems, AI agent platforms, and cloud-native product experiences that
            connect retrieval, reasoning, governance, and polished frontend workflows.
          </p>
          <div className="hero__actions" aria-label="Contact links">
            <a className="button button--primary" href="mailto:sritejavalaboju000@gmail.com">
              Email
            </a>
            <a
              className="button button--ghost"
              href="https://www.linkedin.com/in/sriteja-valaboju-65184717a"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="button button--ghost"
              href="https://github.com/Sriteja11"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="github-strip" aria-label="Public GitHub summary">
            {githubSignals.map((item) => (
              <div key={item.label}>
                <span>{item.value}</span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="impact" aria-label="Career impact">
        <div>
          <span>80K</span>
          <p>enterprise users reached</p>
        </div>
        <div>
          <span>4K</span>
          <p>document knowledge corpus</p>
        </div>
        <div>
          <span>75%</span>
          <p>advanced search latency reduction</p>
        </div>
        <div>
          <span>50+</span>
          <p>design system components</p>
        </div>
      </section>

      <section id="work" className="section section--split">
        <div className="section__intro">
          <p className="eyebrow">Selected Work</p>
          <h2>AI products with platform depth.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <p className="project-card__eyebrow">{project.eyebrow}</p>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <div className="stat-row">
                {project.stats.map((stat) => (
                  <span key={stat}>{stat}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section focus-panel" aria-label="Engineering focus">
        <div>
          <p className="eyebrow">What I Focus On</p>
          <h2>Hard problems, agentic AI, retrieval, cloud reliability, and interfaces people can trust.</h2>
        </div>
        <div className="focus-list">
          {focusAreas.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section id="skills" className="section">
        <div className="section__intro section__intro--wide">
          <p className="eyebrow">Technical Stack</p>
          <h2>Comfortable across the AI product stack.</h2>
        </div>
        <div className="skill-cloud">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <footer id="contact" className="footer">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let's build useful AI systems.</h2>
          <p>Bengaluru, Karnataka, India | +91 934-649-3360</p>
        </div>
        <a className="button button--primary" href="mailto:sritejavalaboju000@gmail.com">
          sritejavalaboju000@gmail.com
        </a>
      </footer>
    </main>
  )
}

export default App
