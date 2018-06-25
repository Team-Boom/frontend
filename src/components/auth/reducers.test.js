import { 
  user, getUsers,
  USER_AUTH, LOGOUT } from './reducers';
  
describe('User Reducer', () => {
  
  it('initializes to null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });
  
  it('loads user', () => {
    const data = { name: user };
    const state = user(null, { type: USER_AUTH, payload: data });
    expect(state).toEqual(data);
  });
  
  it('clears user on logout', () => {
    const state = user({}, { type: LOGOUT });
    expect(state).toBe(null);
  });
  
  it('gets user from state', () => {
    const user = {};
    expect(getUsers({ user })).toBe(user);
  });
  
});