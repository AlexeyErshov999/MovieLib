import { createStore, createEvent, createEffect, sample } from "effector";
import { moviesService } from "../../../api/services/movies";
import type { ApiGenre } from "../../../api/types";

export const loadGenres = createEvent();
export const setGenres = createEvent<ApiGenre[]>();

const loadGenresFx = createEffect(async () => {
  const genres = await moviesService.getGenres();
  return genres.filter(g => g.name !== null);
});

export const $genresStore = createStore<ApiGenre[]>([]);
export const $genresLoading = createStore(false);

$genresStore.on(setGenres, (_, genres) => genres);
$genresLoading.on(loadGenresFx.pending, (_, pending) => pending);

sample({
  clock: loadGenres,
  target: loadGenresFx,
});

sample({
  clock: loadGenresFx.doneData,
  target: setGenres,
});

export const genresModel = {
  load: () => {
    loadGenres();
  },
};
