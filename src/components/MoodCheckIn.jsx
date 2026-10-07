import { motion } from 'framer-motion'
import { MOODS, moodById } from '../data/moods'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { todayKey } from '../utils/time'

function lastSevenDays() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return { key: todayKey(d), label: d.toLocaleDateString('en-IN', { weekday: 'short' }).slice(0, 3) }
  })
}

export default function MoodCheckIn() {
  const [moods, setMoods] = useLocalStorage('moods', {})
  const today = todayKey()
  const current = moodById(moods[today])
  const week = lastSevenDays()

  return (
    <div className="space-y-4">
      <div className="glass p-5 md:p-7">
        <p className="eyebrow">Mood check-in</p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">How are you feeling today?</h3>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MOODS.map((m) => {
            const on = moods[today] === m.id
            return (
              <motion.button
                key={m.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMoods((prev) => ({ ...prev, [today]: m.id }))}
                className={`flex min-h-[84px] flex-col items-center justify-center gap-1 rounded-2xl border transition ${
                  on
                    ? 'border-transparent bg-gradient-to-br from-rose to-wine text-white shadow-soft'
                    : 'border-rose/20 bg-white/60 hover:bg-white/90'
                }`}
              >
                <span className="text-3xl">{m.emoji}</span>
                <span className="text-sm font-medium">{m.label}</span>
              </motion.button>
            )
          })}
        </div>

        {current && (
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-center font-serif text-base italic text-mute"
          >
            {current.reply}
          </motion.p>
        )}
      </div>

      <div className="glass p-5">
        <p className="eyebrow mb-3">This week</p>
        <div className="grid grid-cols-7 gap-1.5">
          {week.map((d) => {
            const m = moodById(moods[d.key])
            const isToday = d.key === today
            return (
              <div key={d.key} className="flex flex-col items-center gap-1.5">
                <div
                  title={m ? m.label : 'No check-in'}
                  className={`grid h-11 w-full max-w-[3rem] place-items-center rounded-2xl text-xl ${
                    m ? 'bg-white/80 shadow-sm' : 'border border-dashed border-rose/25 bg-white/30'
                  } ${isToday ? 'ring-2 ring-rose/50' : ''}`}
                >
                  {m ? m.emoji : <span className="text-xs text-mute/60">·</span>}
                </div>
                <span className={`text-[11px] ${isToday ? 'font-semibold text-wine' : 'text-mute'}`}>{d.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
