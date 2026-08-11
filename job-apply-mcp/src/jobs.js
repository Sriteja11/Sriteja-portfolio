import { randomUUID } from 'node:crypto'
import { readJson, writeLocalJson } from './storage.js'

const supportedSources = ['linkedin', 'naukri', 'indeed', 'wellfound', 'workday', 'careers']
const searchUrls = {
  linkedin: ({ query, location }) => `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(location ?? '')}`,
  naukri: ({ query, location }) => `https://www.naukri.com/${encodeURIComponent(query).replace(/%20/g, '-')}-jobs-in-${encodeURIComponent(location ?? 'india').replace(/%20/g, '-')}`,
  indeed: ({ query, location }) => `https://in.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location ?? '')}`,
  wellfound: ({ query }) => `https://wellfound.com/jobs?query=${encodeURIComponent(query)}`,
  workday: ({ query }) => `https://www.google.com/search?q=${encodeURIComponent(`site:myworkdayjobs.com ${query}`)}`,
  careers: ({ query }) => `https://www.google.com/search?q=${encodeURIComponent(`careers ${query}`)}`,
}

export { supportedSources }

export function discoveryPlan(query, location, sources = supportedSources) {
  return sources.map((source) => ({ source, searchUrl: searchUrls[source]({ query, location }), note: source === 'workday' ? 'Workday is employer-specific; use the URL to find the company career site.' : 'Import relevant results with ingest_job for scoring and drafting.' }))
}

export function listJobs() {
  return [...readJson('jobs.sample.json', []), ...readJson('jobs.local.json', [])]
}

export function ingestJob(job) {
  const jobs = readJson('jobs.local.json', [])
  const stored = { id: job.id || randomUUID(), createdAt: new Date().toISOString(), ...job }
  const index = jobs.findIndex((item) => item.id === stored.id || item.url === stored.url)
  if (index >= 0) jobs[index] = { ...jobs[index], ...stored }
  else jobs.push(stored)
  writeLocalJson('jobs.local.json', jobs)
  return stored
}

export function getJob(id) {
  return listJobs().find((job) => job.id === id) || null
}
