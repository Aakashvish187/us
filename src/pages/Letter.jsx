import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import HeartBurst from '../components/HeartBurst'
import Reveal from '../components/Reveal'
import { CONFIG } from '../config'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatDate } from '../utils/time'

export default function Letter() {
  const [letter, setLetter] = useLocalStorage('letter', { text: '', at: null })
  const [draft, setDraft] = useState(letter.text)
  const [burst, setBurst] = useState(false)
  const [saved, setSaved] = useState(false)

  const dirty = draft !== letter.text

  function save() {
    setLetter({ text: draft, at: new Date().toISOString() })
    setBurst(true)
    setSaved(true)
    setTimeout(() => setBurst(false), 1500)
    setTimeout(() => setSaved(false), 2600)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="A letter" title="Words, kept" />

      <motion.article
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="paper rounded-3xl border border-rose/15 px-6 pb-8 pt-7 shadow-glass md:px-10"
      >
        <h2 className="font-hand text-4xl text-wine">Dear {CONFIG.GIRL},</h2>
        <div className="mt-4 space-y-[34px] font-hand text-[1.65rem] leading-[34px] text-ink/90 md:text-[1.8rem]">
          <p>10 days ago, I didn't know that meeting you would become a little chapter I'd actually want to keep reading.</p>
          <p>I don't know where this story goes yet...</p>
          <p>but I really like the part where you're in it. ❤️</p>
        </div>
        <p className="mt-6 text-right font-hand text-3xl text-rose">— {CONFIG.BOY}</p>
      </motion.article>

      <Reveal className="mt-8">
        <div className="glass p-5 md:p-7">
          <p className="eyebrow">Your turn</p>
          <h3 className="mt-1 font-serif text-2xl font-semibold">Write your own letter</h3>
          <p className="mt-1 text-sm text-mute">Say it the way you would say it out loud. It stays on this device.</p>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={10}
            placeholder={`Dear ${CONFIG.GIRL},\n\n`}
            className="paper mt-4 w-full resize-y rounded-2xl border border-rose/20 px-4 py-2 font-hand text-[1.5rem] leading-[34px] text-ink outline-none transition placeholder:text-mute/50 focus:border-rose/60 focus:ring-4 focus:ring-rose/10"
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="relative">
              <HeartBurst show={burst} />
              <button className="btn-primary" onClick={save} disabled={!dirty}>
                Save Letter ❤️
              </button>
            </div>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 text-sm text-wine"
              >
                <Check size={16} /> Saved
              </motion.span>
            )}
            {!saved && letter.at && (
              <span className="text-xs text-mute">Last saved {formatDate(letter.at)}</span>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
