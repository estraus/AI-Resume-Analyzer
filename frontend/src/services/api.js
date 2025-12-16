const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function analyzeResume(resumeFile, jobUrl) {
  const formData = new FormData()
  formData.append('resume', resumeFile)
  formData.append('job_url', jobUrl)

  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Analysis failed')
  }

  return response.json()
}

export function createEventSource(analysisId) {
  return new EventSource(`${API_BASE_URL}/api/analysis/${analysisId}/stream`)
}
