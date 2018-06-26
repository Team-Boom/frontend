import { REVIEWS_LOAD, REVIEW_ADD, REVIEW_UPDATE, REVIEW_REMOVE, ID_REVIEWS_LOAD  } from './reducers';
import { fetchMovieReviews, fetchUserReviews, sendNewReview, sendUpdateReview, sendRemoveReview } from '../../services/api';

export function loadReviewsByMovie(id) {
  return {
    type: ID_REVIEWS_LOAD,
    payload: {
      [id]: fetchMovieReviews(id)
    } 
  };
}

export function loadReviewsByUser(id) {
  return {
    type: REVIEWS_LOAD,
    payload: fetchUserReviews(id)
  };
}

export function newReview(data) {
  const user = data.user;
  return {
    type: REVIEW_ADD,
    payload: sendNewReview(data, user)
  };
}

export function updateReview(data) {
  const review = data._id;
  return {
    type: REVIEW_UPDATE,
    payload: sendUpdateReview(data, review)
  };
}

export function removeReview(id) {
  return {
    type: REVIEW_REMOVE,
    payload: sendRemoveReview(id),
  };
}
