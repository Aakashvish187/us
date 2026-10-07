import { CONFIG } from '../config'

const P = CONFIG.STORAGE_PREFIX

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(P + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(P + key, JSON.stringify(value))
    return true
  } catch {
    // Most likely the storage quota (too many big photos).
    window.dispatchEvent(new CustomEvent('us:storage-error'))
    return false
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(P + key)
  } catch {
    /* ignore */
  }
}
