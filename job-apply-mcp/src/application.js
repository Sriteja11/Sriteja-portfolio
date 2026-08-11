import { randomUUID } from 'node:crypto'
import { getJob } from './jobs.js'
import { readJson, writeLocalJson } from './storage.js'

const words = (value = '') => new Set(value.toLowerCase().match(/[a-z0-9+#.]{2,}/g) ?? [])

export function scoreJob(profile, job) {
  const jobWords = words(`${job.title} ${job.description}`)
  const skills = profile.skills ?? []
  const matchedSkills = skills.filter((skill) => jobWords.has(skill.toLowerCase()) || job.description?.toLowerCase().includes(skill.toLowerCase()))
  const normalized = Math.min(100, Math.round((matchedSkills.length / Math.max(skills.length, 1)) * 100 * 2.5))
  return { score: normalized, matchedSkills, missingKeywords: [...jobWords].filter((word) => word.length > 3 && !matchedSkills.some((skill) => skill.toLowerCase().includes(word))).slice(0, 12), rationale: `Matched ${matchedSkills.length} of ${skills.length} declared skills. Score is a transparent keyword signal, not a hiring prediction.` }
}

export function createDraft(profile, jobId, preferences = {}) {
  const job = getJob(jobId)
  if (!job) throw new Error(`Job ${jobId} was not found. Ingest it before creating a draft.`)
  const fit = scoreJob(profile, job)
  const selectedHighlights = (profile.experienceHighlights ?? []).slice(0, 4)
  const draft = {
    id: randomUUID(), jobId, status: 'awaiting_review', createdAt: new Date().toISOString(),
    resumeTailoring: { includeSkills: fit.matchedSkills, includeHighlights: selectedHighlights, missingKeywordsToValidate: fit.missingKeywords },
    coverLetter: `Dear Hiring Team,\n\nI am interested in the ${job.title} role at ${job.company}. ${profile.professionalSummary || 'My experience is aligned with building reliable AI and software systems.'}\n\nRelevant strengths include ${fit.matchedSkills.join(', ') || 'the skills described in my profile'}. ${selectedHighlights.join(' ')}\n\nI would welcome the opportunity to discuss how I can contribute to your team.\n\nSincerely,\n${profile.fullName || '[Your name]'}`,
    applicationAnswers: { noticePeriod: profile.noticePeriod || 'Confirm before submission', currentCtc: profile.currentCtc || 'Confirm before submission', workAuthorization: preferences.workAuthorization || 'Confirm before submission' },
  }
  const drafts = readJson('applications.local.json', [])
  drafts.push(draft)
  writeLocalJson('applications.local.json', drafts)
  return { job, draft, fit }
}

export function listDrafts() { return readJson('applications.local.json', []) }

export function approveDraft(applicationId, approvalKey) {
  if (!process.env.APPLICATION_APPROVAL_KEY || approvalKey !== process.env.APPLICATION_APPROVAL_KEY) throw new Error('Approval key is invalid.')
  const drafts = listDrafts()
  const index = drafts.findIndex((draft) => draft.id === applicationId)
  if (index < 0) throw new Error('Application draft was not found.')
  if (drafts[index].status !== 'awaiting_review') throw new Error(`Application is already ${drafts[index].status}.`)
  drafts[index] = { ...drafts[index], status: 'approved_for_submission', approvedAt: new Date().toISOString() }
  writeLocalJson('applications.local.json', drafts)
  return drafts[index]
}

export function composeEmail(profile, jobId) {
  const job = getJob(jobId)
  if (!job) throw new Error('Job was not found.')
  return { to: job.applyEmail || '', subject: `Application: ${job.title} - ${profile.fullName || '[Your name]'}`, body: `Hello,\n\nI am writing to apply for the ${job.title} role at ${job.company}. ${profile.professionalSummary || ''}\n\nI have attached my resume and would welcome a conversation.\n\nBest,\n${profile.fullName || ''}`, requiresHumanReview: true }
}
