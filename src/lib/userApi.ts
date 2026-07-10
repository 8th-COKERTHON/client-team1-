import { apiGet, apiPatch, apiPost } from './api'
import { getDeviceId } from './deviceId'

const USER_ID_KEY = 'userId'

export interface User {
  userId: number
  nickname: string
  status: string
}

export interface HomeMember {
  userId: number
  nickname: string
  isSuccess: boolean
  imageUrl: string
}

export interface HomePopup {
  showPopup: boolean
  failedMemberNames: string[]
}

export interface UserHome {
  mode: string
  detoxStartTime: string
  detoxEndTime: string
  selectedTeamId: number
  selectedTeamName: string
  totalBricks: number
  stage: number
  members: HomeMember[]
  popup: HomePopup
}

export function createUser(nickname: string) {
  return apiPost<User, { deviceId: string; nickname: string }>('/api/users', {
    deviceId: getDeviceId(),
    nickname,
  })
}

export function getUserHome(userId: number) {
  return apiGet<UserHome>(`/api/users/${userId}/home`)
}

export function updateUserEmail(userId: number, email: string) {
  return apiPatch<string, { email: string }>(`/api/users/${userId}/email`, { email })
}

export function saveUserId(userId: number) {
  localStorage.setItem(USER_ID_KEY, String(userId))
}

export function getUserId(): number | null {
  const stored = localStorage.getItem(USER_ID_KEY)
  return stored ? Number(stored) : null
}

export function clearUserId() {
  localStorage.removeItem(USER_ID_KEY)
}
