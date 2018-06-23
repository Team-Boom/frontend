import { REVIEWS_LOAD, REVIEW_ADD, REVIEW_UPDATE, REVIEW_REMOVE  } from './reducers';
import { fetchReviews, sendNewReview, sendUpdateReview, sendRemoveReview } from '../../services/api';

export function loadReviewsById(id) {
  return {
    type: REVIEWS_LOAD,
    payload: {
      id: fetchReviews(id)
    } 
  };
}

export function newReview(data) {
  return {
    type: REVIEW_ADD,
    payload: sendNewReview(data)
  };
}

export function updateReview(data) {
  return {
    type: REVIEW_UPDATE,
    payload: sendUpdateReview(data)
  };
}

export function removeReview(id) {
  return {
    type: REVIEW_REMOVE,
    payload: sendRemoveReview(id)
  };
}
