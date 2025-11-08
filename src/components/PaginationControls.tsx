import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setPage, fetchSearch } from '../features/search/searchSlice';

export default function PaginationControls() {
  const dispatch = useAppDispatch();
  const { results, query, page } = useAppSelector((s) => s.search);

  if (!results) return null;

  const last = results.pagination.last_visible_page || 1;
  const hasNext = results.pagination.has_next_page;

  const goTo = (p: number) => {
    dispatch(setPage(p));
    dispatch(fetchSearch({ q: query || ' ', page: p }));
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
      <button disabled={page <= 1} onClick={() => goTo(page - 1)}>Prev</button>
      <span>Page {page} / {last}</span>
      <button disabled={!hasNext} onClick={() => goTo(page + 1)}>Next</button>
    </div>
  );
}
