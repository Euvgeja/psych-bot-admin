import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { httpClient } from '../../../shared/api/httpClient'
import type { PracticeItemBean } from '../../../shared/api/types'
import type { EntityConfig } from '../../../shared/config/entities'
import { entityListService } from '../../entity-list/service/entityListService'
import { PracticeItemDetailView } from '../view/PracticeItemDetail.view'

export function PracticeItemDetailPage({ entity }: { entity: EntityConfig }) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [record, setRecord] = useState<PracticeItemBean | null>(null)
  const [searchProfile, setSearchProfile] = useState('')
  const [loadedRequestKey, setLoadedRequestKey] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestKey = `${entity.endpoint}:${id ?? ''}`
  const loading = Boolean(id) && loadedRequestKey !== requestKey

  useEffect(() => {
    if (!id) return
    const currentRequestKey = `${entity.endpoint}:${id}`
    let cancelled = false

    entityListService
      .getById<PracticeItemBean>(entity.endpoint, Number(id))
      .then((next) => {
        if (cancelled) return
        setRecord(next)
        setSearchProfile(next.searchProfile ?? '')
        setError(null)
        setSaved(false)
        setEditing(false)
        setLoadedRequestKey(currentRequestKey)
      })
      .catch(() => {
        if (cancelled) return
        setRecord(null)
        setError('Не удалось загрузить практику')
        setLoadedRequestKey(currentRequestKey)
      })

    return () => {
      cancelled = true
    }
  }, [entity.endpoint, id])

  async function save() {
    if (!id) return
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const next = await httpClient.patch<PracticeItemBean>(`${entity.endpoint}/${id}`, {
        searchProfile,
      })
      setRecord(next)
      setSearchProfile(next.searchProfile ?? '')
      setSaved(true)
      setEditing(false)
    } catch {
      setError('Не удалось сохранить профиль поиска')
    } finally {
      setSaving(false)
    }
  }

  function cancelEdit() {
    setSearchProfile(record?.searchProfile ?? '')
    setSaved(false)
    setEditing(false)
  }

  return (
    <PracticeItemDetailView
      title={entity.title}
      recordId={Number(id)}
      record={record}
      searchProfile={searchProfile}
      detailFields={entity.detailFields?.filter((field) => field !== 'searchProfile')}
      fieldLabels={entity.fieldLabels}
      loading={loading}
      saving={saving}
      editing={editing}
      saved={saved}
      error={loading ? null : error}
      onSearchProfileChange={setSearchProfile}
      onStartEdit={() => {
        setSaved(false)
        setEditing(true)
      }}
      onCancelEdit={cancelEdit}
      onSave={() => void save()}
      onBack={() => navigate(-1)}
    />
  )
}
