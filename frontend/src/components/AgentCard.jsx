import { Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function AgentCard({ agent, status, message, progress }) {
  const statusConfig = {
    working: {
      icon: <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />,
      bg: 'bg-indigo-50',
      progressColor: 'bg-indigo-600'
    },
    completed: {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      bg: 'bg-green-50',
      progressColor: 'bg-green-600'
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      bg: 'bg-red-50',
      progressColor: 'bg-red-600'
    },
    pending: {
      icon: <Clock className="w-5 h-5 text-slate-400" />,
      bg: 'bg-slate-50',
      progressColor: 'bg-slate-300'
    }
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <div className={`rounded-2xl p-4 transition-all duration-300 ${config.bg}`}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-slate-900 truncate">{agent}</h3>
            <span className="text-xs font-medium text-slate-500">{progress}%</span>
          </div>
          <p className="text-xs text-slate-500 line-clamp-1 mb-2">{message}</p>

          <div className="h-1.5 rounded-full bg-white overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${config.progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
