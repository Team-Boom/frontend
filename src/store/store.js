import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reviewsByMovie, reviewsByUser } from '../components/reviews/reducers';
import { user, checkedAuth } from '../components/profile/reducers';
import { results } from '../components/nav/reducers';
import { error, loading } from '../components/app/reducers';
import { movie, top10s } from '../components/movies/reducers';
import { sorted } from '../components/browse/reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from './promise-middleware';

const rootReducer = combineReducers({
  error,
  loading,
  user,
  checkedAuth,
  reviewsByMovie,
  reviewsByUser,
  results,
  movie,
  top10s,
  sorted,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      promiseMiddleware
    )
  )
);

export default store;