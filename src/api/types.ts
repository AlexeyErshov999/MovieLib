export interface Genre {
  name: string;
}

export interface Rating {
  kp?: number | null;
  imdb?: number | null;
}

export interface Poster {
  url?: string | null;
}

export interface Movie {
  id: number;
  name?: string | null;
  year?: number | null;
  rating?: Rating | null;
  genres?: Genre[] | null;
  description?: string | null;
  poster?: Poster | null;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}