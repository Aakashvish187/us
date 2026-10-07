import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Dices } from 'lucide-react'
import { QUESTIONS } from '../data/questions'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatDate } from '../utils/time'

export default function QuestionOfDay() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useLocalStorage('answers', {})
  const [choice, setChoice] = useState('')
  const [text, setText] = useState('')
  const [justSaved, setJustSaved] = useState(false)
  const customRef = useRef(null)

  const item = QUESTIONS[index]
  const saved = answers[item.q]

  function selectQuestion(i) {
    setIndex(i)
    const a = answers[QUESTIONS[i].q]
    setChoice(a?.choice ?? '')
    setText(a?.text ?? '')
    setJustSaved(false)
  }

  function randomQuestion() {
    let i
    do {
      i = Math.floor(Math.random() * QUESTIONS.length)
    } while (i === index && QUESTIONS.length > 1)
    selectQuestion(i)
  }

  function saveAnswer() {
    if (!choice && !text.trim()) return
    setAnswers((prev) => ({ ...prev, [item.q]: { choice, text: text.trim(), at: new Date().toISOString() } }))
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2200)
  }

  const history = Object.entries(answers)
    .sort((a, b) => new Date(b[1].at) - new Date(a[1].at))
    .slice(0, 5)

  return (
    <div className="space-y-4">
      <div className="glass p-5 md:p-7">
        <div className="flex items-center justify-between">
          <p className="eyebrow">{index === 0 ? 'Question of the day' : 'Random question'}</p>
          <button onClick={randomQuestion} className="btn-ghost min-h-[44px] px-4 text-sm">
            <Dices size={16} /> Another one
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink">{item.q}</h3>

            {item.options && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.options.map((o) => (
                  <button
                    key={o.label}
                    className={`chip ${choice === o.label ? 'chip-on' : ''}`}
                    onClick={() => {
                      setChoice(o.label)
                      if (o.custom) setTimeout(() => customRef.current?.focus(), 50)
                    }}
                  >
                    <span>{o.emoji}</span> {o.label}
                  </button>
                ))}
              </div>
            )}

            <textarea
              ref={customRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder={item.options ? 'Or say it in your own words…' : 'Type your answer…'}
              className="field mt-4 resize-none"
            />

            <div className="mt-4 flex items-center gap-3">
              <button className="btn-primary" onClick={saveAnswer} disabled={!choice && !text.trim()}>
                Save answer
              </button>
              {justSaved && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1 text-sm text-wine"
                >
                  <Check size={16} /> Saved
                </motion.span>
              )}
            </div>
            {saved && !justSaved && (
              <p className="mt-3 text-xs text-mute">Answered on {formatDate(saved.at)}. Saving again will update it.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {history.length > 0 && (
        <div className="glass p-5">
          <p className="eyebrow mb-3">Our answers so far</p>
          <ul className="space-y-3">
            {history.map(([q, a]) => (
              <li key={q} className="rounded-2xl bg-white/60 p-3">
                <p className="text-xs text-mute">{q}</p>
                <p className="mt-1 text-[15px] text-ink">
                  {a.choice && <span className="font-medium text-wine">{a.choice}</span>}
                  {a.choice && a.text && ' · '}
                  {a.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
