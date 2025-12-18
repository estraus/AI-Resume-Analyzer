import { Check, X } from 'lucide-react'

/**
 * KeywordMatch - Premium AI SaaS style keyword pill cluster
 * @param {Array<{keyword: string, matched: boolean}>} keywords - List of keywords with match status
 */
export default function KeywordMatch({ keywords = [] }) {
    const matchedCount = keywords.filter(k => k.matched).length
    const totalCount = keywords.length
    const matchPercentage = totalCount > 0 ? Math.round((matchedCount / totalCount) * 100) : 0

    return (
        <div className="rounded-2xl border border-white/20 bg-white/50 backdrop-blur-md p-6 shadow-sm">
            {/* Header with gradient text */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    Keyword Match
                </h3>
                <span className="text-sm font-medium text-zinc-500">
                    {matchedCount}/{totalCount} matched ({matchPercentage}%)
                </span>
            </div>

            {/* Keyword pills cluster */}
            <div className="flex flex-wrap gap-2">
                {keywords.map((item, index) => (
                    <div
                        key={index}
                        className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
              transition-all duration-200 hover:scale-105
              ${item.matched
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                : 'bg-zinc-50 text-zinc-500 border border-dashed border-zinc-300'
                            }
            `}
                    >
                        {item.matched ? (
                            <Check className="w-3.5 h-3.5" />
                        ) : (
                            <X className="w-3.5 h-3.5" />
                        )}
                        {item.keyword}
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {keywords.length === 0 && (
                <p className="text-sm text-zinc-400 text-center py-4">
                    No keywords to analyze
                </p>
            )}
        </div>
    )
}
