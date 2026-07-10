import { apiGet, apiPatch, apiPost } from './api'

export interface TodayMission {
  missionLogId: number
  missionId: number
  title: string
  difficulty: string
  targetDate: string
  status: string
  assignedAt: string
  popupShownAt: string | null
  deadlineAt: string
  popupRequired: boolean
}

export interface MissionCertification {
  missionLogId: number
  status: string
  imageUrl: string
  completedAt: string
  detoxEndTime: string
  canRetake: boolean
}

export interface MissionRecertification extends MissionCertification {
  updatedAt: string
}

export interface MissionConfirmResult {
  missionLogId: number
  status: string
  deadlineAt: string
  remainingSeconds: number
}

export interface MissionPopupShownResult {
  missionLogId: number
  status: string
  popupShownAt: string
  deadlineAt: string
  remainingSeconds: number
  popupRequired: boolean
}

export interface MissionStatus {
  missionLogId: number
  status: string
  popupRequired: boolean
  popupShownAt: string | null
  assignedAt: string
  deadlineAt: string
  remainingSeconds: number
  expired: boolean
}

export function getTodayMission() {
  return apiGet<TodayMission>('/api/missions/today')
}

export function getTodayMissionStatus() {
  return apiGet<MissionStatus>('/api/missions/today/status')
}

export function registerMissionCertification(imageUrl: string) {
  return apiPost<MissionCertification, { imageUrl: string }>(
    '/api/missions/today/certification',
    { imageUrl },
  )
}

export function updateMissionCertification(imageUrl: string) {
  return apiPatch<MissionRecertification, { imageUrl: string }>(
    '/api/missions/today/certification',
    { imageUrl },
  )
}

export function confirmMission() {
  return apiPost<MissionConfirmResult>('/api/missions/today/confirm')
}

export function markMissionPopupShown() {
  return apiPost<MissionPopupShownResult>('/api/missions/today/popup')
}
