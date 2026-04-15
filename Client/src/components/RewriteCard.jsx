export default function RewriteCard({ suggestion }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Before */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-6">
        <div className="uppercase text-xs font-medium text-red-400 mb-2 tracking-widest">Before</div>
        <div className="text-white/80 text-[15px] leading-relaxed">
          {suggestion.before}
        </div>
        <div className="text-xs text-white/40 mt-4">{suggestion.section}</div>
      </div>

      {/* After */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-6">
        <div className="uppercase text-xs font-medium text-emerald-400 mb-2 tracking-widest">After</div>
        <div className="text-white/80 text-[15px] leading-relaxed">
          {suggestion.after}
        </div>
        <div className="text-xs text-white/40 mt-4">{suggestion.section}</div>
      </div>
    </div>
  )
}