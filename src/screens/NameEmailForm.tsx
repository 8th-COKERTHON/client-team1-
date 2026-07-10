import { useState } from 'react'
import sprout from '../assets/sprout.png'
import Button from '../components/Button'
import InputField from '../components/InputField'
import { clearUserId, createUser, saveUserId, updateUserEmail } from '../lib/userApi'
import { ApiError } from '../lib/api'
import { resetDeviceId } from '../lib/deviceId'

interface Props {
  onNext: () => void
}

function NameEmailForm({ onNext }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const active = name.trim() !== '' && email.trim() !== '' && !submitting

  const handleNext = async () => {
    if (!active) return

    setSubmitting(true)
    setError(null)

    try {
      const res = await createUser(name)
      saveUserId(res.data.userId)

      try {
        await updateUserEmail(res.data.userId, email)
      } catch {
        // 이메일 저장 실패해도 가입 자체는 완료된 상태라 다음 단계로 진행
      }

      onNext()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '가입에 실패했어요. 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-[#F7F8FA] px-6 pt-14 pb-8">
      <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#F7FBEF]">
        <img src={sprout} alt="sprout" className="h-[41px] w-[41px]" />
      </div>

      <h1 className="mt-7 text-center text-[24px] font-bold leading-[135%] text-[#2E2E2E]">
        잠금 어플,
        <br />
        또 지워버렸나요?
      </h1>

      <p className="mt-4 text-center text-[16px] leading-[170%] text-[#B7B7B7]">
        막는 디톡스는 이제 그만.
        <br />
        작은 행동으로 무의식적인 뒤적임의 흐름을 바꿔봐요
      </p>

      <div className="mt-auto flex flex-col gap-6">
        <InputField
          label="이름"
          name="name"
          value={name}
          onChange={setName}
          placeholder="이름을 입력해 주세요"
        />

        <InputField
          label="이메일"
          name="email"
          value={email}
          onChange={setEmail}
          placeholder="ex) hello@example.com"
          type="email"
        />

        {error && <p className="text-center text-sm text-[#FF4755]">{error}</p>}

        <Button active={active} onClick={handleNext}>
          {submitting ? '가입 중...' : '다음'}
        </Button>

        <button
          type="button"
          onClick={() => {
            resetDeviceId()
            clearUserId()
            window.location.reload()
          }}
          className="text-center text-xs text-[#B7B7B7] underline"
        >
          (테스트) 새 기기로 초기화
        </button>
      </div>
    </div>
  )
}

export default NameEmailForm

