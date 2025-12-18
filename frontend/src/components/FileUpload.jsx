import { useState } from 'react'
import { Upload, CheckCircle } from 'lucide-react'

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
      <label className="block text-sm font-medium text-[#49454F] mb-2">
        Resume (PDF)
      </label>
      <div
        className={`
          relative rounded-[16px] border-2 border-dashed p-8 text-center cursor-pointer
          transition-all duration-200
          ${dragActive
            ? 'border-[#6750A4] bg-[#EADDFF]'
            : selectedFile
              ? 'border-[#1B5E20] bg-[#E8F5E9]'
              : 'border-[#CAC4D0] bg-[#F3EDF7] hover:bg-[#EADDFF]'
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
          {selectedFile ? (
            <>
              <div className="w-12 h-12 rounded-full bg-[#1B5E20] flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1C1B1F]">{selectedFile.name}</p>
                <p className="text-xs text-[#49454F] mt-1">Tap to replace</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-[#6750A4] flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1C1B1F]">
                  Drop your resume here
                </p>
                <p className="text-xs text-[#49454F] mt-1">or tap to browse</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
