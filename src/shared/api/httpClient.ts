import type { EntityListingOptions } from './types/listing'

const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, init)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json() as Promise<T>
}

export const httpClient = {
  post<T>(url: string, body: unknown): Promise<T> {
    return request<T>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  },

  get<T>(url: string): Promise<T> {
    return request<T>(url)
  },
}

export function buildListingOptions(
  page: number,
  pageSize: number,
  filters: EntityListingOptions['filters'] = [],
  countAll = false,
): EntityListingOptions {
  return {
    page,
    pageSize,
    filters,
    countLimitOption: countAll
      ? { enabled: false, maxResults: 0 }
      : { enabled: true, maxResults: 1000 },
  }
}

export function clientIdFilter(clientId: number) {
  return { field: 'clientId', operation: 'EQ' as const, value: clientId }
}
