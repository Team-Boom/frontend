import {
  LOAD_START,
  LOAD_END,
  ERROR,
  ERROR_CLEAR,
  getLoading,
  getError,
  loading,
  error } from './reducers';
    
    
describe.only('loading reducer', () => {
    
  it('has a default value of an false boolean', () => {
    const state = loading(undefined, {});
    expect(state).toBeFalsy();
  });
    
  it('returns true on LOAD_START', () => {
    const state = loading(false, { type: LOAD_START });
    expect(state).toBeTruthy();
  });
    
  it('returns false on LOAD_END', () => {
    const state = loading(true, { type: LOAD_END });
    expect(state).toBeFalse();
  });
});
    
describe('albumList reducer', () => {
  it('has a default value of an empty array', () => {
    const state = albumList(undefined, []);
    expect(state).toEqual([]);
  });
    
  it('loads all albums', () => {
    const state = albumList(null, { type: ALBUMS_LOAD, payload: [album1] });
    expect(state).toEqual([album1]);
  });
    
  it('adds an album', () => {
    const state = albumList(album1, { type: ALBUM_ADD, payload: album2 });
    expect(state).toEqual([album1, album2]);
  });
});
    
describe('album selectors', () => {
  it('gets album by Id', () => {
    const albumById = album1;
    const got = getAlbumById({ albumById });
    expect(got).toEqual(albumById);
  });
    
  it('gets album list', () => {
    const albumList = [album1, album2];
    const got = getAlbumsList({ albumList });
    expect(got).toEqual(albumList);
  });
});