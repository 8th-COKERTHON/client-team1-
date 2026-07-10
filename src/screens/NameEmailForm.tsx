import { useState } from 'react'
import Button from '../components/Button'
import InputField from '../components/InputField'

interface NameEmailFormProps {
  onNext: () => void
}

function NameEmailForm({ onNext }: NameEmailFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const isValid = name.trim() !== '' && email.trim() !== ''

  return (
    <div className="flex min-h-[844px] flex-col px-6 pt-12">
      <div className="flex flex-col gap-5.25">
        <InputField
          label="이름"
          name="name"
          value={name}
          onChange={setName}
          placeholder="메시지 입력"
        />
        <InputField
          label="이메일"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="ex)123456@"
        />
      </div>

      <div className="mt-auto pb-10 pt-8.75">
        <Button active={isValid} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default NameEmailForm
