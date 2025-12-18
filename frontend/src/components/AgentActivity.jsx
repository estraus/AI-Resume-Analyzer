import { Loader2, CheckCircle, Circle } from 'lucide-react'

export default function AgentActivity({ updates }) {
  const agents = [
    { name: 'Resume Parser', defaultMessage: 'Extracting resume structure and content' },
    { name: 'Job Analyst', defaultMessage: 'Analyzing job requirements and keywords' },
    { name: 'Quality Scorer', defaultMessage: 'Evaluating resume quality and formatting' },
    { name: 'Match Analyzer', defaultMessage: 'Calculating job match score' }
  ]

  const getAgentStatus = (agentName) => {
    const update = updates.find(u => u.agent_name?.includes(agentName.split(' ')[0]))
    if (!update) {
      return { status: 'pending', message: '', progress: 0 }
    }
    return {
      status: update.status,
      message: update.message,
      progress: update.progress
    }
  }

  const completedCount = updates.filter(u => u.status === 'completed').length

  return (
    <div className="bg-white rounded-[32px] shadow-xl max-w-md w-full mx-auto overflow-hidden">
      {/* Header Area with subtle background */}
      <div className="bg-slate-50 p-8 border-b border-slate-100">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">
          Analyzing Resume
        </h2>
        <p className="text-sm text-slate-500">
          {completedCount} of {agents.length} checks complete
        </p>
      </div>

      {/* Progress List as Vertical Stepper */}
      <div className="p-8">
        <div className="relative">
          {agents.map((agent, index) => {
            const { status, message, progress } = getAgentStatus(agent.name)
            const isLast = index === agents.length - 1
            const isActive = status === 'working'
            const isCompleted = status === 'completed'
            const isPending = status === 'pending'

            return (
              <div key={agent.name} className="relative flex gap-4">
                {/* Vertical connector line */}
                {!isLast && (
                  <div
                    className={`absolute left-[15px] top-[40px] w-0.5 h-[calc(100%-24px)] transition-colors duration-300
                      ${isCompleted ? 'bg-green-500' : 'bg-slate-200'}
                    `}
                  />
                )}

                {/* Step Icon */}
                <div className="flex-shrink-0 relative z-10">
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  ) : isActive ? (
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center animate-pulse">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <Circle className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Step Content */}
                <div className={`flex-1 pb-8 ${isLast ? 'pb-0' : ''}`}>
                  <h3 className={`text-sm font-medium transition-colors duration-300
                    ${isCompleted ? 'text-green-600' : isActive ? 'text-indigo-600' : 'text-slate-400'}
                  `}>
                    {agent.name}
                  </h3>
                  <p className={`text-xs mt-0.5 transition-colors duration-300
                    ${isPending ? 'text-slate-300' : 'text-slate-500'}
                  `}>
                    {message || agent.defaultMessage}
                  </p>

                  {/* Progress bar for active step */}
                  {isActive && progress > 0 && (
                    <div className="mt-2 h-1 rounded-full bg-indigo-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
