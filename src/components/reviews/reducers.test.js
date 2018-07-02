import {
  REVIEW_ADD,
  REVIEWS_LOAD,
  ID_REVIEWS_LOAD,
  REVIEW_UPDATE,
  REVIEW_REMOVE,
  getReviewsByMovie,
  getReviewsByUser,
  getCatReviewsByMovie,
  getCatReviewsByUser,
  reviewsByMovie,
  reviewsByUser } from './reducers';
        
const review1 = {
  _id: 1,
  movieId: 123,
  user: 12,
  category: 'lighting'
};

const review2 = {
  _id: 2,
  movieId: 123,
  user: 12,
  category: 'sound'
};

describe('reviewsByMovie reducer', () => {
        
  it('has a default value of an empty array', () => {
    const state = reviewsByMovie(undefined, {});
    expect(state).toEqual([]);
  });
        
  it('loads reviews', () => {
    const state = reviewsByMovie([], { type: ID_REVIEWS_LOAD, payload: { 123: [review1] } });
    expect(state).toEqual({ 123: [review1] });
  });
});
     
    
describe('reviewsByUser reducer', () => {
        
  it('has a default value of an empty array', () => {
    const state = reviewsByUser(undefined, {});
    expect(state).toEqual([]);
  });
        
  it('loads reviews', () => {
    const state = reviewsByUser([], { type: REVIEWS_LOAD, payload: [review1] });
    expect(state).toEqual([review1]);
  });

  it('adds a review', () => {
    const state = reviewsByUser([review1], { type: REVIEW_ADD, payload: review2 });
    expect(state).toEqual([review1, review2]);
  });

  const newReview = { ...review2, text: 'I am a review' };
  it('updates a review', () => {
    const state = reviewsByUser([review1, review2], { type: REVIEW_UPDATE, payload: newReview });
    expect(state).toEqual([review1, newReview]);
  });

  it('removes a review', () => {
    const state = reviewsByUser([review1, review2], { type: REVIEW_REMOVE, payload: review2._id });
    expect(state).toEqual([review1]);
  });
});
        
describe('review selectors', () => {
  it('gets all reviews by movie', () => {
    const got = getReviewsByMovie({ reviewsByMovie: { 123: [review1, review2] } });
    expect(got).toEqual({ 123: [review1, review2] });
  });
        
  it('gets all reviews by user', () => {
    const got = getReviewsByUser({ reviewsByUser: [review1, review2] });
    expect(got).toEqual([review1, review2]);
  });

  it('gets all movie reviews by category', () => {
    const got = getCatReviewsByMovie('lighting', { reviewsByMovie: { 123: [review1, review2] } });
    expect(got).toEqual([review1]);
  });

  it('gets all reviews', () => {
    const got = getCatReviewsByUser('lighting', { reviewsByUser: [review1, review2] });
    expect(got).toEqual([review1]);
  });
});