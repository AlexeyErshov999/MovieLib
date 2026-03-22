import { api } from '../axios';
import type { AxiosResponse } from 'axios';
import type { SearchMoviesResponse } from '../types';

class MoviesService {
  async getMovies(
    limit: number = 50
  ): Promise<SearchMoviesResponse> {
    try {
      const response: AxiosResponse<SearchMoviesResponse> = await api.get('/v1.5/movie', {
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