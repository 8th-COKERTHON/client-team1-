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
    <>
      <div className="mt-auto flex flex-col gap-4">
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

      <div className="mt-2.5 pb-2">
        <Button active>디지털 디톡스 시작하기</Button>
      </div>
    </>
  )
}

export default DigitalDetox
