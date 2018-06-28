jest.mock('../../services/api', () => ({
  fetchSignin: jest.fn(),
  fetchSignup: jest.fn(),
  fetchVerify: jest.fn(),
  sendUpdateUser: jest.fn()
}));
  
import { signup, signin, logout, 
  addToWatchList, removeFromWatchList, 
  updateUser } from './actions';
import { USER_AUTH, LOGOUT, USER_UPDATE } from './reducers';
import { 
  fetchSignup as signupSvc, 
  fetchSignin as signinSvc, 
  sendUpdateUser  } from '../../services/api'; 
  
describe('auth action creators', () => {
  
  function testAuth(name, mockSvc, actionCreator) {
    it(`creates ${name} action`, () => {
      const promise = Promise.resolve();
      mockSvc.mockReturnValueOnce(promise);
        
      const credentials = {};
      const { type, payload } = actionCreator(credentials);
      expect(type).toBe(USER_AUTH);
      expect(payload).toBe(promise);
      expect(mockSvc.mock.calls.length).toBe(1);
      expect(mockSvc.mock.calls[0][0]).toBe(credentials);
    });
  }
  
  testAuth('signup', signupSvc, signup);
  testAuth('signin', signinSvc, signin);
  
  it('creates logout action', () => {
    const { type } = logout();
    expect(type).toBe(LOGOUT);
  });
});

describe('user actions', () => {
  const user = {
    _id: 123,
    watchlist: [{ _id: 1 }]
  };

  const movie = { _id: 2  };

  const user2 = {
    _id: 123,
    watchlist: [{ _id: 1 }, { _id: 2 }]
  };

  it('adds a movie to a watchlist and updates user', () => {
    const promise = Promise.resolve();
    sendUpdateUser.mockReturnValueOnce(promise);
    
    const { type, payload } = addToWatchList(user, movie._id);

    expect(type).toBe(USER_UPDATE);
    expect(sendUpdateUser.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });

  it('removes a movie from the watchlist and updates user', () => {
    const promise = Promise.resolve();
    sendUpdateUser.mockReturnValueOnce(promise);
    
    const { type, payload } = removeFromWatchList(user2, movie._id);

    expect(type).toBe(USER_UPDATE);
    expect(sendUpdateUser.mock.calls.length).toBe(2);
    expect(payload).toBe(promise);
  });
});