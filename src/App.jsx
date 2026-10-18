import React, { useState, useCallback } from 'react'
import profilePhoto from './assets/profile_photo.jpeg'
import gcpMlBadge from './assets/gcp-ml-badge.png'

import { useTheme } from './hooks/useTheme'
import { useCardGlow } from './hooks/useCardGlow'
import { useToast } from './hooks/useToast'
import { useTouchDevice } from './hooks/useTouchDevice'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { copyToClipboard } from './utils/clipboard'
import { triggerDownload } from './utils/download'

import { Navigation } from './components/Navigation'
import { CommandPalette } from './components/CommandPalette'
import { ShortcutsModal } from './components/ShortcutsModal'
import { Toast } from './components/Toast'
import { GradientCanvas } from './components/GradientCanvas'
import { TouchSplash } from './components/TouchSplash'
import { GlassLens } from './components/GlassLens'

import { HeroSection } from './components/sections/HeroSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { SystemWorkflows } from './components/SystemWorkflows'
import { UtilitiesGrid } from './components/UtilitiesGrid'
import { PeerFeedback } from './components/PeerFeedback'
import { CredentialsSection } from './components/sections/CredentialsSection'
import { FooterSection } from './components/sections/FooterSection'

import {
  profile,
  skillCategories,
  flagshipProjects,
  systemStories,
  utilities,
  credentials,
  endorsements,
  agentProtocol,
} from './data/portfolioData'

import './App.css'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)
  const [copied, setCopied] = useState(null)
  const glow = useCardGlow()
  const { toast, showToast } = useToast()
  const isTouch = useTouchDevice()

  const resumeUrl = `${import.meta.env.BASE_URL}Sriteja_Valaboju_Resume.pdf`

  const handleCopyEmail = useCallback(
    async (source) => {
      const success = await copyToClipboard(profile.email)
      if (success) {
        setCopied(source)
        showToast('Email copied to clipboard')
        setTimeout(() => setCopied(null), 2500)
      }
    },
    [showToast]
  )

  const handleToggleTheme = useCallback(() => {
    toggleTheme()
    const next = theme === 'dark' ? 'Day Glass' : 'Obsidian Dark'
    showToast(`Switched to ${next} mode`)
  }, [theme, toggleTheme, showToast])

  const handleDownloadResume = useCallback(() => {
    triggerDownload(resumeUrl, 'Sriteja_Valaboju_Resume.pdf')
    showToast('Downloading verified resume...')
  }, [resumeUrl, showToast])

  useKeyboardShortcuts({
    isTouch,
    isPaletteOpen,
    isShortcutsOpen,
    onTogglePalette: () => setIsPaletteOpen((prev) => !prev),
    onOpenPalette: () => setIsPaletteOpen(true),
    onToggleShortcuts: () => setIsShortcutsOpen((prev) => !prev),
    onToggleTheme: handleToggleTheme,
    onCopyEmail: () => handleCopyEmail('shortcut'),
    onDownloadResume: handleDownloadResume,
  })

  return (
    <div className="page-shell">
      <GradientCanvas />
      <TouchSplash />
      <GlassLens />
      <Toast toast={toast} />

      <Navigation
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onCopyEmail={() => handleCopyEmail('palette')}
        onDownloadResume={handleDownloadResume}
        onOpenShortcuts={() => {
          setIsPaletteOpen(false)
          setIsShortcutsOpen(true)
        }}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <main>
        <HeroSection
          profile={profile}
          profilePhoto={profilePhoto}
          gcpMlBadge={gcpMlBadge}
          resumeUrl={resumeUrl}
          isTouch={isTouch}
          copied={copied}
          onCopyEmail={handleCopyEmail}
          onDownloadResume={handleDownloadResume}
        />

        <SkillsSection categories={skillCategories} glowProps={glow} />

        <ProjectsSection projects={flagshipProjects} glowProps={glow} />

        <SystemWorkflows stories={systemStories} />

        <UtilitiesGrid utilities={utilities} />

        <PeerFeedback endorsements={endorsements} />

        <CredentialsSection credentials={credentials} glowProps={glow} />

        <FooterSection
          profile={profile}
          agentProtocol={agentProtocol}
          resumeUrl={resumeUrl}
          isTouch={isTouch}
          copied={copied}
          onCopyEmail={handleCopyEmail}
          onDownloadResume={handleDownloadResume}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          onCopyFeedback={showToast}
        />
      </main>
    </div>
  )
}
