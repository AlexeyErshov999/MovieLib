export interface Genre {
  name: string;
}

export interface ApiGenre {
  name: string | null;
  slug: string | null;
}

export interface Rating {
  kp?: number | null;
  imdb?: number | null;
}

export interface Poster {
  url?: string | null;
  previewUrl?: string | null;
}

export interface Country {
  name: string;
}

export interface Movie {
  id: number;
  name?: string | null;
  alternativeName?: string | null;
  year?: number | null;
  rating?: Rating | null;
  genres?: Genre[] | null;
  description?: string | null;
  poster?: Poster | null;
  movieLength?: number | null;
  countries?: Country[] | null;
  shortDescription?: string | null;
  slogan?: string | null;
  ratingMpaa?: string | null;
  ageRating?: string | null;
}
export interface SearchMoviesResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
  next?: string | null;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}