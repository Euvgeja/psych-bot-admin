import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { httpClient } from '../../../shared/api/httpClient'
import type { SystemConfigurationBean } from '../../../shared/api/types'
import type { EntityConfig } from '../../../shared/config/entities'
import { entityListService } from '../../entity-list/service/entityListService'
import { SystemConfigurationDetailView } from '../view/SystemConfigurationDetail.view'

export function SystemConfigurationDetailPage({ entity }: { entity: EntityConfig }) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jsonError, setJsonError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    entityListService
      .getById<SystemConfigurationBean>(entity.endpoint, Number(id))
      .then((record) => {
        if (cancelled) return
        setName(record.name ?? '')
        setData(record.data ?? '')
        setError(null)
      })
      .catch(() => {
        if (!cancelled) setError('Не удалось загрузить конфигурацию')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [entity.endpoint, id])

  function prettify() {
    try {
      setData(JSON.stringify(JSON.parse(data), null, 2))
      setJsonError(null)
    } catch {
      setJsonError('Это не JSON')
    }
  }

  async function save() {
    if (!id) return
    setSaving(true)
    setSaved(false)
    setError(null)
    setJsonError(null)
    try {
      JSON.parse(data)
    } catch {
      setJsonError('Это не JSON')
      setSaving(false)
      return
    }
    try {
      const next = await httpClient.put<SystemConfigurationBean>(`${entity.endpoint}/${id}`, { name, data })
      setName(next.name ?? '')
      setData(next.data ?? '')
      setSaved(true)
    } catch (cause) {
      const code = cause instanceof Error ? cause.message.replace('HTTP ', '') : ''
      setError(code === '400' ? 'Проверьте имя и JSON' : 'Не удалось сохранить конфигурацию')
    } finally {
      setSaving(false)
    }
  }

  return (
    <SystemConfigurationDetailView
      title={entity.title}
      recordId={Number(id)}
      name={name}
      data={data}
      loading={loading}
      saving={saving}
      saved={saved}
      error={error}
      jsonError={jsonError}
      onNameChange={(value) => {
        setSaved(false)
        setName(value)
      }}
      onDataChange={(value) => {
        setSaved(false)
        setJsonError(null)
        setData(value)
      }}
      onPrettify={prettify}
      onSave={() => void save()}
      onBack={() => navigate(-1)}
    />
  )
}
