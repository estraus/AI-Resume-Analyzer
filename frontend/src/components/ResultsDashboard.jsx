import ScoreCard from './ScoreCard'
import KeywordComparison from './KeywordComparison'

export default function ResultsDashboard({ result, onReset }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Analysis Complete</h2>
        <p className="text-gray-600">Here's how your resume performed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ScoreCard
          title="Resume Quality Score"
          score={result.resume_quality_score}
          subtitle="Overall resume effectiveness"
        />
        <ScoreCard
          title="Job Match Score"
          score={result.job_match_score}
          subtitle="How well you match this role"
        />
      </div>

      <KeywordComparison
        matched={result.match_analysis.keyword_analysis.matched_keywords}
        missing={result.match_analysis.keyword_analysis.missing_keywords}
      />

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Improvement Suggestions</h3>
        <ul className="space-y-2">
          {result.match_analysis.improvement_areas.map((suggestion, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">💡</span>
              <span className="text-gray-700">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onReset}
        className="mt-8 w-full py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
      >
        Analyze Another Resume
      </button>
    </div>
  )
}
