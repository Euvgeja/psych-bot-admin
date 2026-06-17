import styles from './Spinner.module.css'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerViewProps {
  size?: SpinnerSize
  label?: string
}

export function SpinnerView({ size = 'md', label }: SpinnerViewProps) {
  return (
    <span className={styles.state} role="status" aria-live="polite">
      <span className={`${styles.spinner} ${styles[size]}`} aria-hidden="true" />
      {label && <span>{label}</span>}
    </span>
  )
}
