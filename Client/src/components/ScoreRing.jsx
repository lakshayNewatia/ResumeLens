import { motion } from 'framer-motion';

export default function ScoreRing({ overallScore: rawScore, subScores }) {
  // Fix the "7 vs 70" issue: Normalize score to 100 for calculations
  const overallScore = rawScore <= 10 ? Math.round(rawScore * 10) : rawScore;

  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (overallScore / 100) * circumference;

  // Dynamic color for main ring (keeping your exact logic)
  const getColor = (score) => {
    // If we normalized, we check against 100, otherwise we check against 10
    const thresholdScore = rawScore <= 10 ? score / 10 : score;
    if (thresholdScore > 75 || (rawScore <= 10 && rawScore > 7.5)) return '#22c55e';
    if (thresholdScore >= 50 || (rawScore <= 10 && rawScore >= 5)) return '#eab308';
    return '#ef4444';
  };

  const ringColor = getColor(overallScore);

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-3xl p-10">
      <div className="flex flex-col items-center">
        
        {/* Wrap SVG and Score in a relative container to prevent "jumping" */}
        <div className="relative flex items-center justify-center">
          {/* Main Score Ring */}
          <svg width="220" height="220" className="transform -rotate-90">
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#F0F0F0"
              strokeWidth="18"
            />
            <motion.circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke={ringColor}
              strokeWidth="18"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>

          {/* Score Value - Centered properly using inset-0 flex */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-7xl font-semibold font-heading text-black tracking-tighter leading-none">
              {overallScore}
            </div>
            <div className="text-xs uppercase tracking-[1px] text-[#6E6E6E] mt-1">/ 100</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-[#6E6E6E]">ATS Compatibility Score</p>
        </div>

        {/* Sub-scores with Dynamic Colors */}
        <div className="mt-10 w-full max-w-[280px] space-y-5">
          {Object.entries(subScores).map(([key, value]) => {
            const label = key
              .replace('_', ' & ')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            const barColor = getColor(value);

            return (
              <div key={key} className="flex items-center gap-x-4">
                <div className="w-40 text-sm text-[#6E6E6E] font-medium">{label}</div>
                
                <div className="flex-1 h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    // Fix: Ensure bar fills correctly based on 1-10 or 1-100
                    animate={{ width: `${value <= 10 ? value * 10 : value}%` }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: barColor }}
                  />
                </div>

                <div className="font-mono text-sm w-10 text-right text-black font-medium">
                  {value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
