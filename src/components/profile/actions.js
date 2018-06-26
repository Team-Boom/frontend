import { USER_AUTH, LOGOUT, CHECKED_AUTH, USER_UPDATE } from './reducers';
import { verifyUser, sendUpdateUser } from '../../services/api';
import { getStoredUser, clearStoredUser } from '../../services/request';
import { fetchSignin, fetchSignup } from '../../services/api';

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

  verifyUser(user.token)
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

export const addToWatchList = (user, id) => {
  user.watchlist.push(id);
  updateUser(user);
};

export const removeFromWatchList = (user, id) => {
  user.watchlist.filter(m => m._id !== id);
  updateUser(user);
};

export function updateUser(data) {
  return {
    type: USER_UPDATE,
    payload: sendUpdateUser(data)
  };
}