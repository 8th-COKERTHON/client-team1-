import { useEffect, useRef, useState } from 'react'
import WheelColumn from './WheelColumn'

export type Period = '오전' | '오후'

export interface TimeValue {
  period: Period
  hour: number
  minute: number
}

interface TimeCardProps {
  icon: 'lower' | 'raise'
  label: string
  value: TimeValue
  onChange: (value: TimeValue) => void
}

const ICON_STYLE = {
  lower: { bg: '#E8F9F0', fg: '#00CF76' },
  raise: { bg: '#F0EAC5', fg: '#9B7A1A' },
} as const

const PERIODS: Period[] = ['오전', '오후']
const HOURS = Array.from({ length: 12 }, (_, i) => i + 1)
const MINUTES = Array.from({ length: 60 }, (_, i) => i)

function TimeCard({ icon, label, value, onChange }: TimeCardProps) {
  const [editing, setEditing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { bg, fg } = ICON_STYLE[icon]

  const summary = `${value.period} ${value.hour}:${String(value.minute).padStart(2, '0')}`

  useEffect(() => {
    if (!editing) return
    const handlePointerDownOutside = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setEditing(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDownOutside)
    return () => document.removeEventListener('pointerdown', handlePointerDownOutside)
  }, [editing])

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col items-start rounded-[14px] bg-white px-5 py-4"
      style={{ boxShadow: '0 3px 1px rgba(0,0,0,0.01), 0 1px 2px rgba(0,0,0,0.04)' }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          style={{ background: bg }}
        >
          {icon === 'lower' ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill={fg}>
              <path d="M0 0 L10 5 L0 10 Z" />
            </svg>
          ) : (
            <span className="block h-2.5 w-2.5 rounded-[1px]" style={{ background: fg }} />
          )}
        </span>
        <span className="font-['Pretendard'] text-xs font-semibold leading-[135%] text-[#9B9B9B]">
          {label}
        </span>
      </div>

      <span className="mb-1 font-['Roboto'] text-[17px] font-semibold leading-[135%] text-[#00CF76]">
        {summary}
      </span>

      {editing ? (
        <div className="flex items-center gap-3.75">
          <WheelColumn
            items={PERIODS}
            index={PERIODS.indexOf(value.period)}
            onSelect={(i) => onChange({ ...value, period: PERIODS[i] })}
            width={52}
          />
          <span className="font-['Pretendard'] text-[30px] font-bold leading-[135%] text-[#494949]">
            :
          </span>
          <WheelColumn
            items={HOURS.map((h) => String(h).padStart(2, '0'))}
            index={value.hour - 1}
            onSelect={(i) => onChange({ ...value, hour: HOURS[i] })}
            width={40}
          />
          <span className="font-['Pretendard'] text-[30px] font-bold leading-[135%] text-[#494949]">
            :
          </span>
          <WheelColumn
            items={MINUTES.map((m) => String(m).padStart(2, '0'))}
            index={value.minute}
            onSelect={(i) => onChange({ ...value, minute: MINUTES[i] })}
            width={40}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex items-center gap-3.75 font-['Pretendard'] text-[30px] font-bold leading-[135%] text-[#494949]"
        >
          <span>{value.period}</span>
          <span>:</span>
          <span>{String(value.hour).padStart(2, '0')}</span>
          <span>:</span>
          <span>{String(value.minute).padStart(2, '0')}</span>
        </button>
      )}
    </div>
  )
}

export default TimeCard
