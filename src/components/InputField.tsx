interface InputFieldProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-['Roboto'] text-[17px] font-semibold leading-[135%] text-[#494949]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border-2 border-transparent bg-[#F0F0F0] px-5 py-3 text-base text-[#494949] outline-none transition-colors placeholder:text-[#B7B7B7]"
      />
    </div>
  )
}

export default InputField
