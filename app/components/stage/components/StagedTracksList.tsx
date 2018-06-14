import * as React from 'react';
import { StagedTrack } from '../model';
import StagedTrackListItem from './StagedTrackListItem';

let styles = require('./Stage.scss');

interface StagedTracksListProps {
  stagedTracks: StagedTrack[];
}

class StagedTracksList extends React.Component<StagedTracksListProps> {

  render() {

    const stagedTracks = this.props.stagedTracks;
    let listItems;

    if (!Array.isArray(stagedTracks) || !stagedTracks.length) {
      listItems = <p>Empty Tracks List</p>;
    } else {
      listItems = (
        <ul className="todo-list">
          {stagedTracks.map(track =>
            <StagedTrackListItem
              key={track.id}
              stagedTrack={track}
            />
          )}
        </ul>
      )
    }

    return (
      <div className={styles.stagedTracksList}>
        {listItems}
      </div>
    );
  }

}

export default StagedTracksList;
