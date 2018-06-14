import * as React from 'react';
//import * as classNames from 'classnames';

import { StagedTrack } from '..';

interface StagedTrackListItemProps {
  stagedTrack: StagedTrack;
  key?: any;
}

class StagedTrackListItem extends React.Component<StagedTrackListItemProps> {

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

export default StagedTrackListItem;
