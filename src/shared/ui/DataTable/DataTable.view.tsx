import { Inbox } from 'lucide-react'
import type { BaseBean } from '../../api/types'
import { EmptyStateView } from '../EmptyState/EmptyState.view'
import '../ui.css'

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'boolean') return value ? 'да' : 'нет'
  if (typeof value === 'object') return JSON.stringify(value)
  const text = String(value)
  return text.length > 120 ? `${text.slice(0, 120)}…` : text
}

export interface DataTableViewProps<T extends BaseBean> {
  rows: T[]
  columns: string[]
  onRowClick?: (id: number) => void
  emptyTitle?: string
  emptyDescription?: string
}

export function DataTableView<T extends BaseBean>({
  rows,
  columns,
  onRowClick,
  emptyTitle = 'Нет данных',
  emptyDescription = 'Записи появятся здесь, когда они будут в системе.',
}: DataTableViewProps<T>) {
  if (rows.length === 0) {
    return <EmptyStateView icon={Inbox} title={emptyTitle} description={emptyDescription} />
  }

  const visibleColumns = columns.length > 0 ? columns : Object.keys(rows[0])

  return (
    <div className="ui-table-wrap">
      <table className="ui-table">
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const clickable = Boolean(onRowClick)
            return (
              <tr
                key={row.id}
                className={clickable ? 'ui-table-row-clickable' : undefined}
                onClick={() => onRowClick?.(row.id)}
              >
                {visibleColumns.map((column) => (
                  <td key={column} title={formatValue(row[column as keyof T])}>
                    {formatValue(row[column as keyof T])}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export interface DetailPanelViewProps<T extends BaseBean> {
  row: T | null
  columns?: (keyof T & string)[]
}

export function DetailPanelView<T extends BaseBean>({ row, columns }: DetailPanelViewProps<T>) {
  if (!row) {
    return <EmptyStateView icon={Inbox} title="Нет данных" />
  }

  const entries = columns?.length
    ? columns.map((key) => [key, row[key]] as const)
    : (Object.entries(row) as [keyof T & string, T[keyof T]][])

  return (
    <dl className="ui-detail">
      {entries.map(([key, value]) => (
        <div key={String(key)} className="ui-detail-row">
          <dt>{String(key)}</dt>
          <dd>{formatValue(value)}</dd>
        </div>
      ))}
    </dl>
  )
}
