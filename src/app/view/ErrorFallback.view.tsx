import { AlertTriangle } from 'lucide-react'
import { ButtonView } from '../../shared/ui'
import styles from './ErrorFallback.module.css'

export interface ErrorFallbackViewProps {
  onRetry: () => void
}

export function ErrorFallbackView({ onRetry }: ErrorFallbackViewProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <AlertTriangle size={22} strokeWidth={2} aria-hidden="true" />
        </div>
        <h1 className={styles.title}>Что-то пошло не так</h1>
        <p className={styles.description}>
          Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться назад.
        </p>
        <ButtonView onClick={onRetry}>Попробовать снова</ButtonView>
      </div>
    </div>
  )
}
