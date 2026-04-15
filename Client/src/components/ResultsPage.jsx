import { Copy, RotateCcw } from 'lucide-react'
import ScoreRing from './ScoreRing.jsx'
import FeedbackCard from './FeedbackCard.jsx'
import RewriteCard from './RewriteCard.jsx'

export default function ResultsPage({ results, onReset }) {
  const copyReport = () => {
    const reportText = `
ResumeLens Analysis
Overall Score: ${results.overall_score}/100

Summary: ${results.summary}

Critical Issues: ${results.critical_issues.map(i => `\n• ${i.title} — ${i.description}`).join('')}
Suggested Improvements: ${results.suggested_improvements.map(i => `\n• ${i.title} — ${i.description}`).join('')}
    `.trim()

    navigator.clipboard.writeText(reportText).then(() => {
      alert('✅ Full report copied to clipboard!')
    })
  }

  return (
    <>
      <div className="flex justify-between items-baseline mb-8">
        <h1 className="text-4xl font-semibold font-heading">Your Resume Analysis</h1>
        <div className="flex gap-x-3">
          <button
            onClick={copyReport}
            className="flex items-center gap-x-2 px-6 h-12 rounded-3xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy Full Report
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-x-2 px-6 h-12 rounded-3xl border border-white/30 hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Analyse Another
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT COLUMN - SCORE */}
        <div className="xl:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 xl:p-10">
          <ScoreRing
            overallScore={results.overall_score}
            subScores={results.sub_scores}
          />
        </div>

        {/* RIGHT COLUMN - FEEDBACK */}
        <div className="xl:col-span-7 space-y-6">
          {/* Summary */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-lg leading-relaxed">
            {results.summary}
          </div>

          {/* Critical Issues */}
          <FeedbackCard
            type="critical"
            title="Critical Issues"
            items={results.critical_issues}
            iconColor="text-red-400"
          />

          {/* Suggested Improvements */}
          <FeedbackCard
            type="suggested"
            title="Suggested Improvements"
            items={results.suggested_improvements}
            iconColor="text-amber-400"
          />

          {/* What's Working */}
          <FeedbackCard
            type="working"
            title="What's Working Well"
            items={results.whats_working}
            iconColor="text-emerald-400"
          />

          {/* Missing Keywords */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-x-3 mb-6">
              <span className="text-xl">🎯</span>
              <h3 className="font-semibold text-xl">Missing ATS Keywords</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {results.missing_keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-5 h-9 bg-accent/10 text-accent text-sm font-medium rounded-3xl border border-accent/30"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Rewrite Suggestions */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-x-3 mb-6">
              <span className="text-xl">📝</span>
              <h3 className="font-semibold text-xl">Rewrite Suggestions</h3>
            </div>
            <div className="space-y-8">
              {results.rewrite_suggestions.map((suggestion, i) => (
                <RewriteCard key={i} suggestion={suggestion} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}