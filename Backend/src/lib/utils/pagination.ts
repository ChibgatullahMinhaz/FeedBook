export interface Pagination {
  page: number;
  limit: number;
  offset: number;
}

export const getPagination = (
  page: number = 1,
  limit: number = 10
): Pagination => {
  const safePage = Math.max(Number(page), 1);
  const safeLimit = Math.min(Number(limit), 50);

  return {
    page: safePage,
    limit: safeLimit,
    offset: (safePage - 1) * safeLimit,
  };
};