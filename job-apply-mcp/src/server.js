import { McpServer } from '@modelcontextprotocol/server'
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio'
import { z } from 'zod'
import { createDraft, approveDraft, composeEmail, listDrafts, scoreJob } from './application.js'
import { discoveryPlan, getJob, ingestJob, listJobs, supportedSources } from './jobs.js'
import { readJson, readPrivateProfile } from './storage.js'

const server = new McpServer(
  { name: 'job-apply-profile', version: '0.1.0' },
  { instructions: 'Use public profile data for role discovery and drafting. Do not request private data unless it is required for a specific form. Never submit an application: create an awaiting_review draft, then wait for an external approval workflow to call approve_application.' },
)

const result = (data) => ({ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }], structuredContent: data })
const failure = (error) => ({ content: [{ type: 'text', text: error instanceof Error ? error.message : String(error) }], isError: true })
const publicProfile = () => readJson('profile.public.json', {})
const selected = (record, fields) => fields?.length ? Object.fromEntries(fields.filter((field) => field in record).map((field) => [field, record[field]])) : record

server.registerTool('get_public_profile', {
  title: 'Get public application profile',
  description: 'Returns only non-sensitive profile data for role matching, resume tailoring, and drafting.',
  inputSchema: z.object({ fields: z.array(z.enum(['fullName', 'headline', 'location', 'email', 'phone', 'linkedinUrl', 'portfolioUrl', 'noticePeriod', 'currentCtc', 'professionalSummary', 'skills', 'experienceHighlights', 'education'])).optional() }),
}, async ({ fields }) => result(selected(publicProfile(), fields)))

server.registerTool('get_private_profile', {
  title: 'Get protected profile fields',
  description: 'Reads explicitly requested protected fields from the encrypted local vault after key verification. PAN is intentionally never returned in full; only panLast4 or a document reference may be stored.',
  inputSchema: z.object({ accessKey: z.string().min(16), fields: z.array(z.enum(['address', 'dateOfBirth', 'workAuthorization', 'salaryExpectation', 'panLast4', 'panDocumentReference'])).min(1) }),
}, async ({ accessKey, fields }) => {
  try { return result(selected(readPrivateProfile(accessKey), fields)) } catch (error) { return failure(error) }
})

server.registerTool('discover_roles', {
  title: 'Discover roles across job boards',
  description: 'Returns safe, platform-specific search URLs for LinkedIn, Naukri, Indeed, Wellfound, Workday, and careers sites. Import a real listing before scoring or drafting.',
  inputSchema: z.object({ query: z.string().min(2), location: z.string().optional(), sources: z.array(z.enum(supportedSources)).min(1).optional() }),
}, async ({ query, location, sources }) => result({ query, location, searches: discoveryPlan(query, location, sources) }))

server.registerTool('ingest_job', {
  title: 'Ingest a job listing',
  description: 'Normalizes a job listing found by an agent or job-board adapter and saves it to the local-only job store.',
  inputSchema: z.object({ id: z.string().optional(), source: z.enum(supportedSources), url: z.url(), title: z.string().min(2), company: z.string().min(2), location: z.string().optional(), description: z.string().min(30), applyEmail: z.email().optional() }),
}, async (job) => result(ingestJob(job)))

server.registerTool('list_jobs', {
  title: 'List imported job listings',
  description: 'Lists sample and locally imported jobs available for scoring or drafting.',
  inputSchema: z.object({}),
}, async () => result({ jobs: listJobs() }))

server.registerTool('score_role_fit', {
  title: 'Score role fit transparently',
  description: 'Compares the public skills profile to an imported listing. This is a transparent keyword signal, not a hiring decision or prediction.',
  inputSchema: z.object({ jobId: z.string().min(1) }),
}, async ({ jobId }) => {
  const job = getJob(jobId)
  return job ? result({ job, ...scoreJob(publicProfile(), job) }) : failure(new Error('Job was not found.'))
})

server.registerTool('prepare_application_draft', {
  title: 'Prepare reviewed application draft',
  description: 'Creates a tailored resume brief, cover-letter draft, and form-answer checklist. The result is always awaiting_review and cannot submit anything.',
  inputSchema: z.object({ jobId: z.string().min(1), workAuthorization: z.string().optional() }),
}, async ({ jobId, workAuthorization }) => {
  try { return result(createDraft(publicProfile(), jobId, { workAuthorization })) } catch (error) { return failure(error) }
})

server.registerTool('compose_application_email', {
  title: 'Compose application email',
  description: 'Creates an editable email draft for a listing. It does not send email.',
  inputSchema: z.object({ jobId: z.string().min(1) }),
}, async ({ jobId }) => {
  try { return result(composeEmail(publicProfile(), jobId)) } catch (error) { return failure(error) }
})

server.registerTool('list_application_drafts', {
  title: 'List application drafts',
  description: 'Lists local application drafts and their review state.',
  inputSchema: z.object({}),
}, async () => result({ applications: listDrafts() }))

server.registerTool('approve_application', {
  title: 'Record external approval',
  description: 'Marks an awaiting_review draft approved_for_submission after a future WhatsApp, Telegram, or Google Chat approval relay verifies the approval key. This does not submit anything.',
  inputSchema: z.object({ applicationId: z.string().uuid(), approvalKey: z.string().min(16) }),
}, async ({ applicationId, approvalKey }) => {
  try { return result(approveDraft(applicationId, approvalKey)) } catch (error) { return failure(error) }
})

await server.connect(new StdioServerTransport())
