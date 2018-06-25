export const REVIEWS_LOAD = 'REVIEWS_LOAD';
export const REVIEW_ADD = 'REVIEW_ADD';
export const REVIEW_UPDATE = 'REVIEW_UPDATE';
export const REVIEW_REMOVE = 'REVIEW_REMOVE';

export const getSearch = state => state.search;
export const getResults = state => state.results;

export function reviewsById(state = [], { type, payload }) {
  let oldIndex;

  switch(type) {
    case REVIEWS_LOAD:
      return payload;
    case REVIEW_ADD:
      state[payload.movieId].push(payload);
      return state;
    case REVIEW_UPDATE:
      oldIndex = state.findIndex(r => r.movieId == payload.movieId);
      state[oldIndex] = payload;
      return state;
    case REVIEW_REMOVE:
      return state.filter(r => r._id !== payload);
    default:
      return state;
      
  }
}