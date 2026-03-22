import { createStore, createEvent, createEffect, sample } from "effector";
import { moviesService } from "../../../api/services/movies";
import type { Movie } from "../../../api/types";

export const loadMovies = createEvent();
export const setMovies = createEvent<Movie[]>();

const loadMoviesEffect = createEffect(async () => {
  const response = await moviesService.getMovies(50);
  return response.docs || [];
});

export const $moviesStore = createStore<Movie[]>([]);
export const $moviesLoading = createStore(false);

$moviesStore.on(setMovies, (_, movies) => movies);
$moviesLoading.on(loadMoviesEffect.pending, (_, pending) => pending);

sample({
  clock: loadMovies,
  target: loadMoviesEffect,
});

sample({
  clock: loadMoviesEffect.doneData,
  target: setMovies,
});

export const moviesModel = {
  load: () => {
    loadMovies();
  },

  getMovieById: (id: number): Movie | undefined => {
    return $moviesStore.getState().find((m) => m.id === id);
  },
};
