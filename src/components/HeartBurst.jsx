import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'

// Small burst of hearts. Parent must be `relative`. Toggle `show` to play it.
export default function HeartBurst({ show, count = 14, spread = 110 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 + Math.random() * 0.5
        const r = spread * (0.5 + Math.random() * 0.7)
        return {
          id: i,
          x: Math.cos(a) * r,
          y: Math.sin(a) * r - 30,
          scale: 0.6 + Math.random() * 0.9,
          rotate: (Math.random() - 0.5) * 70,
          color: ['#e0597a', '#b3263e', '#7a4cc0'][i % 3],
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, spread, show],
  )

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          {items.map((it) => (
            <motion.span
              key={it.id}
              className="absolute"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: it.scale, x: it.x, y: it.y, rotate: it.rotate }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
            >
              <Heart size={18} fill={it.color} color={it.color} strokeWidth={0} />
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
