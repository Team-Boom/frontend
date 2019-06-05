export const ID_REVIEWS_LOAD = 'ID_REVIEWS_LOAD';
export const REVIEWS_LOAD = 'REVIEWS_LOAD';
export const REVIEW_LOAD = 'REVIEW_LOAD';
export const REVIEW_ADD = 'REVIEW_ADD';
export const REVIEW_UPDATE = 'REVIEW_UPDATE';
export const REVIEW_REMOVE = 'REVIEW_REMOVE';

export const getReview = state => state.review;
export const getReviewsByMovie = state => state.reviewsByMovie;
export const getReviewsByUser = state => state.reviewsByUser;
export const getCatReviewsByMovie = (category, state) => {
  const movieId = Object.keys(state.reviewsByMovie)[0];
  return state.reviewsByMovie[movieId].filter(r => r.category == category);
};
export const getCatReviewsByUser = (category, state) => state.reviewsByUser.filter(r => r.category == category);

export function reviewsByMovie(state = [], { type, payload }) {

  switch(type) {
    case ID_REVIEWS_LOAD: 
      return payload;
    default:
      return state;
  }
}

export function reviewsByUser(state = [], { type, payload }) {
  let oldIndex;

  switch(type) {
    case REVIEWS_LOAD: 
      return payload;
    case REVIEW_ADD:
      // you need to use immutability here
      // state.push(payload);
      // return state;
      return [...state, payload];
    case REVIEW_UPDATE:
      // same here!
      // oldIndex = state.findIndex(r => (r.movieId === payload.movieId && r.category === payload.category));
      // state[oldIndex] = payload;
      // return state;
      return state.map(r => r.movieId === payload.movieId && r.category === payload.category ? payload : r);
    case REVIEW_REMOVE:
      return state.filter(r => r._id !== payload); 
    default:
      return state;
      
  }
}

export function review(state = {}, { type, payload }) {
  switch(type) {
    case REVIEWS_LOAD: 
      return { };
    case REVIEW_LOAD:
      return payload;
    default:
      return state;
      
  }
}