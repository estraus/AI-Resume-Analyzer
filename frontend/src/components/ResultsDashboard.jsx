import { CheckCircle, TrendingUp, Lightbulb, Target, RefreshCw } from 'lucide-react'
import ScoreCard from './ScoreCard'
import KeywordComparison from './KeywordComparison'

export default function ResultsDashboard({ result, onReset }) {
  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#E8F5E9] mb-4">
          <CheckCircle className="w-7 h-7 text-[#1B5E20]" />
        </div>
        <h2 className="text-xl font-medium text-[#1C1B1F] mb-1">
          Analysis Complete
        </h2>
        <p className="text-sm text-[#49454F]">Here's your resume performance</p>
      </div>

      {/* Score Cards in M3 cards */}
      <div className="grid grid-cols-2 gap-4">
        <ScoreCard
          title="Quality"
          score={result.resume_quality_score}
          subtitle="Resume effectiveness"
        />
        <ScoreCard
          title="Match"
          score={result.job_match_score}
          subtitle="Job compatibility"
        />
      </div>

      {/* Keywords Card */}
      <KeywordComparison
        matched={result.match_analysis.keyword_analysis.matched_keywords}
        missing={result.match_analysis.keyword_analysis.missing_keywords}
      />

      {/* Strengths Card - Icon-aligned rows */}
      <div className="rounded-[28px] bg-[#E8F5E9] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#1B5E20] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base font-medium text-[#1C1B1F]">Strengths</h3>
        </div>
        <div className="space-y-3 ml-[52px]">
          {result.match_analysis.strengths.slice(0, 4).map((strength, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#1C1B1F]">{strength}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions Card - Icon-aligned rows */}
      <div className="rounded-[28px] bg-[#FFF8E1] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#F9A825] flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base font-medium text-[#1C1B1F]">Suggestions</h3>
        </div>
        <div className="space-y-3 ml-[52px]">
          {result.match_analysis.improvement_areas.slice(0, 4).map((suggestion, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#F9A825] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-white font-medium">{idx + 1}</span>
              </div>
              <p className="text-sm text-[#1C1B1F]">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Gap Card */}
      {result.match_analysis.skills_gap?.length > 0 && (
        <div className="rounded-[28px] bg-[#EADDFF] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#6750A4] flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-medium text-[#1C1B1F]">Skills to Develop</h3>
          </div>
          <div className="flex flex-wrap gap-2 ml-[52px]">
            {result.match_analysis.skills_gap.map((skill, idx) => (
              <div
                key={idx}
                className="h-8 px-4 rounded-full bg-white text-[#6750A4] text-sm font-medium flex items-center"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extended FAB - Fixed at bottom */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={onReset}
          className="flex items-center gap-3 h-14 px-6 rounded-[16px] bg-[#EADDFF] text-[#21005D] font-medium shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <RefreshCw className="w-6 h-6" />
          Analyze Another Resume
        </button>
      </div>
    </div>
  )
}
