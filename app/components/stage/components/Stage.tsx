import * as React from 'react';
import Footer from './Footer';

export interface StageProps {
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

  renderFooter() {
    return (
      <Footer
        onClearTracks={this.handleClearTracks.bind(this)}
        onImportTracks={this.handleImportTracks.bind(this)}
      />
    );
  }

  render() {
    return this.renderFooter();
  }

}

export default Stage;