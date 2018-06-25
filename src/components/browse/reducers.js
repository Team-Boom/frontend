export const SORT_LOAD = 'SORT_LOAD';
export const SORT_CLEAR = 'SORT_LOAD';

export const getSorted = state => state.sorted;

export function sorted(state = [], { type, payload }) {
  switch(type) {
    case SORT_LOAD:
      return payload;
    case SORT_CLEAR:
      return [];
    default:
      return state;
  }
}