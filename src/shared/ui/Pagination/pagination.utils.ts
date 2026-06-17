const MAX_VISIBLE_PAGES = 5

export function buildPageNumbers(
  current: number,
  totalRecords: number,
  pageSize: number,
  countLimitReached: boolean,
): (number | '…')[] {
  const totalPages = countLimitReached
    ? Math.max(current, Math.ceil(totalRecords / pageSize))
    : Math.max(1, Math.ceil(totalRecords / pageSize))

  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  return [...Array.from({ length: MAX_VISIBLE_PAGES }, (_, i) => i + 1), '…']
}

export function buildCountLabel(totalRecords: number, countLimitReached: boolean, countAll: boolean): string {
  if (countLimitReached && !countAll) {
    return `${totalRecords}+ record(s)`
  }
  return `${totalRecords} record(s)`
}
