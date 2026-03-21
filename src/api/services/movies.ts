import { api } from '../axios';
import type { AxiosResponse } from 'axios';
import type { Movie, SearchMoviesResponse } from '../types';

class MoviesService {
  async getRandomMovie(): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await api.get('/movie/random');
      return response.data;
    } catch {
      return {} as Movie
    }
  }

  async getMovies(
    limit: number = 50
  ): Promise<SearchMoviesResponse> {
    try {
      const response: AxiosResponse<SearchMoviesResponse> = await api.get('/movie', {
        params: {
          limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      return {} as SearchMoviesResponse
    }
  }
}

export const moviesService = new MoviesService();