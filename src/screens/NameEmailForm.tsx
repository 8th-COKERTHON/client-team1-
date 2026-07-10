import { useState } from 'react'
import sprout from '../assets/sprout.png'
import Button from '../components/Button'
import InputField from '../components/InputField'

interface Props {
  onNext: () => void
}

function NameEmailForm({ onNext }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const active = name.trim() !== '' && email.trim() !== ''

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

        <Button active={active} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default NameEmailForm
