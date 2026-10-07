import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Plus, Trash2, Unlock } from 'lucide-react'
import { CONFIG } from '../config'
import { VAULT_SECTIONS, VAULT_SEED } from '../data/vault'
import { useLocalStorage } from '../hooks/useLocalStorage'

function VaultList({ section, items, onAdd, onRemove }) {
  const [draft, setDraft] = useState('')

  function submit(e) {
    e.preventDefault()
    const v = draft.trim()
    if (!v) return
    onAdd(v)
    setDraft('')
  }

  return (
    <div className="glass p-5">
      <h4 className="font-serif text-lg font-semibold">
        <span className="mr-1.5">{section.emoji}</span>
        {section.title}
      </h4>
      <ul className="mt-3 space-y-2">
        {items.length === 0 && <li className="text-sm text-mute">Nothing here yet.</li>}
        {items.map((it, i) => (
          <li key={`${i}-${it}`} className="flex items-start gap-2 rounded-2xl bg-white/65 p-3 text-[15px]">
            <span className="flex-1 leading-snug">{it}</span>
            <button
              aria-label="Remove"
              onClick={() => onRemove(i)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-mute transition hover:text-wine"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={submit} className="mt-3 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={section.hint}
          className="field min-w-0 flex-1 py-2.5"
        />
        <button type="submit" aria-label="Add" className="btn-primary h-12 w-12 shrink-0 !min-h-0 !px-0">
          <Plus size={20} />
        </button>
      </form>
    </div>
  )
}

export default function SecretVault() {
  // stage: closed -> teaser -> passcode -> open (open is only kept in memory)
  const [stage, setStage] = useState('closed')
  const [code, setCode] = useState('')
  const [wrong, setWrong] = useState(false)
  const [vault, setVault] = useLocalStorage('vault', VAULT_SEED)

  function tryUnlock(e) {
    e.preventDefault()
    if (code.trim() === CONFIG.VAULT_PASSCODE) {
      setStage('open')
      setWrong(false)
    } else {
      setWrong(true)
      setCode('')
    }
  }

  if (stage === 'open') {
    return (
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="glass flex items-center gap-3 p-4">
          <Unlock className="text-rose" />
          <p className="font-serif text-lg italic">Welcome to the little secret. 🤫</p>
          <button className="ml-auto text-sm font-medium text-wine" onClick={() => setStage('closed')}>
            Lock
          </button>
        </div>
        {VAULT_SECTIONS.map((s) => (
          <VaultList
            key={s.id}
            section={s}
            items={vault[s.id] ?? []}
            onAdd={(v) => setVault((prev) => ({ ...prev, [s.id]: [...(prev[s.id] ?? []), v] }))}
            onRemove={(i) => setVault((prev) => ({ ...prev, [s.id]: (prev[s.id] ?? []).filter((_, k) => k !== i) }))}
          />
        ))}
      </motion.div>
    )
  }

  return (
    <div className="glass p-6 text-center md:p-8">
      <AnimatePresence mode="wait">
        {stage === 'closed' && (
          <motion.button
            key="closed"
            exit={{ opacity: 0, scale: 0.95 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setStage('teaser')}
            className="mx-auto flex w-full flex-col items-center gap-3 rounded-3xl bg-gradient-to-br from-blush/70 to-lav/70 px-4 py-10"
          >
            <motion.span
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-5xl"
            >
              🔐
            </motion.span>
            <span className="font-serif text-2xl font-semibold">Little Secret</span>
            <span className="text-sm text-mute">Tap to see</span>
          </motion.button>
        )}

        {stage === 'teaser' && (
          <motion.div key="teaser" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-4">
            <Lock className="mx-auto text-rose" size={30} />
            <p className="mt-4 font-serif text-2xl italic">Some things are better revealed slowly...</p>
            <button className="btn-primary mt-6" onClick={() => setStage('passcode')}>
              Unlock
            </button>
          </motion.div>
        )}

        {stage === 'passcode' && (
          <motion.form
            key="passcode"
            onSubmit={tryUnlock}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-2"
          >
            <p className="font-serif text-xl">Enter the passcode</p>
            <motion.input
              animate={wrong ? { x: [0, -8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setWrong(false)
              }}
              inputMode="numeric"
              autoComplete="off"
              autoFocus
              maxLength={12}
              placeholder="••••"
              aria-label="Passcode"
              className="field mx-auto mt-4 max-w-[12rem] text-center text-2xl tracking-[0.4em]"
            />
            <p className={`mt-3 text-sm ${wrong ? 'text-wine' : 'text-mute'}`}>
              {wrong ? 'Not quite. Try again 😌' : CONFIG.VAULT_HINT}
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button type="button" className="btn-ghost" onClick={() => setStage('closed')}>
                Back
              </button>
              <button type="submit" className="btn-primary">
                Open
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="mt-6 text-[11px] leading-relaxed text-mute/80">
        Just a cute lock for fun. It is not real security, and anything inside is stored in this browser.
      </p>
    </div>
  )
}
