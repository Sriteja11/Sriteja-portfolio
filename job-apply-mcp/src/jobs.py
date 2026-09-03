import os
import uuid
import urllib.parse
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from .storage import read_json, write_local_json

SUPPORTED_SOURCES = ["linkedin", "naukri", "indeed", "wellfound", "workday", "careers"]

def build_search_url(source: str, query: str, location: Optional[str] = None) -> str:
    loc = location or ""
    if source == "linkedin":
        return f"https://www.linkedin.com/jobs/search/?keywords={urllib.parse.quote(query)}&location={urllib.parse.quote(loc)}"
    elif source == "naukri":
        q_slug = urllib.parse.quote(query).replace("%20", "-")
        l_slug = urllib.parse.quote(loc or "india").replace("%20", "-")
        return f"https://www.naukri.com/{q_slug}-jobs-in-{l_slug}"
    elif source == "indeed":
        return f"https://in.indeed.com/jobs?q={urllib.parse.quote(query)}&l={urllib.parse.quote(loc)}"
    elif source == "wellfound":
        return f"https://wellfound.com/jobs?query={urllib.parse.quote(query)}"
    elif source == "workday":
        return f"https://www.google.com/search?q={urllib.parse.quote(f'site:myworkdayjobs.com {query}')}"
    elif source == "careers":
        return f"https://www.google.com/search?q={urllib.parse.quote(f'careers {query}')}"
    return ""

def discovery_plan(query: str, location: Optional[str] = None, sources: Optional[List[str]] = None) -> List[Dict[str, str]]:
    selected_sources = sources or SUPPORTED_SOURCES
    results = []
    for source in selected_sources:
        note = "Workday is employer-specific; use the URL to find the company career site." if source == "workday" else "Import relevant results with ingest_job for scoring and drafting."
        results.append({
            "source": source,
            "searchUrl": build_search_url(source, query, location),
            "note": note
        })
    return results

def list_jobs() -> List[Dict[str, Any]]:
    samples = read_json("jobs.sample.json", [])
    locals_ = read_json("jobs.local.json", [])
    return samples + locals_

def ingest_job(job: Dict[str, Any]) -> Dict[str, Any]:
    jobs = read_json("jobs.local.json", [])
    stored = {
        "id": job.get("id") or str(uuid.uuid4()),
        "createdAt": datetime.now(timezone.utc).isoformat(),
        **job
    }
    index = next((i for i, item in enumerate(jobs) if item.get("id") == stored["id"] or item.get("url") == stored.get("url")), -1)
    if index >= 0:
        jobs[index].update(stored)
    else:
        jobs.append(stored)
    write_local_json("jobs.local.json", jobs)
    return stored

def get_job(job_id: str) -> Optional[Dict[str, Any]]:
    for job in list_jobs():
        if job.get("id") == job_id:
            return job
    return None
