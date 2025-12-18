import { useState } from 'react'
import { Zap, Loader2 } from 'lucide-react'
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

      <div>
        <label htmlFor="jobUrl" className="block text-sm font-medium text-zinc-300 mb-3">
          Job Posting URL
        </label>
        <input
          type="url"
          id="jobUrl"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          placeholder="https://company.com/careers/job-posting"
          className="w-full px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-800/50 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isAnalyzing || !resumeFile}
        className={`
          w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white
          transition-all duration-200
          ${isAnalyzing || !resumeFile
            ? 'bg-zinc-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30'
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
            <Zap className="w-5 h-5" />
            Analyze Resume
          </>
        )}
      </button>
    </form>
  )
}
