import { Copy, RotateCcw } from 'lucide-react';
import ScoreRing from './ScoreRing.jsx';
import FeedbackCard from './FeedbackCard.jsx';
import RewriteCard from './RewriteCard.jsx';

export default function ResultsPage({ results, onReset }) {
  const copyReport = () => {
    const reportText = `ResumeLens Analysis\nOverall Score: ${results.overall_score}/100\n\n${results.summary}`;
    navigator.clipboard.writeText(reportText).then(() => alert('✅ Report copied!'));
  };

  return (
    <>
      <div className="flex justify-between items-baseline mb-8">
        <h1 className="text-4xl font-semibold font-heading text-black">Your Resume Analysis</h1>
        <div className="flex gap-x-3">
          <button onClick={copyReport} className="flex items-center gap-x-2 px-6 h-12 rounded-3xl border border-[#E0E0E0] hover:bg-[#F0F0F0] transition-colors">
            <Copy className="w-4 h-4" /> Copy Full Report
          </button>
          <button onClick={onReset} className="flex items-center gap-x-2 px-6 h-12 rounded-3xl border border-[#E0E0E0] hover:bg-[#F0F0F0]">
            <RotateCcw className="w-4 h-4" /> Analyse Another
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Score Panel */}
        <div className="xl:col-span-5">
          <ScoreRing overallScore={results.overall_score} subScores={results.sub_scores} />
        </div>

        {/* Feedback */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-white border border-[#E0E0E0] rounded-3xl p-8 text-lg leading-relaxed text-black">
            {results.summary}
          </div>

          <FeedbackCard type="critical" title="Critical Issues" items={results.critical_issues} iconColor="text-red-500" />
          <FeedbackCard type="suggested" title="Suggested Improvements" items={results.suggested_improvements} iconColor="text-amber-500" />
          <FeedbackCard type="working" title="What's Working Well" items={results.whats_working} iconColor="text-emerald-500" />

          {/* Missing Keywords */}
          <div className="bg-white border border-[#E0E0E0] rounded-3xl p-8">
            <h3 className="font-semibold text-xl mb-6 flex items-center gap-3">
              <span>🎯</span> Missing ATS Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {results.missing_keywords.map((kw, i) => (
                <span key={i} className="px-5 py-2 bg-[#EFE7FD] text-[#A584FF] text-sm font-medium rounded-3xl border border-[#CEB6F9]/30">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Rewrite Suggestions */}
          <div className="bg-white border border-[#E0E0E0] rounded-3xl p-8">
            <h3 className="font-semibold text-xl mb-6 flex items-center gap-3">
              <span>📝</span> Rewrite Suggestions
            </h3>
            <div className="space-y-8">
              {results.rewrite_suggestions.map((s, i) => (
                <RewriteCard key={i} suggestion={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
