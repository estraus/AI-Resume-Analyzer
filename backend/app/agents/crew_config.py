from crewai import Agent, Task, Crew
from langchain_anthropic import ChatAnthropic
import os

def get_llm():
    """Get configured Claude LLM instance."""
    return ChatAnthropic(
        model="claude-sonnet-4-20250514",
        anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"),
        temperature=0.1
    )

def create_resume_parser_agent() -> Agent:
    """Create agent for parsing resume content."""
    return Agent(
        role="Expert Resume Analyst",
        goal="Extract and structure all resume information accurately",
        backstory="""You are an expert at analyzing resumes. You can identify
        all sections, extract skills, experience, education, and assess formatting
        quality. You understand ATS systems and what makes resumes parseable.""",
        llm=get_llm(),
        verbose=True
    )

def create_job_analyst_agent() -> Agent:
    """Create agent for analyzing job postings."""
    return Agent(
        role="Job Requirements Specialist",
        goal="Extract and analyze job posting requirements comprehensively",
        backstory="""You are an expert at analyzing job postings. You can identify
        required vs preferred skills, experience levels, key responsibilities,
        and company culture signals from job descriptions.""",
        llm=get_llm(),
        verbose=True
    )

def create_quality_scorer_agent() -> Agent:
    """Create agent for scoring resume quality."""
    return Agent(
        role="Career Coach and Resume Critic",
        goal="Evaluate resume quality and provide actionable improvement suggestions",
        backstory="""You are a career coach with 15 years of experience. You know
        what makes resumes effective: quantified achievements, clear impact statements,
        proper formatting, ATS optimization, and professional language.""",
        llm=get_llm(),
        verbose=True
    )

def create_match_analyzer_agent() -> Agent:
    """Create agent for matching resume to job."""
    return Agent(
        role="Talent Matching Specialist",
        goal="Analyze how well a resume matches specific job requirements",
        backstory="""You are an expert recruiter who can quickly assess candidate-job
        fit. You identify keyword matches, skills gaps, experience alignment, and
        provide specific recommendations for tailoring applications.""",
        llm=get_llm(),
        verbose=True
    )
