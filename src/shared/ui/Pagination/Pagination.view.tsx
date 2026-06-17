import { ButtonView } from '../Button/Button.view'
import { InputView } from '../Input/Input.view'
import '../ui.css'

export interface PaginationViewProps {
  page: number
  pageSize: number
  totalRecords: number
  countLimitReached: boolean
  countAll: boolean
  pages: (number | '…')[]
  hasPrev: boolean
  hasNext: boolean
  countLabel: string
  onPageChange: (page: number) => void
  onCountAll: () => void
}

export function PaginationView({
  page,
  hasPrev,
  hasNext,
  pages,
  countLabel,
  countLimitReached,
  countAll,
  onPageChange,
  onCountAll,
}: PaginationViewProps) {
  return (
    <div className="ui-pagination">
      <div className="ui-pagination-controls">
        <ButtonView variant="secondary" size="sm" disabled={!hasPrev} onClick={() => onPageChange(1)}>
          First
        </ButtonView>
        <ButtonView variant="secondary" size="sm" disabled={!hasPrev} onClick={() => onPageChange(page - 1)}>
          Previous
        </ButtonView>
        {pages.map((item, index) =>
          item === '…' ? (
            <span key={`e-${index}`} className="ui-page-ellipsis">…</span>
          ) : (
            <ButtonView
              key={item}
              variant="secondary"
              size="sm"
              active={item === page}
              onClick={() => onPageChange(item)}
            >
              {item}
            </ButtonView>
          ),
        )}
        <ButtonView variant="secondary" size="sm" disabled={!hasNext} onClick={() => onPageChange(page + 1)}>
          Next
        </ButtonView>
        <InputView
          className="ui-page-input"
          type="number"
          min={1}
          value={page}
          onChange={(e) => {
            const next = Number(e.target.value)
            if (next >= 1) onPageChange(next)
          }}
        />
      </div>
      <div className="ui-pagination-meta">
        <span>{countLabel}</span>
        {countLimitReached && !countAll && (
          <ButtonView variant="ghost" size="sm" onClick={onCountAll}>
            count all
          </ButtonView>
        )}
      </div>
    </div>
  )
}
