import { useState } from 'react'
import { Upload, CheckCircle, Cloud } from 'lucide-react'

export default function FileUpload({ onFileSelect, selectedFile }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === 'application/pdf') {
        onFileSelect(file)
      } else {
        alert('Please upload a PDF file')
      }
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        onFileSelect(file)
      } else {
        alert('Please upload a PDF file')
      }
    }
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-zinc-300 mb-3">
        Resume (PDF)
      </label>
      <div
        className={`
          relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer
          transition-all duration-200
          ${dragActive
            ? 'border-indigo-500 bg-indigo-500/10'
            : selectedFile
              ? 'border-emerald-500/50 bg-emerald-500/5'
              : 'border-zinc-700 hover:border-zinc-600 bg-zinc-800/50'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="space-y-3">
          {selectedFile ? (
            <>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">{selectedFile.name}</p>
                <p className="text-xs text-zinc-500 mt-1">Click or drag to replace</p>
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700">
                <Cloud className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-300">
                  <span className="font-medium text-indigo-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-zinc-500 mt-1">PDF files only</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
