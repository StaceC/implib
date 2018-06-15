import STAGING_TRACK_STATE from "./constants/StagingTrackStates";

export type StagedTrack = {
  id: string;
  name: string;
  status: STAGING_TRACK_STATE;
  file?: File;
  error?: Error;
};

export type StagedState = { tracks: StagedTrack[] };
