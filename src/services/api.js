import { get, post, put, del, exGet } from './request';
const URL = 'http://localhost:3000/api';
const AUTH_URL = `${URL}/auth`;
const REVIEW_URL = `${URL}/reviews`;
const OMDB_KEY = process.env.API_KEY; //eslint-disable-line
const OMDB_URL = `http://www.omdbapi.com/?apikey=${OMDB_KEY}`;

export const fetchSignin = certification => post(`${AUTH_URL}/signin`, certification);
export const fetchSignup = certification => post(`${AUTH_URL}/signup`, certification);
export const sendUpdateUser = (data, userId) => put(`${URL}/users/${userId}`, data);
export const fetchVerifyUser = token => get(`${AUTH_URL}/verify`, { 
  headers: {
    Authorization: token
  }
});

export const fetchSorted = (cat, p) => get(`${REVIEW_URL}/sort/${cat}/${p}`);
export const fetchTopTens = () => get(`${REVIEW_URL}/top10`);

export const fetchMovieAvgs = movieId => get(`${REVIEW_URL}/${movieId}`);
export const fetchMovieReviews = movieId => get(`${REVIEW_URL}/movie/${movieId}`);
export const fetchMovieReviewsCat = (movieId, cat) => get(`${REVIEW_URL}/movie/${movieId}/${cat}`);
export const fetchUserReviews = userId => get(`${REVIEW_URL}/user/${userId}`);

export const sendNewReview = (data, userId) => post(`${REVIEW_URL}/user/${userId}`, data);
export const sendUpdateReview = (data, reviewId) => put(`${REVIEW_URL}/user/${reviewId}`, data);
export const sendRemoveReview = reviewId => del(`${REVIEW_URL}/user/${reviewId}`);

export const fetchSearch = query => exGet(`${OMDB_URL}&type=movie&s=${query}`);
export const fetchMovie = imdbID => exGet(`${OMDB_URL}&i=${imdbID}`);

