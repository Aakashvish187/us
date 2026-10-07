import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, MailOpen } from 'lucide-react'
import Typewriter from './Typewriter'
import { useDay } from '../hooks/useDay'
import { noteForDay } from '../data/messages'
import { formatDate } from '../utils/time'

export default function TodayNote() {
  const { day, now } = useDay()
  const [open, setOpen] = useState(false)
  const text = noteForDay(day)

  return (
    <section className="glass overflow-hidden p-5 md:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Today's Note</p>
          <p className="mt-1 text-xs text-mute">
            Day {day} · {formatDate(now)}
          </p>
        </div>
        {open ? <MailOpen className="text-rose" /> : <Mail className="text-rose" />}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.div
            key="closed"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="mt-5 flex flex-col items-center gap-4 rounded-2xl border border-rose/20 bg-gradient-to-br from-blush/70 to-lav/70 px-4 py-8 text-center"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="grid h-16 w-16 place-items-center rounded-full bg-white/80 text-3xl shadow-soft"
            >
              💌
            </motion.div>
            <p className="font-serif text-lg italic text-ink">Something small is waiting for you.</p>
            <button className="btn-primary" onClick={() => setOpen(true)}>
              Open today's note
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="paper"
            initial={{ opacity: 0, rotateX: -80, y: -20, transformPerspective: 900, transformOrigin: 'top' }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="paper mt-5 rounded-2xl border border-rose/15 px-5 py-6 shadow-soft md:px-8"
          >
            <Typewriter
              key={day}
              text={text}
              speed={24}
              className="font-hand text-[1.6rem] leading-[34px] text-ink md:text-[1.75rem]"
            />
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[11px] text-mute/80">Tap the note to skip the typing</span>
              <button className="text-sm font-medium text-wine underline-offset-4 hover:underline" onClick={() => setOpen(false)}>
                Fold it back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
