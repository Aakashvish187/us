import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, Trophy } from 'lucide-react'
import { QUIZ, verdict } from '../data/quiz'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Confetti from './Confetti'

export default function HowWellGame() {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState([])
  const [best, setBest] = useLocalStorage('quizBest', 0)
  const [celebrate, setCelebrate] = useState(false)

  const finished = step >= QUIZ.length
  const score = picked.filter((p, i) => p === QUIZ[i].correct).length
  const percent = Math.round((score / QUIZ.length) * 100)

  function choose(side) {
    const next = [...picked, side]
    setPicked(next)
    if (step + 1 >= QUIZ.length) {
      const s = next.filter((p, i) => p === QUIZ[i].correct).length
      const pct = Math.round((s / QUIZ.length) * 100)
      if (pct > best) setBest(pct)
      if (pct >= 80) {
        setCelebrate(true)
        setTimeout(() => setCelebrate(false), 4500)
      }
    }
    setStep(step + 1)
  }

  function restart() {
    setStep(0)
    setPicked([])
  }

  return (
    <div className="glass p-5 md:p-7">
      <Confetti show={celebrate} />
      <div className="flex items-center justify-between">
        <p className="eyebrow">How well do you know me?</p>
        {best > 0 && (
          <span className="flex items-center gap-1 text-xs text-mute">
            <Trophy size={14} className="text-rose" /> Best {best}%
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-3 flex gap-1.5">
              {QUIZ.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition ${i <= step ? 'bg-rose' : 'bg-rose/15'}`}
                />
              ))}
            </div>
            <p className="mt-1 text-xs text-mute">
              Question {step + 1} of {QUIZ.length}
            </p>
            <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug">{QUIZ[step].q}</h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {['a', 'b'].map((side) => (
                <motion.button
                  key={side}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => choose(side)}
                  className="flex min-h-[132px] flex-col items-center justify-center gap-2 rounded-3xl border border-rose/20 bg-white/65 p-3 text-center transition hover:bg-white"
                >
                  <span className="text-4xl">{QUIZ[step][side].emoji}</span>
                  <span className="font-medium">{QUIZ[step][side].label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5 text-center"
          >
            <p className="font-serif text-6xl font-semibold text-wine">{percent}%</p>
            <p className="mt-1 text-sm text-mute">
              {score} of {QUIZ.length} right
            </p>
            <p className="mx-auto mt-4 max-w-xs font-serif text-xl italic text-ink">{verdict(percent)}</p>

            <ul className="mx-auto mt-5 max-w-sm space-y-1.5 text-left text-sm">
              {QUIZ.map((q, i) => {
                const ok = picked[i] === q.correct
                return (
                  <li key={q.q} className="flex items-center justify-between gap-3 rounded-xl bg-white/60 px-3 py-2">
                    <span className="truncate text-mute">{q.q.split(':')[0].split('?')[0]}</span>
                    <span className={ok ? 'text-wine' : 'text-mute'}>
                      {q[q.correct].emoji} {q[q.correct].label} {ok ? '✓' : ''}
                    </span>
                  </li>
                )
              })}
            </ul>

            <button className="btn-primary mt-6" onClick={restart}>
              <RotateCcw size={16} /> Play again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
