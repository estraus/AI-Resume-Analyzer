import { useState } from 'react'
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <FileUpload
        onFileSelect={setResumeFile}
        selectedFile={resumeFile}
      />

      <div>
        <label htmlFor="jobUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Job Posting URL
        </label>
        <input
          type="url"
          id="jobUrl"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          placeholder="https://example.com/job-posting"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isAnalyzing}
        className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
          isAnalyzing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
      </button>
    </form>
  )
}
