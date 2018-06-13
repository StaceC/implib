import * as React from 'react';
import { StagedTrack } from '../model';

let styles = require('./Stage.scss');

interface StagedTracksListProps {
  stagedTracks: StagedTrack[];
}

class StagedTracksList extends React.Component<StagedTracksListProps> {

  render() {
    return (
      <div className={styles.stagedTracksList}>
        <p>Empty Tracks List</p>
      </div>
    );
  }

}

export default StagedTracksList;
