import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import HeartBurst from './HeartBurst'
import { HEART_MESSAGES } from '../data/messages'

// Floating heart: tap for a random little message.
export default function HeartButton() {
  const [msg, setMsg] = useState(null)
  const [burst, setBurst] = useState(false)
  const last = useRef(-1)
  const timer = useRef(null)

  function pick() {
    let i
    do {
      i = Math.floor(Math.random() * HEART_MESSAGES.length)
    } while (i === last.current && HEART_MESSAGES.length > 1)
    last.current = i
    setMsg({ id: Date.now(), text: HEART_MESSAGES[i] })
    setBurst(true)
    setTimeout(() => setBurst(false), 1400)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(null), 6500)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <div className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-30 md:bottom-8 md:right-8">
      <AnimatePresence>
        {msg && (
          <motion.button
            key={msg.id}
            onClick={() => setMsg(null)}
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            className="glass-strong absolute bottom-16 right-0 w-[min(18rem,calc(100vw-2rem))] rounded-3xl rounded-br-lg p-4 text-left font-serif text-[15px] italic leading-snug text-ink"
          >
            {msg.text}
          </motion.button>
        )}
      </AnimatePresence>
      <div className="relative">
        <HeartBurst show={burst} count={10} spread={80} />
        <motion.button
          onClick={pick}
          aria-label="A little message for you"
          whileTap={{ scale: 0.88 }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-rose to-wine text-white shadow-soft"
        >
          <Heart size={24} fill="currentColor" />
        </motion.button>
      </div>
    </div>
  )
}
