import { 
  user, getUser,
  USER_AUTH, LOGOUT,
  USER_UPDATE } from './reducers';
  
describe('user reducer', () => {
  
  it('initializers to null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });
  
  it('loads user', () => {
    const data = { name: 'user' };
    const state = user(null, { type: USER_AUTH, payload: data });
    expect(state).toEqual(data);
  });

  it('updates user', () => {
    const data = { name: 'different user' };
    const state = user({ name: 'user' }, { type: USER_UPDATE, payload: data });
    expect(state).toEqual(data);
  });
  
  it('clears user on logout', () => {
    const state = user({}, { type: LOGOUT });
    expect(state).toBe(null);
  });
  
  it('gets user from state', () => {
    const user = {};
    expect(getUser({ user })).toBe(user);
  });
});