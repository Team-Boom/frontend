
jest.mock('../../services/api', () => ({ 
  fetchMovieReviews: jest.fn(),
  fetchUserReviews: jest.fn(),
  sendNewReview: jest.fn(),
  sendUpdateReview: jest.fn(),
  sendRemoveReview: jest.fn()
}));

import { loadReviewsByMovie, loadReviewsByUser, newReview, 
  updateReview, removeReview } from './actions';
import { ID_REVIEWS_LOAD, REVIEW_ADD, REVIEW_REMOVE, 
  REVIEW_UPDATE, REVIEWS_LOAD } from './reducers';
import { fetchMovieReviews, fetchUserReviews, sendNewReview, 
  sendRemoveReview, sendUpdateReview } from '../../services/api';
           
describe('Move review actions', () => {  

  it('loads all reviews by movie', () => {
    const promise = Promise.resolve();
    fetchMovieReviews.mockReturnValueOnce(promise);
    
    const { type, payload } = loadReviewsByMovie(123);
    const id = Object.keys(payload)[0];

    expect(type).toBe(ID_REVIEWS_LOAD);
    expect(fetchMovieReviews.mock.calls.length).toBe(1);
    expect(id).toBe('123');
    expect(payload[id]).toBe(promise);
  });

});

describe('User review actions', () => {  

  it('loads all reviews by user', () => {
    const promise = Promise.resolve();
    fetchUserReviews.mockReturnValueOnce(promise);
      
    const { type, payload } = loadReviewsByUser(123);

    expect(type).toBe(REVIEWS_LOAD);
    expect(fetchUserReviews.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });

  it('adds a new review', () => {
    const promise = Promise.resolve();
    sendNewReview.mockReturnValueOnce(promise);
      
    const { type, payload } = newReview({ key: 'value' });

    expect(type).toBe(REVIEW_ADD);
    expect(sendNewReview.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });

  it('updates an exisitng review', () => {
    const promise = Promise.resolve();
    sendUpdateReview.mockReturnValueOnce(promise);
      
    const { type, payload } = updateReview({ key: 'value' });

    expect(type).toBe(REVIEW_UPDATE);
    expect(sendUpdateReview.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });

  it('removes a review', () => {
    const promise = Promise.resolve();
    sendRemoveReview.mockReturnValueOnce(promise);
      
    const { type, payload } = removeReview(123);

    expect(type).toBe(REVIEW_REMOVE);
    expect(sendRemoveReview.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });
    
});