import { createAction } from 'redux-actions';
import { StagedTrack, TRACK_STATES, Track } from '../models';
import { DatabaseManager } from "../db";
//import { unpackArchive } from '../utils/unpack';
import { unpackArchive } from '../utils/unzip';

export const GET_LIBRARY_TRACKS_REQUEST = 'GET_LIBRARY_TRACKS_REQUEST';
export const GET_LIBRARY_TRACKS_SUCCESS = 'GET_LIBRARY_TRACKS_SUCCESS';
export const GET_LIBRARY_TRACKS_FAILURE = 'GET_LIBRARY_TRACKS_FAILURE';
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
      try{
        unpackArchive(stagedTrack.file)
        .then(newTrack => {
            DatabaseManager.getInstance().Track.build({
              id: stagedTrack.id,
              name: newTrack.name,
              status: TRACK_STATES.IMPORTED })
            .save()
            .then( savedTrack => dispatch(
              importStagedTrackSuccess(savedTrack.get({plain: true}) as Track)
            ))
            .catch(error => {
              console.log("Database Failure: " + error);
              stagedTrack.error = error;
              dispatch(importStagedTrackFailure(stagedTrack));
            });
          }
        ).catch(error => {
          console.log(error);
          stagedTrack.error = error;
          dispatch(importStagedTrackFailure(stagedTrack));
        });
      } catch(error) {
        stagedTrack.error = error;
        dispatch(importStagedTrackFailure(stagedTrack));
      }
    } else {
      const error = new Error("Staged Track file attribute is undefined");
      stagedTrack.error = error;
      dispatch(importStagedTrackFailure(stagedTrack));
    }
  }
}
const importStagedTrackSuccess = createAction<Track, Track>(
  IMPORT_STAGED_TRACK_SUCCESS,
  (newTrack: Track) => newTrack
);
const importStagedTrackFailure = createAction<StagedTrack, StagedTrack>(
  IMPORT_STAGED_TRACK_FAILED,
  (stagedTrack: StagedTrack) => stagedTrack
);


// GET TRACKS FROM DB
export function getTracks() {
  return (dispatch: Function) => {
    dispatch({ type: GET_LIBRARY_TRACKS_REQUEST });
    return DatabaseManager.getInstance().Track.findAll({ raw: true })
      .then(tracks => dispatch(getTracksSuccess(tracks as Track[])))
      .catch((error: any) => dispatch( getTracksFailure(error)))
  }
}
const getTracksSuccess = createAction<Track[], Track[]>(
  GET_LIBRARY_TRACKS_SUCCESS,
  (tracks: Track[]) => tracks
);
const getTracksFailure = createAction<void, Error>(
  GET_LIBRARY_TRACKS_FAILURE,
  () => {}
);

export {
  clearCompleted,
  importStagedTracksSuccess,
  importStagedTracksFailure,
  importStagedTrackSuccess,
  importStagedTrackFailure,
  getTracksSuccess,
  getTracksFailure
}
