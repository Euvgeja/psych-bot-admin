export type FilterOperation = 'EQ' | 'NE' | 'LIKE' | 'IS_NULL' | 'IS_NOT_NULL'

export interface EntityFilterOption {
  field: string
  operation: FilterOperation
  value?: unknown
}

export interface EntityCountLimitOption {
  enabled: boolean
  maxResults: number
}

export interface EntitySortOption {
  field: string
  direction: 'ASC' | 'DESC'
}

export interface EntityListingOptions {
  page: number
  pageSize: number
  sortOption?: EntitySortOption
  filters: EntityFilterOption[]
  countLimitOption: EntityCountLimitOption
}

export interface EntityListingResult<T> {
  page: number
  results: T[]
  totalRecords: number
  countLimitReached: boolean
}

export const DEFAULT_LISTING_OPTIONS: EntityListingOptions = {
  page: 1,
  pageSize: 20,
  filters: [],
  countLimitOption: { enabled: true, maxResults: 1000 },
}
