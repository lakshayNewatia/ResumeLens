import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { Eye } from 'lucide-react';
import UploadZone from './components/UploadZone.jsx';
import ProcessingScreen from './components/ProcessingScreen.jsx';
import ResultsPage from './components/ResultsPage.jsx';

function App() {
  const [step, setStep] = useState('upload'); // 'upload' | 'processing' | 'results'
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
    <div className="min-h-screen bg-[#0f0f0f] text-white font-body">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Eye className="w-8 h-8 text-accent" />
            <span className="text-3xl font-semibold tracking-tight font-heading">ResumeLens</span>
          </div>
          <div className="text-xs px-3 py-1.5 rounded-full bg-white/5 flex items-center gap-x-1.5">
            
            
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
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
                <h1 className="text-6xl font-semibold font-heading tracking-tighter mb-4">
                  Upload your resume.<br />
                  <span className="text-accent">Get brutally honest AI feedback.</span>
                </h1>
                <p className="text-lg text-white/60">Instant ATS scoring and expert suggestions.</p>
              </div>

              <UploadZone file={file} setFile={setFile} onAnalyse={handleAnalyse} />

              {error && (
                <div className="mt-8 max-w-md mx-auto bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-3xl text-center">
                  {error}
                </div>
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