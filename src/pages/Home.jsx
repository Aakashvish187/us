import { motion } from 'framer-motion'
import ProgressRing from '../components/ProgressRing'
import LiveCounter from '../components/LiveCounter'
import TodayNote from '../components/TodayNote'
import NextMilestoneCard from '../components/NextMilestoneCard'
import FinalScreen from '../components/FinalScreen'
import QuoteCard from '../components/QuoteCard'
import VideoMoment from '../components/VideoMoment'
import Reveal from '../components/Reveal'
import { CONFIG } from '../config'
import { useDay } from '../hooks/useDay'
import { nextMilestone } from '../data/milestones'

const photo = (n) => `${import.meta.env.BASE_URL}photos/${n}`
const POLAROIDS = [
  { src: photo('garden.jpg'), rot: -7, pos: 'object-[50%_40%]' },
  { src: photo('sunset.jpg'), rot: 3, pos: 'object-[50%_55%]' },
  { src: photo('flower.jpg'), rot: 8, pos: 'object-[50%_30%]' },
]

export default function Home({ go }) {
  const { day } = useDay()
  const next = nextMilestone(day)
  const target = next ? next.days : Math.max(day, 365)

  return (
    <div className="space-y-6">
      <header className="pt-2 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow">
          {CONFIG.BOY} × {CONFIG.GIRL}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-1 font-serif text-5xl font-semibold text-ink md:text-6xl"
        >
          Day {day} ❤️
        </motion.h1>
        <p className="mx-auto mt-2 max-w-xs font-serif text-base italic text-mute">
          {day} days of us... and this is only the beginning.
        </p>
      </header>

      <Reveal>
        <ProgressRing day={day} target={target} />
        {next && (
          <p className="mt-3 text-center text-xs text-mute">
            {day} of {target} days towards {next.label.toLowerCase()}
          </p>
        )}
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-3 gap-3">
          {[
            [String(day), 'Days'],
            ['∞', 'Memories to make'],
            ['1', 'Story'],
          ].map(([v, l]) => (
            <div key={l} className="glass flex flex-col items-center justify-center px-2 py-5 text-center">
              <span className="font-serif text-4xl font-semibold text-wine">{v}</span>
              <span className="mt-1 text-[11px] leading-tight text-mute">{l}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <LiveCounter />
      </Reveal>

      <Reveal>
        <button onClick={() => go('memories')} className="group block w-full" aria-label="Open our memories">
          <div className="flex items-center justify-center py-5">
            {POLAROIDS.map((p, i) => (
              <motion.div
                key={p.src}
                whileHover={{ y: -8, rotate: 0 }}
                style={{ rotate: p.rot, marginLeft: i === 0 ? 0 : -26, zIndex: i === 1 ? 2 : 1 }}
                className="w-[7.5rem] rounded-md bg-white p-1.5 pb-5 shadow-glass md:w-36"
              >
                <img src={p.src} alt="" className={`aspect-[3/4] w-full rounded-sm object-cover ${p.pos}`} />
              </motion.div>
            ))}
          </div>
          <p className="text-center font-hand text-2xl text-rose">our first little memories →</p>
        </button>
      </Reveal>

      <Reveal>
        <QuoteCard />
      </Reveal>

      <Reveal>
        <VideoMoment />
      </Reveal>

      <Reveal>
        <TodayNote />
      </Reveal>

      <Reveal>
        <NextMilestoneCard onOpen={() => go('more', 'milestones')} />
      </Reveal>

      <FinalScreen />
    </div>
  )
}
