import { TOPTEN_LOAD, MOVIE_LOAD } from './reducers';
import { fetchTopTen, fetchMovie } from '../../services/db';

export function loadTop10(category) {
  return {
    type: TOPTEN_LOAD,
    payload: fetchTopTen(category) 
  };
}

export function loadDetail(id) {
  return {
    type: MOVIE_LOAD,
    payload: fetchMovie(id)
  };
}