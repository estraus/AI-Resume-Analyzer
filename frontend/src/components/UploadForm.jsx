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

      <div>
        <label htmlFor="jobUrl" className="block text-sm font-medium text-[#49454F] mb-2">
          Job Posting URL
        </label>
        <input
          type="url"
          id="jobUrl"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          placeholder="https://company.com/careers/job"
          className="w-full px-4 py-4 rounded-[16px] border border-[#CAC4D0] bg-white text-[#1C1B1F] placeholder-[#79747E] focus:outline-none focus:border-[#6750A4] focus:ring-2 focus:ring-[#6750A4]/20 transition-all"
          required
        />
      </div>

      {/* Material Design 3 Filled Button */}
      <button
        type="submit"
        disabled={isAnalyzing || !resumeFile}
        className={`
          w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full font-medium text-base
          transition-all duration-200
          ${isAnalyzing || !resumeFile
            ? 'bg-[#E7E0EC] text-[#1C1B1F]/38 cursor-not-allowed'
            : 'bg-[#6750A4] text-white hover:bg-[#7965AF] shadow-md hover:shadow-lg active:shadow-sm'
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
