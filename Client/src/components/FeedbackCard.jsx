import { useState } from 'react'
import { ChevronDown, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function FeedbackCard({ type, title, items, iconColor }) {
  const [open, setOpen] = useState(true)

  let Icon = AlertCircle
  let badgeColor = 'bg-red-500'

  if (type === 'suggested') {
    Icon = AlertTriangle
    badgeColor = 'bg-amber-500'
  }
  if (type === 'working') {
    Icon = CheckCircle2
    badgeColor = 'bg-emerald-500'
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-x-3">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className={`text-xs px-3 py-1 rounded-2xl text-white ${badgeColor}`}>{items.length}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-white/10">
          <ul className="space-y-6 mt-6">
            {items.map((item, i) => (
              <li key={i} className="flex gap-x-4">
                <div className="text-accent mt-1">•</div>
                <div>
                  <p className="font-medium mb-1">{item.title}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
