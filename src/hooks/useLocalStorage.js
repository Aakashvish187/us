import { useEffect, useRef, useState } from 'react'
import { load, save } from '../utils/storage'

// Like useState, but persisted in localStorage.
// `initial` may be a value or a function (used only if nothing is stored yet).
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = load(key, undefined)
    if (stored !== undefined) return stored
    return typeof initial === 'function' ? initial() : initial
  })

  const first = useRef(true)
  useEffect(() => {
    // Always write once on mount too, so seeded defaults are persisted.
    first.current = false
    save(key, value)
  }, [key, value])

  return [value, setValue]
}
