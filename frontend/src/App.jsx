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

  // Results has its own full-page layout
  if (analysisResult) {
    return <ResultsDashboard result={analysisResult} onReset={handleReset} />
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4">
      {/* Centered container with significant top margin */}
      <div className="max-w-3xl mx-auto mt-24">

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Main Container - flat border, no heavy shadow */}
        <div className="bg-white rounded-2xl border border-zinc-200">
          {/* Header */}
          <div className="text-center p-12 pb-0">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 mb-6">
              <Sparkles className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-2">
              Resume Analyzer
            </h1>
            <p className="text-base text-zinc-500">
              AI-powered insights for your career
            </p>
          </div>

          {/* Content with generous padding */}
          <div className="p-12">
            {!isAnalyzing && (
              <UploadForm onSubmit={handleAnalyze} isAnalyzing={false} />
            )}

            {isAnalyzing && (
              <AgentActivity updates={agentUpdates} />
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-zinc-400">
          Powered by CrewAI and Claude
        </p>
      </div>
    </div>
  )
}

export default App
