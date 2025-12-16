# AI Resume Analyzer

A candidate-facing web application that analyzes resume quality and job fit using a multi-agent AI system powered by CrewAI and Claude.

## Features

- 📄 PDF resume upload and parsing
- 🔗 Job posting URL scraping
- 🤖 Multi-agent AI analysis (CrewAI + Claude)
- 📊 Resume quality scoring (0-100)
- 🎯 Job match analysis with keyword comparison
- 🔄 Real-time agent activity visualization
- 💡 Actionable improvement suggestions

## Tech Stack

**Backend:**
- FastAPI
- CrewAI
- Anthropic Claude API
- PyMuPDF
- BeautifulSoup4

**Frontend:**
- React + Vite
- Tailwind CSS
- React Query

## Setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- Anthropic API key

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create .env file
echo "ANTHROPIC_API_KEY=your_key_here" > .env

# Run server
uvicorn main:app --reload
```

Server runs on http://localhost:8000

### Frontend Setup

```bash
cd frontend
npm install

# Run dev server
npm run dev
```

Frontend runs on http://localhost:5173

## Usage

1. Upload your resume (PDF format)
2. Paste the job posting URL
3. Click "Analyze Resume"
4. Watch the AI agents work in real-time
5. Review your scores and improvement suggestions

## API Endpoints

- `POST /api/analyze` - Start resume analysis
- `GET /api/analysis/{id}/stream` - Stream real-time updates (SSE)
- `GET /health` - Health check

## Architecture

The system uses 4 specialized AI agents:

1. **Resume Parser Agent** - Extracts and structures resume data
2. **Job Analyst Agent** - Analyzes job requirements
3. **Quality Scorer Agent** - Evaluates resume quality
4. **Match Analyzer Agent** - Calculates job fit score

## Development

Run tests:
```bash
cd backend
pytest
```

Build frontend:
```bash
cd frontend
npm run build
```

## Deployment

**Backend:** Railway, Render, or fly.io
**Frontend:** Vercel or Netlify

## License

MIT
