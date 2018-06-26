import {
  SORT_CLEAR,
  SORT_LOAD,
  getSorted,
  sorted
} from './reducers';
    
const testSort = ['one', 'two'];

describe('sorted reducer', () => {
        
  it('has a default value of an empty array', () => {
    const state = sorted(undefined, {});
    expect(state).toEqual([]);
  });
        
  it('loads sorted', () => {
    const state = sorted([], { type: SORT_LOAD, payload: testSort });
    expect(state).toEqual(testSort);
  });

  it('clears sorted', () => {
    const state = sorted(testSort, { type: SORT_CLEAR, payload: [] });
    expect(state).toEqual([]);
  });
});
        
describe('sort selector', () => {
  it('gets sorted', () => {
    const got = getSorted({ sorted: testSort });
    expect(got).toEqual(testSort);
  });
});