import { createAction } from 'redux-actions';
import { StagedTrack } from './model';
import STAGING_TRACK_STATES from './constants/StagingTrackStates';

const STAGE_TRACK = 'STAGE_TODO';
const UNSTAGE_TRACK = 'UNSTAGE_TRACK'

const clearCompleted = createAction<StagedTrack, string>(
  STAGE_TRACK,
  (name: string) => ({ id: "", name, status: STAGING_TRACK_STATES.STAGED })
);

const importTracks = createAction<StagedTrack, StagedTrack>(
  UNSTAGE_TRACK,
  (track: StagedTrack) => track
);

export {
  clearCompleted,
  importTracks
}
