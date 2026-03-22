import { createStore, createEvent } from "effector";
import type { Movie } from "../../../api/types";

const MAX_COMPARISON_MOVIES = 2;

export const addToComparison = createEvent<Movie>();
export const removeFromComparison = createEvent<number>();
export const clearComparison = createEvent();

export const $comparisonStore = createStore<Movie[]>([]);

$comparisonStore
  .on(addToComparison, (state, movie) => {
    if (state.find((m) => m.id === movie.id)) {
      return state;
    }
    
    if (state.length >= MAX_COMPARISON_MOVIES) {
      return [state[1], movie];
    }
    
    return [...state, movie];
  })
  .on(removeFromComparison, (state, movieId) =>
    state.filter((m) => m.id !== movieId)
  )
  .on(clearComparison, () => []);

export const comparisonModel = {
  add: (movie: Movie) => {
    addToComparison(movie);
  },

  remove: (movieId: number) => {
    removeFromComparison(movieId);
  },

  clear: () => {
    clearComparison();
  },

  isInComparison: (movieId: number): boolean => {
    return $comparisonStore.getState().some((m) => m.id === movieId);
  },
};
