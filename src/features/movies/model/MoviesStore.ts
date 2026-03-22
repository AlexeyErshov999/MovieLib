import { createStore, createEvent, createEffect, sample, combine } from "effector";
import { moviesService } from "../../../api/services/movies";
import type { Movie } from "../../../api/types";

export const loadMovies = createEvent<void>();
export const loadMoreMovies = createEvent<void>();

function paginationFromResponse(response: {
  docs?: Movie[];
  next?: string | null;
  hasNext?: boolean;
}) {
  const movies = response.docs || [];
  const next = response.next ?? null;
  const hasMore = response.hasNext ?? Boolean(next);
  return { movies, next, hasMore };
}

const loadMoviesFx = createEffect(async () => {
  const response = await moviesService.getMovies(50);
  return paginationFromResponse(response);
});

const loadMoreMoviesFx = createEffect(async (cursor: string) => {
  const response = await moviesService.getMovies(50, cursor);
  return paginationFromResponse(response);
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
  .on(loadMoviesFx.doneData, (_, { hasMore }) => hasMore)
  .on(loadMoreMoviesFx.doneData, (_, { hasMore }) => hasMore);

sample({
  clock: loadMovies,
  target: loadMoviesFx,
});

const $loadMoreGate = combine({
  cursor: $nextCursor,
  morePending: loadMoreMoviesFx.pending,
  loadPending: loadMoviesFx.pending,
});

sample({
  clock: loadMoreMovies,
  source: $loadMoreGate,
  filter: ({ cursor, morePending, loadPending }) =>
    typeof cursor === "string" &&
    cursor.length > 0 &&
    !morePending &&
    !loadPending,
  fn: ({ cursor }) => cursor as string,
  target: loadMoreMoviesFx,
});

export const moviesModel = {
  load: () => loadMovies(),
  loadMore: () => loadMoreMovies(),
  getMovieById: (id: number) => $moviesStore.getState().find((m) => m.id === id),
};
