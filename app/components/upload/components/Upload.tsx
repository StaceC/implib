import * as React from 'react';
import Dropzone from 'react-dropzone';

export interface UploadProps {
  stageTracks: (files: File[]) => any;
};

class Upload extends React.Component<UploadProps> {

  onDrop(trackFiles: File[]) {
    this.props.stageTracks(trackFiles);
  }

  render() {
    return (
      <header className="header">
          <h1>Upload</h1>

          <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>

      </header>
    );
  }
}

export default Upload;
