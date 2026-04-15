import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const statusMessages = [
  "Reading your resume...",
  "Checking ATS compatibility...",
  "Analysing structure & keywords...",
  "Generating rewrite suggestions...",
  "Almost there..."
];

export default function ProcessingScreen() {
  return (
    <div className="max-w-md mx-auto text-center pt-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="mx-auto w-20 h-20 rounded-3xl bg-[#EFE7FD] flex items-center justify-center mb-10"
      >
        <Eye className="w-10 h-10 text-[#A584FF]" />
      </motion.div>

      <div className="h-2 bg-[#F0F0F0] rounded-3xl overflow-hidden mb-8">
        <motion.div
          initial={{ width: '20%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
          className="h-full bg-[#A584FF] rounded-3xl"
        />
      </div>

      <motion.p
        className="text-lg font-medium text-black"
      >
        {statusMessages[Math.floor(Math.random() * statusMessages.length)]}
      </motion.p>

      <p className="text-sm text-[#6E6E6E] mt-2">This usually takes 8–12 seconds</p>
    </div>
  );
}
