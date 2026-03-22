import { api } from '../axios';
import type { AxiosResponse } from 'axios';
import type { SearchMoviesResponse, ApiGenre } from '../types';

class MoviesService {
  async getMovies(
    limit: number = 50,
    cursor?: string | null
  ): Promise<SearchMoviesResponse> {
    try {
      const params: Record<string, string | number> = { limit };
      
      if (cursor) {
        params.next = cursor;
      }
      
      const response: AxiosResponse<SearchMoviesResponse> = await api.get('/v1.5/movie', {
        params,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      return { docs: [], total: 0, limit: 50, page: 1, pages: 0, next: null };
    }
  }
    
  async getGenres(): Promise<ApiGenre[]> {
    try {
      const response: AxiosResponse<ApiGenre[]> = await api.get('/v1/movie/possible-values-by-field', {
        params: {
          field: 'genres.name',
        },
      });  
      return response.data || [];
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  }
}

export const moviesService = new MoviesService();