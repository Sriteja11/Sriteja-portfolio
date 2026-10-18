import React, { useState, useEffect, useRef } from 'react'

export function CommandPalette({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  onCopyEmail,
  resumeUrl,
}) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const items = [
    // Navigation
    {
      id: 'nav-skills',
      group: 'Navigation',
      title: 'Jump to Skills',
      subtitle: 'AI frameworks, cloud foundations, and engineering tools',
      keywords: 'skills tech stack langgraph vertex adk gcp aws python',
      icon: '⚙',
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'nav-work',
      group: 'Navigation',
      title: 'Jump to Selected Platforms',
      subtitle: 'Augmented BMS, AI Portfolio, and ModelOps Platform',
      keywords: 'work projects platforms airbus enterprise bms',
      icon: '✦',
      action: () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'nav-systems',
      group: 'Navigation',
      title: 'Jump to Systems & Architecture',
      subtitle: 'Agent orchestration, grounding evaluation, and automation workflows',
      keywords: 'systems ragas rag evaluation pipelines checkpoints',
      icon: '☍',
      action: () => {
        document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'nav-utilities',
      group: 'Navigation',
      title: 'Jump to Open Source & Tools',
      subtitle: 'understand-research, job-apply-mcp, and performance-utils',
      keywords: 'utilities open source tools github understand research python mcp',
      icon: '⚡',
      action: () => {
        document.getElementById('utilities')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'nav-terminal',
      group: 'Navigation',
      title: 'Jump to Interactive Console',
      subtitle: 'Live CLI runs for agent tools, profiling, and evaluations',
      keywords: 'terminal console cli uv python run bash',
      icon: '>',
      action: () => {
        document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'nav-credentials',
      group: 'Navigation',
      title: 'Jump to Credentials',
      subtitle: 'Google Cloud Professional ML Engineer certification',
      keywords: 'certifications gcp ml credentials google cloud',
      icon: '★',
      action: () => {
        document.getElementById('credentials')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'nav-contact',
      group: 'Navigation',
      title: 'Jump to Contact',
      subtitle: 'Email, phone, and profile links',
      keywords: 'contact email phone reach out touch',
      icon: '✉',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      },
    },

    // Quick Actions
    {
      id: 'act-email',
      group: 'Actions',
      title: 'Copy Email Address',
      subtitle: 'sritejavalaboju000@gmail.com',
      keywords: 'email copy contact address write',
      icon: '📋',
      action: () => {
        onCopyEmail()
      },
    },
    {
      id: 'act-resume',
      group: 'Actions',
      title: 'Download Resume (PDF)',
      subtitle: 'Get latest verified resume',
      keywords: 'resume cv pdf download hire',
      icon: '↓',
      action: () => {
        const link = document.createElement('a')
        link.href = resumeUrl
        link.download = 'Sriteja_Valaboju_Resume.pdf'
        link.click()
      },
    },
    {
      id: 'act-theme',
      group: 'Actions',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Obsidian Dark'} Mode`,
      subtitle: `Current theme: ${theme}`,
      keywords: 'theme dark mode light color appearance',
      icon: theme === 'dark' ? '☀' : '☾',
      action: () => {
        onToggleTheme()
      },
    },

    // External Projects
    {
      id: 'proj-research',
      group: 'Projects',
      title: 'Open understand-research Repository',
      subtitle: 'GitHub: Evidence-grounded RAG with Whistle STT',
      keywords: 'understand research rag audio voice stt github',
      icon: '↗',
      action: () => {
        window.open('https://github.com/Sriteja11/understand-research', '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'proj-fitness',
      group: 'Projects',
      title: 'Open Fitness 24 Live App',
      subtitle: 'Deployed on Vercel',
      keywords: 'fitness nutrition web app vercel live demo',
      icon: '↗',
      action: () => {
        window.open('https://fitness-24.vercel.app/', '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'proj-github',
      group: 'Links',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/Sriteja11',
      keywords: 'github code repos profile',
      icon: '↗',
      action: () => {
        window.open('https://github.com/Sriteja11', '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'proj-linkedin',
      group: 'Links',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/sriteja-valaboju-65184717a',
      keywords: 'linkedin connect social network',
      icon: '↗',
      action: () => {
        window.open('https://www.linkedin.com/in/sriteja-valaboju-65184717a/', '_blank', 'noopener,noreferrer')
      },
    },
  ]

  const filtered = items.filter((item) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q) ||
      item.keywords.toLowerCase().includes(q)
    )
  })

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      window.setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action()
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filtered, selectedIndex, onClose])

  if (!isOpen) return null

  return (
    <div className="cmd-backdrop" onClick={onClose} role="presentation">
      <div
        className="cmd-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="cmd-header">
          <svg className="cmd-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="cmd-badge">ESC</span>
        </div>

        <div className="cmd-list" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="cmd-empty">No commands matching &ldquo;{query}&rdquo;</div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex
              return (
                <div
                  key={item.id}
                  className={`cmd-item ${isSelected ? 'cmd-item--selected' : ''}`}
                  onClick={() => {
                    item.action()
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="cmd-item__icon">{item.icon}</span>
                  <div className="cmd-item__content">
                    <span className="cmd-item__title">{item.title}</span>
                    <span className="cmd-item__subtitle">{item.subtitle}</span>
                  </div>
                  <span className="cmd-item__group">{item.group}</span>
                </div>
              )
            })
          )}
        </div>

        <div className="cmd-footer">
          <span><kbd className="cmd-kbd">↑</kbd> <kbd className="cmd-kbd">↓</kbd> navigate</span>
          <span><kbd className="cmd-kbd">↵</kbd> select</span>
          <span><kbd className="cmd-kbd">esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
