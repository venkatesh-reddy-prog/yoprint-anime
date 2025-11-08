export type AnimeImage = {
  image_url: string;
};

export type AnimeSummary = {
  mal_id: number;
  title: string;
  synopsis?: string;
  images: {
    jpg?: AnimeImage;
  };
};

export type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
};

export type SearchResponse = {
  data: AnimeSummary[];
  pagination: Pagination;
};
