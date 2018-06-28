import { USER_AUTH, LOGOUT, CHECKED_AUTH, USER_UPDATE, USER_LOAD_AVG } from './reducers';
import { fetchVerifyUser, sendUpdateUser, fetchSignin, fetchSignup, fetchUserAvg } from '../../services/api';
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

export const addToWatchList = (user, movieId) => {
  user.watchlist.push(movieId);
  return updateUser(user);
};

export const removeFromWatchList = (user, movieId) => {
  user.watchlist.filter(m => m._id !== movieId);
  return updateUser(user);
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