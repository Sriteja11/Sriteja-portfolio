import React, { useEffect } from 'react'

export function ShortcutsModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === '?') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const shortcuts = [
    { key: '⌘K / Ctrl+K', desc: 'Open command palette' },
    { key: '1', desc: 'Jump to Skills' },
    { key: '2', desc: 'Jump to Selected platforms' },
    { key: '3', desc: 'Jump to Systems & architecture' },
    { key: '4', desc: 'Jump to Open source & tools' },
    { key: '5', desc: 'Jump to Interactive console' },
    { key: 'D', desc: 'Toggle Dark / Light mode' },
    { key: 'C', desc: 'Copy email to clipboard' },
    { key: 'R', desc: 'Download resume' },
    { key: '?', desc: 'Toggle keyboard shortcuts' },
    { key: 'Esc', desc: 'Close open dialogs' },
  ]

  return (
    <div className="cmd-backdrop" onClick={onClose} role="presentation">
      <div
        className="cmd-dialog shortcuts-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
      >
        <div className="shortcuts-dialog__header">
          <h3>Keyboard shortcuts</h3>
          <button
            type="button"
            className="flow-inspector__close"
            onClick={onClose}
            aria-label="Close shortcuts dialog"
          >
            ✕
          </button>
        </div>
        <div className="shortcuts-list">
          {shortcuts.map((s) => (
            <div key={s.key} className="shortcut-row">
              <span className="shortcut-desc">{s.desc}</span>
              <kbd className="cmd-kbd">{s.key}</kbd>
            </div>
          ))}
        </div>
        <div className="cmd-footer">
          <span>Press <kbd className="cmd-kbd">esc</kbd> or <kbd className="cmd-kbd">?</kbd> to dismiss</span>
        </div>
      </div>
    </div>
  )
}
