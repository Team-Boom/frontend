import { REVIEWS_LOAD, REVIEW_ADD, REVIEW_UPDATE, REVIEW_REMOVE, ID_REVIEWS_LOAD  } from './reducers';
import { fetchReviews, sendNewReview, sendUpdateReview, sendRemoveReview } from '../../services/api';

export function loadReviewsByMovie(id) {
  return {
    type: ID_REVIEWS_LOAD,
    payload: {
      id: fetchReviews(id)
    } 
  };
}

export function loadReviewsByUser(id) {
  return {
    type: REVIEWS_LOAD,
    payload: fetchReviews(id)
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

export function removeReview(userid, id) {
  return {
    type: REVIEW_REMOVE,
    payload: {
      user: userid,
      review: sendRemoveReview(id),
    }
  };
}
