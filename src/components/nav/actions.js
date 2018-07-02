import { NEW_SEARCH, LOAD_SEARCH, END_SEARCH } from './reducers';
import { fetchSearch } from '../../services/api';
import { ERROR } from '../app/reducers';

export function newSearch(query) {
  return dispatch => {
    dispatch({ 
      type: NEW_SEARCH,
      payload: query
    });

    fetchSearch(query)
      .then(response => response.json())
      .then(results => {
        dispatch({
          type: LOAD_SEARCH,
          payload: results
        });
      },
      err => {
        dispatch({
          type: ERROR,
          payload: err
        });
      })
      .then(() => {
        dispatch({ type: END_SEARCH });
      });
  };
}
