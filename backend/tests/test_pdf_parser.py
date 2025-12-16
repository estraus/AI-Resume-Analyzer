import pytest
from app.pdf_parser import extract_text_from_pdf

def test_extract_text_from_pdf_invalid():
    """Test that invalid PDF raises ValueError."""
    with pytest.raises(ValueError, match="Failed to parse PDF"):
        extract_text_from_pdf(b"not a pdf")

def test_extract_text_from_pdf_empty():
    """Test that empty bytes raises ValueError."""
    with pytest.raises(ValueError):
        extract_text_from_pdf(b"")
