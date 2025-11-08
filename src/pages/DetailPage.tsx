import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeById } from '../api/jikan';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!id) return;
    const ac = new AbortController();
    setLoading(true);
    getAnimeById(Number(id), ac.signal)
      .then((r) => setData(r))
      .catch((e) => {
        if (e.name === 'AbortError') return;
        console.error(e);
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  const anime = data.data;
  return (
    <div style={{ padding: 20 }}>
      <h1>{anime.title}</h1>
      <img src={anime.images?.jpg?.image_url} alt={anime.title} width={200} />
      <p>{anime.synopsis}</p>
    </div>
  );
}
