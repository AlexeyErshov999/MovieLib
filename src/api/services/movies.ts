import { api } from '../axios';
import type { AxiosResponse } from 'axios';
import type { SearchMoviesResponse } from '../types';

class MoviesService {
  async getMovies(
    limit: number = 50,
    cursor?: string
  ): Promise<SearchMoviesResponse> {
    try {
      const params: Record<string, string | number> = { limit };
      
      if (cursor) {
        params.page = cursor;
      }
      
      const response: AxiosResponse<SearchMoviesResponse> = await api.get('/v1.5/movie', {
        params,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error loading movies:', error);
      return { docs: [], total: 0, limit: 50, page: 1, pages: 0, next: null };
    }
  }
}

export const moviesService = new MoviesService();