import { REVIEWS_LOAD, REVIEW_ADD, REVIEW_UPDATE, REVIEW_REMOVE, ID_REVIEWS_LOAD, REVIEW_LOAD  } from './reducers';
import { fetchMovieReviews, fetchUserReviews, sendNewReview, 
  sendUpdateReview, sendRemoveReview, fetchMovieReviewsCat, fetchReview } from '../../services/api';
import { removeFromWatchList } from '../profile/actions';

export function loadReviewsByMovie(movieId, cat) {
  const wCat = () => ({ type: ID_REVIEWS_LOAD, payload: fetchMovieReviewsCat(movieId, cat) });
  const woCat = () => ({ type: ID_REVIEWS_LOAD, payload: fetchMovieReviews(movieId) });
  
  return cat ? wCat() : woCat();
}

export function loadReviewsByUser(userId) {
  return {
    type: REVIEWS_LOAD,
    payload: fetchUserReviews(userId)
  };
}

export function newReview(review, user, movie) {
  const data = {
    ...review,
    ...movie
  };

  removeFromWatchList(user, movie.imdbId);

  return {
    type: REVIEW_ADD,
    payload: sendNewReview(data, user._id)
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

export function loadReview(id) {
  return {
    type: REVIEW_LOAD,
    payload: fetchReview(id)
  };
}