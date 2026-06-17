import type { BaseBean } from '../../../shared/api/types'
import { PageHeaderView, TableSkeletonView } from '../../../shared/ui'
import { DataTableView } from '../../../shared/ui/DataTable/DataTable.view'
import { PaginationView } from '../../../shared/ui/Pagination/Pagination.view'
import { buildCountLabel, buildPageNumbers } from '../../../shared/ui/Pagination/pagination.utils'
import '../../../shared/ui/ui.css'

export interface EntityListViewProps<T extends BaseBean> {
  title: string
  rows: T[]
  columns: string[]
  loading: boolean
  error: string | null
  page: number
  pageSize: number
  totalRecords: number
  countLimitReached: boolean
  countAll: boolean
  onPageChange: (page: number) => void
  onCountAll: () => void
  onRowClick?: (id: number) => void
}

export function EntityListView<T extends BaseBean>({
  title,
  rows,
  columns,
  loading,
  error,
  page,
  pageSize,
  totalRecords,
  countLimitReached,
  countAll,
  onPageChange,
  onCountAll,
  onRowClick,
}: EntityListViewProps<T>) {
  const pages = buildPageNumbers(page, totalRecords, pageSize, countLimitReached)
  const hasNext = countLimitReached || page * pageSize < totalRecords
  const hasPrev = page > 1

  return (
    <section className="ui-page">
      <PageHeaderView title={title} />

      {error && <p className="ui-error">{error}</p>}

      {loading && <TableSkeletonView columns={columns} />}

      {!loading && !error && (
        <>
          <DataTableView rows={rows} columns={columns} onRowClick={onRowClick} />
          <PaginationView
            page={page}
            pageSize={pageSize}
            totalRecords={totalRecords}
            countLimitReached={countLimitReached}
            countAll={countAll}
            pages={pages}
            hasPrev={hasPrev}
            hasNext={hasNext}
            countLabel={buildCountLabel(totalRecords, countLimitReached, countAll)}
            onPageChange={onPageChange}
            onCountAll={onCountAll}
          />
        </>
      )}
    </section>
  )
}
