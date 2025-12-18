export default function ScoreCard({ title, score, subtitle }) {
  const getGradient = (score) => {
    if (score >= 80) return 'from-emerald-500 to-green-500'
    if (score >= 60) return 'from-amber-500 to-yellow-500'
    return 'from-red-500 to-rose-500'
  }

  const getTextColor = (score) => {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 60) return 'text-amber-600'
    return 'text-red-600'
  }

  const getBgGradient = (score) => {
    if (score >= 80) return 'from-emerald-50 to-green-50'
    if (score >= 60) return 'from-amber-50 to-yellow-50'
    return 'from-red-50 to-rose-50'
  }

  // Calculate stroke dashoffset for circular progress
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className={`score-card bg-gradient-to-br ${getBgGradient(score)}`}>
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">{title}</h3>

      {/* Circular Progress */}
      <div className="relative inline-flex items-center justify-center mb-4">
        <svg className="w-32 h-32 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 1s ease-out'
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={score >= 80 ? 'text-emerald-500' : score >= 60 ? 'text-amber-500' : 'text-red-500'} style={{ stopColor: 'currentColor' }} />
              <stop offset="100%" className={score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-rose-500'} style={{ stopColor: 'currentColor' }} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getTextColor(score)}`}>{Math.round(score)}</span>
          <span className="text-sm text-gray-400">/100</span>
        </div>
      </div>

      {subtitle && (
        <p className="text-sm text-gray-600">{subtitle}</p>
      )}
    </div>
  )
}
