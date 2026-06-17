import type { LucideIcon } from 'lucide-react'
import styles from './EmptyState.module.css'

export interface EmptyStateViewProps {
  icon: LucideIcon
  title: string
  description?: string
}

export function EmptyStateView({ icon: Icon, title, description }: EmptyStateViewProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
