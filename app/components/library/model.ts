import TRACK_STATE from "./constants/TrackStates";

export type LibraryState = { tracks: Track[] };

export type Stem = {
  id: string;
  name: string;
  completed: boolean;
}

export type Track = {
  id: string;
  name: string;
  status: TRACK_STATE;
  error?: Error;
  configFileUrl: string;
  stems: Stem[];
}
