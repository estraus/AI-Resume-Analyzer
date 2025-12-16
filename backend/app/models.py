from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Literal

class AnalysisRequest(BaseModel):
    """Request model for resume analysis."""
    resume_filename: str
    resume_content: str  # base64 encoded
    job_url: str

class KeywordAnalysis(BaseModel):
    """Keyword matching analysis."""
    matched_keywords: List[str] = []
    missing_keywords: List[str] = []
    match_percentage: float = 0.0

class QualityFeedback(BaseModel):
    """Resume quality feedback item."""
    category: str
    score: float
    feedback: str
    suggestions: List[str] = []

class MatchAnalysis(BaseModel):
    """Job match analysis results."""
    match_score: float
    keyword_analysis: KeywordAnalysis
    skills_gap: List[str] = []
    strengths: List[str] = []
    improvement_areas: List[str] = []

class AnalysisResult(BaseModel):
    """Complete analysis result."""
    analysis_id: str
    resume_quality_score: float
    job_match_score: float
    quality_feedback: List[QualityFeedback] = []
    match_analysis: MatchAnalysis
    agent_logs: List[str] = []

class AgentUpdate(BaseModel):
    """Real-time agent status update."""
    agent_name: str
    status: Literal["working", "completed", "error"]
    message: str
    progress: int = Field(ge=0, le=100)
    reasoning: Optional[str] = None
