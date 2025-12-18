import { Check, X } from 'lucide-react'

export default function KeywordComparison({ matched, missing }) {
  const matchPercentage = (matched.length + missing.length) > 0
    ? Math.round((matched.length / (matched.length + missing.length)) * 100)
    : 0

  return (
    <div className="rounded-[28px] bg-[#F3EDF7] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-medium text-[#1C1B1F]">
          Keywords
        </h3>
        <span className="text-sm text-[#49454F]">
          {matched.length}/{matched.length + missing.length} matched
        </span>
      </div>

      {/* Matched Keywords - Filled/Tonal Chips */}
      <div className="mb-5">
        <p className="text-xs font-medium text-[#49454F] uppercase tracking-wide mb-3 flex items-center gap-1">
          <Check className="w-3 h-3 text-[#1B5E20]" />
          Matched
        </p>
        <div className="flex flex-wrap gap-2">
          {matched.map((keyword, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#1B5E20] text-white text-sm font-medium"
            >
              <Check className="w-4 h-4" />
              {keyword}
            </div>
          ))}
        </div>
      </div>

      {/* Missing Keywords - Outlined Chips */}
      <div>
        <p className="text-xs font-medium text-[#49454F] uppercase tracking-wide mb-3 flex items-center gap-1">
          <X className="w-3 h-3 text-[#79747E]" />
          Missing
        </p>
        <div className="flex flex-wrap gap-2">
          {missing.map((keyword, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#79747E] text-[#49454F] text-sm font-medium bg-transparent"
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
