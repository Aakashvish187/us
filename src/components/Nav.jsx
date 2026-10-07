import { motion } from 'framer-motion'
import { BookHeart, Camera, Home, Mail, Sparkles } from 'lucide-react'
import { CONFIG } from '../config'

export const PAGES = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'story', label: 'Story', icon: BookHeart },
  { id: 'memories', label: 'Memories', icon: Camera },
  { id: 'letter', label: 'Letter', icon: Mail },
  { id: 'more', label: 'More', icon: Sparkles },
]

export default function Nav({ page, onChange }) {
  return (
    <>
      {/* Desktop / tablet: top bar */}
      <header className="glass-strong fixed inset-x-0 top-0 z-40 hidden items-center justify-between px-8 py-3 md:flex">
        <button onClick={() => onChange('home')} className="font-serif text-xl font-semibold text-wine">
          {CONFIG.APP_NAME}
        </button>
        <nav className="flex items-center gap-1">
          {PAGES.map(({ id, label, icon: Icon }) => {
            const active = page === id
            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={`relative flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-medium transition ${
                  active ? 'text-white' : 'text-mute hover:text-wine'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill-desktop"
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-rose to-wine shadow-soft"
                    transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                  />
                )}
                <Icon size={18} className="relative" />
                <span className="relative">{label}</span>
              </button>
            )
          })}
        </nav>
      </header>

      {/* Mobile: bottom tab bar */}
      <nav
        className="glass-strong fixed inset-x-3 bottom-3 z-40 rounded-[1.75rem] px-1.5 pt-1.5 md:hidden"
        style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
      >
        <ul className="grid grid-cols-5">
          {PAGES.map(({ id, label, icon: Icon }) => {
            const active = page === id
            return (
              <li key={id}>
                <button
                  onClick={() => onChange(id)}
                  aria-label={label}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-medium transition ${
                    active ? 'text-white' : 'text-mute'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill-mobile"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose to-wine shadow-soft"
                      transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                    />
                  )}
                  <Icon size={21} className="relative" />
                  <span className="relative">{label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
