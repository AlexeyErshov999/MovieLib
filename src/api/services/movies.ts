import { api } from '../axios';
import type { AxiosResponse } from 'axios';
import type { SearchMoviesResponse } from '../types';
import { MOVIES_PER_PAGE } from '../../constants/movies';

class MoviesService {
  async getMovies(
    limit: number = MOVIES_PER_PAGE,
    cursor?: string
  ): Promise<SearchMoviesResponse> {
    const params: Record<string, string | number> = { limit };
    
    if (cursor) {
      params.next = cursor;
    }
    
    const response: AxiosResponse<SearchMoviesResponse> = await api.get('/v1.5/movie', {
      params,
    });
    
    return response.data;
  }
}

export const moviesService = new MoviesService();