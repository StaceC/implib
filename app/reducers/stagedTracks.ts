import { handleActions, Action } from 'redux-actions';
const uuidv4 = require('uuid/v4');

import { StagedTrack, StagedState, STAGING_TRACK_STATES } from '../models';
import { LibraryActions } from '../actions';
import { STAGE_TRACK } from '../actions';

const initialState: StagedState = {
  tracks: []
};

export default handleActions<StagedState, File | StagedTrack >({
  [STAGE_TRACK]: (state: StagedState, action: Action<File>): StagedState => {
    const newStagedTrack: StagedTrack =
    ({
      id: uuidv4(),
      name: (action && action.payload && action.payload.name || ""),
      status: STAGING_TRACK_STATES.STAGED,
      file: action && action.payload,
      error: undefined
    })
    return {...state, tracks: [...state.tracks, newStagedTrack]};
  },
  [LibraryActions.IMPORT_STAGED_TRACK_FAILED]: (state: StagedState, action: Action<StagedTrack>): StagedState => {
    if(action.payload) {

      return <StagedState>{...state, tracks: state.tracks.map(track =>
        track.id === ((action && action.payload && action.payload.id) || "")
          ? { ...track,
              error: ((action && action.payload && action.payload.error) || "Error"),
              status: STAGING_TRACK_STATES.ERROR }
          : track
      )};
    } else {
      return state;
    }
  },
}, initialState);
