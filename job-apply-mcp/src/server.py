import os
import json
from typing import List, Optional, Dict, Any
from mcp.server.mcpserver import MCPServer
from .application import (
    score_job,
    create_draft,
    list_drafts,
    approve_draft,
    compose_email,
)
from .jobs import (
    discovery_plan,
    ingest_job,
    list_jobs,
    get_job,
    SUPPORTED_SOURCES,
)
from .storage import (
    read_json,
    read_private_profile,
)

mcp = MCPServer(
    "job-apply-profile",
    instructions=(
        "Use public profile data for role discovery and drafting. Do not request private data "
        "unless it is required for a specific form. Never submit an application: create an "
        "awaiting_review draft, then wait for an external approval workflow to call approve_application."
    )
)

def _public_profile() -> Dict[str, Any]:
    local = read_json("profile.local.json", None)
    if local is not None:
        return local
    return read_json("profile.public.json", {})

def _select_fields(record: Dict[str, Any], fields: Optional[List[str]] = None) -> Dict[str, Any]:
    if not fields:
        return record
    return {k: v for k, v in record.items() if k in fields}

@mcp.tool()
def get_public_profile(fields: Optional[List[str]] = None) -> Dict[str, Any]:
    """Returns only non-sensitive profile data for role matching, resume tailoring, and drafting."""
    return _select_fields(_public_profile(), fields)

@mcp.tool()
def get_private_profile(access_key: str, fields: List[str]) -> Dict[str, Any]:
    """Reads explicitly requested protected fields from the encrypted local vault after key verification."""
    data = read_private_profile(access_key)
    return _select_fields(data, fields)

@mcp.tool()
def discover_roles(query: str, location: Optional[str] = None, sources: Optional[List[str]] = None) -> Dict[str, Any]:
    """Returns safe, platform-specific search URLs for LinkedIn, Naukri, Indeed, Wellfound, Workday, and careers sites."""
    return {
        "query": query,
        "location": location,
        "searches": discovery_plan(query, location, sources),
    }

@mcp.tool()
def ingest_job(
    source: str,
    url: str,
    title: str,
    company: str,
    description: str,
    id: Optional[str] = None,
    location: Optional[str] = None,
    apply_email: Optional[str] = None,
) -> Dict[str, Any]:
    """Normalizes a job listing found by an agent or job-board adapter and saves it to the local-only job store."""
    payload = {
        "source": source,
        "url": url,
        "title": title,
        "company": company,
        "description": description,
    }
    if id:
        payload["id"] = id
    if location:
        payload["location"] = location
    if apply_email:
        payload["applyEmail"] = apply_email
    return ingest_job(payload)

@mcp.tool()
def list_available_jobs() -> Dict[str, Any]:
    """Lists sample and locally imported jobs available for scoring or drafting."""
    return {"jobs": list_jobs()}

@mcp.tool()
def score_role_fit(job_id: str) -> Dict[str, Any]:
    """Compares the public skills profile to an imported listing. Transparent keyword signal."""
    job = get_job(job_id)
    if not job:
        raise ValueError(f"Job {job_id} was not found.")
    score_result = score_job(_public_profile(), job)
    return {"job": job, **score_result}

@mcp.tool()
def prepare_application_draft(job_id: str, work_authorization: Optional[str] = None) -> Dict[str, Any]:
    """Creates a tailored resume brief, cover-letter draft, and checklist. Always awaiting_review."""
    prefs = {}
    if work_authorization:
        prefs["workAuthorization"] = work_authorization
    return create_draft(_public_profile(), job_id, prefs)

@mcp.tool()
def compose_application_email(job_id: str) -> Dict[str, Any]:
    """Creates an editable email draft for a listing. It does not send email."""
    return compose_email(_public_profile(), job_id)

@mcp.tool()
def list_application_drafts() -> Dict[str, Any]:
    """Lists local application drafts and their review state."""
    return {"applications": list_drafts()}

@mcp.tool()
def approve_application(application_id: str, approval_key: str) -> Dict[str, Any]:
    """Marks an awaiting_review draft approved_for_submission after key verification."""
    return approve_draft(application_id, approval_key)

def main():
    mcp.run()

if __name__ == "__main__":
    main()
