import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Check, ChevronDown, ImagePlus, Trash2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { MOODS, moodById } from '../data/moods'
import { buildTimeline } from '../data/timeline'
import { useDay } from '../hooks/useDay'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { dateForDay, formatDate } from '../utils/time'
import { fileToDataUrl } from '../utils/image'

function DayCard({ entry, open, onToggle, data, onSave, isToday }) {
  const [memory, setMemory] = useState(data.memory ?? '')
  const [mood, setMood] = useState(data.mood ?? '')
  const [photo, setPhoto] = useState(data.photo ?? entry.photo ?? '')
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  const shownMood = moodById(data.mood)
  const shownPhoto = data.photo ?? entry.photo ?? ''

  async function pickPhoto(file) {
    if (!file) return
    setBusy(true)
    try {
      setPhoto(await fileToDataUrl(file))
    } catch {
      /* ignore bad file */
    }
    setBusy(false)
  }

  function save() {
    onSave({ memory: memory.trim(), mood, photo })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="relative pl-14 md:pl-20">
      {/* node */}
      <div
        className={`absolute left-0 top-4 grid h-11 w-11 place-items-center rounded-full border-2 font-serif text-base font-semibold md:left-3 ${
          isToday
            ? 'animate-pulseRing border-transparent bg-gradient-to-br from-rose to-wine text-white'
            : 'border-rose/30 bg-white text-wine'
        }`}
      >
        {entry.day}
      </div>

      <motion.div layout className="glass overflow-hidden">
        <button
          onClick={onToggle}
          aria-expanded={open}
          className="flex min-h-[64px] w-full items-center gap-3 px-4 py-3 text-left"
        >
          {shownPhoto && !open && (
            <img src={shownPhoto} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover" />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-widest text-mute">Day {entry.day}</p>
            <p className="truncate font-serif text-lg font-semibold leading-tight text-ink">{entry.title}</p>
          </div>
          {shownMood && <span className="text-xl">{shownMood.emoji}</span>}
          <ChevronDown size={20} className={`shrink-0 text-mute transition ${open ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-4 px-4 pb-5">
                <p className="flex items-center gap-1.5 text-xs text-mute">
                  <CalendarDays size={14} /> {formatDate(dateForDay(entry.day))}
                </p>
                <p className="font-serif text-[17px] italic leading-snug text-ink/90">{entry.blurb}</p>

                {/* photo */}
                {photo ? (
                  <div className="relative">
                    <img src={photo} alt={`Day ${entry.day}`} className="max-h-96 w-full rounded-2xl object-cover" />
                    <button
                      aria-label="Remove photo"
                      onClick={() => setPhoto('')}
                      className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-ink/60 text-white backdrop-blur"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex min-h-[56px] cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-rose/30 bg-white/50 text-sm text-mute transition hover:bg-white/80">
                    <ImagePlus size={18} className="text-rose" /> {busy ? 'Getting it ready…' : 'Add a photo (optional)'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        pickPhoto(e.target.files?.[0])
                        e.target.value = ''
                      }}
                    />
                  </label>
                )}

                {/* mood */}
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-mute">Mood</p>
                  <div className="flex flex-wrap gap-2">
                    {MOODS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMood(mood === m.id ? '' : m.id)}
                        aria-label={m.label}
                        title={m.label}
                        className={`chip !px-3.5 text-xl ${mood === m.id ? 'chip-on' : ''}`}
                      >
                        {m.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* memory */}
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-mute">Memory</p>
                  <textarea
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    rows={4}
                    placeholder="What do you remember about this day?"
                    className="field resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button className="btn-primary" onClick={save}>
                    Save memory
                  </button>
                  {saved && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1 text-sm text-wine"
                    >
                      <Check size={16} /> Saved ❤️
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* saved memory preview when closed */}
        {!open && data.memory && (
          <p className="line-clamp-2 border-t border-white/60 px-4 py-2.5 text-sm text-mute">{data.memory}</p>
        )}
      </motion.div>
    </div>
  )
}

export default function Story() {
  const { day } = useDay()
  const timeline = buildTimeline(day)
  const [days, setDays] = useLocalStorage('days', {})
  const [openDay, setOpenDay] = useState(day)

  return (
    <div>
      <PageHeader eyebrow="Our story" title="One day at a time" sub="Tap a day to open it. Add a photo, a mood, and the memory that stayed." />

      <div className="relative mx-auto max-w-2xl">
        <div className="absolute bottom-6 left-[21px] top-6 w-[2px] rounded-full bg-gradient-to-b from-rose/50 via-plum/30 to-rose/10 md:left-[34px]" />
        <div className="space-y-4">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.day}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.05 }}
            >
              <DayCard
                entry={entry}
                open={openDay === entry.day}
                onToggle={() => setOpenDay(openDay === entry.day ? null : entry.day)}
                data={days[entry.day] ?? {}}
                isToday={entry.day === day}
                onSave={(d) => setDays((prev) => ({ ...prev, [entry.day]: d }))}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
