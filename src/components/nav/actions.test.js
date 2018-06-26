
jest.mock('../../services/api', () => ({ fetchSearch: jest.fn() }));

import { newSearch } from './actions';
import { NEW_SEARCH } from './reducers';
import { fetchSearch } from '../../services/api';
           
describe('Nav actions', () => {  
            
    it('loads new search', () => {
        const promise = Promise.resolve();
        fetchSearch.mockReturnValueOnce(promise);
    
        const { type, payload } = newSearch('query');
        const { query, results } = payload;

        expect(type).toBe(NEW_SEARCH);
        expect(fetchSearch.mock.calls.length).toBe(1);
        expect(query).toBe('query');
        expect(results).toBe(promise);
      });
});