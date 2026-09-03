export const profile = {
  name: 'Sriteja Valaboju',
  handle: '@Sriteja11',
  role: 'Software Engineer',
  focus: 'GenAI Platforms & Agent Systems',
  location: 'Bengaluru, India',
  phone: '+91 934-649-3360',
  email: 'sritejavalaboju000@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/sriteja-valaboju-65184717a/',
  githubUrl: 'https://github.com/Sriteja11',
  portfolioRepoUrl: 'https://github.com/Sriteja11/Sriteja-portfolio',
  liveUrl: 'https://sriteja11.github.io/Sriteja-portfolio/',
  summary:
    'I engineer AI systems that can be trusted in production: grounded retrieval, evaluated LLM behavior, long-running multi-agent workflows, and cloud platform foundations.',
  certification: 'Google Cloud Certified Professional Machine Learning Engineer',
}

export const skillCategories = [
  {
    title: 'AI & Evaluation',
    skills: ['LangChain', 'LangGraph', 'Vertex AI', 'Google ADK', 'RAG', 'RAGAS', 'LangSmith', 'MCP', 'PyTorch', 'pgvector'],
  },
  {
    title: 'Cloud & Infrastructure',
    skills: ['GCP', 'Cloud Run', 'Cloud Functions', 'Pub/Sub', 'Cloud SQL', 'Terraform', 'Docker', 'SageMaker', 'MLOps'],
  },
  {
    title: 'Engineering & Delivery',
    skills: ['Python', 'FastAPI', 'TypeScript', 'React', 'Vue', 'SQL', 'uv', 'Node.js', 'CI/CD', 'Jenkins'],
  },
]

export const systemStories = [
  {
    id: 'agents',
    index: '01',
    eyebrow: 'Agent orchestration',
    title: 'Long-running research, routed with intent.',
    text: 'Pairs a fast semantic path with a deeper multi-agent route. Routing, tool calls, link analysis, and human checkpoints run as one observable workflow.',
    proof: ['Google ADK', 'Semantic retrieval', 'Human-in-the-loop'],
    nodes: ['Question', 'Intent route', 'Research agents', 'Quality review', 'Grounded answer'],
    metrics: ['Sub-second fast path', 'Observable traces', 'State checkpoints'],
  },
  {
    id: 'evaluation',
    index: '02',
    eyebrow: 'Evaluation & grounding',
    title: 'Answers that can earn trust.',
    text: 'Evaluation suites, curated challenge sets, and response grounding detect unsupported claims, trace evidence, and improve behavior predictably.',
    proof: ['Evaluation suites', 'Golden datasets', 'Citation grounding'],
    nodes: ['Golden set', 'Vector retrieve', 'Synthesize', 'RAGAS evaluate', 'Publish'],
    metrics: ['Faithfulness check', 'Answer relevance', 'Hallucination gate'],
  },
  {
    id: 'automation',
    index: '03',
    eyebrow: 'Governed automation',
    title: 'AI workflows that move work forward.',
    text: 'Project intelligence workflows consolidate updates, surface synergies, and enforce permissions, approvals, and auditability.',
    proof: ['RBAC', 'Cloud Run', 'Event-driven GCP'],
    nodes: ['Intake', 'Classify', 'Enrich', 'Approval gate', 'Publish'],
    metrics: ['Role enforcement', 'Audit trail', 'Async pipelines'],
  },
]

export const flagshipProjects = [
  {
    title: 'Augmented BMS',
    eyebrow: 'Enterprise GenAI Assistant',
    text: 'A conversational and advanced search experience combining semantic retrieval, multi-agent workflows, link analysis, and production GCP services.',
    tech: ['Google ADK', 'Vertex AI', 'RAGAS', 'Cloud Run', 'pgvector'],
    highlight: 'Airbus Enterprise',
  },
  {
    title: 'AI Portfolio Platform',
    eyebrow: 'Project Intelligence',
    text: 'A central platform tracking AI initiatives across business units, surfacing synergies, and automating project updates with role-based access.',
    tech: ['FastAPI', 'React', 'Cloud Run', 'RBAC', 'Pub/Sub'],
    highlight: 'Production System',
  },
  {
    title: 'ModelOps Platform',
    eyebrow: 'ML Platform & Observability',
    text: 'A platform experience for model creation, deployment, monitoring, drift detection, and cost observability, backed by a unified design system.',
    tech: ['SageMaker', 'FastAPI', 'React', 'Monitoring', 'Jenkins CI/CD'],
    highlight: 'Internal Tooling',
  },
]

export const utilities = [
  {
    title: 'job-apply-mcp',
    eyebrow: 'Agent Tooling / MCP',
    description: 'Local Model Context Protocol server in Python with uv, AES-256-GCM vault encryption, transparent skill scoring, and out-of-band approval gates.',
    tech: ['Python', 'uv', 'MCP SDK', 'Pydantic', 'AES-GCM'],
    repoUrl: 'https://github.com/Sriteja11/Sriteja-portfolio/tree/main/job-apply-mcp',
    badge: 'Included in repo',
    featured: true,
  },
  {
    title: 'performance-utils',
    eyebrow: 'Latency & Profiling',
    description: 'Measure hosted software latency and network response speed at multiple tiers to pinpoint system bottlenecks.',
    tech: ['Python', 'Network Latency', 'Profiling', 'CLI'],
    repoUrl: 'https://github.com/Sriteja11/performance-utils',
    badge: 'Open Source',
    featured: true,
  },
  {
    title: 'pdf-utilities',
    eyebrow: 'Live Web Utility',
    description: 'Online utility to combine PDFs and convert images to PDF without signups or watermarks. Deployed and live on Render.',
    tech: ['Python', 'FastAPI', 'Render', 'File Processing'],
    repoUrl: 'https://github.com/Sriteja11/pdf-utilities',
    liveUrl: 'https://pdf-combine-0cf9.onrender.com',
    badge: 'Live Deployment',
    featured: true,
  },
  {
    title: 'whatsapp-contacts-extractor',
    eyebrow: 'Workflow Automation',
    description: 'Browser automation script to batch extract WhatsApp group contact info into structured CSV files.',
    tech: ['JavaScript', 'DOM Automation', 'CSV'],
    repoUrl: 'https://github.com/Sriteja11/whatsapp-contacts-extractor',
    badge: '3 Stars',
    featured: false,
  },
]

export const credentials = [
  {
    issuer: 'Google Cloud',
    title: 'Professional Machine Learning Engineer',
    detail: 'Certified in designing, building, and productionizing ML models that solve real business challenges on Google Cloud.',
    accent: 'GCP Certified',
  },
  {
    issuer: 'Google Cloud',
    title: 'Advanced Generative AI: Deep Dive',
    detail: 'Hands-on training in building, tuning, and deploying generative AI models with Vertex AI.',
    accent: 'GenAI',
  },
]
