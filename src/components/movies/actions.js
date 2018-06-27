import { TOP10_LOAD, MOVIE_LOAD, MOVIEAVGS_LOAD } from './reducers';
import { fetchTopTens, fetchMovie, fetchMovieAvgs } from '../../services/api';

export function loadTop10s() {
  return {
    type: TOP10_LOAD,
    payload: fetchTopTens()
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
  return Promise.all([loadOmdb, loadRatings]);
  // return {
  //   type: MOVIE_LOAD,
  //   payload: fetchMovie(id)
  // };
}

export function reloadAvgs(id) {
  return {
    type: MOVIEAVGS_LOAD,
    payload: fetchMovieAvgs(id)
  };
}