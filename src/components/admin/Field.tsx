import type { ReactNode } from 'react'

interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'url' | 'email'
}

interface TextAreaFieldProps extends TextFieldProps {
  rows?: number
}

interface SelectFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

interface CheckboxFieldProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export const FIELD_INPUT_CLASS =
  'w-full rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-sm text-fg placeholder:text-faint transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60'

export const ADD_BUTTON_CLASS =
  'mt-2 inline-flex min-h-11 items-center rounded-full border border-line px-3.5 text-xs text-muted transition hover:border-accent-to/40 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60'

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-faint">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={FIELD_INPUT_CLASS}
      />
    </label>
  )
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-faint">{label}</span>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${FIELD_INPUT_CLASS} resize-y leading-relaxed`}
      />
    </label>
  )
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-faint">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={FIELD_INPUT_CLASS}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: CheckboxFieldProps) {
  return (
    <label className="inline-flex min-h-11 items-center gap-2 text-xs text-muted">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-accent-to"
      />
      {label}
    </label>
  )
}

interface RemoveButtonProps {
  label: string
  onClick: () => void
  children?: ReactNode
}

export function RemoveButton({ label, onClick, children = '删除' }: RemoveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-xs text-faint transition hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60"
    >
      {children}
    </button>
  )
}
