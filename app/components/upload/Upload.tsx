import * as React from 'react';
//import Dropzone from 'react-dropzone';
/* tslint:disable-next-line */
let Dropzone = require('react-dropzone')
if ('default' in Dropzone) {
  Dropzone = Dropzone.default
}

let styles = require('./Upload.scss');

export interface UploadProps {
  stageTracks: (files: File[]) => any;
};

class Upload extends React.Component<UploadProps> {

  onDrop(trackFiles: File[]) {
    this.props.stageTracks(trackFiles);
  }

  render() {
    return (
      <div data-tid="upload_tracks">
        <h1>Upload</h1>
        <Dropzone className={styles.dropzone} onDrop={this.onDrop.bind(this)}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
      </div>
    );
  }
}

export default Upload;
