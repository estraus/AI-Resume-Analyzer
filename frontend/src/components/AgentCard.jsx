export default function AgentCard({ agent, status, message, progress }) {
  const statusConfig = {
    working: {
      bg: 'bg-gradient-to-r from-purple-50 to-blue-50',
      border: 'border-l-purple-500',
      icon: (
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-purple-600 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      ),
      progressColor: 'from-purple-500 to-blue-500'
    },
    completed: {
      bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
      border: 'border-l-green-500',
      icon: (
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ),
      progressColor: 'from-green-500 to-emerald-500'
    },
    error: {
      bg: 'bg-gradient-to-r from-red-50 to-rose-50',
      border: 'border-l-red-500',
      icon: (
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      ),
      progressColor: 'from-red-500 to-rose-500'
    },
    pending: {
      bg: 'bg-gray-50',
      border: 'border-l-gray-300',
      icon: (
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      progressColor: 'from-gray-300 to-gray-400'
    }
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <div className={`agent-card ${config.bg} border-l-4 ${config.border} ${status === 'working' ? 'pulse-active' : ''}`}>
      <div className="flex items-start gap-4">
        {config.icon}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-800 truncate">{agent}</h3>
            <span className="text-sm font-bold text-gray-600">{progress}%</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{message}</p>

          <div className="mt-3 progress-bar">
            <div
              className={`progress-fill bg-gradient-to-r ${config.progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
