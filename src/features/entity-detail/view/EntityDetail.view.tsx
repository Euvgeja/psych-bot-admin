import { ArrowLeft } from 'lucide-react'
import type { BaseBean } from '../../../shared/api/types'
import { ButtonView } from '../../../shared/ui'
import { DetailPanelView } from '../../../shared/ui/DataTable/DataTable.view'
import { SkeletonView } from '../../../shared/ui/Skeleton/Skeleton.view'
import '../../../shared/ui/ui.css'
import styles from './EntityDetail.module.css'

export interface EntityDetailViewProps {
  title: string
  recordId: number
  record: BaseBean | null
  loading: boolean
  error: string | null
  onBack: () => void
}

export function EntityDetailView({
  title,
  recordId,
  record,
  loading,
  error,
  onBack,
}: EntityDetailViewProps) {
  return (
    <section className="ui-page">
      <div className={styles.header}>
        <ButtonView variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
          Назад
        </ButtonView>
        <h2 className={styles.title}>
          {title} <span className={styles.id}>#{recordId}</span>
        </h2>
      </div>

      {error && <p className="ui-error">{error}</p>}

      {loading && (
        <div className={styles.skeletons}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.skeletonRow}>
              <SkeletonView width="120px" height="12px" />
              <SkeletonView width="100%" height="16px" />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && record && (
        <div className={styles.card}>
          <DetailPanelView row={record} />
        </div>
      )}
    </section>
  )
}
