import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DayProvider, useDay } from './hooks/useDay'
import { useLocalStorage } from './hooks/useLocalStorage'
import { MILESTONES } from './data/milestones'
import FloatingHearts from './components/FloatingHearts'
import Nav from './components/Nav'
import HeartButton from './components/HeartButton'
import Footer from './components/Footer'
import Confetti from './components/Confetti'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Story from './pages/Story'
import Memories from './pages/Memories'
import Letter from './pages/Letter'
import More from './pages/More'

// Fires confetti + a toast the first time each milestone is reached.
function MilestoneWatcher() {
  const { day } = useDay()
  const [seen, setSeen] = useLocalStorage('milestonesSeen', [])
  const [celebrate, setCelebrate] = useState(null)

  useEffect(() => {
    const fresh = MILESTONES.filter((m) => day >= m.days && !seen.includes(m.id))
    if (fresh.length === 0) return
    setCelebrate(fresh[fresh.length - 1])
    setSeen((prev) => [...new Set([...prev, ...fresh.map((m) => m.id)])])
    const t = setTimeout(() => setCelebrate(null), 5200)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day])

  return (
    <>
      <Confetti show={!!celebrate} />
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-strong fixed inset-x-4 top-4 z-[80] mx-auto max-w-sm rounded-3xl px-5 py-4 text-center"
          >
            <p className="text-xs uppercase tracking-widest text-mute">Milestone unlocked</p>
            <p className="font-serif text-2xl font-semibold text-wine">
              {celebrate.label} {celebrate.emoji}
            </p>
            <p className="mt-0.5 text-sm text-ink/80">{celebrate.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function StorageWarning() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => {
      setShow(true)
      setTimeout(() => setShow(false), 7000)
    }
    window.addEventListener('us:storage-error', on)
    return () => window.removeEventListener('us:storage-error', on)
  }, [])
  if (!show) return null
  return (
    <div className="glass-strong fixed inset-x-4 top-4 z-[90] mx-auto max-w-sm rounded-2xl px-4 py-3 text-center text-sm text-wine">
      This device ran out of storage for photos. Try removing a few older ones.
    </div>
  )
}

function Shell() {
  const [entered, setEntered] = useState(false)
  const [page, setPage] = useState('home')
  const [moreTab, setMoreTab] = useState('question')

  function go(next, tab) {
    setPage(next)
    if (tab) setMoreTab(tab)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [page])

  return (
    <div className="relative min-h-dvh">
      {/* background */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-gradient-to-b from-cream via-blush/70 to-lav"
      />
      <div aria-hidden className="fixed -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-rose/20 blur-3xl" />
      <div aria-hidden className="fixed -right-24 bottom-24 -z-10 h-80 w-80 rounded-full bg-plum/20 blur-3xl" />

      <AnimatePresence>
        {!entered && <Landing key="landing" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <>
          <FloatingHearts />
          <MilestoneWatcher />
          <StorageWarning />
          <Nav page={page} onChange={(p) => go(p)} />

          <div className="relative z-10 mx-auto max-w-5xl px-4 pb-40 pt-[calc(1.25rem+env(safe-area-inset-top))] md:px-8 md:pb-16 md:pt-24">
            <AnimatePresence mode="wait">
              <motion.main
                key={page}
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={page === 'home' ? 'mx-auto max-w-xl' : ''}
              >
                {page === 'home' && <Home go={go} />}
                {page === 'story' && <Story />}
                {page === 'memories' && <Memories />}
                {page === 'letter' && <Letter />}
                {page === 'more' && <More tab={moreTab} setTab={setMoreTab} />}
              </motion.main>
            </AnimatePresence>
            <Footer />
          </div>

          <HeartButton />
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <DayProvider>
      <Shell />
    </DayProvider>
  )
}
