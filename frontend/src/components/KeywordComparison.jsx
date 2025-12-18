export default function KeywordComparison({ matched, missing }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        Keyword Analysis
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Matched Keywords */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
          <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Matched ({matched.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {matched.map((keyword, idx) => (
              <span
                key={idx}
                className="keyword-pill keyword-matched"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50">
          <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Missing ({missing.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {missing.map((keyword, idx) => (
              <span
                key={idx}
                className="keyword-pill keyword-missing"
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
