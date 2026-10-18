---
name: apply-ai-jobs
description: Search, open company career portals in the browser, and apply to AI engineering roles using details from the sriteja-info skill.
---

# Apply to AI engineering roles

Use this skill to navigate company career sites, search for relevant AI and software roles, open browser tabs in batches, and fill application forms using the `sriteja-info` skill.

## Target job titles

Look for open positions matching any of the following titles:
- AI Engineer
- Senior AI Engineer
- Applied AI Engineer
- Forward Deployed Engineer (or Forward Deployed AI Engineer)
- Gen AI Engineer
- ML/AI Engineer
- Software Engineer - AI
- SDE - Gen AI

Filter for mid-level to senior roles matching 4+ years of production experience in agent systems, RAG, and cloud backends.

## Credentials and sources

- Account email: `sritejavalaboju000@gmail.com`
- Account password: `AppliedAI@2026`
- Candidate data source: Read the `sriteja-info` skill (`~/.agents/skills/sriteja-info/SKILL.md`) for all profile data, resume bullets, work history, and disclosures.
- Resume file on disk: `C:\Users\srite\Downloads\Sriteja_Valaboju_Resume.docx`

## Execution flow

### 1. Batch company portals
Accept the company list from the user. Work through the list in batches of 5 companies at a time:
- Open each company career page or ATS link in a separate browser tab.
- Common ATS patterns to check:
  - Workday: `https://<company>.wd3.myworkdayjobs.com/`
  - Greenhouse: `https://boards.greenhouse.io/<company>`
  - Lever: `https://jobs.lever.co/<company>`
  - Ashby: `https://jobs.ashbyhq.com/<company>`
- Keep tabs grouped to avoid exhausting memory.

### 2. Search and filter positions
For each opened tab:
- Search for the target titles listed above.
- Check location: prioritize Bengaluru, India, Remote, or roles that state visa sponsorship is provided.
- If multiple relevant positions exist at the same company, pick the top 1 or 2 best matches based on agent systems, RAG, and LLMOps requirements.
- If no matching roles exist, note it in the session log and close the tab.

### 3. Handle account creation
When the portal requires an account (typical on Workday):
- Click "Create Account" or "Sign In".
- Use `sritejavalaboju000@gmail.com` as the email address.
- Use `AppliedAI@2026` as the password.
- Accept terms of service if presented.

### 4. Fill application fields
Pull every field directly from `sriteja-info`:

- **Resume**: Upload `C:\Users\srite\Downloads\Sriteja_Valaboju_Resume.docx`. If the ATS auto-parses the document, verify the parsed values against the `sriteja-info` data.
- **Personal details**:
  - First name: Sriteja
  - Last name: Valaboju
  - Phone: +91 934-649-3360
  - Location: Bengaluru, Karnataka, India
  - Links: Portfolio, LinkedIn, and GitHub URLs from `sriteja-info`.
- **Work history**:
  - Current employer: Airbus Group India Pvt Ltd.
  - Current role: Software Engineer - AI (April 2025 to Present).
  - Previous role: Associate Software Engineer at Airbus Group India Pvt Ltd. (August 2022 to March 2025).
  - Note: Sriteja has worked only at Airbus throughout his career.
- **Education**:
  - Institution: Chaitanya Institute of Technology and Science, Hanamkonda.
  - Degree: Bachelor of Technology in Computer Science Engineering (August 2018 to June 2022, CGPA: 8.07).
- **Mandatory compliance questions**:
  - Military veteran: No / Not a veteran.
  - Race and ethnicity: Asian (Indian).
  - Gender: Male.
  - Disability: No disability.
  - Former employee at target company: No.
  - Non-compete agreements: No. State that there are no agreements with Airbus restricting employment.
  - Notice period: 30 days.
  - Work authorization: Authorized in India; requires visa sponsorship for roles outside India.

### 5. Review before submission
- Stop at the final review page before clicking "Submit Application".
- Present a concise summary of the filled fields to the user.
- If the user explicitly asks for end-to-end submission, submit and record the confirmation number or URL.

### 6. Progress reporting
After finishing a batch of 5:
- Report the status for each company (applied, drafted, or no matching roles found).
- Confirm with the user before proceeding to the next batch.
