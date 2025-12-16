# AI-Powered Resume Analyzer - Design Document

**Date:** 2025-11-26
**Project:** Resume Quality & Job Match Analyzer
**Purpose:** Candidate-facing tool to analyze resume quality and job fit using AI agents

---

## Overview

A web application that helps job seekers optimize their resumes by providing two key scores:
1. **Resume Quality Score** (0-100) - Overall resume quality assessment (VMock-style)
2. **Job Match Score** (0-100) - Similarity to specific job listing with keyword analysis

**Key Differentiator:** Transparent multi-agent AI system that shows reasoning and agent collaboration in real-time.

---

## Architecture

### Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS + Shadcn/UI
- React Query (API state management)
- Framer Motion (animations)

**Backend:**
- FastAPI (Python)
- CrewAI (multi-agent orchestration)
- Anthropic Claude API (LLM)
- PyMuPDF or pdfplumber (PDF parsing)
- BeautifulSoup/Playwright (web scraping)
- Pydantic (data validation)

**Deployment:**
- Frontend: Vercel
- Backend: Railway or Render
- Database: SQLite (local), PostgreSQL (production, optional for MVP)

---

## AI Agent System (CrewAI)

### Agent 1: Resume Parser Agent
- **Role:** Expert Resume Analyst
- **Goal:** Extract and structure all resume information
- **Tasks:**
  - Parse PDF document
  - Extract sections (experience, education, skills, etc.)
  - Identify formatting quality
  - Check ATS compatibility
- **Output:** Structured resume data (JSON)

### Agent 2: Job Description Analyst Agent
- **Role:** Job Requirements Specialist
- **Goal:** Scrape and analyze job posting
- **Tasks:**
  - Extract job requirements from URL
  - Identify required vs preferred skills
  - Extract keywords and experience level
  - Identify company culture signals
- **Output:** Structured job requirements (JSON)

### Agent 3: Resume Quality Scorer Agent
- **Role:** Career Coach & Resume Critic
- **Goal:** Evaluate resume quality independent of job fit
- **Tasks:**
  - Assess formatting and clarity
  - Evaluate impact statements
  - Check for quantified achievements
  - Review grammar and ATS optimization
- **Output:** Quality score (0-100) + specific improvement suggestions

### Agent 4: Job Match Analyzer Agent
- **Role:** Talent Matching Specialist
- **Goal:** Compare resume against job requirements
- **Tasks:**
  - Keyword matching analysis
  - Skills gap identification
  - Experience level alignment
  - Calculate similarity score
- **Output:** Match score (0-100) + matched/missing keywords + tailoring suggestions

---

## User Flow

1. **Landing Page:**
   - User uploads PDF resume (drag-and-drop)
   - User pastes job listing URL
   - Click "Analyze Resume" button

2. **Analysis Screen:**
   - Live agent activity panel shows each agent working
   - Real-time status updates and reasoning snippets
   - Progress bar (25% → 50% → 75% → 100%)

3. **Results Dashboard:**
   - Two main score cards (Quality + Job Match)
   - Detailed breakdown tabs:
     - Resume Quality (formatting, content, ATS tips)
     - Job Match Analysis (keyword overlap, skills gap)
     - Improvement Suggestions (actionable feedback)
     - Keyword Comparison (matched vs missing)

---

## Agent Execution Workflow

```
1. User uploads PDF + URL → Backend receives request
2. CrewAI orchestrates sequential execution:
   ├─ Agent 1: Parse PDF → structured data
   ├─ Agent 2: Scrape job URL → requirements
   ├─ Agent 3: Analyze resume quality → score + feedback
   └─ Agent 4: Compare resume to job → match score + gaps
3. Real-time updates sent to frontend (WebSocket/SSE)
4. Final results compiled and displayed
```

---

## Key Features

### MVP Scope
- ✅ PDF upload with validation
- ✅ Job URL input and scraping
- ✅ 4-agent analysis system
- ✅ Live agent activity display
- ✅ Results dashboard with both scores
- ✅ Basic keyword comparison
- ✅ Deployed demo

### Future Enhancements
- User accounts and history
- Compare multiple resume versions
- LinkedIn profile import
- Chrome extension for one-click analysis
- Resume templates and suggestions
- Cover letter analysis

---

## UI/UX Design

### Landing Page
- Clean, professional hero section
- Two input controls (PDF upload + URL field)
- Clear call-to-action
- Optional demo mode with sample data

### Analysis Screen
- **Agent Activity Panel** (key showcase feature):
  - Each agent with icon/avatar
  - Real-time status indicators
  - Current task description
  - AI reasoning snippets
  - Overall progress bar

### Results Dashboard
- **Score Cards:** Large, color-coded scores (0-100)
- **Visualizations:**
  - Circular progress charts
  - Keyword overlap diagrams
  - Skills gap analysis
- **Keyword Highlighting:**
  - Green for matched keywords
  - Red for missing keywords
- **Expandable Sections:** Detailed agent reasoning

---

## What Makes This Portfolio-Worthy

✅ **AI Engineering:** Multi-agent orchestration with CrewAI
✅ **Full-Stack:** Modern React + Python API
✅ **Real-World Problem:** Solves actual recruiting pain point
✅ **Transparency:** Shows AI reasoning, not black-box results
✅ **Production-Ready:** Deployed with live demo
✅ **Current Tech:** Latest AI frameworks (CrewAI, Claude)
✅ **Visual Impact:** Clean UI with real-time agent activity

---

## API Endpoints

### POST `/api/analyze`
**Request:**
```json
{
  "resume_file": "base64_encoded_pdf",
  "job_url": "https://example.com/job-posting"
}
```

**Response:**
```json
{
  "analysis_id": "uuid",
  "resume_quality_score": 78,
  "job_match_score": 85,
  "quality_feedback": [...],
  "match_analysis": {
    "matched_keywords": [...],
    "missing_keywords": [...],
    "skills_gap": [...]
  },
  "agent_logs": [...]
}
```

### WebSocket `/ws/analysis/{analysis_id}`
**Real-time agent updates:**
```json
{
  "agent": "Resume Parser Agent",
  "status": "working",
  "message": "Extracting skills and experience...",
  "progress": 25
}
```

---

## Environment Setup

### Required API Keys
- `ANTHROPIC_API_KEY` - Claude API access

### Dependencies
**Backend:**
- fastapi
- uvicorn
- crewai
- anthropic
- pymupdf (or pdfplumber)
- beautifulsoup4
- playwright
- pydantic

**Frontend:**
- react
- vite
- @tanstack/react-query
- tailwindcss
- shadcn/ui components
- framer-motion

---

## Success Metrics

**For Portfolio/Recruiting:**
- Clean, professional UI
- Working live demo
- Clear demonstration of AI agent orchestration
- Visible AI reasoning process
- Fast response time (<30 seconds per analysis)

**Technical:**
- Accurate PDF text extraction
- Reliable job posting scraping
- Meaningful scores and feedback
- Good error handling
- Mobile-responsive design

---

## Next Steps

1. Initialize git repository
2. Set up project structure (frontend + backend)
3. Implement backend API with CrewAI agents
4. Build React frontend with agent activity display
5. Integrate Claude API
6. Test with sample resumes and job postings
7. Deploy to Vercel + Railway
8. Polish UI and add examples
9. Create demo video for portfolio
