import * as React from 'react';
import Footer from './Footer';
import StagedTracksList from './StagedTracksList';
import { StagedTrack } from '../model';

let styles = require('./Stage.scss');

export interface StageProps {
  stagedTracks: StagedTrack[];
  clearCompleted: ()=>void;
  importTracks: ()=>void;
};


class Stage extends React.Component<StageProps> {

  handleClearTracks() {
    this.props.clearCompleted();
  }

  handleImportTracks() {
    this.props.importTracks();
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
      <div className={styles.stage}>
        <h1>Staged</h1>
        {this.renderStagedTracksList()}
        {this.renderFooter()}
      </div>
    );
  }

}

export default Stage;
