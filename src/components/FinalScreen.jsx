import { motion } from 'framer-motion'
import { useDay } from '../hooks/useDay'
import { CONFIG } from '../config'

export default function FinalScreen() {
  const { day } = useDay()
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9 }}
      className="mt-14 rounded-[2rem] bg-gradient-to-br from-blush/80 via-white/50 to-lav/80 px-6 py-14 text-center"
    >
      <p className="font-serif text-3xl font-semibold text-ink">{day} days down.</p>
      <p className="mt-1 font-serif text-3xl font-semibold text-wine">∞ moments to go.</p>
      <p className="mt-6 font-hand text-3xl text-rose">
        {CONFIG.BOY} × {CONFIG.GIRL}
      </p>
      <p className="mt-6 font-serif text-base italic text-mute">Let's see where this story takes us. ❤️</p>
    </motion.section>
  )
}
