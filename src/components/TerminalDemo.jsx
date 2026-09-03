import React, { useState } from 'react'

const commands = [
  {
    id: 'mcp',
    label: 'job-apply-mcp',
    cmd: 'uv run job-apply-mcp --list-tools',
    output: [
      '{',
      '  "server": "job-apply-profile",',
      '  "version": "0.1.0",',
      '  "engine": "Python 3.12 / uv",',
      '  "tools": [',
      '    "get_public_profile",',
      '    "get_private_profile (AES-256-GCM vault with key check)",',
      '    "discover_roles (LinkedIn, Naukri, Indeed, Wellfound)",',
      '    "ingest_job (local SQLite/JSON job store)",',
      '    "score_role_fit (transparent keyword match & rationale)",',
      '    "prepare_application_draft (always awaiting_review)",',
      '    "approve_application (timing-safe external key)"',
      '  ]',
      '}'
    ]
  },
  {
    id: 'perf',
    label: 'performance-utils',
    cmd: 'python -m performance_utils.measure --target https://api.internal/v1/predict',
    output: [
      '[+] Target: https://api.internal/v1/predict',
      '[-] DNS Resolution:   12.4ms',
      '[-] TLS Handshake:    28.1ms',
      '[-] TTFB:             94.2ms',
      '[-] Streaming LLM:    340.5ms (first chunk 140ms)',
      '[✓] P95 Latency:      475.2ms | Status: HEALTHY'
    ]
  },
  {
    id: 'eval',
    label: 'ragas-evaluation',
    cmd: 'python -m eval.run_golden_set --dataset airbus_bms_v2.json',
    output: [
      'Evaluating 120 curated production retrieval queries...',
      '[1/4] Faithfulness score:          0.94 / 1.00',
      '[2/4] Answer relevancy:            0.92 / 1.00',
      '[3/4] Context precision:           0.89 / 1.00',
      '[4/4] Hallucination rate:          0.02 (Threshold < 0.05)',
      '[✓] Evaluation passed. Approved for staging rollout.'
    ]
  }
]

export function TerminalDemo() {
  const [activeTab, setActiveTab] = useState('mcp')
  const current = commands.find(c => c.id === activeTab) || commands[0]

  return (
    <section id="terminal" className="section terminal-section">
      <div className="section__intro section__intro--wide">
        <p className="eyebrow">System execution</p>
        <h2>Tooling, profiling, and evaluation in motion.</h2>
        <p>Inspect how tools and pipelines run locally and in production.</p>
      </div>

      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots" aria-hidden="true">
            <span className="dot dot--red" />
            <span className="dot dot--amber" />
            <span className="dot dot--green" />
          </div>
          <div className="terminal-tabs">
            {commands.map(cmd => (
              <button
                key={cmd.id}
                type="button"
                className={`terminal-tab ${activeTab === cmd.id ? 'terminal-tab--active' : ''}`}
                onClick={() => setActiveTab(cmd.id)}
              >
                {cmd.label}
              </button>
            ))}
          </div>
          <span className="terminal-meta">python 3.12 / uv</span>
        </div>

        <div className="terminal-body">
          <div className="terminal-line terminal-prompt">
            <span className="terminal-arrow">➜</span>
            <span className="terminal-dir">~/workspace</span>
            <span className="terminal-cmd">{current.cmd}</span>
          </div>
          <pre className="terminal-output">
            {current.output.join('\n')}
          </pre>
        </div>
      </div>
    </section>
  )
}
