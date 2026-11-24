import { ArrowLeft } from 'lucide-react'
import type { PracticeItemBean } from '../../../shared/api/types'
import { ButtonView } from '../../../shared/ui'
import { DetailPanelView } from '../../../shared/ui/DataTable/DataTable.view'
import { SkeletonView } from '../../../shared/ui/Skeleton/Skeleton.view'
import '../../../shared/ui/ui.css'
import styles from './PracticeItemDetail.module.css'

export interface PracticeItemDetailViewProps {
  title: string
  recordId: number
  record: PracticeItemBean | null
  searchProfile: string
  detailFields?: string[]
  fieldLabels?: Record<string, string>
  loading: boolean
  saving: boolean
  editing: boolean
  saved: boolean
  error: string | null
  onSearchProfileChange: (value: string) => void
  onStartEdit: () => void
  onCancelEdit: () => void
  onSave: () => void
  onBack: () => void
}

export function PracticeItemDetailView({
  title,
  recordId,
  record,
  searchProfile,
  detailFields,
  fieldLabels,
  loading,
  saving,
  editing,
  saved,
  error,
  onSearchProfileChange,
  onStartEdit,
  onCancelEdit,
  onSave,
  onBack,
}: PracticeItemDetailViewProps) {
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
        <div className={styles.card}>
          <SkeletonView width="45%" height="18px" />
          <SkeletonView width="100%" height="240px" />
          <SkeletonView width="120px" height="36px" />
        </div>
      )}

      {!loading && record && (
        <div className={styles.layout}>
          <div className={styles.card}>
            <div className={styles.profileHeader}>
              <div>
                <h3 className={styles.sectionTitle}>Профиль поиска</h3>
                <p className={styles.hint}>
                  Вставь состояния и потребности из таблицы. После сохранения вектор обновится автоматически.
                </p>
              </div>
              {!editing && (
                <ButtonView variant="secondary" onClick={onStartEdit}>
                  Редактировать
                </ButtonView>
              )}
            </div>

            {editing ? (
              <textarea
                className={styles.textarea}
                rows={18}
                value={searchProfile}
                autoFocus
                aria-label="Профиль поиска"
                onChange={(event) => onSearchProfileChange(event.target.value)}
              />
            ) : (
              <pre className={searchProfile ? styles.profile : styles.empty}>
                {searchProfile || 'Профиль поиска пока не заполнен.'}
              </pre>
            )}

            <div className={styles.actions}>
              {editing && (
                <>
                  <ButtonView onClick={onSave} disabled={saving}>
                    {saving ? 'Сохраняю…' : 'Сохранить'}
                  </ButtonView>
                  <ButtonView variant="secondary" onClick={onCancelEdit} disabled={saving}>
                    Отмена
                  </ButtonView>
                </>
              )}
              {saved && <span className={styles.saved}>Сохранено</span>}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Данные практики</h3>
            <DetailPanelView row={record} columns={detailFields} fieldLabels={fieldLabels} />
          </div>
        </div>
      )}
    </section>
  )
}
