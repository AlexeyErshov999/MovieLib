import type { Movie } from "../api/types";

export const getMovieTitle = (movie: Movie): string => {
  return movie.name || movie.alternativeName || "Без названия";
};

export const getPosterUrl = (movie: Movie): string | null => {
  return movie.poster?.previewUrl || movie.poster?.url || null;
};

export const getRatingColor = (rating: number) => {
  if (rating >= 8) return "#4bb34b";
  if (rating >= 6) return "#ffaa00";
  return "#e64646";
};
