import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'

const rand = (a, b) => a + Math.random() * (b - a)

// Ambient layer: slow rising hearts + twinkling sparkles. Very subtle on purpose.
export default function FloatingHearts({ count, sparkles }) {
  const reduce = useReducedMotion()
  // fewer particles on phones: smoother and easier on the battery
  const small = typeof window !== 'undefined' && window.innerWidth < 640
  count = count ?? (small ? 7 : 13)
  sparkles = sparkles ?? (small ? 10 : 18)

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: rand(2, 96),
        size: rand(10, 24),
        duration: rand(14, 26),
        delay: rand(0, 18),
        sway: rand(-30, 30),
        opacity: rand(0.12, 0.3),
        color: ['#e0597a', '#b3263e', '#7a4cc0', '#f3a6ba'][i % 4],
      })),
    [count],
  )

  const stars = useMemo(
    () =>
      Array.from({ length: sparkles }, (_, i) => ({
        id: i,
        left: rand(0, 100),
        top: rand(0, 100),
        size: rand(2, 5),
        delay: rand(0, 4),
      })),
    [sparkles],
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={`s${s.id}`}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 8px 2px rgba(255,255,255,0.9)',
          }}
        />
      ))}
      {!reduce &&
        hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute bottom-0"
            style={{ left: `${h.left}%`, opacity: h.opacity }}
            initial={{ y: 40, x: 0 }}
            animate={{ y: '-110vh', x: [0, h.sway, -h.sway, 0] }}
            transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
          >
            <Heart size={h.size} fill={h.color} color={h.color} strokeWidth={0} />
          </motion.div>
        ))}
    </div>
  )
}
