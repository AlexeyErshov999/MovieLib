import { createStore, createEvent, createEffect, sample } from "effector";
import { moviesService } from "../../../api/services/movies";
import type { Movie } from "../../../api/types";

export const loadMovies = createEvent<void>();
export const loadMoreMovies = createEvent<void>();

const loadMoviesFx = createEffect(async () => {
  const response = await moviesService.getMovies(50);
  return {
    movies: response.docs || [],
    next: response.next,
  };
});

const loadMoreMoviesFx = createEffect(async (cursor: string) => {
  const response = await moviesService.getMovies(50, cursor);
  return {
    movies: response.docs || [],
    next: response.next,
  };
});

export const $moviesStore = createStore<Movie[]>([])
  .on(loadMoviesFx.doneData, (_, { movies }) => movies)
  .on(loadMoreMoviesFx.doneData, (state, { movies }) => [...state, ...movies]);

export const $moviesLoading = createStore<boolean>(false)
  .on(loadMoviesFx.pending, (_, pending) => pending);

export const $loadingMore = createStore<boolean>(false)
  .on(loadMoreMoviesFx.pending, (_, pending) => pending);

export const $nextCursor = createStore<string | null>(null)
  .on(loadMoviesFx.doneData, (_, { next }) => next || null)
  .on(loadMoreMoviesFx.doneData, (_, { next }) => next || null);

export const $hasMore = createStore<boolean>(true)
  .on(loadMoviesFx.doneData, (_, { next }) => next !== null)
  .on(loadMoreMoviesFx.doneData, (_, { next }) => next !== null);

sample({
  clock: loadMovies,
  target: loadMoviesFx,
});

sample({
  clock: loadMoreMovies,
  source: $nextCursor,
  filter: (cursor): cursor is string => cursor !== null,
  target: loadMoreMoviesFx,
});

export const moviesModel = {
  load: () => loadMovies(),
  loadMore: () => loadMoreMovies(),
  getMovieById: (id: number) => $moviesStore.getState().find((m) => m.id === id),
};
