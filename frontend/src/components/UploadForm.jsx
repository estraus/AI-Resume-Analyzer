import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import FileUpload from './FileUpload'

export default function UploadForm({ onSubmit, isAnalyzing }) {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobUrl, setJobUrl] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!resumeFile) {
      alert('Please upload a resume')
      return
    }
    if (!jobUrl) {
      alert('Please enter a job URL')
      return
    }
    onSubmit({ resumeFile, jobUrl })
  }

  // Determine if label should float
  const shouldFloat = isFocused || jobUrl.length > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FileUpload
        onFileSelect={setResumeFile}
        selectedFile={resumeFile}
      />

      {/* Material Outlined Text Field with floating label */}
      <div className="relative">
        <input
          type="url"
          id="jobUrl"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          className={`
            w-full px-4 pt-5 pb-3 rounded-lg border-2 bg-white text-slate-900 text-base
            outline-none transition-all duration-200
            ${isFocused ? 'border-indigo-600' : 'border-slate-300'}
          `}
          required
        />
        <label
          htmlFor="jobUrl"
          className={`
            absolute left-3 px-1 bg-white pointer-events-none transition-all duration-200
            ${shouldFloat
              ? 'top-0 -translate-y-1/2 text-xs'
              : 'top-1/2 -translate-y-1/2 text-base'
            }
            ${isFocused ? 'text-indigo-600' : 'text-slate-500'}
          `}
        >
          Job Posting URL
        </label>
      </div>

      {/* Filled Tonal Pill Button - Full width, 48px height */}
      <button
        type="submit"
        disabled={isAnalyzing || !resumeFile}
        className={`
          w-full flex items-center justify-center gap-3 h-12 rounded-full font-medium text-base
          transition-all duration-200
          ${isAnalyzing || !resumeFile
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-md hover:shadow-lg'
          }
        `}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Analyze Resume
          </>
        )}
      </button>
    </form>
  )
}
