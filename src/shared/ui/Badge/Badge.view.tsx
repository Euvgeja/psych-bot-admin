import type { ReactNode } from 'react'
import styles from './Badge.module.css'

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeViewProps {
  variant?: BadgeVariant
  children: ReactNode
}

export function BadgeView({ variant = 'neutral', children }: BadgeViewProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>
}
