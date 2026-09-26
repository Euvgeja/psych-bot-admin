import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ContentPackageBean } from '../../../shared/api/types'
import { ButtonView } from '../../../shared/ui'
import { SkeletonView } from '../../../shared/ui/Skeleton/Skeleton.view'
import '../../../shared/ui/ui.css'
import styles from './PackageDetail.module.css'

const TYPE_LABELS: Record<string, string> = {
  MEDITATION: 'Медитация',
  TECHNIQUE: 'Техника',
}

export interface PackageDetailViewProps {
  title: string
  recordId: number
  record: ContentPackageBean | null
  description: string
  accessTier: string
  loading: boolean
  saving: boolean
  error: string | null
  saved: boolean
  onDescriptionChange: (value: string) => void
  onAccessTierChange: (value: string) => void
  onSave: () => void
  onBack: () => void
}

export function PackageDetailView({
  title,
  recordId,
  record,
  description,
  accessTier,
  loading,
  saving,
  error,
  saved,
  onDescriptionChange,
  onAccessTierChange,
  onSave,
  onBack,
}: PackageDetailViewProps) {
  const items = record?.items ?? []

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
          <SkeletonView width="40%" height="20px" />
          <SkeletonView width="100%" height="80px" />
          <SkeletonView width="100%" height="36px" />
        </div>
      )}

      {!loading && record && (
        <div className={styles.layout}>
          <div className={styles.card}>
            <p className={styles.packageTitle}>{record.title}</p>
            <p className={styles.meta}>
              {record.slug ? record.slug : 'без slug'}
              {record.comingSoon ? ' · скоро' : ''}
              {record.active ? '' : ' · выключен'}
            </p>

            <label className={styles.field}>
              <span className={styles.label}>Описание</span>
              <textarea
                className={styles.textarea}
                rows={4}
                value={description}
                onChange={(event) => onDescriptionChange(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Подписка</span>
              <select
                className={styles.select}
                value={accessTier}
                onChange={(event) => onAccessTierChange(event.target.value)}
              >
                <option value="FREE">FREE — открытый пакет</option>
                <option value="PRO">PRO — по подписке</option>
              </select>
            </label>

            <div className={styles.actions}>
              <ButtonView onClick={onSave} disabled={saving}>
                {saving ? 'Сохраняю…' : 'Сохранить'}
              </ButtonView>
              {saved && <span className={styles.saved}>Сохранено</span>}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>В пакете · {items.length}</h3>
            {items.length === 0 ? (
              <p className={styles.empty}>В этом пакете пока нет элементов.</p>
            ) : (
              <ul className={styles.items}>
                {items.map((item) => (
                  <li key={item.id}>
                    <Link className={styles.item} to={`/practice-items/${item.id}`}>
                      <span className={styles.itemTitle}>
                        {item.title}
                        {!item.active && <span className={styles.badge}>выкл</span>}
                      </span>
                      <span className={styles.itemMeta}>
                        {TYPE_LABELS[item.contentType ?? ''] ?? item.contentType}
                        {item.shortDescription ? ` · ${item.shortDescription}` : ''}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
