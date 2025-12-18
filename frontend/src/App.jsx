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
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-[680px]">

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Upload Form - wrapped in card */}
        {!isAnalyzing && !analysisResult && (
          <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 p-8 border-b border-slate-100 text-center">
              <h1 className="text-2xl font-semibold text-slate-900 mb-1">
                Resume Analyzer
              </h1>
              <p className="text-sm text-slate-500">
                AI-powered insights for your career
              </p>
            </div>
            {/* Form */}
            <div className="p-8">
              <UploadForm onSubmit={handleAnalyze} isAnalyzing={false} />
            </div>
          </div>
        )}

        {/* Agent Activity - has its own card */}
        {isAnalyzing && (
          <AgentActivity updates={agentUpdates} />
        )}

        {/* Results - has its own card structure */}
        {analysisResult && (
          <ResultsDashboard result={analysisResult} onReset={handleReset} />
        )}

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-slate-400">
          Powered by CrewAI and Claude
        </p>
      </div>
    </div>
  )
}

export default App
