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
    <form onSubmit={handleSubmit} className="space-y-8">
      <FileUpload
        onFileSelect={setResumeFile}
        selectedFile={resumeFile}
      />

      <div>
        <label htmlFor="jobUrl" className="block text-sm font-semibold text-gray-700 mb-3">
          🔗 Job Posting URL
        </label>
        <input
          type="url"
          id="jobUrl"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          placeholder="https://company.com/careers/job-posting"
          className="input-modern"
          required
        />
        <p className="mt-2 text-sm text-gray-500">
          Paste the URL of the job you're applying for
        </p>
      </div>

      <button
        type="submit"
        disabled={isAnalyzing || !resumeFile}
        className={`btn-gradient w-full flex items-center justify-center gap-3 ${!resumeFile ? 'opacity-60' : ''
          }`}
      >
        {isAnalyzing ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Analyze Resume
          </>
        )}
      </button>

      {!resumeFile && (
        <p className="text-center text-sm text-gray-500">
          Upload your resume to get started
        </p>
      )}
    </form>
  )
}
