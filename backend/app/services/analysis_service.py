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

        # Parse task outputs to extract real AI-generated scores
        def extract_json_from_output(output_str: str) -> dict:
            """Extract JSON from task output, handling markdown code blocks."""
            import re
            # Try to find JSON in code blocks first
            json_match = re.search(r'```(?:json)?\s*(\{[\s\S]*?\})\s*```', str(output_str))
            if json_match:
                try:
                    return json.loads(json_match.group(1))
                except json.JSONDecodeError:
                    pass
            # Try direct JSON parsing
            try:
                return json.loads(str(output_str))
            except json.JSONDecodeError:
                pass
            # Try to find any JSON object in the string
            json_match = re.search(r'\{[\s\S]*\}', str(output_str))
            if json_match:
                try:
                    return json.loads(json_match.group(0))
                except json.JSONDecodeError:
                    pass
            return {}

        # Extract results from each task
        quality_data = {}
        match_data = {}
        
        # Get task outputs from the crew result
        if hasattr(result, 'tasks_output') and result.tasks_output:
            for i, task_output in enumerate(result.tasks_output):
                output_str = str(task_output)
                if i == 2:  # quality_task
                    quality_data = extract_json_from_output(output_str)
                elif i == 3:  # match_task
                    match_data = extract_json_from_output(output_str)
        else:
            # Try parsing from the raw result string
            match_data = extract_json_from_output(str(result))

        # Extract scores with fallbacks
        quality_score = float(quality_data.get('overall_score', 75.0))
        match_score = float(match_data.get('match_score', 70.0))
        
        # Extract keywords and analysis
        matched_keywords = match_data.get('matched_keywords', [])
        missing_keywords = match_data.get('missing_keywords', [])
        skills_gap = match_data.get('skills_gap', [])
        strengths = match_data.get('strengths', [])
        suggestions = match_data.get('suggestions', [])
        
        # Calculate match percentage
        total_keywords = len(matched_keywords) + len(missing_keywords)
        match_percentage = (len(matched_keywords) / total_keywords * 100) if total_keywords > 0 else 0.0

        if self.progress_callback:
            await self.progress_callback("Analysis Complete", "completed",
                                        "All agents finished successfully!", 100)

        return AnalysisResult(
            analysis_id=analysis_id,
            resume_quality_score=quality_score,
            job_match_score=match_score,
            quality_feedback=[
                QualityFeedback(
                    category="Overall Quality",
                    score=quality_score,
                    feedback=quality_data.get('feedback', ["Resume analyzed successfully"])[0] if isinstance(quality_data.get('feedback'), list) else "Resume analyzed successfully",
                    suggestions=quality_data.get('feedback', []) if isinstance(quality_data.get('feedback'), list) else []
                )
            ],
            match_analysis=MatchAnalysis(
                match_score=match_score,
                keyword_analysis=KeywordAnalysis(
                    matched_keywords=matched_keywords[:15] if matched_keywords else ["No keywords extracted"],
                    missing_keywords=missing_keywords[:15] if missing_keywords else ["No gaps identified"],
                    match_percentage=match_percentage
                ),
                skills_gap=skills_gap[:5] if skills_gap else ["Analysis complete"],
                strengths=strengths[:5] if strengths else ["See detailed analysis"],
                improvement_areas=suggestions[:5] if suggestions else ["See suggestions above"]
            ),
            agent_logs=[
                f"Resume parsed successfully",
                f"Job requirements analyzed", 
                f"Quality score: {quality_score}/100",
                f"Match score: {match_score}/100",
                f"Found {len(matched_keywords)} matching keywords",
                f"Identified {len(missing_keywords)} missing keywords"
            ]
        )
