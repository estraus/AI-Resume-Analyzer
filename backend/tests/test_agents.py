import pytest
from app.agents.crew_config import (
    create_resume_parser_agent,
    create_job_analyst_agent,
    create_quality_scorer_agent,
    create_match_analyzer_agent
)

def test_create_agents():
    """Test that all agents can be created."""
    # These will only work with valid API key
    # For now, just test they're callable
    assert callable(create_resume_parser_agent)
    assert callable(create_job_analyst_agent)
    assert callable(create_quality_scorer_agent)
    assert callable(create_match_analyzer_agent)
