import { useState } from 'react'
import Button from '../components/Button'
import TimeCard, { type TimeValue } from '../components/TimeCard'

function DigitalDetox() {
  const [sleepTime, setSleepTime] = useState<TimeValue>({
    period: '오후',
    hour: 9,
    minute: 0,
  })
  const [wakeTime, setWakeTime] = useState<TimeValue>({
    period: '오전',
    hour: 9,
    minute: 0,
  })

  return (
    <div className="flex min-h-[844px] flex-col px-6 pb-8 pt-12">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 text-2xl">
        🌱
      </div>

      <h1 className="text-center text-xl font-semibold leading-snug text-gray-900">
        디지털 디톡스,
        <br />
        언제 시작할까요?
      </h1>

      <p className="mx-auto mt-3 max-w-65 text-center text-sm leading-relaxed text-gray-400">
        매일 오프라인 일정을 설정하고 건강한 디지털 습관을 만들어 보세요.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <TimeCard
          icon="lower"
          label="폰을 내려놓는 시간"
          value={sleepTime}
          onChange={setSleepTime}
        />
        <TimeCard
          icon="raise"
          label="다시 폰을 쓸 수 있는 시간"
          value={wakeTime}
          onChange={setWakeTime}
        />
      </div>

      <div className="mt-auto pt-5.5">
        <Button active>디지털 디톡스 시작하기</Button>
      </div>
    </div>
  )
}

export default DigitalDetox
