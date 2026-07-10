import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NameEmailForm from './screens/NameEmailForm'
import DigitalDetox from './screens/DigitalDetox'
import Mission from './screens/Mission'
import DetoxActive from './screens/DetoxActive'
import Home from './screens/Home'
import MissionPopup from './components/MissionPopup'
import {
  confirmMission,
  getTodayMission,
  getTodayMissionStatus,
  markMissionPopupShown,
} from './lib/missionApi'
import toothbrush from './assets/Toothbrush.svg'

type Step = 'form' | 'detox'

function OnboardingFlow() {
  const [step, setStep] = useState<Step>('form')

  if (step === 'detox') {
    return <DigitalDetox />
  }

  return <NameEmailForm onNext={() => setStep('detox')} />
}

interface PopupInfo {
  title: string
  remainingSeconds: number
}

const STATUS_POLL_INTERVAL_MS = 10000

function App() {
  const navigate = useNavigate()
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null)

  useEffect(() => {
    let cancelled = false

    const checkStatus = async () => {
      try {
        const statusRes = await getTodayMissionStatus()
        if (cancelled) return

        if (statusRes.data.popupRequired && !statusRes.data.popupShownAt) {
          const [missionRes, popupRes] = await Promise.all([
            getTodayMission(),
            markMissionPopupShown(),
          ])
          if (!cancelled) {
            setPopupInfo({
              title: missionRes.data.title,
              remainingSeconds: popupRes.data.remainingSeconds,
            })
          }
        }
      } catch {
        // 상태 조회가 실패해도 다음 폴링에서 다시 시도
      }
    }

    checkStatus()
    const id = window.setInterval(checkStatus, STATUS_POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [])

  const handleStartMission = async () => {
    setPopupInfo(null)
    try {
      await confirmMission()
    } catch {
      // 확인 처리에 실패해도 미션 화면으로는 이동
    }
    navigate('/mission')
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<OnboardingFlow />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/detox-active" element={<DetoxActive />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      {popupInfo && (
        <MissionPopup
          icon={<img src={toothbrush} alt="toothbrush" className="h-8 w-8" />}
          title={popupInfo.title}
          description="미션을 완료하고 사진으로 인증해주세요."
          durationSeconds={popupInfo.remainingSeconds}
          onStart={handleStartMission}
        />
      )}
    </>
  )
}

export default App
