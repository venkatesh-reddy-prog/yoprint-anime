import React from 'react';
import { Link } from 'react-router-dom';
import { AnimeSummary } from '../features/search/types';

type Props = {
  anime: AnimeSummary;
};

export default function AnimeCard({ anime }: Props) {
  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          overflow: 'hidden',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img
          src={anime.images?.jpg?.image_url}
          alt={anime.title}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
        />
        <div style={{ padding: '10px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '5px' }}>{anime.title}</h3>
          <p
            style={{
              fontSize: '0.85rem',
              color: '#555',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              minHeight: '3.5em',
            }}
          >
            {anime.synopsis || 'No description available.'}
          </p>
        </div>
      </div>
    </Link>
  );
}
