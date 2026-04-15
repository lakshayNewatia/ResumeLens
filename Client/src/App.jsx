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
    /* Changed bg-[#0f0f0f] to bg-brand-dark (#0E0E0E) */
    <div className="min-h-screen bg-brand-dark text-white font-body">
      {/* Header */}
      <header className="border-b border-brand-gray/20">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            {/* Logo Icon changed to brand-blue */}
            <Eye className="w-8 h-8 text-brand-blue" />
            <span className="text-3xl font-semibold tracking-tight font-heading">ResumeLens</span>
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
                <h1 className="text-6xl font-semibold font-heading tracking-tighter mb-4 text-white">
                  Upload your resume.<br />
                  {/* Changed text-accent to text-brand-blue (or text-brand-lime for high energy) */}
                  <span className="text-brand-blue">Get brutally honest AI feedback.</span>
                </h1>
                {/* Changed text color to our light gray */}
                <p className="text-lg text-brand-light">Instant ATS scoring and expert suggestions.</p>
              </div>

              {/* This component needs internal color updates too! */}
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
