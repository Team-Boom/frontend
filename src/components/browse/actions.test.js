jest.mock('../../services/api', () => ({ fetchSorted: jest.fn() }));
    
import { loadSort, clearSort } from './actions';
import { SORT_LOAD, SORT_CLEAR } from './reducers';
import { fetchSorted } from '../../services/api';
               
describe('Browse actions', () => {  
    
  it('loads sorted movies', () => {
    const promise = Promise.resolve();
    fetchSorted.mockReturnValueOnce(promise);
        
    const { type, payload } = loadSort();
    
    expect(type).toBe(SORT_LOAD);
    expect(fetchSorted.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });
    
  it('clears sorted movies', () => {
  
    const { type } = clearSort();
    expect(type).toBe(SORT_CLEAR);
    
  });
    
});
  