export const NEW_SEARCH = 'NEW_SEARCH';
export const LOAD_SEARCH = 'LOAD_SEARCH';

export const getQuery = state => state.query;
export const getResults = state => state.results;

export function results(state = [], { type, payload }) {
  switch(type) {
    case NEW_SEARCH:
      return payload;
    default: 
      return state;
  }
}