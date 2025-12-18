import { Sparkles } from 'lucide-react'
import AgentCard from './AgentCard'

export default function AgentActivity({ updates }) {
  const agents = [
    { name: 'Resume Parser Agent', defaultMessage: 'Extracting resume structure...' },
    { name: 'Job Analyst Agent', defaultMessage: 'Analyzing job requirements...' },
    { name: 'Quality Scorer Agent', defaultMessage: 'Evaluating resume quality...' },
    { name: 'Match Analyzer Agent', defaultMessage: 'Calculating match score...' }
  ]

  const getAgentStatus = (agentName) => {
    const update = updates.find(u => u.agent_name === agentName)
    if (!update) {
      return {
        status: 'pending',
        message: agents.find(a => a.name === agentName)?.defaultMessage || 'Waiting...',
        progress: 0
      }
    }
    return {
      status: update.status,
      message: update.message,
      progress: update.progress
    }
  }

  const completedCount = updates.filter(u => u.status === 'completed').length
  const overallProgress = (completedCount / agents.length) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 mb-4">
          <Sparkles className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-2">
          AI Agents at Work
        </h2>
        <p className="text-sm text-zinc-500">Analyzing your resume...</p>
      </div>

      {/* Overall Progress */}
      <div className="rounded-xl border border-white/10 bg-zinc-800/50 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-zinc-300">Overall Progress</span>
          <span className="text-sm font-medium text-indigo-400">{Math.round(overallProgress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-zinc-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {agents.map((agent) => {
          const status = getAgentStatus(agent.name)
          return (
            <AgentCard
              key={agent.name}
              agent={agent.name}
              {...status}
            />
          )
        })}
      </div>

      <p className="text-center text-xs text-zinc-500">
        This usually takes 1-2 minutes
      </p>
    </div>
  )
}
