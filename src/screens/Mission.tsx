import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MissionHeader from '../components/MissionHeader'
import MissionCard from '../components/MissionCard'
import PhotoUpload from '../components/PhotoUpload'
import CameraCapture from '../components/CameraCapture'
import Button from '../components/Button'
import SecondaryButton from '../components/SecondaryButton'
import toothbrush from '../assets/Toothbrush.svg'
import {
  getTodayMission,
  registerMissionCertification,
  updateMissionCertification,
} from '../lib/missionApi'

function Mission() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [title, setTitle] = useState('오늘의 미션')
  const [hasCertifiedBefore, setHasCertifiedBefore] = useState(false)

  useEffect(() => {
    let cancelled = false

    getTodayMission()
      .then((res) => {
        if (cancelled) return
        setTitle(res.data.title)
        // SUCCESS면 이미 인증 사진을 등록한 적이 있다는 뜻이라 재등록(PATCH)으로 전환
        setHasCertifiedBefore(res.data.status === 'SUCCESS')
      })
      .catch(() => {
        // 조회 실패 시 기본 문구를 그대로 사용
      })

    return () => {
      cancelled = true
    }
  }, [])

  const handleCapture = (captured: File) => {
    setFile(captured)
    setUploadError(null)
    setPreview(URL.createObjectURL(captured))
    setIsCameraOpen(false)
  }

  const handleUpload = async () => {
    if (!file || uploading) return

    setUploading(true)
    setUploadError(null)

    try {
      const certification = hasCertifiedBefore
        ? await updateMissionCertification(file)
        : await registerMissionCertification(file)

      setHasCertifiedBefore(true)
      navigate('/detox-active', {
        state: { detoxEndTime: certification.data.detoxEndTime },
      })
    } catch {
      setUploadError('업로드에 실패했어요. 다시 시도해주세요.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-97.5 flex-col bg-[#F7F8FA]">
      <MissionHeader
        title="미션이 도착했어요!"
        description="오늘은 어떤 미션이 도착했을까요?"
      />

      <div className="mt-4 flex flex-col gap-5">
        <MissionCard
          icon={<img src={toothbrush} alt="toothbrush" className="h-8 w-8" />}
          title={title}
          description={
            <>
              미션을 완료했나요?
              <br />
              완료한 순간을 사진으로 남겨주세요!
            </>
          }
        />

        <PhotoUpload preview={preview} onClick={() => setIsCameraOpen(true)} />

        {uploadError && (
          <p className="mx-4 text-center text-sm text-[#FF4755]">{uploadError}</p>
        )}
      </div>

      <div className="mx-4 mt-auto flex gap-2.5 pb-8">
        <SecondaryButton onClick={() => setIsCameraOpen(true)}>다시 찍기</SecondaryButton>
        <div className="flex-1">
          <Button active={file !== null && !uploading} onClick={handleUpload}>
            {uploading ? '업로드 중...' : '업로드'}
          </Button>
        </div>
      </div>

      {isCameraOpen && (
        <CameraCapture
          onCapture={handleCapture}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
    </div>
  )
}

export default Mission
