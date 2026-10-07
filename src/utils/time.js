import { CONFIG } from '../config'

const DAY = 86400000

export const startDate = () => new Date(CONFIG.START_DATE)

export function getElapsed(now = new Date()) {
  const ms = Math.max(0, now.getTime() - startDate().getTime())
  return {
    ms,
    days: Math.floor(ms / DAY),
    hours: Math.floor((ms % DAY) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  }
}

// The calendar moment "Day n" begins.
export const dateForDay = (n) => new Date(startDate().getTime() + n * DAY)

export function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function msUntilDay(n, now = new Date()) {
  return startDate().getTime() + n * DAY - now.getTime()
}

export function formatCountdown(ms) {
  const t = Math.max(0, ms)
  const d = Math.floor(t / DAY)
  const h = Math.floor((t % DAY) / 3600000)
  const m = Math.floor((t % 3600000) / 60000)
  const parts = []
  if (d) parts.push(`${d}d`)
  parts.push(`${h}h`)
  parts.push(`${m}m`)
  return parts.join(' ')
}

export const pad = (n) => String(n).padStart(2, '0')
