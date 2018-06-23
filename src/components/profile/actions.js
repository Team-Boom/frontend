import { WATCHLIST_REMOVE, WATCHLIST_ADD} from './reducers';
import { fetchWatchlist, fetchAddAlbum, fetchAlbum } from '../../services/db';

export function addToWatchList(id) {
  return {
    type: WATCHLIST_ADD,
    payload: id
  };
}

export function removeFromWatchList(id) {
  return {
    type: WATCHLIST_REMOVE,
    payload: id
  };
}