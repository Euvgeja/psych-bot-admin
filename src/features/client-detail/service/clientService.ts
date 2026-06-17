import { httpClient } from '../../../shared/api/httpClient'
import type { ClientBean } from '../../../shared/api/types'

export const clientService = {
  getById(id: number): Promise<ClientBean> {
    return httpClient.get<ClientBean>(`/api/clients/${id}`)
  },
}
