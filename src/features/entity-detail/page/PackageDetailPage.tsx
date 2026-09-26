import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { httpClient } from '../../../shared/api/httpClient'
import type { ContentPackageBean } from '../../../shared/api/types'
import type { EntityConfig } from '../../../shared/config/entities'
import { entityListService } from '../../entity-list/service/entityListService'
import { PackageDetailView } from '../view/PackageDetail.view'

export function PackageDetailPage({ entity }: { entity: EntityConfig }) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [record, setRecord] = useState<ContentPackageBean | null>(null)
  const [description, setDescription] = useState('')
  const [accessTier, setAccessTier] = useState('FREE')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    setSaved(false)
    entityListService
      .getById<ContentPackageBean>(entity.endpoint, Number(id))
      .then((next) => {
        setRecord(next)
        setDescription(next.description ?? '')
        setAccessTier(next.accessTier ?? 'FREE')
      })
      .catch(() => setError('Не удалось загрузить пакет'))
      .finally(() => setLoading(false))
  }, [entity.endpoint, id])

  async function save() {
    if (!id) return
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const next = await httpClient.patch<ContentPackageBean>(`${entity.endpoint}/${id}`, {
        description,
        accessTier,
      })
      setRecord(next)
      setDescription(next.description ?? '')
      setAccessTier(next.accessTier ?? 'FREE')
      setSaved(true)
    } catch {
      setError('Не удалось сохранить пакет')
    } finally {
      setSaving(false)
    }
  }

  return (
    <PackageDetailView
      title={entity.title}
      recordId={Number(id)}
      record={record}
      description={description}
      accessTier={accessTier}
      loading={loading}
      saving={saving}
      error={error}
      saved={saved}
      onDescriptionChange={setDescription}
      onAccessTierChange={setAccessTier}
      onSave={() => void save()}
      onBack={() => navigate(-1)}
    />
  )
}
