import { NEW_SEARCH } from './reducers';
import { fetchSearch } from '../../services/api';

export function newSearch(query) {
  return {
    type: NEW_SEARCH,
    payload: fetchSearch(query) 
  };
}