export default function ScoreCard({ title, score, subtitle, icon }) {
  // M3 color scheme based on score
  const getColors = (score) => {
    if (score >= 80) return {
      bg: 'bg-[#E8F5E9]',
      stroke: '#1B5E20',
      text: 'text-[#1B5E20]'
    }
    if (score >= 60) return {
      bg: 'bg-[#FFF8E1]',
      stroke: '#F9A825',
      text: 'text-[#F57F17]'
    }
    return {
      bg: 'bg-[#FFEBEE]',
      stroke: '#C62828',
      text: 'text-[#C62828]'
    }
  }

  const colors = getColors(score)

  // Modern circular progress with rounded caps
  const size = 120
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className={`rounded-[28px] ${colors.bg} p-6 text-center`}>
      <p className="text-sm font-medium text-[#49454F] uppercase tracking-wider mb-4">{title}</p>

      {/* Circular Progress Bar */}
      <div className="relative inline-flex items-center justify-center mb-4">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc with rounded caps */}
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
          <span className={`text-4xl font-semibold ${colors.text}`}>
            {Math.round(score)}
          </span>
          <span className="text-xs text-[#79747E]">/100</span>
        </div>
      </div>

      {subtitle && (
        <p className="text-sm text-[#49454F]">{subtitle}</p>
      )}
    </div>
  )
}
