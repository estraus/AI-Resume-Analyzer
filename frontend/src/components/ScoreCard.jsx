export default function ScoreCard({ title, score, subtitle }) {
  const getGradient = (score) => {
    if (score >= 80) return 'from-emerald-500 to-green-500'
    if (score >= 60) return 'from-amber-500 to-yellow-500'
    return 'from-red-500 to-rose-500'
  }

  const getBorderColor = (score) => {
    if (score >= 80) return 'border-emerald-500/30'
    if (score >= 60) return 'border-amber-500/30'
    return 'border-red-500/30'
  }

  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className={`rounded-2xl border bg-zinc-900/50 backdrop-blur-md p-6 text-center shadow-sm ${getBorderColor(score)}`}>
      <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-4">{title}</h3>

      {/* Circular Progress */}
      <div className="relative inline-flex items-center justify-center mb-4">
        <svg className="w-28 h-28 transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="40"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-zinc-800"
          />
          <circle
            cx="56"
            cy="56"
            r="40"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            className={`text-transparent bg-gradient-to-r ${getGradient(score)}`}
            style={{
              stroke: score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444',
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 1s ease-out'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold bg-gradient-to-r ${getGradient(score)} bg-clip-text text-transparent`}>
            {Math.round(score)}
          </span>
          <span className="text-xs text-zinc-500">/100</span>
        </div>
      </div>

      {subtitle && (
        <p className="text-xs text-zinc-500">{subtitle}</p>
      )}
    </div>
  )
}
