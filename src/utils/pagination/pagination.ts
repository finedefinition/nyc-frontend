export function isEmpty(obj: {}) {
  return Object.keys(obj).length === 0;
}

export function getPaginationWithDots(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const pagination = new Set<number>();

  pagination.add(1);
  pagination.add(currentPage);
  pagination.add(totalPages);

  if (currentPage > 1) {
    pagination.add(currentPage - 1);
  }

  if (currentPage < totalPages) {
    pagination.add(currentPage + 1);
  }

  const sortedPages = Array.from(pagination).sort((a, b) => a - b);

  const result: (number | string)[] = [];
  for (let i = 0; i < sortedPages.length; i++) {
    result.push(sortedPages[i]);

    if (i < sortedPages.length - 1 && sortedPages[i + 1] - sortedPages[i] > 1) {
      result.push('...');
    }
  }

  return result;
}
