export default function ScoreCard({ title, score, subtitle }) {
  // Color scheme based on score
  const getColors = (score) => {
    if (score >= 80) return { bg: 'bg-green-50', stroke: '#16a34a', text: 'text-green-600' }
    if (score >= 60) return { bg: 'bg-amber-50', stroke: '#d97706', text: 'text-amber-600' }
    return { bg: 'bg-red-50', stroke: '#dc2626', text: 'text-red-600' }
  }

  const colors = getColors(score)

  // Circular progress with rounded caps
  const size = 100
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className={`rounded-[28px] ${colors.bg} p-6 text-center`}>
      <p className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-4">{title}</p>

      {/* Circular Progress */}
      <div className="relative inline-flex items-center justify-center mb-3">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${colors.text}`}>
            {Math.round(score)}
          </span>
        </div>
      </div>

      {subtitle && (
        <p className="text-xs text-slate-500">{subtitle}</p>
      )}
    </div>
  )
}
