import { useState } from 'react'
import { Sparkles, FileText, Link2, Zap, AlertCircle } from 'lucide-react'
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/10 mb-6">
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
            AI Resume Analyzer
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Get instant AI-powered insights on your resume quality and job match score
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl border border-red-500/30 bg-red-500/10 backdrop-blur-md flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Main Card */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p-8 sm:p-12 shadow-xl">
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
        <div className="text-center mt-8 text-zinc-500 text-sm flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" />
          <span>Powered by CrewAI and Claude</span>
        </div>
      </div>
    </div>
  )
}

export default App
