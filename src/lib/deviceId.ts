const DEVICE_ID_KEY = 'deviceId'

export function getDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY)

  if (!deviceId) {
    deviceId = crypto.randomUUID()
    localStorage.setItem(DEVICE_ID_KEY, deviceId)
  }

  return deviceId
}

/** 테스트용: 저장된 deviceId를 지워서 다음 getDeviceId() 호출 때 새 기기로 취급되게 함 */
export function resetDeviceId() {
  localStorage.removeItem(DEVICE_ID_KEY)
}
