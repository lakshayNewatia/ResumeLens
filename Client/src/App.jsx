import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { Eye } from 'lucide-react';
import UploadZone from './components/UploadZone.jsx';
import ProcessingScreen from './components/ProcessingScreen.jsx';
import ResultsPage from './components/ResultsPage.jsx';

function App() {
  const [step, setStep] = useState('upload'); 
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyse = async () => {
    if (!file) return;
    setStep('processing');
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await axios.post('http://localhost:5000/api/analyse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResults(res.data);
      setStep('results');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      setStep('upload');
    }
  };

  const resetApp = () => {
    setFile(null);
    setResults(null);
    setError(null);
    setStep('upload');
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-body selection:bg-brand-blue/30">
      {/* Header */}
      <header className="border-b border-brand-gray/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Eye className="w-8 h-8 text-brand-blue" />
            <span className="text-2xl font-bold tracking-tight font-heading">ResumeLens</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="flex flex-col font-heading tracking-tighter mb-4">
                  <span className="text-4xl md:text-5xl font-medium text-white/70 mb-2">
                    Upload your resume.
                  </span>
                  <span className="text-6xl md:text-7xl font-bold text-brand-blue leading-[1.1]">
                    Get brutally honest AI feedback.
                  </span>
                </h1>
                <p className="text-xl text-brand-light font-light">
                  Instant ATS scoring and expert suggestions.
                </p>
              </div>

              <UploadZone file={file} setFile={setFile} onAnalyse={handleAnalyse} />

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 max-w-md mx-auto bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl text-center"
                >
                  {error}
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 'processing' && <ProcessingScreen />}

          {step === 'results' && results && (
            <ResultsPage results={results} onReset={resetApp} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
