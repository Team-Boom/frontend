import {
  NEW_SEARCH,
  getQuery,
  getResults,
  search,
  results } from './reducers';
      
const testQuery = {
  query: 'Oliver',
  results: [{
    title: 'Oliver and Company',
    description: 'The best movie ever'
  }]
};
  
describe('search reducer', () => {
      
  it('has a default value of an empty string', () => {
    const state = search(undefined, {});
    expect(state).toEqual('');
  });
      
  it('saves query', () => {
    const state = search('', { type: NEW_SEARCH, payload: testQuery });
    expect(state).toEqual(testQuery.query);
  });
});
      
describe('results reducer', () => {
  it('has a default value of an empty array', () => {
    const state = results([], {});
    expect(state).toEqual([]);
  });
      
  it('loads new results', () => {
    const state = results([], { type: NEW_SEARCH, payload: testQuery });
    expect(state).toEqual(testQuery.results);
  });
});
      
describe('search selectors', () => {
  it('gets a query', () => {
    const got = getQuery({ query: testQuery.query });
    expect(got).toEqual(testQuery.query);
  });
      
  it('gets results', () => {
    const got = getResults({ results: testQuery.results });
    expect(got).toEqual(testQuery.results);
  });
});