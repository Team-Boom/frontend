import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reviewsByMovie, reviewsByUser, review } from '../components/reviews/reducers';
import { user, checkedAuth } from '../components/profile/reducers';
import { results } from '../components/nav/reducers';
import { error, loading } from '../components/app/reducers';
import { movie, top10s } from '../components/movies/reducers';
import { sorted } from '../components/browse/reducers';
import { breakpoint } from '../components/app/reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from './promise-middleware';
import responseHelpers from '../utils/responseHelpers';

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
  review,
  breakpoint
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  responseHelpers,
  composeEnhancers(
    applyMiddleware(
      thunk,
      promiseMiddleware,
    )
  )
);

export default store;