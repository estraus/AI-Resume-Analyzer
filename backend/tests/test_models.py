import pytest
from app.models import AnalysisRequest, AnalysisResult, AgentUpdate

def test_analysis_request_validation():
    """Test AnalysisRequest model validation."""
    request = AnalysisRequest(
        resume_filename="resume.pdf",
        resume_content="base64_content_here",
        job_url="https://example.com/job"
    )
    assert request.resume_filename == "resume.pdf"
    assert request.job_url == "https://example.com/job"

def test_agent_update_creation():
    """Test AgentUpdate model."""
    update = AgentUpdate(
        agent_name="Resume Parser",
        status="working",
        message="Parsing resume...",
        progress=25
    )
    assert update.agent_name == "Resume Parser"
    assert update.progress == 25
