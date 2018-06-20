import TRACK_STATE from "./constants/TrackStates";

export type LibraryState = {
  tracks: Track[],
  isFetching: boolean
};

export type Stem = {
  id: string;
  name: string;
  status: string;
}

export type Track = {
  id: string;
  name: string;
  status: TRACK_STATE;
  error?: Error;
  configFileUrl: string;
  stems: Stem[];
}
