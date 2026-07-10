import type { TimeValue } from '../components/TimeCard'

const TIMES_KEY = 'detoxTimes'

export interface DetoxTimes {
  sleepTime: TimeValue
  wakeTime: TimeValue
}

export function saveDetoxTimes(sleepTime: TimeValue, wakeTime: TimeValue) {
  localStorage.setItem(TIMES_KEY, JSON.stringify({ sleepTime, wakeTime }))
}

export function loadDetoxTimes(): DetoxTimes | null {
  const stored = localStorage.getItem(TIMES_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as DetoxTimes
  } catch {
    return null
  }
}
