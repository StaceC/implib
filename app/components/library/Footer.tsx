import * as React from 'react';

interface FooterProps {
  onClearTracks: ()=>void;
  onImportTracks: ()=>void;
}

class Footer extends React.Component<FooterProps> {

  render() {
    return (
      <footer className="footer">
        <p>Empty Footer</p>
      </footer>
    );
  }

}

export default Footer;
