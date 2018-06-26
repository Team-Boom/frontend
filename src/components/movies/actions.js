import { TOP10_LOAD, MOVIE_LOAD, MOVIEAVGS_LOAD } from './reducers';
import { fetchTopTen, fetchMovie, fetchMovieAvgs } from '../../services/db';

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
  const loadOmdb = {
    type: MOVIE_LOAD,
    payload: fetchMovie(id)
  };
  const loadRatings = {
    type: MOVIEAVGS_LOAD,
    payload: fetchMovieAvgs(id)
  };
  Promise.all([loadOmdb, loadRatings]);
}

export function reloadAvgs(id) {
  return {
    type: MOVIEAVGS_LOAD,
    payload: fetchMovieAvgs(id)
  };
}