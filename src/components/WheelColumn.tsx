import { useEffect, useRef } from 'react'

const ITEM_HEIGHT = 34
const CONTAINER_HEIGHT = 54
const EDGE_PADDING = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2
const FADE = 'linear-gradient(to bottom, transparent 0, black 12px, black calc(100% - 12px), transparent 100%)'

interface WheelColumnProps {
  items: string[]
  index: number
  onSelect: (index: number) => void
  width?: number
}

/** 그 자리에서 위아래로 다음/이전 값이 희미하게 비치는 인라인 휠 */
function WheelColumn({ items, index, onSelect, width = 56 }: WheelColumnProps) {
  const ref = useRef<HTMLDivElement>(null)
  const settledIndex = useRef(index)
  const scrollTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const el = ref.current
    if (!el || settledIndex.current === index) return
    settledIndex.current = index
    el.scrollTo({ top: index * ITEM_HEIGHT, behavior: 'auto' })
  }, [index])

  const handleScroll = () => {
    const el = ref.current
    if (!el) return
    window.clearTimeout(scrollTimer.current)
    scrollTimer.current = window.setTimeout(() => {
      const nearest = Math.min(
        items.length - 1,
        Math.max(0, Math.round(el.scrollTop / ITEM_HEIGHT)),
      )
      el.scrollTo({ top: nearest * ITEM_HEIGHT, behavior: 'smooth' })
      if (nearest !== settledIndex.current) {
        settledIndex.current = nearest
        onSelect(nearest)
      }
    }, 120)
  }

  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      className="scrollbar-none snap-y snap-mandatory overflow-y-scroll [&::-webkit-scrollbar]:hidden"
      style={{
        height: CONTAINER_HEIGHT,
        width,
        paddingBlock: EDGE_PADDING,
        maskImage: FADE,
        WebkitMaskImage: FADE,
      }}
    >
      {items.map((label, i) => (
        <div
          key={i}
          className={`flex snap-center items-center justify-center font-['Pretendard'] text-[30px] font-bold leading-[135%] transition-colors ${
            i === index ? 'text-[#494949]' : 'text-[#D9D9D9]'
          }`}
          style={{ height: ITEM_HEIGHT }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export default WheelColumn
