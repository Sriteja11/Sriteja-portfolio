import assert from 'node:assert/strict'
import test from 'node:test'
import { scoreJob } from '../src/application.js'

test('scoreJob identifies declared skills in a listing without making a hiring prediction', () => {
  const score = scoreJob({ skills: ['Python', 'Vertex AI', 'RAG'] }, { title: 'AI Engineer', description: 'Build Python RAG services on Vertex AI.' })
  assert.deepEqual(score.matchedSkills, ['Python', 'Vertex AI', 'RAG'])
  assert.equal(score.score, 100)
  assert.match(score.rationale, /not a hiring prediction/)
})
