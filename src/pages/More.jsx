import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Flag, Gamepad2, HelpCircle, Lock, Smile } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import QuestionOfDay from '../components/QuestionOfDay'
import MoodCheckIn from '../components/MoodCheckIn'
import HowWellGame from '../components/HowWellGame'
import SecretVault from '../components/SecretVault'
import Milestones from '../components/Milestones'

export const MORE_TABS = [
  { id: 'question', label: 'Question', icon: HelpCircle, view: QuestionOfDay },
  { id: 'mood', label: 'Mood', icon: Smile, view: MoodCheckIn },
  { id: 'game', label: 'Game', icon: Gamepad2, view: HowWellGame },
  { id: 'secret', label: 'Secret', icon: Lock, view: SecretVault },
  { id: 'milestones', label: 'Milestones', icon: Flag, view: Milestones },
]

export default function More({ tab, setTab }) {
  const active = MORE_TABS.find((t) => t.id === tab) ?? MORE_TABS[0]
  const View = active.view

  useEffect(() => {
    document.getElementById(`more-tab-${active.id}`)?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [active.id])

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Little extras" title="Play, feel, unlock" />

      <div className="no-scrollbar -mx-4 mb-5 overflow-x-auto px-4">
        <div className="flex w-max gap-2 pb-1">
          {MORE_TABS.map(({ id, label, icon: Icon }) => {
            const on = active.id === id
            return (
              <button
                key={id}
                id={`more-tab-${id}`}
                onClick={() => setTab(id)}
                className={`chip ${on ? 'chip-on' : ''}`}
              >
                <Icon size={16} /> {label}
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <View />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
