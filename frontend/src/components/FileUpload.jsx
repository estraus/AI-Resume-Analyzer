import { useState } from 'react'
import { Cloud, CheckCircle } from 'lucide-react'

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
    <div className="w-full mb-6">
      {/* Surface Variant upload zone with large centered icon */}
      <div
        className={`
          upload-zone relative rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer
          transition-all duration-300 ease-out
          ${dragActive
            ? 'border-indigo-500 bg-indigo-100'
            : selectedFile
              ? 'border-green-400 bg-green-50'
              : 'border-slate-300 bg-indigo-50/50 hover:bg-indigo-100/70 hover:border-indigo-400'
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
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center gap-4">
          {selectedFile ? (
            <>
              {/* Success state */}
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-base font-medium text-slate-900">{selectedFile.name}</p>
                <p className="text-sm text-slate-500 mt-1">Click or drop to replace</p>
              </div>
            </>
          ) : (
            <>
              {/* Large centered Material Icon in primary accent */}
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-base font-medium text-slate-900">
                  Drop your resume here
                </p>
                <p className="text-sm text-slate-500 mt-1">or click to browse • PDF only</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
