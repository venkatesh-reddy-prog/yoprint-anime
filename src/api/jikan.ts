const BASE = 'https://api.jikan.moe/v4';

export type SearchParams = { q: string; page?: number };

export async function searchAnime({ q, page = 1 }: SearchParams, signal?: AbortSignal) {
  const url = `${BASE}/anime?q=${encodeURIComponent(q)}&page=${page}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  const json = await res.json();
  return json;
}

export async function getAnimeById(id: number, signal?: AbortSignal) {
  const url = `${BASE}/anime/${id}/full`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const json = await res.json();
  return json;
}
