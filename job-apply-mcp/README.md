# Job Apply Profile MCP

A local Model Context Protocol server that gives an AI agent structured access to a job-search profile, job listings, fit scoring, application drafts, and email drafts.

It supports discovery plans for LinkedIn, Naukri, Indeed, Wellfound, Workday, and employer careers sites. The server does not scrape sites, store site passwords, or submit applications. A later adapter/agent can ingest listings from these sites and, only after an out-of-band approval, perform a submission.

## Security model

- `profile.public.json` contains data safe for normal job-search and drafting tools.
- `private-profile.json.enc` is AES-256-GCM encrypted, gitignored, and only read by `get_private_profile` when an access key is supplied.
- Do not store a full PAN in this MCP. Store `panLast4` and, if needed, a secure external `panDocumentReference`. Most applications should never request it.
- `prepare_application_draft` always creates `awaiting_review`; this MCP has no submit tool.
- `approve_application` only records an approval. The approval relay (WhatsApp/Telegram/Google Chat) can be added later and should hold `APPLICATION_APPROVAL_KEY` itself.

## Setup

```powershell
cd job-apply-mcp
Copy-Item .env.example .env
npm install
```

Fill `data/profile.public.json`. For protected fields create this local-only file:

```json
{
  "address": "...",
  "workAuthorization": "...",
  "salaryExpectation": "...",
  "panLast4": "1234",
  "panDocumentReference": "vault://your-secure-document-reference"
}
```

Then encrypt and delete the plaintext automatically:

```powershell
npm run encrypt-profile
npm start
```

## Codex MCP configuration

Add this server to your MCP client configuration after installing dependencies:

```json
{
  "mcpServers": {
    "job-apply-profile": {
      "command": "node",
      "args": ["C:/Users/srite/Code/Sriteja-portfolio/job-apply-mcp/src/server.js"],
      "env": {
        "PRIVATE_PROFILE_ACCESS_KEY": "...",
        "PRIVATE_PROFILE_ENCRYPTION_KEY": "...",
        "APPLICATION_APPROVAL_KEY": "..."
      }
    }
  }
}
```

## Tool flow

1. `discover_roles` returns search URLs for supported sites.
2. An agent or a later board adapter calls `ingest_job` with a real listing.
3. `score_role_fit` provides a transparent skills match.
4. `prepare_application_draft` and `compose_application_email` create reviewable text.
5. An approval relay can call `approve_application`; a future, separate submit adapter must check `approved_for_submission` first.

Run tests with `npm test`.
