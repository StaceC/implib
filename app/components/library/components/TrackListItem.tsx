import * as React from 'react';
//import * as classNames from 'classnames';

import { Track } from '..';

interface TrackListItemProps {
  stagedTrack: Track;
  key?: any;
}

class TrackListItem extends React.Component<TrackListItemProps> {

  render() {
    const stagedTrack = this.props.stagedTrack;

    let element;

    element = (
      <div className="stagedTrackListItemContainer">
        <label>
          {stagedTrack.name}
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
