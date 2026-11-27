import { useEffect, useState } from 'react'
import { httpClient } from '../../../shared/api/httpClient'
import { ButtonView } from '../../../shared/ui'
import styles from './PracticeItemDetail.module.css'

type PhraseForm = {
  minus: string
  plus: string
  needs: string
}

const emptyForm: PhraseForm = { minus: '', plus: '', needs: '' }

function countLines(value: string): number {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-•]\s*/, '').trim())
    .filter(Boolean).length
}

export function MatchPhraseFields({ practiceId }: { practiceId: number }) {
  const [form, setForm] = useState<PhraseForm>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    httpClient
      .get<PhraseForm>(`/api/practice-items/${practiceId}/match-phrases`)
      .then((next) => {
        if (cancelled) return
        setForm({
          minus: next.minus ?? '',
          plus: next.plus ?? '',
          needs: next.needs ?? '',
        })
        setError(null)
      })
      .catch(() => {
        if (!cancelled) setError('Не удалось загрузить фразы подбора')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [practiceId])

  async function save() {
    setSaving(true)
    setSaved(false)
    setError(null)
    try {
      const next = await httpClient.put<PhraseForm>(
        `/api/practice-items/${practiceId}/match-phrases`,
        form,
      )
      setForm({
        minus: next.minus ?? '',
        plus: next.plus ?? '',
        needs: next.needs ?? '',
      })
      setSaved(true)
    } catch {
      setError('Не удалось сохранить фразы подбора')
    } finally {
      setSaving(false)
    }
  }

  const summary = loading
    ? 'Загрузка…'
    : `Минус ${countLines(form.minus)}, плюс ${countLines(form.plus)}, потребности ${countLines(form.needs)}`

  return (
    <div className={styles.card}>
      <div className={styles.profileHeader}>
        <div>
          <h3 className={styles.sectionTitle}>Фразы подбора</h3>
          <p className={styles.hint}>{summary}</p>
        </div>
        <ButtonView variant="secondary" onClick={() => setOpen((current) => !current)} disabled={loading}>
          {open ? 'Скрыть' : 'Открыть'}
        </ButtonView>
      </div>
      {error && <p className="ui-error">{error}</p>}
      {open && !loading && (
        <>
          <label className={styles.field}>
            <span>Минусовые состояния, баллы 1–5</span>
            <textarea
              className={`${styles.textarea} ${styles.phraseArea}`}
              value={form.minus}
              aria-label="Минусовые состояния"
              onChange={(event) => setForm((current) => ({ ...current, minus: event.target.value }))}
            />
          </label>
          <label className={styles.field}>
            <span>Плюсовые состояния, баллы 6–10</span>
            <textarea
              className={`${styles.textarea} ${styles.phraseArea}`}
              value={form.plus}
              aria-label="Плюсовые состояния"
              onChange={(event) => setForm((current) => ({ ...current, plus: event.target.value }))}
            />
          </label>
          <label className={styles.field}>
            <span>Потребности</span>
            <textarea
              className={`${styles.textarea} ${styles.phraseArea}`}
              value={form.needs}
              aria-label="Потребности"
              onChange={(event) => setForm((current) => ({ ...current, needs: event.target.value }))}
            />
          </label>
          <div className={styles.actions}>
            <ButtonView onClick={() => void save()} disabled={saving}>
              {saving ? 'Сохраняю…' : 'Сохранить фразы'}
            </ButtonView>
            {saved && <span className={styles.saved}>Сохранено</span>}
          </div>
        </>
      )}
    </div>
  )
}
