import AgentCard from './AgentCard'

export default function AgentActivity({ updates }) {
  const agents = [
    { name: 'Resume Parser Agent', icon: '📄', defaultMessage: 'Extracting resume structure and content...' },
    { name: 'Job Analyst Agent', icon: '🎯', defaultMessage: 'Analyzing job requirements and keywords...' },
    { name: 'Quality Scorer Agent', icon: '⭐', defaultMessage: 'Evaluating resume quality and formatting...' },
    { name: 'Match Analyzer Agent', icon: '🔗', defaultMessage: 'Comparing skills and calculating match score...' }
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 mb-4">
          <svg className="w-8 h-8 text-purple-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Agents at Work</h2>
        <p className="text-gray-600">Our specialized AI agents are analyzing your resume</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
          <span className="text-sm font-bold text-purple-600">{Math.round(overallProgress)}%</span>
        </div>
        <div className="progress-bar h-3">
          <div
            className="progress-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {completedCount} of {agents.length} agents completed
        </p>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent, index) => {
          const status = getAgentStatus(agent.name)
          return (
            <div key={agent.name} className={`fade-in-up stagger-${index + 1}`}>
              <AgentCard
                agent={agent.name}
                {...status}
              />
            </div>
          )
        })}
      </div>

      {/* Loading message */}
      <p className="text-center text-gray-500 text-sm animate-pulse">
        This usually takes 1-2 minutes. Please don't close this window.
      </p>
    </div>
  )
}
