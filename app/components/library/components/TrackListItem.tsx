import * as React from 'react';
//import * as classNames from 'classnames';

import { Track } from '..';

interface TrackListItemProps {
  track: Track;
  key?: any;
}

class TrackListItem extends React.Component<TrackListItemProps> {

  render() {
    const track = this.props.track;

    let element;

    element = (
      <div className="stagedTrackListItemContainer">
        <label>
          {track.name}
        </label>
      </div>
    );

    return (
      <li>
        {element}
      </li>
    );
  }
}

export default TrackListItem;
