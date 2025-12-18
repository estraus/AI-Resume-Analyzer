import { CheckCircle, TrendingUp, Lightbulb, Target, RefreshCw, Check, Tag } from 'lucide-react'

export default function ResultsDashboard({ result, onReset }) {
  // Circular progress helper
  const CircularProgress = ({ score, label }) => {
    const size = 100
    const strokeWidth = 8
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference

    const color = score >= 80 ? '#16a34a' : score >= 60 ? '#d97706' : '#dc2626'
    const textColor = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'

    return (
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center mb-3">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
            <circle
              cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
              strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <span className={`absolute text-3xl font-bold ${textColor}`}>{Math.round(score)}</span>
        </div>
        <p className="text-sm font-medium text-slate-600">{label}</p>
      </div>
    )
  }

  // Card header component
  const CardHeader = ({ icon: Icon, title, iconColor }) => (
    <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
      <Icon className={`w-5 h-5 ${iconColor}`} />
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Hero Card - Scores with gradient */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm border border-slate-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Analysis Complete</h1>
            <p className="text-sm text-slate-500 mt-1">Here's how your resume performed</p>
          </div>

          <div className="flex justify-center gap-16">
            <CircularProgress score={result.resume_quality_score} label="Quality Score" />
            <CircularProgress score={result.job_match_score} label="Match Score" />
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="space-y-6">
            {/* Strengths Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <CardHeader icon={TrendingUp} title="Strengths" iconColor="text-green-600" />
              <ul className="space-y-3">
                {result.match_analysis.strengths.slice(0, 4).map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills to Learn Card */}
            {result.match_analysis.skills_gap?.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <CardHeader icon={Target} title="Skills to Develop" iconColor="text-indigo-600" />
                <div className="flex flex-wrap gap-2">
                  {result.match_analysis.skills_gap.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Suggestions Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <CardHeader icon={Lightbulb} title="Suggestions" iconColor="text-amber-600" />
              <ul className="space-y-3">
                {result.match_analysis.improvement_areas.slice(0, 4).map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-sm text-slate-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keywords Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <CardHeader icon={Tag} title="Keyword Analysis" iconColor="text-blue-600" />

              {/* Matched */}
              <div className="mb-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Matched</p>
                <div className="flex flex-wrap gap-2">
                  {result.match_analysis.keyword_analysis.matched_keywords.slice(0, 6).map((kw, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                      <Check className="w-3 h-3" />{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing */}
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Missing</p>
                <div className="flex flex-wrap gap-2">
                  {result.match_analysis.keyword_analysis.missing_keywords.slice(0, 4).map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full border border-slate-300 text-slate-600 text-xs font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-8 h-12 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            Analyze Another Resume
          </button>
        </div>
      </div>
    </div>
  )
}
