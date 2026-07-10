import { apiGet, apiPatchForm, apiPost, apiPostForm } from './api'

/**
 * ASSIGNED: 미션이 배정됐지만 아직 확인/인증 전
 * CONFIRMED: 사용자가 미션 확인 버튼을 누른 상태
 * SUCCESS: 인증 사진 등록을 완료한 상태
 * FAILED: 10분 제한 시간을 초과해 실패한 상태
 */
export type MissionStatusValue = 'ASSIGNED' | 'CONFIRMED' | 'SUCCESS' | 'FAILED'

export interface TodayMission {
  missionLogId: number
  missionId: number
  title: string
  difficulty: string
  targetDate: string
  status: MissionStatusValue
  assignedAt: string
  popupShownAt: string | null
  deadlineAt: string
  popupRequired: boolean
}

export interface MissionCertification {
  missionLogId: number
  status: MissionStatusValue
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
  status: MissionStatusValue
  deadlineAt: string
  remainingSeconds: number
}

export interface MissionPopupShownResult {
  missionLogId: number
  status: MissionStatusValue
  popupShownAt: string
  deadlineAt: string
  remainingSeconds: number
  popupRequired: boolean
}

export interface MissionStatus {
  missionLogId: number
  status: MissionStatusValue
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

export function registerMissionCertification(image: File) {
  const formData = new FormData()
  formData.append('image', image)
  return apiPostForm<MissionCertification>('/api/missions/today/certification', formData)
}

export function updateMissionCertification(image: File) {
  const formData = new FormData()
  formData.append('image', image)
  return apiPatchForm<MissionRecertification>('/api/missions/today/certification', formData)
}

export function confirmMission() {
  return apiPost<MissionConfirmResult>('/api/missions/today/confirm')
}

export function markMissionPopupShown() {
  return apiPost<MissionPopupShownResult>('/api/missions/today/popup')
}
