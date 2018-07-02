import { NEW_SEARCH, getResults, results } from './reducers';
      
const testResults = [{
  title: 'Oliver and Company',
  description: 'The best movie ever'
}];
  
      
describe('results reducer', () => {
  it('has a default value of an empty array', () => {
    const state = results([], {});
    expect(state).toEqual([]);
  });
      
  it('loads new results', () => {
    const state = results([], { type: NEW_SEARCH, payload: testResults });
    expect(state).toEqual(testResults);
  });
});
      
describe('search selectors', () => {

  it('gets results', () => {
    const got = getResults({ results: testResults });
    expect(got).toEqual(testResults);
  });
});