import { createAction } from 'redux-actions';

const STAGE_TRACKS_REQUEST= 'STAGE_TRACKS_REQUEST';
const STAGE_TRACKS_SUCCESS = 'STAGE_TRACKS_SUCCEED';
const STAGE_TRACKS_FAILED = 'STAGE_TRACKS_FAILED';
export const STAGE_TRACK = 'STAGE_TRACK';

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

const stageTrack = createAction<File, File>(
  STAGE_TRACK,
  (trackFile: File) => trackFile
);

export {
  stageTracksSuccess,
  stageTracksFailure,
  stageTrack
}
