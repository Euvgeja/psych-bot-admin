import styles from './PageHeader.module.css'

export interface PageHeaderViewProps {
  title: string
  description?: string
}

export function PageHeaderView({ title, description }: PageHeaderViewProps) {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  )
}
