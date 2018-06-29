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

  if(user.watchlist.length) removeFromWatchList(user, movie.movieId);

  return {
    type: REVIEW_ADD,
    payload: sendNewReview(data, user._id)
  };
}

export function updateReview(review, userId) {
  return {
    type: REVIEW_UPDATE,
    payload: sendUpdateReview(review, userId)
  };
}

export function removeReview(reviewId, userId) {
  return {
    type: REVIEW_REMOVE,
    payload: sendRemoveReview(reviewId, userId),
  };
}

export function loadReview(id) {
  return {
    type: REVIEW_LOAD,
    payload: fetchReview(id)
  };
}