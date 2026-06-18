import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { BaseBean } from '../../../shared/api/types'
import type { EntityConfig } from '../../../shared/config/entities'
import { entityListService } from '../../entity-list/service/entityListService'
import { EntityDetailView } from '../view/EntityDetail.view'

export function EntityDetailPage({ entity }: { entity: EntityConfig }) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [record, setRecord] = useState<BaseBean | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    entityListService
      .getById<BaseBean>(entity.endpoint, Number(id))
      .then(setRecord)
      .catch(() => setError('Не удалось загрузить запись'))
      .finally(() => setLoading(false))
  }, [entity.endpoint, id])

  return (
    <EntityDetailView
      title={entity.title}
      recordId={Number(id)}
      record={record}
      loading={loading}
      error={error}
      onBack={() => navigate(-1)}
    />
  )
}
