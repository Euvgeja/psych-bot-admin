import { ArrowLeft } from 'lucide-react'
import { ButtonView, TextFieldView } from '../../../shared/ui'
import { SkeletonView } from '../../../shared/ui/Skeleton/Skeleton.view'
import '../../../shared/ui/ui.css'
import detailStyles from './PracticeItemDetail.module.css'
import styles from './SystemConfigurationDetail.module.css'

export interface SystemConfigurationDetailViewProps {
  title: string
  recordId: number
  name: string
  data: string
  loading: boolean
  saving: boolean
  saved: boolean
  error: string | null
  jsonError: string | null
  onNameChange: (value: string) => void
  onDataChange: (value: string) => void
  onPrettify: () => void
  onSave: () => void
  onBack: () => void
}

export function SystemConfigurationDetailView({
  title,
  recordId,
  name,
  data,
  loading,
  saving,
  saved,
  error,
  jsonError,
  onNameChange,
  onDataChange,
  onPrettify,
  onSave,
  onBack,
}: SystemConfigurationDetailViewProps) {
  return (
    <section className="ui-page">
      <div className={detailStyles.header}>
        <ButtonView variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
          Назад
        </ButtonView>
        <h2 className={detailStyles.title}>
          {title} <span className={detailStyles.id}>#{recordId}</span>
        </h2>
      </div>

      {error && <p className="ui-error">{error}</p>}

      {loading ? (
        <div className={styles.form}>
          <SkeletonView width="40%" height="18px" />
          <SkeletonView width="100%" height="40px" />
          <SkeletonView width="100%" height="240px" />
        </div>
      ) : (
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault()
            onSave()
          }}
        >
          <TextFieldView
            label="Имя"
            name="name"
            value={name}
            required
            onChange={(event) => onNameChange(event.target.value)}
          />
          <label className={styles.field}>
            <span className={styles.label}>
              Данные <span className={styles.required}>*</span>
            </span>
            <textarea
              className={styles.data}
              name="data"
              value={data}
              required
              spellCheck={false}
              aria-label="Данные"
              onChange={(event) => onDataChange(event.target.value)}
            />
            {jsonError && <p className="ui-error">{jsonError}</p>}
          </label>
          <div className={styles.actions}>
            {saved && <span className={detailStyles.saved}>Сохранено</span>}
            <ButtonView type="button" variant="secondary" onClick={onPrettify} disabled={saving}>
              Форматировать
            </ButtonView>
            <ButtonView type="submit" disabled={saving}>
              {saving ? 'Сохраняю…' : 'Сохранить'}
            </ButtonView>
          </div>
        </form>
      )}
    </section>
  )
}
