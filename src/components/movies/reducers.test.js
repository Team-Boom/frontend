import {
  TOP10_LOAD,
  MOVIE_LOAD,
  MOVIEAVGS_LOAD,
  getMovie,
  getTop10,
  movie,
  top10s } from './reducers';
    
const testMovie = {
  _id: 123,
  title: 'Good Movie',
  description: 'Real real good',
  poster: 'http://images.com/movie.png'
};
    
const ratings = {
  lighting: 5,
  design: 3,
  editing: 4
};

const lighting = {
  category: 'lighting',
  movies: [
    testMovie,
    { _id: 124,
      title: 'Also Good' }
  ]  };
      
const sound = {
  category: 'sound',
  movies: [
    testMovie,
    { _id: 125,
      title: 'But better' }
  ]  };

const top10State = obj =>({ [obj.category]: obj.movies });

    
describe.only('movie reducer', () => {
    
  it('has a default value of an empty object', () => {
    const state = movie(undefined, {});
    expect(state).toEqual({});
  });
    
  it('loads a movie', () => {
    const state = movie({}, { type: MOVIE_LOAD, payload: testMovie });
    expect(state).toEqual(testMovie);
  });
    
  it('adds the avgs', () => {
    const state = movie(testMovie, { type: MOVIEAVGS_LOAD, payload: ratings });
    expect(state).toEqual({ ...testMovie, ratings });
  });
});
    
describe.only('top10s reducer', () => {
  it('has a default value of an empty object', () => {
    const state = top10s(undefined, {});
    expect(state).toEqual({});
  });
    
  it('loads new category', () => {
    const state = top10s({}, { type: TOP10_LOAD, payload: lighting });
    expect(state).toEqual(top10State(lighting));
  });
    
  it('loads second category', () => {
    const state = top10s(top10State(lighting), { type: TOP10_LOAD, payload: sound });
    expect(state).toEqual({ ...top10State(lighting), ...top10State(sound) });
  });

  it('reloads existing category', () => {
    const lighting2 = { ...lighting, title: 'So damn good' };
    const state = top10s({ ...top10State(lighting), ...top10State(sound) }, { type: TOP10_LOAD, payload: sound });
    expect(state).toEqual({ ...top10State(lighting2), ...top10State(sound) });
  });
});
    
describe.only('movies selectors', () => {
  it('gets movie', () => {
    const movie = testMovie;
    const got = getMovie({ movie: movie });
    expect(got).toEqual(movie);
  });
    
  it('gets top 10 by category', () => {
    const top10s = { ...top10State(lighting), ...top10State(sound) };
    const got = getTop10('lighting', { top10s: top10s });
    expect(got).toEqual(lighting.movies);
  });
});