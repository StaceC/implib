import { createAction } from 'redux-actions';
import { StagedTrack, STAGING_TRACK_STATES } from '../stage';

const STAGE_TRACKS_REQUEST= 'STAGE_TRACKS_REQUEST';
const STAGE_TRACKS_SUCCESS = 'STAGE_TRACKS_SUCCEED';
const STAGE_TRACKS_FAILED = 'STAGE_TRACKS_FAILED';
const STAGE_TRACK = 'STAGE_TRACK';

const uuidv4 = require('uuid/v4');

// IMPORT A LIST OF TRACKS -> CALLS IMPORT TRACK
export function stageTracks(trackFiles: File[]) {
  return (dispatch: Function) => {
    dispatch({ type: STAGE_TRACKS_REQUEST });

    const dispatchedStagedTracks =
      trackFiles.map( file => { return dispatch(stageTrack(file)) } );

    return Promise.all(dispatchedStagedTracks)
    .then(() => {
      return dispatch(stageTracksSuccess());
    })
    .catch((err: Error) => {
      return dispatch(stageTracksFailure(err));
    });

  }
}

const stageTracksSuccess = createAction<void>(
  STAGE_TRACKS_SUCCESS,
  () => { }
);

const stageTracksFailure = createAction<void, Error>(
  STAGE_TRACKS_FAILED,
  (err: Error) => err
);

const stageTrack = createAction<StagedTrack, File>(
  STAGE_TRACK,

  // TODO: We will possibly want to check if we can read the file here
  // Otherwise, return StagedTrack with assigned error.
  // Same for reading the name, trackFile.name! -> error.

  (trackFile: File) =>
    ({
      id: uuidv4(),
      name: trackFile.name,
      status: STAGING_TRACK_STATES.STAGED,
      file: trackFile,
      error: undefined
    })
);

export {
  stageTracksSuccess,
  stageTracksFailure,
  stageTrack
}
