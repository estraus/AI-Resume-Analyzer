import { CheckCircle, Target, Lightbulb, TrendingUp, RotateCcw } from 'lucide-react'
import ScoreCard from './ScoreCard'
import KeywordComparison from './KeywordComparison'

export default function ResultsDashboard({ result, onReset }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 mb-4">
          <CheckCircle className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
          Analysis Complete
        </h2>
        <p className="text-sm text-zinc-500">Here's how your resume performed</p>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScoreCard
          title="Resume Quality"
          score={result.resume_quality_score}
          subtitle="Overall effectiveness"
        />
        <ScoreCard
          title="Job Match"
          score={result.job_match_score}
          subtitle="Role compatibility"
        />
      </div>

      {/* Keyword Analysis */}
      <KeywordComparison
        matched={result.match_analysis.keyword_analysis.matched_keywords}
        missing={result.match_analysis.keyword_analysis.missing_keywords}
      />

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="rounded-2xl border border-emerald-500/20 bg-zinc-900/50 backdrop-blur-md p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Strengths
          </h3>
          <ul className="space-y-2">
            {result.match_analysis.strengths.slice(0, 5).map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="rounded-2xl border border-amber-500/20 bg-zinc-900/50 backdrop-blur-md p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Suggestions
          </h3>
          <ul className="space-y-2">
            {result.match_analysis.improvement_areas.slice(0, 5).map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skills Gap */}
      {result.match_analysis.skills_gap?.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-zinc-800/50 p-5">
          <h3 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Skills to Develop
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.match_analysis.skills_gap.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-zinc-700/50 text-zinc-300 text-sm font-medium border border-zinc-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="text-center pt-2">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Analyze Another Resume
        </button>
      </div>
    </div>
  )
}
