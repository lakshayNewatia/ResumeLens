export default function RewriteCard({ suggestion }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Before - Red tint */}
      <div className="bg-red-50 border border-red-200 rounded-3xl p-7">
        <div className="uppercase text-xs font-semibold text-red-600 mb-3 tracking-widest">Before</div>
        <div className="text-[#000000] text-[15px] leading-relaxed">
          {suggestion.before}
        </div>
        <div className="text-xs text-[#A5A5A5] mt-6">{suggestion.section}</div>
      </div>

      {/* After - Green tint (as requested) */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-7 relative">
        <div className="uppercase text-xs font-semibold text-emerald-600 mb-3 tracking-widest">After (Improved)</div>
        <div className="text-[#000000] text-[15px] leading-relaxed">
          {suggestion.after}
        </div>
        <div className="text-xs text-[#6E6E6E] mt-6">{suggestion.section}</div>
        
        {/* Small decorative element */}
        <div className="absolute top-6 right-6 text-emerald-500 text-xl">✦</div>
      </div>
    </div>
  );
}
