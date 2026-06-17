import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

export interface InputViewProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputView({ className, ...props }: InputViewProps) {
  const classes = [styles.input, className].filter(Boolean).join(' ')
  return <input className={classes} {...props} />
}

export interface TextFieldViewProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | null
  hint?: string
}

export function TextFieldView({ label, error, hint, id, ...inputProps }: TextFieldViewProps) {
  const fieldId = id ?? inputProps.name

  return (
    <label className={styles.field} htmlFor={fieldId}>
      <span className={styles.label}>{label}</span>
      <InputView id={fieldId} aria-invalid={Boolean(error)} {...inputProps} />
      {error && <p className={styles.error}>{error}</p>}
      {!error && hint && <p className={styles.hint}>{hint}</p>}
    </label>
  )
}
