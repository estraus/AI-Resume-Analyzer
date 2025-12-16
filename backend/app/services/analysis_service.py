from crewai import Task, Crew
from app.agents.crew_config import (
    create_resume_parser_agent,
    create_job_analyst_agent,
    create_quality_scorer_agent,
    create_match_analyzer_agent
)
from app.models import AnalysisResult, KeywordAnalysis, MatchAnalysis, QualityFeedback
from typing import Callable, Optional
import uuid
import json

class AnalysisService:
    """Service for orchestrating resume analysis with AI agents."""

    def __init__(self, progress_callback: Optional[Callable] = None):
        """
        Initialize analysis service.

        Args:
            progress_callback: Optional callback for progress updates
        """
        self.progress_callback = progress_callback

    async def analyze_resume(
        self,
        resume_text: str,
        job_description: str
    ) -> AnalysisResult:
        """
        Analyze resume against job description using AI agents.

        Args:
            resume_text: Extracted resume text
            job_description: Job posting text

        Returns:
            Complete analysis result
        """
        analysis_id = str(uuid.uuid4())

        # Create agents
        resume_parser = create_resume_parser_agent()
        job_analyst = create_job_analyst_agent()
        quality_scorer = create_quality_scorer_agent()
        match_analyzer = create_match_analyzer_agent()

        # Task 1: Parse Resume
        if self.progress_callback:
            await self.progress_callback("Resume Parser Agent", "working",
                                        "Extracting resume structure and content...", 25)

        parse_task = Task(
            description=f"""Analyze this resume and extract:
            1. Contact information
            2. Work experience (companies, roles, dates, achievements)
            3. Education (degrees, institutions, dates)
            4. Skills (technical and soft skills)
            5. Certifications and awards

            Resume:
            {resume_text}

            Return as structured JSON with these exact keys: contact, experience, education, skills, certifications.
            """,
            agent=resume_parser,
            expected_output="Structured JSON with resume data"
        )

        # Task 2: Analyze Job Posting
        if self.progress_callback:
            await self.progress_callback("Job Analyst Agent", "working",
                                        "Analyzing job requirements...", 40)

        job_task = Task(
            description=f"""Analyze this job posting and extract:
            1. Required skills and qualifications
            2. Preferred/nice-to-have skills
            3. Experience level required
            4. Key responsibilities
            5. Important keywords

            Job Description:
            {job_description}

            Return as structured JSON with these exact keys: required_skills, preferred_skills, experience_level, responsibilities, keywords.
            """,
            agent=job_analyst,
            expected_output="Structured JSON with job requirements"
        )

        # Task 3: Score Resume Quality
        if self.progress_callback:
            await self.progress_callback("Quality Scorer Agent", "working",
                                        "Evaluating resume quality...", 65)

        quality_task = Task(
            description=f"""Evaluate this resume's quality on a 0-100 scale. Consider:
            1. Formatting and readability (0-20 points)
            2. Use of quantified achievements (0-20 points)
            3. Clarity and impact of descriptions (0-20 points)
            4. Professional language and grammar (0-20 points)
            5. ATS optimization (0-20 points)

            Resume:
            {resume_text}

            Return JSON with: overall_score (0-100), category_scores (dict), feedback (list of improvement suggestions).
            """,
            agent=quality_scorer,
            expected_output="JSON with quality score and detailed feedback"
        )

        # Task 4: Match Analysis
        if self.progress_callback:
            await self.progress_callback("Match Analyzer Agent", "working",
                                        "Comparing resume to job requirements...", 85)

        match_task = Task(
            description=f"""Compare the resume to the job requirements and provide:
            1. Overall match score (0-100)
            2. Matched keywords (list)
            3. Missing keywords (list)
            4. Skills gap (what's missing)
            5. Strengths (what matches well)
            6. Tailoring suggestions

            Resume: {resume_text}

            Job Requirements: {job_description}

            Return JSON with: match_score, matched_keywords, missing_keywords, skills_gap, strengths, suggestions.
            """,
            agent=match_analyzer,
            expected_output="JSON with match analysis"
        )

        # Create and run crew
        crew = Crew(
            agents=[resume_parser, job_analyst, quality_scorer, match_analyzer],
            tasks=[parse_task, job_task, quality_task, match_task],
            verbose=True
        )

        result = crew.kickoff()

        # Parse results (simplified for now - in production would parse task outputs)
        # For MVP, return mock structured data
        quality_score = 75.0  # Will be parsed from quality_task output
        match_score = 82.0    # Will be parsed from match_task output

        if self.progress_callback:
            await self.progress_callback("Analysis Complete", "completed",
                                        "All agents finished successfully!", 100)

        return AnalysisResult(
            analysis_id=analysis_id,
            resume_quality_score=quality_score,
            job_match_score=match_score,
            quality_feedback=[
                QualityFeedback(
                    category="Formatting",
                    score=80.0,
                    feedback="Resume formatting is clean and professional",
                    suggestions=["Consider using a more modern template"]
                )
            ],
            match_analysis=MatchAnalysis(
                match_score=match_score,
                keyword_analysis=KeywordAnalysis(
                    matched_keywords=["Python", "FastAPI", "React"],
                    missing_keywords=["Kubernetes", "Docker"],
                    match_percentage=75.0
                ),
                skills_gap=["Cloud infrastructure experience"],
                strengths=["Strong backend development skills"],
                improvement_areas=["Add more quantified achievements"]
            ),
            agent_logs=["Resume parsed", "Job analyzed", "Quality scored", "Match calculated"]
        )
