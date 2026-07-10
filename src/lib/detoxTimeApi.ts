import { apiGet, apiPatch, apiPost } from './api'
import { getUserId } from './userApi'
import type { TimeValue } from '../components/TimeCard'

interface DetoxTimeResponse {
  startTime: string
  endTime: string
}

/** TimeValue({오전/오후, hour 1-12, minute}) -> "HH:mm" (24시간제) */
export function toApiTime(time: TimeValue): string {
  let hour24 = time.hour % 12
  if (time.period === '오후') hour24 += 12
  return `${String(hour24).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
}

/** "HH:mm" (24시간제) -> TimeValue({오전/오후, hour 1-12, minute}) */
export function fromApiTime(value: string): TimeValue {
  const [hourStr, minuteStr] = value.split(':')
  const hour24 = Number(hourStr)
  const minute = Number(minuteStr)
  const period: TimeValue['period'] = hour24 < 12 ? '오전' : '오후'
  const hour = hour24 % 12 === 0 ? 12 : hour24 % 12
  return { period, hour, minute }
}

export function getDetoxTime() {
  return apiGet<DetoxTimeResponse>('/api/users/detox-time')
}

function requireUserId(): number {
  const userId = getUserId()
  if (userId === null) {
    throw new Error('사용자 정보가 없습니다. 다시 로그인해주세요.')
  }
  return userId
}

export function createDetoxTime(sleepTime: TimeValue, wakeTime: TimeValue) {
  return apiPost<string, { userId: number; startTime: string; endTime: string }>(
    '/api/users/detox-time',
    {
      userId: requireUserId(),
      startTime: toApiTime(sleepTime),
      endTime: toApiTime(wakeTime),
    },
  )
}

export function updateDetoxTime(sleepTime: TimeValue, wakeTime: TimeValue) {
  return apiPatch<string, { userId: number; startTime: string; endTime: string }>(
    '/api/users/detox-time',
    {
      userId: requireUserId(),
      startTime: toApiTime(sleepTime),
      endTime: toApiTime(wakeTime),
    },
  )
}
