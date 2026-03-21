import { api } from '../axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types';

class MoviesService {
  async getRandomMovie(): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await api.get('/movie/random');
      return response.data;
    } catch {
      return {} as Movie
    }
  }
}

export const moviesService = new MoviesService();