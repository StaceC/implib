import TRACK_STATE from "./constants/TrackStates";

export type Track = {
  id: string;
  name: string;
  status: TRACK_STATE;
  error?: Error;
};

export type LibraryState = { tracks: Track[] };
