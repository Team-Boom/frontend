export const NEW_SEARCH = 'NEW_SEARCH';
export const LOAD_SEARCH = 'LOAD_SEARCH';
export const END_SEARCH = 'END_SEARCH';

export const getSResults = state => state.searchResults;
export const getSQuery = state => state.searchQuery;
export const getSState = state => state.searchState;


export function searchResults(state = [], { type, payload }) {
  switch(type) {
    case NEW_SEARCH:
      return [];
    case LOAD_SEARCH:
      return payload.Search;
    default: 
      return state;
  }
}

export function searchQuery(state = '', { type, payload }) {
  switch(type) {
    case NEW_SEARCH:
      return payload;
    default: 
      return state;
  }
}

export function searchState(state = null, { type }) {
  switch(type) {
    case NEW_SEARCH:
      return 'loading';
    case END_SEARCH:
      return null;
    default: 
      return state;
  }
}