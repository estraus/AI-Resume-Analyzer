import { CheckCircle, TrendingUp, Lightbulb, Target, RefreshCw, Check } from 'lucide-react'

export default function ResultsDashboard({ result, onReset }) {
  // Color scheme based on score
  const getScoreColors = (score) => {
    if (score >= 80) return { bg: 'bg-green-50', text: 'text-green-600', stroke: '#16a34a' }
    if (score >= 60) return { bg: 'bg-amber-50', text: 'text-amber-600', stroke: '#d97706' }
    return { bg: 'bg-red-50', text: 'text-red-600', stroke: '#dc2626' }
  }

  const qualityColors = getScoreColors(result.resume_quality_score)
  const matchColors = getScoreColors(result.job_match_score)

  // Circular progress helper
  const CircularProgress = ({ score, colors, label }) => {
    const size = 80
    const strokeWidth = 6
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference

    return (
      <div className={`${colors.bg} rounded-2xl p-5 text-center`}>
        <div className="relative inline-flex items-center justify-center mb-2">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="white" strokeWidth={strokeWidth} />
            <circle
              cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={colors.stroke} strokeWidth={strokeWidth}
              strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <span className={`absolute text-2xl font-bold ${colors.text}`}>{Math.round(score)}</span>
        </div>
        <p className="text-xs text-slate-600 font-medium">{label}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[32px] shadow-xl max-w-md w-full mx-auto overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 p-8 border-b border-slate-100 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 mb-3">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Analysis Complete</h2>
        <p className="text-sm text-slate-500">Here's your resume performance</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Scores Row */}
        <div className="grid grid-cols-2 gap-3">
          <CircularProgress score={result.resume_quality_score} colors={qualityColors} label="Quality Score" />
          <CircularProgress score={result.job_match_score} colors={matchColors} label="Match Score" />
        </div>

        {/* Keywords */}
        <div className="bg-slate-50 rounded-2xl p-5">
          <h3 className="text-sm font-medium text-slate-900 mb-3">Keywords</h3>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {result.match_analysis.keyword_analysis.matched_keywords.slice(0, 6).map((kw, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                  <Check className="w-3 h-3" />{kw}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {result.match_analysis.keyword_analysis.missing_keywords.slice(0, 4).map((kw, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full border border-slate-300 text-slate-500 text-xs font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-green-50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <h3 className="text-sm font-medium text-slate-900">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {result.match_analysis.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="bg-amber-50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-medium text-slate-900">Suggestions</h3>
          </div>
          <ul className="space-y-2">
            {result.match_analysis.improvement_areas.slice(0, 3).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] text-white font-bold">{i + 1}</span>
                </div>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills Gap */}
        {result.match_analysis.skills_gap?.length > 0 && (
          <div className="bg-indigo-50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-medium text-slate-900">Skills to Learn</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {result.match_analysis.skills_gap.slice(0, 5).map((skill, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full bg-white border border-indigo-200 text-indigo-700 text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Analyze Another Resume
        </button>
      </div>
    </div>
  )
}
