import { createContext, useContext, useMemo } from 'react'
import { useNow } from './useNow'
import { getElapsed } from '../utils/time'

const DayContext = createContext(null)

// Provides the current "Day N" and the current time to the whole app.
export function DayProvider({ children }) {
  const now = useNow(30000)
  const value = useMemo(() => {
    const elapsed = getElapsed(now)
    return { now, elapsed, day: Math.max(1, elapsed.days) }
  }, [now])
  return <DayContext.Provider value={value}>{children}</DayContext.Provider>
}

export const useDay = () => useContext(DayContext)
