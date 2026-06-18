import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildListingOptions, clientIdFilter } from '../../../shared/api/httpClient'
import type { EntityBean } from '../../../shared/api/types'
import type { EntityConfig } from '../../../shared/config/entities'
import { useTabs } from '../../shell/context/TabProvider'
import { entityListService } from '../service/entityListService'
import { EntityListView } from '../view/EntityList.view'

export function useEntityListController<K extends EntityConfig['key']>(
  entity: EntityConfig<K>,
  clientId?: number,
  pageSize = 20,
) {
  const { openTab } = useTabs()
  const [rows, setRows] = useState<EntityBean<K>[]>([])
  const [page, setPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [countLimitReached, setCountLimitReached] = useState(false)
  const [countAll, setCountAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const filters = useMemo(
    () => (clientId === undefined ? [] : [clientIdFilter(clientId)]),
    [clientId],
  )

  const load = useCallback(
    (targetPage: number, exactCount: boolean) => {
      setLoading(true)
      setError(null)
      return entityListService
        .list<EntityBean<K>>(entity.endpoint, buildListingOptions(targetPage, pageSize, filters, exactCount))
        .then((response) => {
          setRows(response.results)
          setPage(response.page)
          setTotalRecords(response.totalRecords)
          setCountLimitReached(response.countLimitReached)
        })
        .catch(() => setError('Ошибка загрузки данных'))
        .finally(() => setLoading(false))
    },
    [entity.endpoint, filters, pageSize],
  )

  useEffect(() => {
    setPage(1)
    setCountAll(false)
  }, [entity.endpoint, clientId])

  useEffect(() => {
    load(page, countAll)
  }, [load, page, countAll])

  const onRowClick = entity.drillDown
    ? (rowId: number) => openTab(`/clients/${rowId}`, `Client #${rowId}`)
    : entity.detail
      ? (rowId: number) => openTab(`${entity.path}/${rowId}`, `${entity.title} #${rowId}`)
      : undefined

  return {
    viewModel: {
      title: entity.title,
      rows,
      columns: entity.columns,
      loading,
      error,
      page,
      pageSize,
      totalRecords,
      countLimitReached,
      countAll,
      onPageChange: setPage,
      onCountAll: () => setCountAll(true),
      onRowClick,
    },
  }
}

export function EntityListPage<K extends EntityConfig['key']>({
  entity,
  clientId,
}: {
  entity: EntityConfig<K>
  clientId?: number
}) {
  const { viewModel } = useEntityListController(entity, clientId)
  return <EntityListView {...viewModel} />
}
