export const NEW_SEARCH = 'NEW_SEARCH';

export const getQuery = state => state.query;
export const getResults = state => state.results;

export function search(state = '', { type, payload }) {
  switch(type) {
    case NEW_SEARCH:
      return payload.query;
    default:
      return state;
  }
}

export function results(state = [], { type, payload }) {
  switch(type) {
    case NEW_SEARCH:
      return payload.results;
    default: 
      return state;
  }
}