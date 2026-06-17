import { SkeletonView } from '../Skeleton/Skeleton.view'
import '../ui.css'

export interface TableSkeletonViewProps {
  columns: string[]
  rows?: number
}

export function TableSkeletonView({ columns, rows = 8 }: TableSkeletonViewProps) {
  return (
    <div className="ui-table-wrap" aria-busy="true" aria-label="Загрузка таблицы">
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={`${column}-${colIndex}`}>
                  <SkeletonView width={colIndex === 0 ? '40%' : `${55 + (colIndex % 3) * 10}%`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
