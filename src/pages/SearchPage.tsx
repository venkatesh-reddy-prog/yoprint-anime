import React from 'react';
import { useAppSelector } from '../hooks';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import PaginationControls from '../components/PaginationControls';

export default function SearchPage() {
  const { results, status, error, query } = useAppSelector((s) => s.search);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f6f8fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Anime Search App</h1>

      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <SearchBar />
      </div>

      {status === 'loading' && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {!results && status === 'idle' && (
        <p style={{ textAlign: 'center', marginTop: '30px' }}>Start typing to search for anime!</p>
      )}

      {results && results.data.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '30px' }}>No results found for "{query}".</p>
      )}

      {results && results.data.length > 0 && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            {results.data.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <PaginationControls />
          </div>
        </>
      )}
    </div>
  );
}
