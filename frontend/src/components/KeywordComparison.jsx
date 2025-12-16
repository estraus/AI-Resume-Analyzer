export default function KeywordComparison({ matched, missing }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Keyword Analysis</h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
            <span>✅</span> Matched Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {matched.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-2">
            <span>❌</span> Missing Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {missing.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
