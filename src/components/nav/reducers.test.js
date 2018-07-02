import { NEW_SEARCH, LOAD_SEARCH, END_SEARCH,
  getSResults, getSQuery, getSState, 
  searchQuery, searchResults, searchState } from './reducers';
      
const testResults = [{
  title: 'Oliver and Company',
  description: 'The best movie ever'
}];
  
      
describe('searchResults reducer', () => {
  it('has a default value of an empty array', () => {
    const state = searchResults([], {});
    expect(state).toEqual([]);
  });
      
  it('loads new results', () => {
    const state = searchResults([], { type: LOAD_SEARCH, payload: { Search: testResults } });
    expect(state).toEqual(testResults);
  });

  it('returns empty array on new search', () => {
    const state = searchResults(testResults, { type: NEW_SEARCH });
    expect(state).toEqual([]);
  });
});

describe('searchQuery reducer', () => {
  it('has a default value of an empty string', () => {
    const state = searchQuery('', {});
    expect(state).toEqual('');
  });
      
  it('loads new query', () => {
    const state = searchQuery({}, { type: NEW_SEARCH, payload: 'query' });
    expect(state).toEqual('query');
  });
});

describe('searchState reducer', () => {
  it('has a default value of null', () => {
    const state = searchState(null, {});
    expect(state).toEqual(null);
  });
      
  it('sets state to loading on new search', () => {
    const state = searchState(null, { type: NEW_SEARCH });
    expect(state).toEqual('loading');
  });

  it('clears state to loading on search end', () => {
    const state = searchState('loading', { type: END_SEARCH });
    expect(state).toEqual(null);
  });
});
      
describe('search selectors', () => {

  it('gets results', () => {
    const got = getSResults({ searchResults: testResults });
    expect(got).toEqual(testResults);
  });

  it('gets query', () => {
    const got = getSQuery({ searchQuery: 'query' });
    expect(got).toEqual('query');
  });

  it('gets state', () => {
    const got = getSState({ searchState: 'loading' });
    expect(got).toEqual('loading');
  });
});