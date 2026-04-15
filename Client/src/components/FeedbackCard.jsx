import { useState } from 'react';
import { ChevronDown, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function FeedbackCard({ type, title, items, iconColor }) {
  const [open, setOpen] = useState(true);

  let Icon = AlertCircle;
  let badgeColor = 'bg-red-100 text-red-700';

  if (type === 'suggested') {
    Icon = AlertTriangle;
    badgeColor = 'bg-amber-100 text-amber-700';
  }
  if (type === 'working') {
    Icon = CheckCircle2;
    badgeColor = 'bg-emerald-100 text-emerald-700';
  }

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-3xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#F8F9FA] transition-colors"
      >
        <div className="flex items-center gap-x-3">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <span className="font-semibold text-black">{title}</span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className={`text-xs px-4 py-1 rounded-2xl ${badgeColor}`}>
            {items.length}
          </span>
          <ChevronDown className={`w-4 h-4 text-[#6E6E6E] transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-[#E0E0E0]">
          <ul className="space-y-6 mt-6">
            {items.map((item, i) => (
              <li key={i} className="flex gap-x-4">
                <div className="text-[#A584FF] mt-1 text-lg">•</div>
                <div>
                  <p className="font-semibold text-black mb-1.5">{item.title}</p>
                  <p className="text-[#6E6E6E] text-[15px] leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
