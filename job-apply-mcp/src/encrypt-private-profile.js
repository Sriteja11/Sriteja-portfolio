import { existsSync, readFileSync, unlinkSync } from 'node:fs'
import { dataPath, encryptPrivateProfile } from './storage.js'

const input = dataPath('private-profile.json')
if (!existsSync(input)) throw new Error('Create data/private-profile.json locally from the README template before encrypting it.')
encryptPrivateProfile(JSON.parse(readFileSync(input, 'utf8')))
unlinkSync(input)
