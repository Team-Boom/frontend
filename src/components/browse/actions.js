import { SORT_LOAD, SORT_CLEAR } from './reducers';
import { fetchSorted } from '../../services/api';

export function loadSort(query, page) {
  return {
    type: SORT_LOAD,
    payload: fetchSorted(query, page)
  };
}

export function clearSort() {
  return { type: SORT_CLEAR };
}