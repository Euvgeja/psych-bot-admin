import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md'

export interface ButtonViewProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  active?: boolean
}

export function ButtonView({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  active = false,
  className,
  type = 'button',
  ...props
}: ButtonViewProps) {
  const classes = [
    styles.button,
    styles[size],
    active ? styles.active : styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <button type={type} className={classes} {...props} />
}
