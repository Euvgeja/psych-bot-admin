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

  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.sectionTitle}>Фразы подбора</h3>
        <p className={styles.hint}>
          Одна фраза на строку. Можно вставлять строки с дефисом. После сохранения эти строки участвуют в опросе.
        </p>
      </div>
      {error && <p className="ui-error">{error}</p>}
      {loading ? (
        <p className={styles.hint}>Загрузка фраз…</p>
      ) : (
        <>
          <label className={styles.field}>
            <span>Минусовые состояния, баллы 1–5</span>
            <textarea
              className={styles.textarea}
              rows={8}
              value={form.minus}
              aria-label="Минусовые состояния"
              onChange={(event) => setForm((current) => ({ ...current, minus: event.target.value }))}
            />
          </label>
          <label className={styles.field}>
            <span>Плюсовые состояния, баллы 6–10</span>
            <textarea
              className={styles.textarea}
              rows={8}
              value={form.plus}
              aria-label="Плюсовые состояния"
              onChange={(event) => setForm((current) => ({ ...current, plus: event.target.value }))}
            />
          </label>
          <label className={styles.field}>
            <span>Потребности</span>
            <textarea
              className={styles.textarea}
              rows={8}
              value={form.needs}
              aria-label="Потребности"
              onChange={(event) => setForm((current) => ({ ...current, needs: event.target.value }))}
            />
          </label>
          <div className={styles.actions}>
            <ButtonView onClick={() => void save()} disabled={saving}>
              {saving ? 'Сохраняю…' : 'Сохранить фразы'}
            </ButtonView>
            {saved && (
              <span className={styles.saved}>
                Сохранено. Минус: {countLines(form.minus)}, плюс: {countLines(form.plus)}, потребности: {countLines(form.needs)}.
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
