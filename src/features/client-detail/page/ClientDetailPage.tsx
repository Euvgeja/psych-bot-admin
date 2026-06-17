import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ClientBean } from '../../../shared/api/types'
import { CLIENT_RELATIONS } from '../../../shared/config/entities'
import { useTabs } from '../../shell/context/TabProvider'
import { EntityListPage } from '../../entity-list/page/EntityListPage'
import { clientService } from '../service/clientService'
import { ClientDetailView } from '../view/ClientDetail.view'

export function useClientDetailController() {
  const { id } = useParams()
  const { openTab } = useTabs()
  const clientId = Number(id)
  const [client, setClient] = useState<ClientBean | null>(null)
  const [activeRelationKey, setActiveRelationKey] = useState(CLIENT_RELATIONS[0].key)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!Number.isFinite(clientId)) {
      setError('Некорректный id клиента')
      setLoading(false)
      return
    }
    setLoading(true)
    clientService
      .getById(clientId)
      .then(setClient)
      .catch(() => setError('Клиент не найден'))
      .finally(() => setLoading(false))
  }, [clientId])

  const activeRelation = CLIENT_RELATIONS.find((r) => r.key === activeRelationKey) ?? CLIENT_RELATIONS[0]

  return {
    clientId: Number.isFinite(clientId) ? clientId : null,
    activeRelation,
    viewModel: {
      loading,
      error,
      client,
      relations: CLIENT_RELATIONS,
      activeRelationKey,
      onRelationChange: setActiveRelationKey,
      onBackToClients: () => openTab('/clients', 'Clients'),
    },
  }
}

export function ClientDetailPage() {
  const { clientId, activeRelation, viewModel } = useClientDetailController()

  return (
    <ClientDetailView
      {...viewModel}
      relationContent={
        clientId !== null ? <EntityListPage entity={activeRelation} clientId={clientId} /> : null
      }
    />
  )
}
