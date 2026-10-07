import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const COLORS = ['#e0597a', '#b3263e', '#7a4cc0', '#f3a6ba', '#ffd9a8', '#cdb9ff']

// Full-screen confetti shower, used when a milestone unlocks.
export default function Confetti({ show, count = 70 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        w: 6 + Math.random() * 7,
        h: 8 + Math.random() * 10,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.8,
        duration: 2.6 + Math.random() * 2,
        rotate: 360 + Math.random() * 720,
        drift: (Math.random() - 0.5) * 160,
        round: i % 3 === 0,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, show],
  )

  return (
    <AnimatePresence>
      {show && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              className="absolute top-0 block"
              style={{
                left: `${p.left}%`,
                width: p.w,
                height: p.round ? p.w : p.h,
                background: p.color,
                borderRadius: p.round ? '50%' : 2,
              }}
              initial={{ y: -30, opacity: 1, rotate: 0 }}
              animate={{ y: '105vh', x: p.drift, rotate: p.rotate, opacity: [1, 1, 0.8] }}
              transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
