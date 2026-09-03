import os
import unittest
from src.application import score_job, create_draft, approve_draft
from src.storage import encrypt_private_profile, read_private_profile

class TestApplication(unittest.TestCase):
    def test_score_job(self):
        profile = {"skills": ["Python", "Vertex AI", "RAG"]}
        job = {
            "id": "test-1",
            "title": "AI Engineer",
            "description": "Build Python RAG services on Vertex AI.",
        }
        score = score_job(profile, job)
        self.assertEqual(score["matchedSkills"], ["Python", "Vertex AI", "RAG"])
        self.assertEqual(score["score"], 100)
        self.assertIn("not a hiring prediction", score["rationale"])

    def test_encryption_roundtrip(self):
        key_hex = "a" * 64
        access_key = "secret-access-key-1234"
        os.environ["PRIVATE_PROFILE_ENCRYPTION_KEY"] = key_hex
        os.environ["PRIVATE_PROFILE_ACCESS_KEY"] = access_key

        sample_profile = {
            "address": "123 Street",
            "panLast4": "4321",
            "salaryExpectation": "20 LPA"
        }
        encrypt_private_profile(sample_profile)
        decrypted = read_private_profile(access_key)
        self.assertEqual(decrypted["panLast4"], "4321")
        self.assertEqual(decrypted["address"], "123 Street")

        with self.assertRaises(PermissionError):
            read_private_profile("wrong-key")

    def test_draft_lifecycle_and_approval(self):
        os.environ["APPLICATION_APPROVAL_KEY"] = "my-approval-key-1234"
        profile = {
            "fullName": "Test User",
            "skills": ["Python"],
            "professionalSummary": "Experienced Engineer"
        }
        draft_result = create_draft(profile, "example-ai-engineer")
        draft_id = draft_result["draft"]["id"]
        self.assertEqual(draft_result["draft"]["status"], "awaiting_review")

        with self.assertRaises(PermissionError):
            approve_draft(draft_id, "invalid-key")

        approved = approve_draft(draft_id, "my-approval-key-1234")
        self.assertEqual(approved["status"], "approved_for_submission")

if __name__ == "__main__":
    unittest.main()
