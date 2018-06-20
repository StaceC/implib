
import { handleActions, Action } from 'redux-actions';
import { Track, LibraryState } from '../components/library/model';
import { LibraryActions } from '../actions';
import { StagedTrack } from '../components/stage';

const initialState: LibraryState = {
  tracks: []
};

export default handleActions<LibraryState, StagedTrack | Track>({
  [LibraryActions.IMPORT_STAGED_TRACK_SUCCESS]: (state: LibraryState, action: Action<Track>): LibraryState => {
    if(action.payload) {
      return {...state, tracks: [...state.tracks, action.payload]};
    } else {
      return state;
    }
  },
}, initialState);
