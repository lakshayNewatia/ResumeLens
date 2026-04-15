import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UploadZone({ file, setFile, onAnalyse }) {
  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (selected) setFile(selected);
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  const removeFile = () => setFile(null);

  return (
    <div
      {...getRootProps()}
      className={`group upload-zone border-2 border-dashed rounded-[2.5rem] p-16 text-center transition-all duration-500 cursor-pointer bg-white
        ${isDragActive 
          ? 'border-[#A584FF] bg-[#EFE7FD] shadow-[0_0_50px_rgba(165,132,255,0.25)]' 
          : 'border-[#E0E0E0] hover:border-[#A584FF]/50 hover:bg-[#F8F9FA]'
        }`}
    >
      <input {...getInputProps()} />

      {/* Animated Icon Container */}
      <motion.div 
        whileHover={{ y: -5, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="mx-auto w-20 h-20 rounded-3xl bg-[#F0F0F0] flex items-center justify-center mb-8 border border-[#A584FF]/10"
      >
        <Upload className={`w-10 h-10 transition-colors duration-300 ${isDragActive ? 'text-[#A584FF]' : 'text-[#A584FF]'}`} />
      </motion.div>

      <p className="text-2xl font-bold mb-2 text-black">
        {isDragActive ? 'Drop it here' : 'Drag & drop or click to upload'}
      </p>
      <p className="text-black/50 mb-10 text-base font-medium">PDF or DOCX • Max 5 MB</p>

      {file ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-x-5 bg-white border border-[#E0E0E0] rounded-2xl px-6 py-4 mb-10 text-black shadow-sm"
        >
          <div className="p-3 bg-[#EFE7FD] rounded-xl">
            <File className="w-6 h-6 text-[#A584FF]" />
          </div>
          <div className="text-left">
            <div className="font-bold truncate max-w-[240px]">{file.name}</div>
            <div className="text-sm text-black/50">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); removeFile(); }}
            className="ml-4 p-2 rounded-full hover:bg-red-50 text-black/30 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      ) : null}

      <div className="flex justify-center">
        <button
          onClick={(e) => { e.stopPropagation(); onAnalyse(); }}
          disabled={!file}
          className={`px-14 py-5 rounded-2xl text-xl font-bold transition-all duration-300 ${
            file
              ? 'bg-[#A584FF] text-white hover:shadow-xl hover:shadow-[#A584FF]/30 hover:-translate-y-0.5 active:scale-[0.97]'
              : 'bg-[#F0F0F0] text-black/30 cursor-not-allowed border border-black/5'
          }`}
        >
          Analyse My Resume
        </button>
      </div>
    </div>
  );
}
