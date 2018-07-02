jest.mock('../../services/api', () => ({ 
  fetchTopTens: jest.fn(),
  fetchMovie: jest.fn(),
  fetchMovieAvgs: jest.fn(),
}));
  
import { loadTop10s, reloadAvgs } from './actions';
import { TOP10_LOAD, MOVIEAVGS_LOAD } from './reducers';
import { fetchTopTens, fetchMovieAvgs } from '../../services/api';

describe('Movie load actions', () => {  
  
  it('loads all top 10s', () => {
    const promise = Promise.resolve();
    fetchTopTens.mockReturnValueOnce(promise);
      
    const { type, payload } = loadTop10s();
  
    expect(type).toBe(TOP10_LOAD);
    expect(fetchTopTens.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });

  it('reloads movieAvgs', () => {
    const promise = Promise.resolve();
    fetchMovieAvgs.mockReturnValueOnce(promise);
      
    const { type, payload } = reloadAvgs(123);
  
    expect(type).toBe(MOVIEAVGS_LOAD);
    expect(fetchMovieAvgs.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });
  
});
