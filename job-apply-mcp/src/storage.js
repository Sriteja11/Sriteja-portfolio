import { createCipheriv, createDecipheriv, randomBytes, timingSafeEqual } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataPath = (...parts) => resolve(root, 'data', ...parts)

export function readJson(fileName, fallback) {
  const path = dataPath(fileName)
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : fallback
}

export function writeLocalJson(fileName, value) {
  writeFileSync(dataPath(fileName), `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 })
}

function keyFromEnvironment() {
  const key = process.env.PRIVATE_PROFILE_ENCRYPTION_KEY
  if (!key || !/^[a-f0-9]{64}$/i.test(key)) throw new Error('PRIVATE_PROFILE_ENCRYPTION_KEY must be 64 hexadecimal characters.')
  return Buffer.from(key, 'hex')
}

export function encryptPrivateProfile(profile) {
  const key = keyFromEnvironment()
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(profile), 'utf8'), cipher.final()])
  const payload = { v: 1, iv: iv.toString('base64'), tag: cipher.getAuthTag().toString('base64'), ciphertext: ciphertext.toString('base64') }
  writeFileSync(dataPath('private-profile.json.enc'), JSON.stringify(payload), { mode: 0o600 })
}

export function readPrivateProfile(accessKey) {
  const expected = process.env.PRIVATE_PROFILE_ACCESS_KEY
  if (!expected || !accessKey) throw new Error('Private profile access is not configured or authorized.')
  const supplied = Buffer.from(accessKey)
  const expectedBuffer = Buffer.from(expected)
  if (supplied.length !== expectedBuffer.length || !timingSafeEqual(supplied, expectedBuffer)) throw new Error('Private profile access was denied.')
  const path = dataPath('private-profile.json.enc')
  if (!existsSync(path)) throw new Error('No encrypted private profile exists. Run npm run encrypt-profile after creating private-profile.json locally.')
  const payload = JSON.parse(readFileSync(path, 'utf8'))
  const decipher = createDecipheriv('aes-256-gcm', keyFromEnvironment(), Buffer.from(payload.iv, 'base64'))
  decipher.setAuthTag(Buffer.from(payload.tag, 'base64'))
  return JSON.parse(Buffer.concat([decipher.update(Buffer.from(payload.ciphertext, 'base64')), decipher.final()]).toString('utf8'))
}

export { dataPath }
