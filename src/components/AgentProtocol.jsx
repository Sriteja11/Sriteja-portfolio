import React, { useState } from 'react'

export function AgentProtocol({ protocol, onCopyFeedback }) {
  const [copied, setCopied] = useState(false)

  const copyCurl = async () => {
    try {
      await navigator.clipboard.writeText(protocol.curlExample)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = protocol.curlExample
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    if (onCopyFeedback) onCopyFeedback('Agent curl command copied')
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article className="agent-protocol-card" aria-label="Machine-readable contact protocol">
      <div className="agent-protocol-card__header">
        <div>
          <span className="agent-protocol-card__eyebrow">Machine-readable contact</span>
          <h3 className="agent-protocol-card__title">Agent-to-engineer protocol</h3>
        </div>
        <span className="agent-protocol-card__badge">REST API</span>
      </div>

      <p className="agent-protocol-card__description">
        Browsing this portfolio with an autonomous AI agent or automated recruiter workflow? Dispatch opportunities and screening briefs directly to Sriteja via this endpoint:
      </p>

      <div className="agent-protocol-card__cmd-box">
        <div className="agent-protocol-card__cmd-top">
          <span className="agent-protocol-card__method">POST /ajax/{protocol.endpoint.split('/ajax/')[1]}</span>
          <button
            type="button"
            className="agent-protocol-card__copy-btn"
            onClick={copyCurl}
            title="Copy curl command"
            aria-label="Copy agent curl call"
          >
            {copied ? 'Copied' : 'Copy curl'}
          </button>
        </div>
        <pre className="agent-protocol-card__code">
          <code>{protocol.curlExample}</code>
        </pre>
      </div>
      <p className="agent-protocol-card__hint">
        Human visitors can simply use the standard email button or LinkedIn link below.
      </p>
    </article>
  )
}
