import { handleActions, Action } from 'redux-actions';
const uuidv4 = require('uuid/v4');

import { StagedTrack, StagedState, STAGING_TRACK_STATES } from '../stage';

import { STAGE_TRACK } from './actions';

const initialState: StagedState = {
  stagedTracks: []
};

export default handleActions<StagedState, File>({
  [STAGE_TRACK]: (state: StagedState, action: Action<File>): StagedState => {    
    const newStagedTrack: StagedTrack =
    ({
      id: uuidv4(),
      name: (action && action.payload && action.payload.name || ""),
      status: STAGING_TRACK_STATES.STAGED,
      file: action && action.payload,
      error: undefined
    })
    return {...state, stagedTracks: [...state.stagedTracks, newStagedTrack]};
  },
}, initialState);
