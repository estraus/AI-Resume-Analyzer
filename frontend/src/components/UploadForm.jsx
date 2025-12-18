import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import FileUpload from './FileUpload'

export default function UploadForm({ onSubmit, isAnalyzing }) {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobUrl, setJobUrl] = useState('')

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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FileUpload
        onFileSelect={setResumeFile}
        selectedFile={resumeFile}
      />

      {/* URL Input */}
      <input
        type="url"
        value={jobUrl}
        onChange={(e) => setJobUrl(e.target.value)}
        placeholder="Paste job posting URL here..."
        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-base outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
        required
      />

      {/* Purple Gradient Button */}
      <button
        type="submit"
        disabled={isAnalyzing || !resumeFile}
        className={`
          w-full flex items-center justify-center gap-2 h-14 rounded-xl font-semibold text-base
          transition-all duration-200
          ${isAnalyzing || !resumeFile
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-200'
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
