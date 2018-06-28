export const USER_AUTH = 'USER_AUTH';
export const LOGOUT = 'LOGOUT';
export const CHECKED_AUTH = 'CHECKED_AUTH';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_LOAD_AVG = 'USER_LOAD_AVG';

export const getUser = state => state.user;
export const getUserAvg = state => state.user.reviewAvg;
export const getCheckedAuth = state => state.checkedAuth;
export const getWatchlist = state => state.user.watchlist;

export function user(state = null, { type, payload }) {
  switch(type) {
    case USER_AUTH:
      return payload;
    case USER_LOAD_AVG:
      return {
        ...state,
        reviewAvg: payload
      };
    case USER_UPDATE:
      return payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

export function checkedAuth(state = false, { type }) {
  switch(type) {
    case CHECKED_AUTH:
      return true;
    default:
      return state;
  }
}