import { Flag } from 'lucide-react'
import { useDay } from '../hooks/useDay'
import { nextMilestone } from '../data/milestones'
import { formatCountdown, msUntilDay } from '../utils/time'

export default function NextMilestoneCard({ onOpen }) {
  const { day, now } = useDay()
  const next = nextMilestone(day)

  return (
    <button onClick={onOpen} className="glass flex w-full items-center gap-4 p-5 text-left transition hover:-translate-y-0.5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blush to-lav text-rose">
        <Flag size={22} />
      </div>
      <div className="min-w-0 flex-1">
        {next ? (
          <>
            <p className="text-xs uppercase tracking-widest text-mute">Next milestone</p>
            <p className="font-serif text-xl font-semibold text-ink">
              {next.days === 365 || next.days === 30 ? next.label : `${next.days} Days`} {next.emoji}
            </p>
            <p className="text-sm text-mute">in {formatCountdown(msUntilDay(next.days, now))}</p>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-widest text-mute">Every milestone</p>
            <p className="font-serif text-xl font-semibold text-ink">All unlocked 🎉</p>
          </>
        )}
      </div>
      <span className="text-sm font-medium text-wine">View →</span>
    </button>
  )
}
