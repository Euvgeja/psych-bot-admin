import { httpClient } from '../../../shared/api/httpClient'
import type { BaseBean, EntityListingOptions, EntityListingResult } from '../../../shared/api/types'

export const entityListService = {
  list<T extends BaseBean>(
    endpoint: string,
    options: EntityListingOptions,
  ): Promise<EntityListingResult<T>> {
    return httpClient.post<EntityListingResult<T>>(`${endpoint}/list`, options)
  },
}
