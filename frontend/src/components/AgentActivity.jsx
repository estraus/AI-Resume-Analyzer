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
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#EADDFF] mb-4">
          <Sparkles className="w-7 h-7 text-[#6750A4]" />
        </div>
        <h2 className="text-xl font-medium text-[#1C1B1F] mb-1">
          AI Agents Working
        </h2>
        <p className="text-sm text-[#49454F]">{completedCount} of {agents.length} complete</p>
      </div>

      {/* Overall Progress */}
      <div className="rounded-[28px] bg-[#F3EDF7] p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[#1C1B1F]">Overall Progress</span>
          <span className="text-sm font-medium text-[#6750A4]">{Math.round(overallProgress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#CAC4D0] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#6750A4] transition-all duration-500"
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
