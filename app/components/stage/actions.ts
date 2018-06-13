import { createAction } from 'redux-actions';
import { StagedTrack } from './model';
//import STAGING_TRACK_STATES from './constants/StagingTrackStates';

export const STAGE_TRACK = 'STAGE_TRACK';
export const UNSTAGE_TRACK = 'UNSTAGE_TRACK';

const clearCompleted = createAction<void, string>(
  STAGE_TRACK,
  (name: string) => {}
);

const importTracks = createAction<StagedTrack, StagedTrack>(
  UNSTAGE_TRACK,
  (track: StagedTrack) => track
);

export {
  clearCompleted,
  importTracks
}
