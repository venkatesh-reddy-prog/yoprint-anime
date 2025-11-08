import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch } from '../hooks';
import { fetchSearch, setQuery } from '../features/search/searchSlice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [local, setLocal] = useState('');
  const debounceRef = useRef<number | null>(null);
  const lastPromise = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      if (lastPromise.current?.abort) lastPromise.current.abort();
    };
  }, []);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      if (lastPromise.current?.abort) {
        lastPromise.current.abort();
      }
      dispatch(setQuery(local));
      const p = dispatch(fetchSearch({ q: local || ' ', page: 1 }));
      lastPromise.current = p;
    }, 250);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [local, dispatch]);

  return (
    <div>
      <input
        value={local}
        onChange={e => setLocal(e.target.value)}
        placeholder="Search anime..."
        style={{ padding: 8, width: '100%' }}
      />
    </div>
  );
}
