import { useLocation } from 'react-router-dom'
import handphone from '../assets/handphone.svg'
import DetoxTeamCard from '../components/DetoxTeamCard'

interface DetoxActiveState {
  detoxEndTime?: string
}

function formatDetoxEndTime(raw: string) {
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function DetoxActive() {
  const location = useLocation()
  const detoxEndTime = (location.state as DetoxActiveState | null)?.detoxEndTime

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col items-center bg-[#00CF76] px-4 pt-41.75">
      <div
        className="flex h-25.5 w-25.5 items-center justify-center rounded-full"
        style={{ background: 'linear-gradient(135deg, #E8F9F0 0%, #D0F2E0 100%)' }}
      >
        <img src={handphone} alt="phone" className="h-14 w-14" />
      </div>

      <h1 className="mt-4 text-center font-['Pretendard'] text-[28px] font-bold leading-[135%] text-white">
        폰을 내려놓을 시간이에요
      </h1>

      <p className="mt-4 text-center font-['Pretendard'] text-2xl font-bold leading-[135%] text-white">
        {detoxEndTime ? formatDetoxEndTime(detoxEndTime) : '07:00'}에 해제돼요.
      </p>

      <div className="mt-7.25">
        <DetoxTeamCard
          members={[
            { name: '민지', status: '진행중' },
            { name: '민지', status: '진행중' },
          ]}
        />
      </div>
    </div>
  )
}

export default DetoxActive
