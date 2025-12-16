export default function ScoreCard({ title, score, subtitle }) {
  const getColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-green-600'
    if (score >= 60) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-5xl font-bold ${getColor(score)}`}>
          {score}
        </span>
        <span className="text-2xl text-gray-400">/100</span>
      </div>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}

      <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
