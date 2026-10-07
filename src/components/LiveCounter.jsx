import { useNow } from '../hooks/useNow'
import { getElapsed, pad } from '../utils/time'

// Live "Together for N days, X hours, Y minutes", computed from START_DATE.
export default function LiveCounter() {
  const now = useNow(1000)
  const { days, hours, minutes, seconds } = getElapsed(now)

  return (
    <div className="glass px-5 py-5 text-center">
      <p className="text-sm text-mute">
        Together for{' '}
        <span className="font-semibold text-wine">
          {days} {days === 1 ? 'day' : 'days'}, {hours} {hours === 1 ? 'hour' : 'hours'}, {minutes}{' '}
          {minutes === 1 ? 'minute' : 'minutes'}
        </span>
      </p>
      <div className="mt-3 flex items-center justify-center gap-2 font-serif tabular-nums text-ink">
        {[
          [days, 'days'],
          [pad(hours), 'hrs'],
          [pad(minutes), 'min'],
          [pad(seconds), 'sec'],
        ].map(([v, l], i) => (
          <div key={l} className="flex items-center gap-2">
            {i > 0 && <span className="text-xl text-rose/60">:</span>}
            <div className="min-w-[3.25rem]">
              <div className="text-3xl font-semibold leading-none">{v}</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-mute">{l}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
