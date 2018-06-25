import * as React from 'react';

import TracksList from './TracksList';
import { Track } from '../model';

let styles = require('./Library.scss');

export interface LibraryProps {
  tracks: Track[];
  getTracks: () => void;
};


class Library extends React.Component<LibraryProps> {

  renderTracksList() {

    const tracks = this.props.tracks;

    return(
      <TracksList
        tracks={tracks}
      />
    );
  }

  render() {
    return (
      <div className={styles.library} data-tid="library_tracks">
        <h1>Library</h1>
        {this.renderTracksList()}
      </div>
    );
  }

  componentDidMount() {
    this.props.getTracks();
  }

}
export default Library;
