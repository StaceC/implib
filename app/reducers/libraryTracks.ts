
import { handleActions, Action } from 'redux-actions';
import { Track, LibraryState } from '../components/library/model';
import { LibraryActions } from '../actions';

const initialState: LibraryState = {
  tracks: [],
  isFetching: false
};

export default handleActions<LibraryState, void | Track | Track[] | Error>({
  [LibraryActions.IMPORT_STAGED_TRACK_SUCCESS]: (state: LibraryState, action: Action<Track>): LibraryState => {
    if(action.payload) {
      return {...state, tracks: [...state.tracks, action.payload]};
    } else {
      return state;
    }
  },

  [LibraryActions.GET_LIBRARY_TRACKS_REQUEST]: (state: LibraryState, action: Action<void>): LibraryState =>
    ({...state, isFetching: true}),
  [LibraryActions.GET_LIBRARY_TRACKS_SUCCESS]: (state: LibraryState, action: Action<Track[]>): LibraryState => {
    return {tracks: (action && action.payload && action.payload) || [], isFetching: false};
  },
  [LibraryActions.GET_LIBRARY_TRACKS_FAILURE]: (state: LibraryState, action: Action<Error>): LibraryState => {
    return {...state, isFetching: false};
  },

}, initialState);
