import { motion } from 'framer-motion';

export default function ScoreRing({ overallScore: rawScore, subScores }) {
  // FIX: Normalizes score. If 1-10 (like 8.2), it converts to 1-100 (82).
  // This fixes the "7/100" issue and the red color.
  const overallScore = rawScore <= 10 ? Math.round(rawScore * 10) : Math.round(rawScore);

  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (overallScore / 100) * circumference;

  // Color now reflects the true percentage (Green for > 75)
  const ringColor =
    overallScore > 75 ? '#22c55e' :
    overallScore >= 50 ? '#eab308' : '#ef4444';

  return (
    <div className="flex flex-col items-center">
      {/* Ring & Center Score */}
      <div className="relative flex items-center justify-center">
        <svg width="240" height="240" className="transform -rotate-90">
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="#27272a"
            strokeWidth="16"
          />
          <motion.circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="16"
            strokeDasharray={circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          />
        </svg>

        {/* Centered Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center leading-none">
            <span className="text-7xl font-bold font-heading text-white tracking-tighter">
              {overallScore}
            </span>
            <span className="text-sm font-medium uppercase tracking-[2px] text-white/40 mt-2">
              / 100
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-white/70">ATS Compatibility Score</p>
      </div>

      {/* Sub-scores Section */}
      <div className="mt-10 w-full max-w-[300px] space-y-5">
        {Object.entries(subScores).map(([key, value]) => {
          const label = key
            .replace('_', ' & ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
          return (
            <div key={key} className="flex items-center gap-x-4">
              <div className="w-32 text-xs text-white/50 font-semibold uppercase tracking-wider">
                {label}
              </div>
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value * 10}%` }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: ringColor }}
                />
              </div>
              <div className="font-mono text-sm w-6 text-right text-white/80">{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}