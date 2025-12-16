import AgentCard from './AgentCard'

export default function AgentActivity({ updates }) {
  const agents = [
    { name: 'Resume Parser Agent', defaultMessage: 'Waiting to parse resume...' },
    { name: 'Job Analyst Agent', defaultMessage: 'Waiting to analyze job posting...' },
    { name: 'Quality Scorer Agent', defaultMessage: 'Waiting to evaluate resume quality...' },
    { name: 'Match Analyzer Agent', defaultMessage: 'Waiting to calculate job match...' }
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

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        AI Agent Activity
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
