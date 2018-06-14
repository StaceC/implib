import { createAction } from 'redux-actions';
import { StagedTrack } from './model';
//import STAGING_TRACK_STATES from './constants/StagingTrackStates';

export const IMPORT_STAGED_TRACKS = 'IMPORT_STAGED_TRACKS';
export const CLEAR_COMPLETED_IMPORTS = 'CLEAR_COMPLETED_IMPORTS';

const clearCompleted = createAction<void, string>(
  CLEAR_COMPLETED_IMPORTS,
  (name: string) => {}
);

const IMPORT_STAGED_TRACKS_REQUEST= 'IMPORT_STAGED_TRACKS_REQUEST';
const IMPORT_STAGED_TRACKS_SUCCESS = 'IMPORT_STAGED_TRACKS_SUCCEED';
const IMPORT_STAGED_TRACKS_FAILED = 'IMPORT_STAGED_TRACKS_FAILED';
export const IMPORT_STAGED_TRACK = 'IMPORT_STAGED_TRACK';

export function importStagedTracks(stagedTracks: StagedTrack[]) {
  return (dispatch: Function) => {
    dispatch({ type: IMPORT_STAGED_TRACKS_REQUEST });

    const dispatchedImportTracks =
      stagedTracks.map( track => { return dispatch(importStagedTrack(track)) } );

    return Promise.all(dispatchedImportTracks)
    .then(() => {
      return dispatch(importStagedTracksSuccess());
    })
    .catch((err: Error) => {
      return dispatch(importStagedTracksFailure(err));
    });
  }
}

const importStagedTracksSuccess = createAction<void>(
  IMPORT_STAGED_TRACKS_SUCCESS,
  () => { }
);

const importStagedTracksFailure = createAction<void, Error>(
  IMPORT_STAGED_TRACKS_FAILED,
  (err: Error) => err
);

const importStagedTrack = createAction<StagedTrack, StagedTrack>(
  IMPORT_STAGED_TRACK,
  (track: StagedTrack) => track
);

export {
  clearCompleted,
  importStagedTracksSuccess,
  importStagedTracksFailure,
  importStagedTrack
}
