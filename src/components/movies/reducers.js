export const TOP10_LOAD = 'TOP10_LOAD';
export const MOVIE_LOAD = 'MOVIE_LOAD';

export const getMovie = state => state.movie;
export const getTop10 = (category, state) => state.top10s[category];

export function movie(state = {}, { type, payload }) {
  switch(type) {
    case MOVIE_LOAD:
      return payload;
    default:
      return state;
  }
}

export function top10s(state = [], { type, payload }) {
  switch(type) {
    case TOP10_LOAD:
      return {
        ...state,
        [payload.category] : payload.movies
      };
    default: 
      return state;
  }
}