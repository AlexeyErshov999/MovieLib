export interface Genre {
  name: string;
}

export interface Rating {
  kp?: number | null;
  imdb?: number | null;
}

export interface Poster {
  url?: string | null;
  previewUrl?: string | null;
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
}

export interface SearchMoviesResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}