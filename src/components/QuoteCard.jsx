import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { QUOTES } from '../data/quotes'
import { CONFIG } from '../config'

// Heavy, dark, high-contrast quote card. Tap "Another" to cycle the variants.
export default function QuoteCard() {
  const [i, setI] = useState(0)
  const q = QUOTES[i]

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2b1230] via-[#4a1d3f] to-[#7a2142] p-6 text-white shadow-glass md:p-9">
      <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-plum/40 blur-3xl" />

      <span aria-hidden className="absolute left-4 top-1 font-serif text-8xl leading-none text-white/15">
        “
      </span>

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="font-hand text-2xl leading-none text-rose/90">Quote of us</p>
          <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-widest text-white/70">
            {q.tag}
          </span>
        </div>

        <div className="mt-5 min-h-[10.5rem] md:min-h-[9rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[1.55rem] font-medium italic leading-[1.3] md:text-3xl"
            >
              {q.text}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="font-hand text-2xl text-white/80">— {CONFIG.BOY}</p>
          <button
            onClick={() => setI((i + 1) % QUOTES.length)}
            className="flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-sm text-white backdrop-blur transition active:scale-95"
          >
            <RefreshCw size={15} /> Another
          </button>
        </div>
      </div>
    </section>
  )
}
