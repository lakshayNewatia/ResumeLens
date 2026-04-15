import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function UploadZone({ file, setFile, onAnalyse }) {
  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0]
    if (selected) setFile(selected)
  }, [setFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  const removeFile = () => {
    setFile(null)
  }

  return (
    <div
      {...getRootProps()}
      className={`upload-zone border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
        isDragActive ? 'drag-active bg-accent/5' : 'border-white/20 hover:border-white/40'
      }`}
    >
      <input {...getInputProps()} />

      <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
        <Upload className="w-8 h-8 text-accent" />
      </div>

      <p className="text-2xl font-medium mb-2">
        {isDragActive ? 'Drop your resume here' : 'Drag & drop or click to upload'}
      </p>
      <p className="text-white/50 mb-8">PDF or DOCX • Max 5 MB</p>

      {file ? (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-x-4 bg-white/5 rounded-3xl px-6 py-4 mb-8"
        >
          <File className="w-5 h-5 text-accent" />
          <div className="text-left">
            <div className="font-medium">{file.name}</div>
            <div className="text-xs text-white/50">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); removeFile() }}
            className="ml-auto text-white/40 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      ) : null}

      <button
        onClick={(e) => { e.stopPropagation(); onAnalyse() }}
        disabled={!file}
        className={`px-10 py-5 rounded-3xl text-lg font-medium transition-all ${
          file
            ? 'bg-accent text-black hover:bg-white hover:scale-105'
            : 'bg-white/10 text-white/40 cursor-not-allowed'
        }`}
      >
        Analyse My Resume
      </button>
    </div>
  )
}