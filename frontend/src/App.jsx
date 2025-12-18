import { useState } from 'react'
import { Sparkles, AlertCircle } from 'lucide-react'
import UploadForm from './components/UploadForm'
import AgentActivity from './components/AgentActivity'
import ResultsDashboard from './components/ResultsDashboard'
import { analyzeResume, createEventSource } from './services/api'

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [agentUpdates, setAgentUpdates] = useState([])
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async ({ resumeFile, jobUrl }) => {
    try {
      setIsAnalyzing(true)
      setAgentUpdates([])
      setAnalysisResult(null)
      setError(null)

      const { analysis_id } = await analyzeResume(resumeFile, jobUrl)
      const eventSource = createEventSource(analysis_id)

      eventSource.addEventListener('update', (event) => {
        const update = JSON.parse(event.data)
        setAgentUpdates(prev => {
          const existing = prev.findIndex(u => u.agent_name === update.agent_name)
          if (existing >= 0) {
            const newUpdates = [...prev]
            newUpdates[existing] = update
            return newUpdates
          }
          return [...prev, update]
        })
      })

      eventSource.addEventListener('complete', (event) => {
        const result = JSON.parse(event.data)
        setAnalysisResult(result)
        setIsAnalyzing(false)
        eventSource.close()
      })

      eventSource.addEventListener('error', (event) => {
        let errorMessage = 'Analysis failed. Please try again.'
        if (event.data) {
          try {
            const data = JSON.parse(event.data)
            if (data.error) errorMessage = data.error
          } catch (e) {
            if (typeof event.data === 'string') errorMessage = event.data
          }
        }
        setError(errorMessage)
        setIsAnalyzing(false)
        eventSource.close()
      })
    } catch (err) {
      setError(err.message)
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setAgentUpdates([])
    setAnalysisResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[28px] bg-[#EADDFF] mb-6">
            <Sparkles className="w-8 h-8 text-[#6750A4]" />
          </div>
          <h1 className="text-3xl font-semibold text-[#1C1B1F] mb-2">
            Resume Analyzer
          </h1>
          <p className="text-base text-[#49454F]">
            AI-powered insights for your resume
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-[28px] bg-[#FFDAD6] flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#BA1A1A] flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <p className="text-[#410002] text-sm flex-1">{error}</p>
          </div>
        )}

        {/* Main Card - Material You elevated surface */}
        <div className="rounded-[28px] bg-white shadow-sm p-6 sm:p-8">
          {!isAnalyzing && !analysisResult && (
            <UploadForm onSubmit={handleAnalyze} isAnalyzing={false} />
          )}

          {isAnalyzing && (
            <AgentActivity updates={agentUpdates} />
          )}

          {analysisResult && (
            <ResultsDashboard result={analysisResult} onReset={handleReset} />
          )}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-[#79747E]">
          Powered by CrewAI and Claude
        </p>
      </div>
    </div>
  )
}

export default App
