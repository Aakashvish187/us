import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import FloatingHearts from '../components/FloatingHearts'
import { CONFIG } from '../config'
import { useDay } from '../hooks/useDay'

const ease = [0.22, 1, 0.36, 1]

export default function Landing({ onEnter }) {
  const { day } = useDay()
  const lines = [
    `${day} days.`,
    'A thousand little thoughts.',
    'And somehow...',
    'I still want to know what happens next.',
  ]

  return (
    <motion.main
      key="landing"
      className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-cream via-blush to-lav"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.12, filter: 'blur(14px)' }}
      transition={{ duration: 1, ease }}
    >
      <FloatingHearts />

      <div className="relative z-10 mx-auto flex min-h-full max-w-md flex-col items-center justify-center px-7 py-14 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
          className="relative mb-7"
        >
          <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-rose/40 to-plum/40 blur-xl" />
          <img
            src={`${import.meta.env.BASE_URL}photos/flower.jpg`}
            alt={CONFIG.GIRL}
            className="relative h-32 w-32 rounded-full border-4 border-white object-cover object-[50%_30%] shadow-glass"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="font-serif text-5xl font-semibold text-ink"
        >
          Hey {CONFIG.GIRL} ❤️
        </motion.h1>

        <div className="mt-8 space-y-1.5 font-serif text-xl leading-snug text-ink/85">
          {lines.map((l, i) => (
            <motion.p
              key={l}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 + i * 0.6, ease }}
              className={i === lines.length - 1 ? 'italic text-wine' : ''}
            >
              {l}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="mt-8 font-hand text-2xl text-rose"
        >
          Welcome to our little world.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.6, ease }}
          whileTap={{ scale: 0.96 }}
          onClick={onEnter}
          className="btn-primary mt-8 px-8 text-lg"
        >
          Enter Our Story <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.main>
  )
}
