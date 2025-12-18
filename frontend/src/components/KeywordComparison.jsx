import { Check, X } from 'lucide-react'

export default function KeywordComparison({ matched, missing }) {
  // Convert arrays to the KeywordMatch format
  const keywords = [
    ...matched.map(keyword => ({ keyword, matched: true })),
    ...missing.map(keyword => ({ keyword, matched: false }))
  ]

  const matchPercentage = keywords.length > 0
    ? Math.round((matched.length / keywords.length) * 100)
    : 0

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          Keyword Match
        </h3>
        <span className="text-sm font-medium text-zinc-400">
          {matched.length}/{keywords.length} matched ({matchPercentage}%)
        </span>
      </div>

      {/* Matched Keywords */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2 flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-400" />
          Matched
        </h4>
        <div className="flex flex-wrap gap-2">
          {matched.map((keyword, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 transition-transform hover:scale-105"
            >
              <Check className="w-3 h-3" />
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Keywords */}
      <div>
        <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2 flex items-center gap-1">
          <X className="w-3 h-3 text-zinc-500" />
          Missing
        </h4>
        <div className="flex flex-wrap gap-2">
          {missing.map((keyword, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-zinc-800/50 text-zinc-400 border border-dashed border-zinc-600 transition-transform hover:scale-105"
            >
              <X className="w-3 h-3" />
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
