import { Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function AgentCard({ agent, status, message, progress }) {
  const statusConfig = {
    working: {
      icon: <Loader2 className="w-5 h-5 text-[#6750A4] animate-spin" />,
      bg: 'bg-[#EADDFF]',
      progressColor: 'bg-[#6750A4]'
    },
    completed: {
      icon: <CheckCircle className="w-5 h-5 text-[#1B5E20]" />,
      bg: 'bg-[#E8F5E9]',
      progressColor: 'bg-[#1B5E20]'
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-[#BA1A1A]" />,
      bg: 'bg-[#FFDAD6]',
      progressColor: 'bg-[#BA1A1A]'
    },
    pending: {
      icon: <Clock className="w-5 h-5 text-[#79747E]" />,
      bg: 'bg-[#E7E0EC]',
      progressColor: 'bg-[#CAC4D0]'
    }
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <div className={`rounded-[16px] p-4 transition-all duration-300 ${config.bg}`}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-[#1C1B1F] truncate">{agent}</h3>
            <span className="text-xs font-medium text-[#49454F]">{progress}%</span>
          </div>
          <p className="text-xs text-[#49454F] line-clamp-1 mb-2">{message}</p>

          <div className="h-1 rounded-full bg-white/50 overflow-hidden">
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
