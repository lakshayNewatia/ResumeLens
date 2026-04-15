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
      className={`group upload-zone border-2 border-dashed rounded-[2.5rem] p-16 text-center transition-all duration-500 cursor-pointer ${
        isDragActive 
          ? 'border-brand-blue bg-brand-lavender/40 shadow-[0_0_50px_rgba(246,255,53,0.4)]' 
          : 'border-black/10 hover:border-brand-blue/30 hover:bg-white hover:shadow-[0_0_60px_-25px_rgba(246,255,53,0.5)]'
      }`}
    >
      <input {...getInputProps()} />

      {/* Animated Icon Container */}
      <motion.div 
        whileHover={{ y: -5, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="mx-auto w-20 h-20 rounded-3xl bg-brand-lavender flex items-center justify-center mb-8 border border-brand-blue/10"
      >
        <Upload className={`w-10 h-10 transition-colors duration-300 ${isDragActive ? 'text-black' : 'text-brand-blue'}`} />
      </motion.div>

      <p className="text-2xl font-bold mb-2 text-black">
        {isDragActive ? 'Drop it here' : 'Drag & drop or click to upload'}
      </p>
      <p className="text-black/40 mb-10 text-base font-medium">PDF or DOCX • Max 5 MB</p>

      {file ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-x-5 bg-brand-lavender/50 border border-brand-blue/10 rounded-2xl px-6 py-4 mb-10 text-black shadow-sm"
        >
          <div className="p-2 bg-brand-blue/10 rounded-lg">
            <File className="w-6 h-6 text-brand-blue" />
          </div>
          <div className="text-left">
            <div className="font-bold truncate max-w-[200px]">{file.name}</div>
            <div className="text-sm text-black/50">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); removeFile() }}
            className="ml-4 p-1 rounded-full hover:bg-black/5 text-black/20 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      ) : null}

      <div className="flex justify-center">
        <button
          onClick={(e) => { e.stopPropagation(); onAnalyse() }}
          disabled={!file}
          className={`px-12 py-5 rounded-2xl text-xl font-bold transition-all duration-300 ${
            file
              ? 'bg-brand-blue text-white hover:shadow-lg hover:shadow-brand-blue/20 hover:-translate-y-0.5 active:scale-95'
              : 'bg-black/[0.03] text-black/20 cursor-not-allowed border border-black/[0.03]'
          }`}
        >
          Analyse My Resume
        </button>
      </div>
    </div>
  )
}
