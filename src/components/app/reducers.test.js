import {
  LOAD_START,
  LOAD_END,
  ERROR,
  ERROR_CLEAR,
  loading,
  error } from './reducers';
    
    
describe.only('loading reducer', () => {
    
  it('has a default value of an false boolean', () => {
    const state = loading(undefined, {});
    expect(state).toBeFalsy();
  });
    
  it('returns true on LOAD_START', () => {
    const state = loading(false, { type: LOAD_START });
    expect(state).toBeTruthy();
  });
    
  it('returns false on LOAD_END', () => {
    const state = loading(true, { type: LOAD_END });
    console.log('test', state);
    expect(state).toBeFalsy();
  });
});
    
describe.only('error reducer', () => {
  it('has a default value of null', () => {
    const state = error(undefined, {});
    expect(state).toBeFalsy();
  });
    
  it('returns error on error', () => {
    const state = error(null, { type: ERROR, payload: 'I am an error' });
    expect(state).toEqual('I am an error');
  });

  it('clears error', () => {
    const state = error('I am an error', { type: ERROR_CLEAR });
    expect(state).toBeFalsy();
  });
});
  