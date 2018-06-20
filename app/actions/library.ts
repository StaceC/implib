import { createAction } from 'redux-actions';
import { StagedTrack } from '../components/stage/model';
import db from "../db";
import TRACK_STATES from '../components/library/constants/TrackStates';
import { Track } from '../components/library/model';
import { unpackArchive } from '../utils/unpack';

export const CLEAR_COMPLETED_IMPORTS = 'CLEAR_COMPLETED_IMPORTS';
export const IMPORT_STAGED_TRACKS_REQUEST= 'IMPORT_STAGED_TRACKS_REQUEST';
export const IMPORT_STAGED_TRACKS_SUCCESS = 'IMPORT_STAGED_TRACKS_SUCCEED';
export const IMPORT_STAGED_TRACKS_FAILED = 'IMPORT_STAGED_TRACKS_FAILED';
export const IMPORT_STAGED_TRACK_REQUEST = 'IMPORT_STAGED_TRACK';
export const IMPORT_STAGED_TRACK_SUCCESS = 'IMPORT_STAGED_TRACK_SUCCEED';
export const IMPORT_STAGED_TRACK_FAILED = 'IMPORT_STAGED_TRACK_FAILED';

const clearCompleted = createAction<void, string>(
  CLEAR_COMPLETED_IMPORTS,
  (name: string) => {}
);

export function importStagedTracks(stagedTracks: StagedTrack[]) {
  return (dispatch: Function) => {
    dispatch({ type: IMPORT_STAGED_TRACKS_REQUEST });

    const dispatchedImportTracks =
      stagedTracks.map( track => { return dispatch(importStagedTrack(track)) } );

    return Promise.all(dispatchedImportTracks)
    .then(() => {
      return dispatch(importStagedTracksSuccess());
    })
    .catch((error: Error) => {
      return dispatch(importStagedTracksFailure(error));
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




// IMPORTING INDIVIDUAL TRACKS
export function importStagedTrack(stagedTrack: StagedTrack) {
  return (dispatch: Function) => {
    dispatch({ type: IMPORT_STAGED_TRACK_REQUEST });
    console.log("Importing Track ["+ stagedTrack + "]");
    if(stagedTrack.file) {
      unpackArchive(stagedTrack.file)
      .then(newTrack => {
          db.Track.build( {id: stagedTrack.id, name: newTrack.name, status: TRACK_STATES.IMPORTED } )
          .save()
          .then(savedTrack => dispatch(importStagedTrackSuccess(savedTrack.get({plain: true}) as Track)))
          .catch(error => {
            console.log(error);
            dispatch(importStagedTrackFailure(error));
          });
        }
      ).catch(error => {
        console.log(error);
        dispatch(importStagedTrackFailure(error));
      });
    } else {
      dispatch(importStagedTrackFailure(new Error("Staged Track file attribute is undefined")));
    }
  }
}
const importStagedTrackSuccess = createAction<Track, Track>(
  IMPORT_STAGED_TRACK_SUCCESS,
  (newTrack: Track) => newTrack
);
const importStagedTrackFailure = createAction<void, Error>(
  IMPORT_STAGED_TRACK_FAILED,
  (err: Error) => err
);



export {
  clearCompleted,
  importStagedTracksSuccess,
  importStagedTracksFailure,
  importStagedTrackSuccess,
  importStagedTrackFailure
}
