import * as React from 'react';

interface FooterProps {
  onClearTracks: ()=>void;
  onImportTracks: ()=>void;
}

class Footer extends React.Component<FooterProps> {

  renderClearButton() {
    const { onClearTracks } = this.props;
    return (
      <button className="clear-completed"
              onClick={() => onClearTracks()}>
        Clear
      </button>
    );
  }

  renderImportButton() {
    const { onImportTracks } = this.props;
    return (
      <button className="clear-completed"
              onClick={() => onImportTracks()}>
        Import
      </button>
    );
  }

  render() {
    return (
      <footer className="footer">
        {this.renderClearButton()}
        {this.renderImportButton()}
      </footer>
    );
  }

}

export default Footer;
