import { TOP10_LOAD, MOVIE_LOAD, MOVIEAVGS_LOAD } from './reducers';
import { fetchTopTens, fetchMovie, fetchMovieAvgs } from '../../services/api';
import { ERROR } from '../app/reducers';

export function loadTop10s() {
  return {
    type: TOP10_LOAD,
    payload: fetchTopTens()
  };
}

export function loadDetail(id) {

  return dispatch => {
    fetchMovie(id)
      .then(
        response => response.json())
      .then(
        movie => {
          console.log(movie);
          dispatch({
            type: MOVIE_LOAD,
            payload: movie
          });
        },
        err => {
          dispatch({
            type: ERROR,
            payload: err
          });
        })
      .then(() => {
        fetchMovieAvgs(id)
          .then(
            response => response.json())
          .then(
            avgs => {
              dispatch({
                type: MOVIEAVGS_LOAD,
                payload: avgs
              });
            },
            err => {
              dispatch({
                type: ERROR,
                payload: err
              });
            });
      });
  };
}

export function reloadAvgs(id) {
  return {
    type: MOVIEAVGS_LOAD,
    payload: fetchMovieAvgs(id)
  };
}