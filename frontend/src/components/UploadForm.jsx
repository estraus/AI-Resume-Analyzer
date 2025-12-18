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
    <form onSubmit={handleSubmit} className="space-y-6">
      <FileUpload
        onFileSelect={setResumeFile}
        selectedFile={resumeFile}
      />

      {/* Simple input with placeholder text inside */}
      <input
        type="url"
        value={jobUrl}
        onChange={(e) => setJobUrl(e.target.value)}
        placeholder="Paste job posting URL here..."
        className="w-full px-4 py-4 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        required
      />

      {/* Pill Button */}
      <button
        type="submit"
        disabled={isAnalyzing || !resumeFile}
        className={`
          w-full flex items-center justify-center gap-3 h-12 rounded-full font-medium text-base
          transition-all duration-200
          ${isAnalyzing || !resumeFile
            ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
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
