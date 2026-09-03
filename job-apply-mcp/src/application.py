import os
import re
import uuid
import hmac
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from .jobs import get_job
from .storage import read_json, write_local_json

def _words(text: str = "") -> set[str]:
    return set(re.findall(r"[a-z0-9+#.]{2,}", text.lower()))

def score_job(profile: Dict[str, Any], job: Dict[str, Any]) -> Dict[str, Any]:
    job_text = f"{job.get('title', '')} {job.get('description', '')}"
    job_words = _words(job_text)
    skills = profile.get("skills") or []
    job_desc_lower = job.get("description", "").lower()
    
    matched_skills = [
        skill for skill in skills
        if skill.lower() in job_words or skill.lower() in job_desc_lower
    ]
    total_skills = max(len(skills), 1)
    normalized = min(100, round((len(matched_skills) / total_skills) * 100 * 2.5))
    
    missing_keywords = [
        word for word in job_words
        if len(word) > 3 and not any(skill.lower() in word for skill in matched_skills)
    ][:12]
    
    return {
        "score": normalized,
        "matchedSkills": matched_skills,
        "missingKeywords": missing_keywords,
        "rationale": f"Matched {len(matched_skills)} of {len(skills)} declared skills. Score is a transparent keyword signal, not a hiring prediction."
    }

def create_draft(profile: Dict[str, Any], job_id: str, preferences: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    preferences = preferences or {}
    job = get_job(job_id)
    if not job:
        raise ValueError(f"Job {job_id} was not found. Ingest it before creating a draft.")
    
    fit = score_job(profile, job)
    highlights = (profile.get("experienceHighlights") or [])[:4]
    
    matched_text = ", ".join(fit["matchedSkills"]) or "the skills described in my profile"
    highlights_text = " ".join(highlights)
    
    cover_letter = (
        f"Dear Hiring Team,\n\n"
        f"I am interested in the {job.get('title', '')} role at {job.get('company', '')}. "
        f"{profile.get('professionalSummary') or 'My experience is aligned with building reliable AI and software systems.'}\n\n"
        f"Relevant strengths include {matched_text}. {highlights_text}\n\n"
        f"I would welcome the opportunity to discuss how I can contribute to your team.\n\n"
        f"Sincerely,\n"
        f"{profile.get('fullName') or '[Your name]'}"
    )
    
    draft = {
        "id": str(uuid.uuid4()),
        "jobId": job_id,
        "status": "awaiting_review",
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "resumeTailoring": {
            "includeSkills": fit["matchedSkills"],
            "includeHighlights": highlights,
            "missingKeywordsToValidate": fit["missingKeywords"],
        },
        "coverLetter": cover_letter,
        "applicationAnswers": {
            "noticePeriod": profile.get("noticePeriod") or "Confirm before submission",
            "currentCtc": profile.get("currentCtc") or "Confirm before submission",
            "workAuthorization": preferences.get("workAuthorization") or "Confirm before submission",
        },
    }
    
    drafts = read_json("applications.local.json", [])
    drafts.append(draft)
    write_local_json("applications.local.json", drafts)
    return {"job": job, "draft": draft, "fit": fit}

def list_drafts() -> List[Dict[str, Any]]:
    return read_json("applications.local.json", [])

def approve_draft(application_id: str, approval_key: str) -> Dict[str, Any]:
    expected = os.getenv("APPLICATION_APPROVAL_KEY", "").strip()
    if not expected or not hmac.compare_digest(approval_key.encode("utf-8"), expected.encode("utf-8")):
        raise PermissionError("Approval key is invalid.")
    
    drafts = list_drafts()
    draft = next((d for d in drafts if d.get("id") == application_id), None)
    if not draft:
        raise ValueError("Application draft was not found.")
    if draft.get("status") != "awaiting_review":
        raise ValueError(f"Application is already {draft.get('status')}.")
    
    draft["status"] = "approved_for_submission"
    draft["approvedAt"] = datetime.now(timezone.utc).isoformat()
    write_local_json("applications.local.json", drafts)
    return draft

def compose_email(profile: Dict[str, Any], job_id: str) -> Dict[str, Any]:
    job = get_job(job_id)
    if not job:
        raise ValueError("Job was not found.")
    
    return {
        "to": job.get("applyEmail") or "",
        "subject": f"Application: {job.get('title', '')} - {profile.get('fullName') or '[Your name]'}",
        "body": (
            f"Hello,\n\n"
            f"I am writing to apply for the {job.get('title', '')} role at {job.get('company', '')}. "
            f"{profile.get('professionalSummary') or ''}\n\n"
            f"I have attached my resume and would welcome a conversation.\n\n"
            f"Best,\n"
            f"{profile.get('fullName') or ''}"
        ),
        "requiresHumanReview": True,
    }
