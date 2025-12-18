import { useState } from 'react'
import { FileText, X } from 'lucide-react'

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

  const handleRemove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onFileSelect(null)
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="w-full mb-6">
      <div
        className={`
          relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer
          transition-all duration-200
          ${dragActive
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-indigo-200 bg-white hover:border-indigo-300'
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

        <div className="flex flex-col items-center gap-3">
          {/* File icon */}
          <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
            <FileText className="w-7 h-7 text-indigo-500" />
          </div>

          {selectedFile ? (
            <>
              <div>
                <p className="text-base font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
              <button
                onClick={handleRemove}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
                Remove file
              </button>
            </>
          ) : (
            <div>
              <p className="text-base font-medium text-gray-700">
                Drop your resume here
              </p>
              <p className="text-sm text-gray-400">or click to browse</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
