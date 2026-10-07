import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { MILESTONES, nextMilestone } from '../data/milestones'
import { useDay } from '../hooks/useDay'
import { dateForDay, formatCountdown, formatDate, msUntilDay } from '../utils/time'

export default function Milestones() {
  const { day, now } = useDay()
  const next = nextMilestone(day)

  return (
    <div className="space-y-4">
      <div className="glass p-5 text-center md:p-7">
        {next ? (
          <>
            <p className="eyebrow">Next milestone</p>
            <p className="mt-2 font-serif text-3xl font-semibold">
              {next.days} Days {next.emoji}
            </p>
            <p className="mt-1 text-sm text-mute">
              {next.days - day} {next.days - day === 1 ? 'day' : 'days'} to go · in {formatCountdown(msUntilDay(next.days, now))}
            </p>
          </>
        ) : (
          <p className="font-serif text-2xl font-semibold">Every milestone unlocked 🎉</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MILESTONES.map((m, i) => {
          const unlocked = day >= m.days
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`relative flex min-h-[170px] flex-col rounded-3xl border p-4 ${
                unlocked
                  ? 'border-white/80 bg-gradient-to-br from-white/80 to-blush/70 shadow-glass'
                  : 'border-white/50 bg-white/35'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-3xl ${unlocked ? '' : 'opacity-40 grayscale'}`}>{m.emoji}</span>
                {!unlocked && <Lock size={16} className="text-mute" />}
              </div>
              <p className="mt-3 font-serif text-xl font-semibold">{m.label}</p>
              {unlocked ? (
                <>
                  <p className="mt-1 text-[13px] leading-snug text-ink/80">{m.text}</p>
                  <p className="mt-auto pt-2 text-[11px] text-wine">Unlocked · {formatDate(dateForDay(m.days))}</p>
                </>
              ) : (
                <>
                  <p className="mt-1 text-sm text-mute">Coming soon...</p>
                  <p className="mt-auto pt-2 text-[11px] text-mute">Day {m.days}</p>
                </>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
