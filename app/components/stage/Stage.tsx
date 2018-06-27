import * as React from 'react';
import Footer from './Footer';
import StagedTracksList from './StagedTracksList';
import { StagedTrack } from '../../models';

let styles = require('./Stage.scss');

export interface StageProps {
  stagedTracks: StagedTrack[];
  clearCompleted: ()=>void;
  importStagedTracks: (stagedTracks: StagedTrack[])=>void;
};


class Stage extends React.Component<StageProps> {

  handleClearTracks() {
    this.props.clearCompleted();
  }

  handleImportTracks() {
    const { stagedTracks } = this.props
    this.props.importStagedTracks(stagedTracks);
  }

  renderStagedTracksList() {
    const stagedTracks = this.props.stagedTracks;
    return(
      <StagedTracksList
        stagedTracks={stagedTracks}
      />
    );
  }

  renderFooter() {
    return (
      <Footer
        onClearTracks={this.handleClearTracks.bind(this)}
        onImportTracks={this.handleImportTracks.bind(this)}
      />
    );
  }

  render() {
    return (
      <div className={styles.stage} data-tid="staged_tracks">
        <h1>Staged</h1>
        {this.renderStagedTracksList()}
        {this.renderFooter()}
      </div>
    );
  }

}

export default Stage;
