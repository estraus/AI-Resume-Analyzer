import { Loader2, CheckCircle, Clock, AlertCircle, Sparkles } from 'lucide-react'

export default function AgentCard({ agent, status, message, progress }) {
  const statusConfig = {
    working: {
      icon: <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />,
      bg: 'bg-indigo-500/10 border-indigo-500/30',
      progressColor: 'bg-indigo-500'
    },
    completed: {
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      progressColor: 'bg-emerald-500'
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-red-400" />,
      bg: 'bg-red-500/10 border-red-500/30',
      progressColor: 'bg-red-500'
    },
    pending: {
      icon: <Clock className="w-5 h-5 text-zinc-500" />,
      bg: 'bg-zinc-800/50 border-zinc-700',
      progressColor: 'bg-zinc-600'
    }
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <div className={`rounded-xl border p-4 transition-all duration-300 ${config.bg}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-900/50 flex items-center justify-center">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-zinc-200 truncate">{agent}</h3>
            <span className="text-xs font-medium text-zinc-400">{progress}%</span>
          </div>
          <p className="text-xs text-zinc-500 line-clamp-1 mb-2">{message}</p>

          <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
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
