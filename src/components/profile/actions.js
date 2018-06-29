import { USER_AUTH, LOGOUT, CHECKED_AUTH, USER_UPDATE, USER_LOAD_AVG, WATCHLIST_LOAD } from './reducers';
import { fetchVerifyUser, sendUpdateUser, fetchSignin, fetchSignup, 
  fetchUserAvg, fetchWatchlist, sendToWatchlist } from '../../services/api';
import { getStoredUser, clearStoredUser } from '../../services/request';

const makeAuth = api => credentials => ({
  type: USER_AUTH,
  payload: api(credentials)
});

export const signup = makeAuth(fetchSignup);
export const signin = makeAuth(fetchSignin); 
export const logout = () => ({ type: LOGOUT });

const authChecked = () => ({ type: CHECKED_AUTH });

export const tryLoadUser = () => dispatch => {
  const user = getStoredUser();
  if(!user || !user.token) {
    return dispatch(authChecked());
  }

  fetchVerifyUser(user.token)
    .then(() => dispatch({
      type: USER_AUTH,
      payload: user
    }))
    .catch(() => {
      clearStoredUser();
    })
    .then(() => {
      dispatch(authChecked());
    });
};

export const addToWatchList = (data, userId) => {
  if(data.Title) {
    let movie = {
      title: data.Title,
      poster: data.Poster,
      movieId: data.imdbID,
    };
    data = movie;
  }

  if(!data.movieId) data.movieId = data._id || data.imdbID || data.imdbId;

  return {
    type: USER_UPDATE,
    payload: sendToWatchlist(data, userId),
  };
};

export const loadWatchlist = userId => {
  return {
    type: WATCHLIST_LOAD,
    payload: fetchWatchlist(userId),
  };
};

export const removeFromWatchList = (user, movieId) => {
  if(user.watchlist[0]) user.watchlist = user.watchlist.filter(m => m !== movieId);
  return updateUser(user, user._id);
};

export function updateUser(data, userId) {
  return {
    type: USER_UPDATE,
    payload: sendUpdateUser(data, userId)
  };
}

export function loadUserAvg(userId) {
  return {
    type: USER_LOAD_AVG,
    payload: fetchUserAvg(userId)
  };
}