import { createStore, createEvent, createEffect, sample } from "effector";
import type { Movie } from "../../../api/types";

const STORAGE_KEY = "favorites_movies";

const loadFromStorage = (): Movie[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (movies: Movie[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error("Ошибка сохранения в localStorage:", error);
  }
};

const loadFavoritesFx = createEffect(() => {
  return loadFromStorage();
});

const saveFavoritesFx = createEffect((movies: Movie[]) => {
  saveToStorage(movies);
});

export const addFavorite = createEvent<Movie>();
export const removeFavorite = createEvent<number>();
export const clearFavorites = createEvent();
export const setFavorites = createEvent<Movie[]>();

export const $favoritesStore = createStore<Movie[]>([]);

$favoritesStore
  .on(setFavorites, (_, movies) => movies)
  .on(addFavorite, (state, movie) => {
    if (!state.find((m) => m.id === movie.id)) {
      return [...state, movie];
    }
    return state;
  })
  .on(removeFavorite, (state, movieId) => state.filter((m) => m.id !== movieId))
  .on(clearFavorites, () => []);

sample({
  clock: [addFavorite, removeFavorite, clearFavorites],
  source: $favoritesStore,
  target: saveFavoritesFx,
});

sample({
  clock: loadFavoritesFx.doneData,
  target: setFavorites,
});

export const favoritesModel = {
  init: () => {
    loadFavoritesFx();
  },

  add: (movie: Movie) => {
    addFavorite(movie);
  },

  remove: (movieId: number) => {
    removeFavorite(movieId);
  },

  clear: () => {
    clearFavorites();
  },

  isFavorite: (movieId: number): boolean => {
    return $favoritesStore.getState().some((m) => m.id === movieId);
  },

  subscribe: (callback: (movies: Movie[]) => void) => {
    callback($favoritesStore.getState());
    return $favoritesStore.watch(callback);
  },
};
