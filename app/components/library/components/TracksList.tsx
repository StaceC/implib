import * as React from 'react';
import { Track } from '../model';
import TrackListItem from './TrackListItem';

let styles = require('./Library.scss');

interface TracksListProps {
  tracks: Track[];
}

class TracksList extends React.Component<TracksListProps> {

  render() {

    const tracks = this.props.tracks;
    let listItems;

    if (!Array.isArray(tracks) || !tracks.length) {
      listItems = <p>Empty Tracks List</p>;
    } else {
      listItems = (
        <ul className="todo-list">
          {tracks.map(track =>
            <TrackListItem
              key={track.id}
              stagedTrack={track}
            />
          )}
        </ul>
      )
    }

    return (
      <div className={styles.tracksList}>
        {listItems}
      </div>
    );
  }

}

export default TracksList;
