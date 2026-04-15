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
      className={`group upload-zone border-2 border-dashed rounded-[2.5rem] p-16 text-center transition-all duration-300 cursor-pointer ${
        isDragActive 
          ? 'border-brand-blue bg-brand-blue/5' 
          : 'border-brand-gray/20 hover:border-brand-blue/40 hover:bg-white/[0.02]'
      }`}
    >
      <input {...getInputProps()} />

      {/* Animated Icon Container */}
      <motion.div 
        whileHover={{ y: -8, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="mx-auto w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-brand-blue/30 transition-colors"
      >
        <Upload className={`w-10 h-10 transition-colors duration-300 ${isDragActive ? 'text-brand-lime' : 'text-brand-blue'}`} />
      </motion.div>

      <p className="text-2xl font-semibold mb-2 text-white/90">
        {isDragActive ? 'Drop it here' : 'Drag & drop or click to upload'}
      </p>
      <p className="text-brand-light/60 mb-10 text-base">PDF or DOCX • Max 5 MB</p>

      {file ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-x-5 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 mb-10 shadow-xl"
        >
          <div className="p-2 bg-brand-blue/10 rounded-lg">
            <File className="w-6 h-6 text-brand-blue" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-white truncate max-w-[200px]">{file.name}</div>
            <div className="text-sm text-brand-light/70">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); removeFile() }}
            className="ml-4 p-1 rounded-full hover:bg-white/10 text-white/30 hover:text-red-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      ) : null}

      <div className="flex justify-center">
        <button
          onClick={(e) => { e.stopPropagation(); onAnalyse() }}
          disabled={!file}
          className={`px-12 py-5 rounded-2xl text-xl font-bold transition-all duration-300 transform ${
            file
              ? 'bg-brand-purple text-black hover:bg-brand-lavender hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(165,132,255,0.4)] active:scale-95'
              : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
          }`}
        >
          Analyse My Resume
        </button>
      </div>
    </div>
  )
}
