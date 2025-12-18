import { Sparkles } from 'lucide-react'
import AgentCard from './AgentCard'

export default function AgentActivity({ updates }) {
  const agents = [
    { name: 'Resume Parser', defaultMessage: 'Extracting structure...' },
    { name: 'Job Analyst', defaultMessage: 'Analyzing requirements...' },
    { name: 'Quality Scorer', defaultMessage: 'Evaluating quality...' },
    { name: 'Match Analyzer', defaultMessage: 'Calculating match...' }
  ]

  const getAgentStatus = (agentName) => {
    const update = updates.find(u => u.agent_name?.includes(agentName.split(' ')[0]))
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
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-100 mb-4">
          <Sparkles className="w-7 h-7 text-indigo-600" />
        </div>
        <h2 className="text-xl font-medium text-slate-900 mb-1">
          Analyzing...
        </h2>
        <p className="text-sm text-slate-500">{completedCount} of {agents.length} agents complete</p>
      </div>

      {/* Overall Progress */}
      <div className="rounded-2xl bg-slate-50 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-700">Progress</span>
          <span className="text-sm font-medium text-indigo-600">{Math.round(overallProgress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Agent Cards */}
      <div className="space-y-3">
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
    </div>
  )
}
