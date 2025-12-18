import { Check } from 'lucide-react'

export default function KeywordComparison({ matched, missing }) {
  return (
    <div className="rounded-[28px] bg-slate-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-medium text-slate-900">Keywords</h3>
        <span className="text-sm text-slate-500">
          {matched.length} of {matched.length + missing.length} found
        </span>
      </div>

      {/* Matched - Filled tonal chips with checkmarks */}
      {matched.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Matched</p>
          <div className="flex flex-wrap gap-2">
            {matched.map((keyword, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-green-600 text-white text-sm font-medium"
              >
                <Check className="w-4 h-4" />
                {keyword}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing - Outlined chips */}
      {missing.length > 0 && (
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Missing</p>
          <div className="flex flex-wrap gap-2">
            {missing.map((keyword, idx) => (
              <div
                key={idx}
                className="inline-flex items-center h-8 px-3 rounded-full border border-slate-300 text-slate-600 text-sm font-medium bg-white"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
