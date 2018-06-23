import { TOP10_LOAD, MOVIE_LOAD } from './reducers';
import { fetchTopTen, fetchMovie } from '../../services/db';

export function loadTop10(category) {
  return {
    type: TOP10_LOAD,
    payload: {
      category: category,
      movies: fetchTopTen(category)
    }
  };
}

export function loadDetail(id) {
  return {
    type: MOVIE_LOAD,
    payload: fetchMovie(id)
  };
}