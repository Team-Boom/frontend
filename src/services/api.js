import { get, post } from './request';

const URL = '/api';
const AUTH_URL = `${URL}/auth`;

export const signin = certification => post(`${AUTH_URL}/signin`, certification);
export const signup = certification => post(`${AUTH_URL}/signup`, certification);

export const verifyUser = token => get(`${AUTH_URL}/verify`, { 
  headers: {
    Authorization: token
  }
});