import './Button.css'

type NextButtonProps = {
  active?: boolean
  label?: string
  onClick?: () => void
}

export function NextButton({
  active = false,
  label = '다음',
  onClick,
}: NextButtonProps) {
  return (
    <button
      type="button"
      className="next-button"
      data-active={active}
      disabled={!active}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
