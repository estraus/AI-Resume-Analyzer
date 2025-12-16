import pytest
from app.job_scraper import scrape_job_posting

def test_scrape_job_posting():
    """Test basic job posting scraping."""
    # Use a simple test URL
    result = scrape_job_posting("https://example.com")
    assert isinstance(result, str)
    assert len(result) > 0
