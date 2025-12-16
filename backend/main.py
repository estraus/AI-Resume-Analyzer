from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analysis
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Resume Analyzer API")

# CORS - allow both local and production
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

# Add production frontend URL when deployed
if os.getenv("FRONTEND_URL"):
    origins.append(os.getenv("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analysis.router)

@app.get("/")
async def root():
    return {"message": "AI Resume Analyzer API", "status": "running"}
