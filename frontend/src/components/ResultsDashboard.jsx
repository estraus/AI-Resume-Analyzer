import ScoreCard from './ScoreCard'
import KeywordComparison from './KeywordComparison'

export default function ResultsDashboard({ result, onReset }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Analysis Complete!</h2>
        <p className="text-gray-600">Here's how your resume performed</p>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up stagger-1">
        <ScoreCard
          title="Resume Quality"
          score={result.resume_quality_score}
          subtitle="Overall resume effectiveness"
        />
        <ScoreCard
          title="Job Match"
          score={result.job_match_score}
          subtitle="How well you match this role"
        />
      </div>

      {/* Keyword Analysis */}
      <div className="fade-in-up stagger-2">
        <KeywordComparison
          matched={result.match_analysis.keyword_analysis.matched_keywords}
          missing={result.match_analysis.keyword_analysis.missing_keywords}
        />
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up stagger-3">
        {/* Strengths */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            Your Strengths
          </h3>
          <ul className="space-y-3">
            {result.match_analysis.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Improvement Suggestions
          </h3>
          <ul className="space-y-3">
            {result.match_analysis.improvement_areas.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">💡</span>
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skills Gap */}
      {result.match_analysis.skills_gap.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 fade-in-up stagger-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Skills to Develop
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.match_analysis.skills_gap.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white rounded-lg text-gray-700 text-sm font-medium shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="text-center pt-4 fade-in-up">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Analyze Another Resume
        </button>
      </div>
    </div>
  )
}
