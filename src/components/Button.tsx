import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

function Button({ active = false, className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={!active}
      className={`cursor-pointer h-[58px] w-full rounded-xl font-['Roboto'] text-[17px] font-semibold leading-[135%] transition-colors ${
        active ? 'bg-[#00CF76] text-white' : 'bg-[#B7B7B7] text-[#6E6E6E]'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export default Button

