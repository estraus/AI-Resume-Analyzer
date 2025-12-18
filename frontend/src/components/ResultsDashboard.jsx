import { CheckCircle, TrendingUp, Lightbulb, Target, RefreshCw } from 'lucide-react'
import ScoreCard from './ScoreCard'
import KeywordComparison from './KeywordComparison'

export default function ResultsDashboard({ result, onReset }) {
  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <h2 className="text-xl font-medium text-slate-900 mb-1">
          Analysis Complete
        </h2>
        <p className="text-sm text-slate-500">Here's your resume performance</p>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 gap-4">
        <ScoreCard
          title="Quality"
          score={result.resume_quality_score}
          subtitle="Resume score"
        />
        <ScoreCard
          title="Match"
          score={result.job_match_score}
          subtitle="Job fit score"
        />
      </div>

      {/* Keywords */}
      <KeywordComparison
        matched={result.match_analysis.keyword_analysis.matched_keywords}
        missing={result.match_analysis.keyword_analysis.missing_keywords}
      />

      {/* Strengths */}
      <div className="rounded-[28px] bg-green-50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base font-medium text-slate-900">Strengths</h3>
        </div>
        <div className="space-y-3 pl-[52px]">
          {result.match_analysis.strengths.slice(0, 4).map((strength, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{strength}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="rounded-[28px] bg-amber-50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base font-medium text-slate-900">Suggestions</h3>
        </div>
        <div className="space-y-3 pl-[52px]">
          {result.match_analysis.improvement_areas.slice(0, 4).map((suggestion, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-white font-medium">{idx + 1}</span>
              </div>
              <p className="text-sm text-slate-700">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Gap */}
      {result.match_analysis.skills_gap?.length > 0 && (
        <div className="rounded-[28px] bg-indigo-50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-medium text-slate-900">Skills to Learn</h3>
          </div>
          <div className="flex flex-wrap gap-2 pl-[52px]">
            {result.match_analysis.skills_gap.map((skill, idx) => (
              <div
                key={idx}
                className="h-8 px-4 rounded-full bg-white text-indigo-700 text-sm font-medium flex items-center border border-indigo-200"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extended FAB - Pill shaped at bottom */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={onReset}
          className="flex items-center gap-3 h-14 px-8 rounded-full bg-indigo-100 text-indigo-700 font-medium shadow-lg hover:shadow-xl hover:bg-indigo-200 transition-all active:scale-95"
        >
          <RefreshCw className="w-5 h-5" />
          Analyze Another
        </button>
      </div>
    </div>
  )
}
