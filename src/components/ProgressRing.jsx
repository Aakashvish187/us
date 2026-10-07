import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

// Circular progress toward the next milestone, with the current day in the middle.
export default function ProgressRing({ day, target, size = 220 }) {
  const stroke = 12
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const progress = Math.min(1, day / target)

  return (
    <div className="relative mx-auto grid place-items-center" style={{ width: size, height: size }}>
      <div className="absolute inset-3 rounded-full bg-white/50 blur-xl" />
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f08ca5" />
            <stop offset="55%" stopColor="#b3263e" />
            <stop offset="100%" stopColor="#7a4cc0" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(224,89,122,0.15)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - progress) }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-hand text-2xl leading-none text-rose">Day</span>
        <span className="font-serif text-7xl font-semibold leading-none text-ink">{day}</span>
        <Heart size={18} className="mt-1.5 text-wine" fill="currentColor" />
      </div>
    </div>
  )
}
