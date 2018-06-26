import { REVIEWS_LOAD, REVIEW_ADD, REVIEW_UPDATE, REVIEW_REMOVE, ID_REVIEWS_LOAD  } from './reducers';
import { fetchMovieReviews, fetchUserReviews, sendNewReview, sendUpdateReview, sendRemoveReview } from '../../services/api';

export function loadReviewsByMovie(movieId) {
  return {
    type: ID_REVIEWS_LOAD,
    payload: {
      [movieId]: fetchMovieReviews(movieId)
    } 
  };
}

export function loadReviewsByUser(userId) {
  return {
    type: REVIEWS_LOAD,
    payload: fetchUserReviews(userId)
  };
}

export function newReview(review, userId, movie) {
  const data = {
    ...review,
    ...movie
  };
  
  return {
    type: REVIEW_ADD,
    payload: sendNewReview(data, userId)
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
